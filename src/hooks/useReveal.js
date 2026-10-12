import { useLayoutEffect, useRef } from 'react';
import { gsap, MOTION_OK } from '../lib/gsap';

/**
 * Fades + lifts every `[data-reveal]` descendant into view as the section
 * scrolls in. Elements with the same `data-reveal` group stagger together.
 */
export default function useReveal(deps = []) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const items = gsap.utils.toArray('[data-reveal]', el);
        if (!items.length) return;
        gsap.from(items, {
          y: 28,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 78%',
            once: true,
          },
        });
      });
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
