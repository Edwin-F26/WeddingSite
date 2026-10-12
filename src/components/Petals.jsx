import { useLayoutEffect, useMemo, useRef } from 'react';
import { gsap, MOTION_OK } from '../lib/gsap';
import { Petal } from './Ornaments';

const TONES = ['var(--blush)', 'var(--blush-deep)', 'var(--sage)', 'var(--sage-soft)'];

/**
 * A field of slowly drifting petals. Purely decorative.
 * `count` petals are scattered and each gets its own looping GSAP tween.
 */
export default function Petals({ count = 16, className = '' }) {
  const ref = useRef(null);

  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 61) % 100}%`,
        top: `${(i * 37 + 11) % 100}%`,
        size: 10 + ((i * 7) % 14),
        color: TONES[i % TONES.length],
        opacity: 0.45 + ((i * 13) % 40) / 100,
      })),
    [count],
  );

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const nodes = ref.current.querySelectorAll('.petal');
      nodes.forEach((node) => {
        const drift = gsap.utils.random(40, 110);
        gsap.set(node, { rotation: gsap.utils.random(-60, 60) });
        gsap.to(node, {
          y: `+=${drift}`,
          x: `+=${gsap.utils.random(-50, 50)}`,
          rotation: `+=${gsap.utils.random(-90, 90)}`,
          duration: gsap.utils.random(9, 16),
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: gsap.utils.random(-10, 0),
        });
      });
    });
    return () => mm.revert();
  }, [count]);

  return (
    <div ref={ref} className={`petals ${className}`} aria-hidden="true">
      {petals.map((p) => (
        <Petal
          key={p.id}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            color: p.color,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
