import { useLayoutEffect, useRef } from 'react';
import { gsap, MOTION_OK, REDUCED } from '../lib/gsap';
import useReveal from '../hooks/useReveal';
import HeartEnvelope from './HeartEnvelope';
import { rsvp } from '../data/wedding';

export default function Rsvp() {
  const ref = useReveal();
  const envRef = useRef(null);
  const flapRef = useRef(null);
  const cardRef = useRef(null);

  // Seal breaks, flap opens, and the heart card rises out as the envelope
  // scrolls into view. The whole thing leans gently toward the pointer.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({
            scrollTrigger: { trigger: envRef.current, start: 'top 70%', once: true },
          })
          .to(envRef.current.querySelector('.env__seal'), {
            scale: 0,
            opacity: 0,
            duration: 0.35,
            ease: 'back.in(2)',
          })
          .fromTo(
            flapRef.current,
            { rotateX: 0 },
            { rotateX: -160, duration: 1.2, ease: 'power2.inOut' },
          )
          .set(flapRef.current, { zIndex: 0 }, 0.9)
          .to(cardRef.current, { yPercent: -55, duration: 1, ease: 'power2.out' }, '-=0.5');

        const el = envRef.current;
        const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6 });
        const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6 });
        const move = (e) => {
          const r = el.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 14);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 14);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', leave);
        return () => {
          el.removeEventListener('pointermove', move);
          el.removeEventListener('pointerleave', leave);
        };
      });
      mm.add(REDUCED, () => {
        // Static "already open" state.
        gsap.set(envRef.current.querySelector('.env__seal'), { opacity: 0 });
        gsap.set(flapRef.current, { rotateX: -160, zIndex: 0 });
        gsap.set(cardRef.current, { yPercent: -55 });
      });
    }, ref);
    return () => ctx.revert();
  }, [ref]);

  return (
    <section id="rsvp" ref={ref} className="section section--rsvp">
      <a
        className="rsvp__link"
        href={rsvp.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`RSVP by ${rsvp.deadline}`}
        data-reveal
      >
        <HeartEnvelope ref={envRef} flapRef={flapRef} cardRef={cardRef} tone="sage">
          <span className="env__script">Kindly Respond</span>
          <span className="env__small">
            by {rsvp.deadline},
            <br />
            using the <u>RSVP here</u>
          </span>
        </HeartEnvelope>
      </a>
      <p className="rsvp__note" data-reveal>
        We would love to know if you can join us. Please respond by{' '}
        <strong>{rsvp.deadline}</strong>.
      </p>
      <a className="btn btn--wine" href={rsvp.url} target="_blank" rel="noreferrer" data-reveal>
        RSVP
      </a>
    </section>
  );
}
