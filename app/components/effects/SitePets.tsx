'use client';

import { useEffect, useRef, useState } from 'react';
import { PetSprite } from './PetSprite';
import styles from './site-pets.module.css';

/** Small automatic cameos, confined to the viewport edges. */
export function SitePets() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const syncVisibility = () => {
      if (sceneRef.current) sceneRef.current.dataset.sleeping = String(document.hidden);
    };
    syncVisibility();
    document.addEventListener('visibilitychange', syncVisibility);
    return () => document.removeEventListener('visibilitychange', syncVisibility);
  }, []);

  return (
    <>
      <div ref={sceneRef} className={styles.scene} data-paused={paused} aria-hidden="true">
        <div className={styles.ceilingRig}>
          <div className={styles.hanging}>
            <span className={styles.thread} />
            <span className={styles.hello}>just hanging.</span>
            <div className={styles.hangingPet}><PetSprite kind="claude" mood="waving" className={styles.character} /></div>
          </div>
        </div>

        <div className={styles.courier}>
          <span className={styles.coffeeBreak}>coffee?</span>
          <div className={styles.scooter}>
            <span className={styles.speedLines} />
            <PetSprite kind="gpt" mood="walking" className={styles.character} />
            <span className={styles.board}><span /><span /></span>
          </div>
        </div>

        <div className={styles.peeker}>
          <span className={styles.psst}>psst.</span>
          <PetSprite kind="gpt" mood="waving" className={styles.character} />
        </div>
      </div>

      <button
        type="button"
        className={styles.motionControl}
        aria-label={paused ? 'Resume site pet animations' : 'Pause site pet animations'}
        aria-pressed={paused}
        onClick={() => setPaused((current) => !current)}
        title={paused ? 'Resume the little companions' : 'Pause the little companions'}
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
          {paused ? <path d="m5 3 8 5-8 5z" /> : <><rect x="4" y="3" width="3" height="10" rx="1" /><rect x="9" y="3" width="3" height="10" rx="1" /></>}
        </svg>
        <span>Pets</span>
      </button>
    </>
  );
}
