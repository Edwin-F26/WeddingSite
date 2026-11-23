import { useLayoutEffect, useRef } from 'react';
import { gsap, MOTION_OK } from '../lib/gsap';
import useReveal from '../hooks/useReveal';
import { dressCode } from '../data/wedding';

export default function DressCode() {
  const ref = useReveal();
  const swatchesRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from('.swatch', {
          scale: 0,
          opacity: 0,
          y: 16,
          stagger: 0.08,
          duration: 0.8,
          ease: 'back.out(2)',
          scrollTrigger: { trigger: swatchesRef.current, start: 'top 85%', once: true },
        });
      });
    }, swatchesRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="dress-code" ref={ref} className="section section--dress">
      <h2 className="script-heading" data-reveal>
        Dress Code
      </h2>
      <div className="dress__copy">
        <p className="dress__intro" data-reveal>
          <span>Formal Attire</span>
          {dressCode.intro}
        </p>

        <div className="dress__guides">
          {[
            ['Women', dressCode.women],
            ['Men', dressCode.men],
            ['Avoid', dressCode.avoid],
          ].map(([title, items]) => (
            <article key={title} className="dress__guide" data-reveal>
              <h3>{title}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="dress__note" data-reveal>
          {dressCode.note}
        </p>
      </div>

      <ul ref={swatchesRef} className="swatches" aria-label="Suggested colour palette">
        {dressCode.palette.map((c) => (
          <li key={c.hex} className="swatch" style={{ '--swatch': c.hex }}>
            <span className="swatch__dot" />
            <span className="swatch__name">{c.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
