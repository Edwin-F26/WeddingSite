import { useLayoutEffect, useRef } from 'react';
import { gsap, MOTION_OK } from '../lib/gsap';
import useReveal from '../hooks/useReveal';
import { HeartLace } from './Ornaments';
import RsvpForm from './RsvpForm';
import { supabaseConfigured } from '../lib/supabase';
import { rsvp } from '../data/wedding';

export default function Rsvp() {
  const ref = useReveal();
  const heartRef = useRef(null);

  // The oversized lace heart rises into view and responds subtly to the
  // pointer, retaining the tactile feel without the previous envelope.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const el = heartRef.current;
        gsap.fromTo(
          el,
          { scale: 0.72, opacity: 0, rotation: -5 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 1.25,
            ease: 'back.out(1.35)',
            scrollTrigger: { trigger: el, start: 'top 78%', once: true },
          },
        );

        const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6 });
        const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6 });
        const move = (e) => {
          const r = el.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 8);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
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
    }, ref);
    return () => ctx.revert();
  }, [ref]);

  // With Supabase configured the form lives on the page; otherwise the
  // heart and button fall back to the external RSVP link.
  const heart = (
    <div ref={heartRef} className="rsvp__heart">
      <HeartLace className="rsvp__heart-art" />
      <div className="rsvp__heart-copy">
        <span className="rsvp__heart-title">Kindly Respond</span>
        <span className="rsvp__heart-small">
        by {rsvp.deadline},
          <br />
          {supabaseConfigured ? 'using the form below' : <u>using the RSVP here</u>}
        </span>
      </div>
    </div>
  );

  return (
    <section id="rsvp" ref={ref} className="section section--rsvp">
      {supabaseConfigured ? (
        <div className="rsvp__heart-stage" data-reveal>
          {heart}
        </div>
      ) : (
        <a
          className="rsvp__heart-stage"
          href={rsvp.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`RSVP by ${rsvp.deadline}`}
          data-reveal
        >
          {heart}
        </a>
      )}

      <p className="rsvp__note" data-reveal>
        We would love to know if you can join us. Please respond by{' '}
        <strong>{rsvp.deadline}</strong>.
      </p>

      {supabaseConfigured ? (
        <div data-reveal className="rsvp__form-wrap">
          <RsvpForm />
        </div>
      ) : (
        <a className="btn btn--wine" href={rsvp.url} target="_blank" rel="noreferrer" data-reveal>
          RSVP
        </a>
      )}
    </section>
  );
}
