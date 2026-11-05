import type { CSSProperties } from 'react';
import { experience } from '../../content';
import { Icon } from '../ui/Icon';
import { CareerSpine } from './CareerSpine';
import styles from './experience.module.css';

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties;

/** First four-digit year in a period: "Oct 2024 — Mar 2025" → "2024". */
const startYear = (period: string) => period.match(/\d{4}/)?.[0] ?? '';

export function Experience() {
  const years = experience.map((item) => startYear(item.period));

  return (
    <section id="experience" className={`section ${styles.experience}`} aria-labelledby="experience-heading">
      <div className="container">
        <header className={styles.head}>
          <div data-reveal>
            <p className="eyebrow">
              <span className="eyebrow-index">03</span>Experience
            </p>
            <h2 id="experience-heading" className={`heading ${styles.heading}`}>
              Experience across the <em>stack.</em>
            </h2>
          </div>
          <p className={styles.intro} data-reveal style={delay(120)}>
            My background in infrastructure, systems administration, and product development shapes how I build:
            clear interfaces, explicit application rules, and dependable data.
          </p>
        </header>

        <div className={styles.log}>
          <p className={styles.prompt} aria-hidden="true">
            <span className={styles.sign}>$</span>
            <span>git log</span>
            <span className={styles.flags}>--graph --oneline</span>
            <span>career</span>
            <span className={styles.comment}># newest first</span>
          </p>

          <div className={styles.graph}>
            <CareerSpine />
            <ol className={styles.list}>
              {experience.map((item, index) => {
                const year = years[index];
                const showYear = Boolean(year) && (index === 0 || year !== years[index - 1]);
                return (
                  <li
                    key={item.hash}
                    className={styles.commit}
                    data-commit=""
                    data-current={item.current ? '' : undefined}
                  >
                    <div className={styles.rail} aria-hidden="true">
                      {showYear ? <span className={styles.year}>{year}</span> : null}
                      <span className={styles.node} data-node="" />
                    </div>

                    <div className={styles.card} data-spotlight="" data-reveal="" style={delay(60)}>
                      <div className={styles.main}>
                        <h3 className={styles.role}>
                          {item.role}
                          {item.current ? <span className="visually-hidden"> (current role)</span> : null}
                        </h3>
                        <p className={styles.company}>
                          <span className={styles.companyName}>{item.company}</span>
                          <span className={styles.tag}>
                            <Icon name="pin" size={12} />
                            {item.tag}
                          </span>
                        </p>
                      </div>

                      <p className={styles.meta}>
                        <span className={styles.ref} aria-hidden="true">
                          <span className={styles.hash}>{item.hash}</span>
                          {item.current ? (
                            <span className={styles.headRef}>
                              <span className={styles.headName}>HEAD</span>
                              <span className={styles.arrow}>→</span>
                              main
                            </span>
                          ) : null}
                        </span>
                        <span className={styles.period}>{item.period}</span>
                      </p>

                      <p className={styles.desc}>{item.description}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <p className={styles.end} aria-hidden="true">
            <span className={styles.endMark}>(END)</span>
          </p>
        </div>
      </div>
    </section>
  );
}
