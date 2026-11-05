'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { TOAST_EVENT } from './events';
import styles from './toaster.module.css';

export function Toaster() {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onToast = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      setMessage(detail);
      setVisible(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setVisible(false), 2400);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, onToast);
      window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className={styles.region} role="status" aria-live="polite">
      <div className={`${styles.toast} ${visible ? styles.visible : ''}`} aria-hidden={!visible}>
        <span className={styles.icon}>
          <Icon name="check" size={14} strokeWidth={2.4} />
        </span>
        {message}
      </div>
    </div>
  );
}
