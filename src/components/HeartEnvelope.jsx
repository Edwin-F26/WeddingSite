import { forwardRef } from 'react';
import { HeartLace } from './Ornaments';

/**
 * A paper envelope with a lace heart card tucked inside.
 *
 * `tone` picks the paper color ("blush" or "sage").
 * Refs are exposed for the parts GSAP needs to animate: the whole envelope,
 * the flap, and the card.
 */
const HeartEnvelope = forwardRef(function HeartEnvelope(
  { tone = 'blush', children, className = '', flapRef, cardRef, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={`env env--${tone} ${className}`} {...rest}>
      <div className="env__paper">
        <div className="env__back" />
        <div className="env__liner" />
        <div ref={cardRef} className="env__card">
          <HeartLace className="env__heart" />
          <div className="env__card-text">{children}</div>
        </div>
        {/* Three separate panels: nesting clipped pseudo-elements inside a
            clipped parent lets them paint outside the parent's clip. */}
        <div className="env__pocket env__pocket--left" />
        <div className="env__pocket env__pocket--right" />
        <div className="env__pocket env__pocket--bottom" />
        <div ref={flapRef} className="env__flap" />
        <span className="env__seal" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              d="M12 21 C 6 16, 2 12, 2 7.5 C 2 4.5, 4.5 2, 7.5 2 C 9.5 2, 11 3, 12 4.5 C 13 3, 14.5 2, 16.5 2 C 19.5 2, 22 4.5, 22 7.5 C 22 12, 18 16, 12 21 Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </div>
    </div>
  );
});

export default HeartEnvelope;
