'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '../ui/Icon';
import { copyText, toast } from '../ui/events';
import styles from './contact.module.css';

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => {
    const pending = timer;
    return () => window.clearTimeout(pending.current);
  }, []);

  const onCopy = async () => {
    const ok = await copyText(email);
    if (!ok) {
      toast('Couldn’t copy — please select the address');
      return;
    }
    toast('Email copied to clipboard');
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <button
      type="button"
      className={styles.copy}
      onClick={onCopy}
      aria-label="Copy email address"
      data-copied={copied ? '' : undefined}
      data-tip={copied ? 'Copied' : 'Copy'}
    >
      <span className={styles.copyIcon}>
        <Icon name="copy" size={20} />
      </span>
      <span className={`${styles.copyIcon} ${styles.copyCheck}`}>
        <Icon name="check" size={20} strokeWidth={2.2} />
      </span>
    </button>
  );
}
