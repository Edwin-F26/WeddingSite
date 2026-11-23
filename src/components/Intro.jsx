import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, MOTION_OK } from '../lib/gsap';
import Petals from './Petals';
import { couple, event } from '../data/wedding';

/**
 * Full-screen theatrical landing. Two wine curtains draw apart to reveal the
 * invitation underneath. `onReveal` starts the page entrance while the
 * curtains are still moving; `onDone` removes this overlay when they clear.
 */
export default function Intro({ onReveal, onDone }) {
  const rootRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const valanceRef = useRef(null);
  const contentRef = useRef(null);
  const [opening, setOpening] = useState(false);

  // Let the title emerge from darkness after the curtains settle.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline()
          .from([leftRef.current, rightRef.current], {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
          })
          .from(
            contentRef.current.children,
            {
              y: 20,
              opacity: 0,
              stagger: 0.12,
              duration: 0.9,
              ease: 'power3.out',
            },
            '-=0.25',
          );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const open = () => {
    if (opening) return;
    setOpening(true);

    const reduced = !window.matchMedia(MOTION_OK).matches;
    if (reduced) {
      onReveal();
      onDone();
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power4.inOut' },
      onComplete: onDone,
    });

    tl.to(contentRef.current, {
      opacity: 0,
      scale: 0.96,
      filter: 'blur(8px)',
      duration: 0.55,
      ease: 'power2.in',
    })
      .add(onReveal, 0.35)
      .to(
        leftRef.current,
        { xPercent: -104, rotationY: 7, duration: 2.1 },
        0.25,
      )
      .to(
        rightRef.current,
        { xPercent: 104, rotationY: -7, duration: 2.1 },
        0.25,
      )
      .to(
        valanceRef.current,
        { yPercent: -110, opacity: 0, duration: 1.5 },
        0.45,
      )
      .to(rootRef.current, { opacity: 0, duration: 0.45, ease: 'power2.out' }, '-=0.3');
  };

  return (
    <div ref={rootRef} className={`intro ${opening ? 'is-opening' : ''}`}>
      <div className="intro__bg" aria-hidden="true">
        <span className="intro__wash intro__wash--a" />
        <span className="intro__wash intro__wash--b" />
        <span className="intro__wash intro__wash--c" />
      </div>
      <Petals count={12} className="intro__petals" />

      <div className="curtain-stage" aria-hidden="true">
        <div ref={leftRef} className="curtain curtain--left">
          <span className="curtain__edge" />
        </div>
        <div ref={rightRef} className="curtain curtain--right">
          <span className="curtain__edge" />
        </div>
        <div ref={valanceRef} className="curtain__valance" />
      </div>

      <div ref={contentRef} className="intro__content">
        <span className="intro__eyebrow">An evening in Miami</span>
        <img
          className="intro__wordmark"
          src="/images/logo-wordmark-light.png"
          alt={`${couple.first} and ${couple.second}`}
          width="1125"
          height="153"
        />
        <span className="intro__date">{event.dateStamp}</span>
        <button
          type="button"
          className="intro__button"
          onClick={open}
          aria-label={`Draw back the curtains for ${couple.first} and ${couple.second}'s invitation`}
          disabled={opening}
        >
          <span>Draw the curtains</span>
          <span className="intro__button-mark" aria-hidden="true">✦</span>
        </button>
      </div>
    </div>
  );
}
