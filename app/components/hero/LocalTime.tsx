'use client';

import { useLocalTime } from './hooks';

type LocalTimeProps = { timeZone: string; className?: string };

/** Live local time ("14:32"). Server/hydration render shows "--:--". */
export function LocalTime({ timeZone, className }: LocalTimeProps) {
  const time = useLocalTime(timeZone);
  const [hours, minutes] = time.split(':');
  return (
    <span className={className}>
      <span className="visually-hidden">local time </span>
      {hours}
      <span data-colon>:</span>
      {minutes}
    </span>
  );
}
