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
      <address className="location__address" data-reveal>
        {venue.address}
      </address>
      <div className="location__actions" data-reveal>
        <a
          className="btn btn--olive"
          href={venue.websiteUrl}
          target="_blank"
          rel="noreferrer"
        >
          View Venue
        </a>
        <a
          className="btn btn--olive"
          href={venue.mapUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open Map
        </a>
      </div>
    </section>
  );
}
