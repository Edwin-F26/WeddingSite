import useReveal from '../hooks/useReveal';
import { Bow } from './Ornaments';
import { venue } from '../data/wedding';

export default function Location() {
  const ref = useReveal();

  return (
    <section id="location" ref={ref} className="section section--location">
      <p className="eyebrow" data-reveal>
        Location
      </p>
      <h2 className="section__title" data-reveal>
        {venue.name}
        {venue.subtitle && <span className="section__title-sub">{venue.subtitle}</span>}
      </h2>
      <Bow className="section__bow" data-reveal />
      <p className="section__lead" data-reveal>
        {venue.description}
      </p>
      <a
        className="btn btn--olive"
        href={venue.mapUrl}
        target="_blank"
        rel="noreferrer"
        data-reveal
      >
        Open Map
      </a>
    </section>
  );
}
