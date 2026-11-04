import Image from 'next/image';
import type { CSSProperties } from 'react';
import { aboutFacts, site } from '../../content';
import { CodeCard } from './CodeCard';
import styles from './about.module.css';

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties;

/** "B.Sc. … · 2020–2024" → primary value + quieter detail. */
const splitFact = (value: string) => {
  const [primary, ...rest] = value.split(' · ');
  return { primary, secondary: rest.join(' · ') };
};

export function About() {
  return (
    <section id="about" className={`section ${styles.about}`} aria-labelledby="about-heading">
      <div className="container">
        <header className={styles.head} data-reveal>
          <p className="eyebrow">
            <span className="eyebrow-index">01</span>About
          </p>
          <h2 id="about-heading" className={`heading ${styles.heading}`}>
            From the first interaction to the last <em>transaction.</em>
          </h2>
        </header>

        <div className={styles.grid}>
          <div className={styles.photoCol}>
            <div className={styles.photoReveal} data-reveal>
              <figure className={`panel panel-brass ${styles.frame}`}>
                <div className={styles.photo}>
                  <Image
                    src={site.candid}
                    alt="Zeyad Salama at the Arab Collegiate Programming Contest"
                    fill
                    sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1099px) 42vw, 500px"
                    className={styles.img}
                  />
                </div>
                <figcaption className={`chip ${styles.caption}`}>
                  <span className={styles.captionDot} aria-hidden="true" />
                  <span className={styles.captionText}>
                    <strong>ACPC</strong>
                    <span className={styles.captionSep}> · </span>
                    <span>Arab Collegiate Programming Contest</span>
                  </span>
                </figcaption>
              </figure>
            </div>

            <div className={styles.stickerWrap} data-reveal style={delay(420)}>
              <p className={styles.sticker}>
                <span className={styles.stickerLine}>Think in systems.</span>{' '}
                <span className={styles.stickerLine}>Ship with intent.</span>
              </p>
            </div>
          </div>

          <div className={styles.text} data-reveal style={delay(120)}>
            <p className={`lead ${styles.lead}`}>
              I&apos;m a software engineer building full-stack web applications with React, Next.js, TypeScript,
              Python, Django, and PostgreSQL. I turn complex requirements into clear interfaces and dependable
              systems.
            </p>
            <p className={styles.body}>
              I&apos;ve worked across multi-tenant SaaS, ERP, finance, delivery, education, e-commerce, and real
              estate—connecting responsive interfaces with secure authentication, real-time features,
              transactional workflows, and production-ready APIs. I care about how a product feels to use as much
              as how reliably it runs.
            </p>
          </div>

          <div className={styles.code} data-reveal style={delay(180)}>
            <span className={styles.connector} aria-hidden="true">
              <span className={styles.packet} />
            </span>
            <CodeCard />
          </div>
        </div>

        <dl className={styles.facts} data-reveal>
          {aboutFacts.map((fact, index) => {
            const { primary, secondary } = splitFact(fact.value);
            return (
              <div key={fact.label} className={styles.fact}>
                <dt className={`label ${styles.factLabel}`}>
                  <span className={styles.factIndex} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {fact.label}
                </dt>
                <dd className={styles.factValue}>
                  <span className={styles.factPrimary}>{primary}</span>
                  {secondary ? <span className={styles.factSecondary}>{secondary}</span> : null}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
