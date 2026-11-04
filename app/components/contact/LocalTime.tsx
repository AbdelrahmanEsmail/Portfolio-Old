'use client';

import { useSyncExternalStore } from 'react';
import styles from './contact.module.css';

/*
 * Live local time for a fixed IANA zone. Hydration-safe: the server snapshot is
 * empty, so the server and first client render both show the "--:--"
 * placeholder; React then re-renders with the real time. Ticks on minute
 * boundaries (and when the tab becomes visible again) — no per-second timers.
 */

const timeFormatters = new Map<string, Intl.DateTimeFormat>();
const partFormatters = new Map<string, Intl.DateTimeFormat>();

function timeFormatter(timeZone: string) {
  let formatter = timeFormatters.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit' });
    timeFormatters.set(timeZone, formatter);
  }
  return formatter;
}

/** Minutes the zone is ahead of UTC at `date` (DST-aware). */
function zoneOffsetMinutes(date: Date, timeZone: string) {
  let formatter = partFormatters.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hourCycle: 'h23',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    partFormatters.set(timeZone, formatter);
  }
  const parts = formatter.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((part) => part.type === type)?.value ?? 0);
  const asUtc = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'));
  return Math.round((asUtc - date.getTime()) / 60000);
}

function readClock(timeZone: string) {
  const now = new Date();
  return `${timeFormatter(timeZone).format(now)}|${zoneOffsetMinutes(now, timeZone)}|${-now.getTimezoneOffset()}`;
}

function subscribe(onChange: () => void) {
  let timer = 0;
  const schedule = () => {
    timer = window.setTimeout(
      () => {
        onChange();
        schedule();
      },
      60000 - (Date.now() % 60000) + 40,
    );
  };
  const onVisible = () => {
    if (document.visibilityState === 'visible') onChange();
  };
  schedule();
  document.addEventListener('visibilitychange', onVisible);
  return () => {
    window.clearTimeout(timer);
    document.removeEventListener('visibilitychange', onVisible);
  };
}

const serverSnapshot = () => '';

function formatGmt(minutes: number) {
  const sign = minutes < 0 ? '−' : '+';
  const abs = Math.abs(minutes);
  const hours = Math.floor(abs / 60);
  const rest = abs % 60;
  return `GMT${sign}${hours}${rest ? `:${String(rest).padStart(2, '0')}` : ''}`;
}

function formatDiff(minutes: number) {
  if (minutes === 0) return 'Same time zone as you';
  const abs = Math.abs(minutes);
  const hours = Math.floor(abs / 60);
  const rest = abs % 60;
  const amount = [hours ? `${hours}h` : '', rest ? `${rest}m` : ''].filter(Boolean).join(' ');
  return `${amount} ${minutes > 0 ? 'ahead of' : 'behind'} you`;
}

export function LocalTime({ timeZone }: { timeZone: string }) {
  const snapshot = useSyncExternalStore(subscribe, () => readClock(timeZone), serverSnapshot);
  const [time, zone, local] = snapshot ? snapshot.split('|') : [];
  const [hours, minutes] = time ? time.split(':') : [];

  return (
    <span className={styles.clock}>
      <span className={styles.clockRow}>
        {time ? (
          <time className={styles.clockTime} dateTime={time}>
            {hours}
            <span className={styles.colon}>:</span>
            {minutes}
          </time>
        ) : (
          <span className={styles.clockTime}>--:--</span>
        )}
        <span className={styles.clockZone}>{zone ? formatGmt(Number(zone)) : 'GMT'}</span>
      </span>
      <span className={styles.clockDiff}>{zone ? formatDiff(Number(zone) - Number(local)) : ' '}</span>
    </span>
  );
}
