import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, MOTION_OK } from '../lib/gsap';
import HeartEnvelope from './HeartEnvelope';
import Petals from './Petals';
import { couple, event } from '../data/wedding';

/**
 * Full-screen landing. A sealed envelope floats in the middle; clicking it
 * plays the opening sequence. `onReveal` fires as the overlay starts to fade
 * (so the page beneath can animate in under it) and `onDone` when it is gone.
 */
export default function Intro({ onReveal, onDone }) {
  const rootRef = useRef(null);
  const envRef = useRef(null);
  const flapRef = useRef(null);
  const cardRef = useRef(null);
  const hintRef = useRef(null);
  const brandRef = useRef(null);
  const idleRef = useRef(null);
  const [opening, setOpening] = useState(false);

  // Entrance + idle float.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(envRef.current, {
          y: 40,
          opacity: 0,
          scale: 0.92,
          duration: 1.2,
          ease: 'power3.out',
        });
        gsap.from(hintRef.current, { opacity: 0, y: 10, delay: 0.8, duration: 1 });
        gsap.from(brandRef.current, { opacity: 0, y: -10, delay: 0.5, duration: 1 });
        idleRef.current = gsap.to(envRef.current, {
          y: -8,
          rotation: 0.6,
          duration: 2.8,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: 1.2,
        });
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

    idleRef.current?.kill();

    const env = envRef.current;
    const flap = flapRef.current;
    const card = cardRef.current;
    const paper = env.querySelector('.env__paper');
    const seal = env.querySelector('.env__seal');

    // Where the card should end up: the middle of the viewport.
    const rect = card.getBoundingClientRect();
    const toX = window.innerWidth / 2 - (rect.left + rect.width / 2);
    const toY = window.innerHeight / 2 - (rect.top + rect.height / 2);

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: onDone,
    });

    tl.to(env, { y: 0, rotation: 0, duration: 0.3, ease: 'power1.out' })
      .to([hintRef.current, brandRef.current], { opacity: 0, y: -6, duration: 0.3 }, '<')
      // 1. the wax seal breaks, then the flap swings open and tucks behind
      .to(seal, { scale: 0, opacity: 0, duration: 0.3, ease: 'back.in(2)' })
      .to(flap, { rotateX: -180, duration: 0.75 }, '-=0.05')
      .set(flap, { zIndex: 0 }, '-=0.4')
      // 2. the card lifts out of the envelope
      .to(card, { y: '-62%', duration: 0.8, ease: 'power2.out' }, '-=0.2')
      // 3. card floats to centre while the envelope falls away
      .to(
        card,
        { x: toX, y: toY, scale: 1.6, duration: 1.1, ease: 'power3.inOut' },
        '-=0.15',
      )
      .to(
        paper,
        { y: 260, rotation: -6, opacity: 0, duration: 0.9, ease: 'power2.in' },
        '<',
      )
      // 4. everything dissolves into the invitation, which starts animating
      //    in underneath as soon as the overlay begins to fade
      .to(card, { scale: 1.75, opacity: 0, duration: 0.6, ease: 'power2.in' }, '+=0.25')
      .add(onReveal, '-=0.5')
      .to(rootRef.current, { opacity: 0, duration: 0.9, ease: 'power2.inOut' }, '<');
  };

  return (
    <div ref={rootRef} className={`intro ${opening ? 'is-opening' : ''}`}>
      <div className="intro__bg" aria-hidden="true">
        <span className="intro__wash intro__wash--a" />
        <span className="intro__wash intro__wash--b" />
        <span className="intro__wash intro__wash--c" />
      </div>
      <Petals count={18} className="intro__petals" />

      <button
        type="button"
        className="intro__button"
        onClick={open}
        aria-label={`Open the invitation from ${couple.first} and ${couple.second}`}
        disabled={opening}
      >
        <img
          ref={brandRef}
          className="intro__wordmark"
          src="/images/logo-wordmark.png"
          alt=""
          width="1125"
          height="153"
        />
        <HeartEnvelope ref={envRef} flapRef={flapRef} cardRef={cardRef} tone="blush">
          <span className="env__script">You Are Invited</span>
          <span className="env__stamp">{event.dateStamp}</span>
        </HeartEnvelope>
        <span ref={hintRef} className="intro__hint">
          Click to open
        </span>
      </button>
    </div>
  );
}
