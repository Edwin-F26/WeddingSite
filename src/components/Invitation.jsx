import { useLayoutEffect, useRef } from 'react';
import { gsap, MOTION_OK } from '../lib/gsap';
import { Corner, Flourish, Rings, Rule } from './Ornaments';
import Countdown from './Countdown';
import Petals from './Petals';
import { couple, event, scripture } from '../data/wedding';

/**
 * The framed invitation card. `active` becomes true once the envelope has
 * been opened, which triggers the entrance sequence.
 */
export default function Invitation({ active }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (!active) return undefined;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('.card', { y: 50, opacity: 0, scale: 0.97, duration: 1.2 })
          .from('.card__frame-line', { scale: 0.96, opacity: 0, duration: 1 }, '-=0.9')
          .from('.card .orn--corner', { scale: 0, opacity: 0, stagger: 0.08, duration: 0.7 }, '-=0.8')
          .from(
            '.card [data-reveal]',
            { y: 24, opacity: 0, stagger: 0.1, duration: 0.9 },
            '-=0.5',
          )
          .fromTo(
            '.orn--rings path, .orn--rings circle',
            { strokeDasharray: 320, strokeDashoffset: 320 },
            { strokeDashoffset: 0, stagger: 0.05, duration: 1.4, ease: 'power2.inOut' },
            '-=1',
          );

        // Subtle parallax tilt following the pointer.
        const card = ref.current.querySelector('.card');
        const xTo = gsap.quickTo(card, 'rotationY', { duration: 0.8, ease: 'power3' });
        const yTo = gsap.quickTo(card, 'rotationX', { duration: 0.8, ease: 'power3' });
        const onMove = (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          xTo(px * 6);
          yTo(-py * 6);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };
        card.addEventListener('pointermove', onMove);
        card.addEventListener('pointerleave', onLeave);
        return () => {
          card.removeEventListener('pointermove', onMove);
          card.removeEventListener('pointerleave', onLeave);
        };
      });
    }, ref);
    return () => ctx.revert();
  }, [active]);

  return (
    <section id="invitation" ref={ref} className="hero">
      <Petals count={12} className="hero__petals" />

      <article className="card" aria-labelledby="couple-names">
        <div className="card__frame-line" aria-hidden="true" />
        <Corner className="card__corner card__corner--tl" />
        <Corner className="card__corner card__corner--tr" />
        <Corner className="card__corner card__corner--bl" />
        <Corner className="card__corner card__corner--br" />

        <div className="card__inner">
          <img
            className="card__monogram"
            src="/images/logo-monogram.png"
            alt=""
            width="907"
            height="405"
            data-reveal
          />
          <Flourish className="card__flourish" data-reveal />

          <h1 id="couple-names" className="card__names" data-reveal>
            <span className="card__name">{couple.first}</span>
            <span className="card__amp">&amp;</span>
            <span className="card__name">{couple.second}</span>
          </h1>
          <p className="card__tag" data-reveal>
            are getting married!
          </p>

          <Rule className="card__rule" data-reveal />

          <p className="card__date" data-reveal>
            <span className="card__date-stamp">{event.dateStamp}</span>
            <span className="card__date-long">{event.dateLong}</span>
            <span className="card__city">{event.city}</span>
          </p>

          <Rings className="card__art" data-reveal />

          <blockquote className="card__verse" data-reveal>
            <p>{scripture.text}</p>
            <cite>{scripture.reference}</cite>
          </blockquote>

          <a className="btn btn--sage" href="#details" data-reveal>
            See the details
          </a>

          <Flourish className="card__flourish card__flourish--bottom" data-reveal />
        </div>
      </article>

      <Countdown />
    </section>
  );
}
