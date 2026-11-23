import { useLayoutEffect, useRef } from 'react';
import { gsap, MOTION_OK } from '../lib/gsap';
import { ScheduleIcon } from './Ornaments';
import { schedule } from '../data/wedding';

export default function Schedule() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const root = ref.current;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root,
              start: 'top 68%',
              once: true,
            },
          })
          .from('.schedule__masthead > *', {
            y: 16,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
          })
          .from(
            '.schedule__ribbon-item',
            {
              x: -24,
              opacity: 0,
              duration: 0.7,
              stagger: 0.1,
            },
            '-=0.2',
          );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="schedule" ref={ref} className="section section--schedule">
      <header className="schedule__masthead">
        <p className="schedule__eyebrow">The order of celebration</p>
        <h2 className="schedule__heading">
          <span>Program</span>
          <em>Schedule</em>
        </h2>
        <p className="schedule__dek">From the first arrival to the final farewell</p>
      </header>

      <ol className="schedule__ribbon" aria-label="Wedding day program">
        {schedule.map((item, index) => {
          const [clock, period] = item.time.split(' ');
          const number = String(index + 1).padStart(2, '0');

          return (
            <li key={`${item.time}-${item.title}`} className="schedule__ribbon-item">
              <div className="schedule__ribbon-rail" aria-hidden="true">
                <span className="schedule__ribbon-dot" />
              </div>

              <article className="schedule__ribbon-card">
                <div className="schedule__ribbon-top">
                  <span className="schedule__number">
                    {number} / {String(schedule.length).padStart(2, '0')}
                  </span>
                  <time className="schedule__time" aria-label={item.time}>
                    <span className="schedule__clock" aria-hidden="true">
                      {clock}
                    </span>
                    <span className="schedule__period" aria-hidden="true">
                      {period}
                    </span>
                  </time>
                </div>

                <div className="schedule__ribbon-body">
                  <span className="schedule__marker" aria-hidden="true">
                    <ScheduleIcon name={item.icon} className="schedule__icon" />
                  </span>
                  <h3>{item.title}</h3>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
