import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, MOTION_OK } from '../lib/gsap';
import useMediaQuery from '../hooks/useMediaQuery';
import { ScheduleIcon } from './Ornaments';
import { schedule } from '../data/wedding';

const W = 400;
const H = 920;

// Wide screens: a broad wave down the centre with labels on alternating sides.
const WIDE = {
  d: 'M200 12 C 330 110, 70 230, 200 330 S 330 550, 200 650 S 70 860, 200 900',
  endX: 200,
};
// Phones: a gentle wave hugging the left, every label to the right of it.
const NARROW = {
  d: 'M70 12 C 120 110, 20 230, 70 330 S 120 550, 70 650 S 20 860, 70 900',
  endX: 70,
};

/**
 * A vine-like path winds down the page; each stop on the day's programme
 * sits on the path and fades in as it scrolls into view. The path itself is
 * "drawn" with the scroll position.
 */
export default function Schedule() {
  const ref = useRef(null);
  const pathRef = useRef(null);
  const [points, setPoints] = useState([]);
  const narrow = useMediaQuery('(max-width: 560px)');
  const shape = narrow ? NARROW : WIDE;

  // Place each stop along the path. On wide screens the label goes on
  // whichever side the path is *not* heading, so it never sits on the line.
  useLayoutEffect(() => {
    const path = pathRef.current;
    const total = path.getTotalLength();
    const n = schedule.length;
    const pts = schedule.map((_, i) => {
      const f = 0.07 + (i * 0.86) / Math.max(1, n - 1);
      const at = total * f;
      const p = path.getPointAtLength(at);
      const before = path.getPointAtLength(Math.max(0, at - 90));
      const after = path.getPointAtLength(Math.min(total, at + 90));
      const neighbourX = (before.x + after.x) / 2;
      const side = narrow ? 'right' : neighbourX > p.x ? 'left' : 'right';
      return { x: p.x, y: p.y, side };
    });
    setPoints(pts);
  }, [narrow]);

  // Scroll-driven drawing + reveals.
  useLayoutEffect(() => {
    if (!points.length) return undefined;
    const root = ref.current;
    const path = pathRef.current;
    const total = path.getTotalLength();

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set(path, { strokeDasharray: total, strokeDashoffset: total });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline',
            start: 'top 72%',
            end: 'bottom 55%',
            scrub: 0.6,
          },
        });

        gsap.from('.schedule__heading', {
          y: 24,
          opacity: 0,
          duration: 1,
          scrollTrigger: { trigger: root, start: 'top 80%', once: true },
        });

        gsap.utils.toArray('.stop', root).forEach((stop) => {
          const dot = stop.querySelector('.stop__dot');
          const body = stop.querySelector('.stop__body');
          gsap
            .timeline({
              scrollTrigger: { trigger: stop, start: 'top 72%', once: true },
            })
            .from(dot, { scale: 0, duration: 0.6, ease: 'back.out(2.5)' })
            .from(body, { x: stop.classList.contains('stop--left') ? -24 : 24, opacity: 0, duration: 0.9 }, '-=0.3');
        });

        gsap.from('.timeline__arrow', {
          opacity: 0,
          y: -10,
          scrollTrigger: { trigger: '.timeline__arrow', start: 'top 85%', once: true },
        });
      });
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(path, { strokeDasharray: 'none', strokeDashoffset: 0 });
      });
    }, root);

    return () => ctx.revert();
  }, [points]);

  return (
    <section id="schedule" ref={ref} className="section section--schedule">
      <h2 className="script-heading schedule__heading">Program Schedule</h2>

      <div className={`timeline ${narrow ? 'timeline--narrow' : ''}`} style={{ '--w': W, '--h': H }}>
        <svg className="timeline__svg" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          <path className="timeline__ghost" d={shape.d} />
          <path ref={pathRef} className="timeline__path" d={shape.d} />
          <path
            className="timeline__arrow"
            d={`M${shape.endX - 14} 882 L${shape.endX} 902 L${shape.endX + 14} 882`}
          />
        </svg>

        <ol className="timeline__stops">
          {points.map((p, i) => {
            const item = schedule[i];
            return (
              <li
                key={item.title}
                className={`stop stop--${p.side}`}
                style={{ '--x': `${(p.x / W) * 100}%`, '--y': `${(p.y / H) * 100}%` }}
              >
                <span className="stop__dot" aria-hidden="true" />
                <div className="stop__body">
                  <span className="stop__time">{item.time}</span>
                  <span className="stop__title">{item.title}</span>
                  <ScheduleIcon name={item.icon} className="stop__icon" />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
