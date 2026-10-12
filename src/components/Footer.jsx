import { couple, event } from '../data/wedding';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__ribbon" aria-hidden="true">
        <span className="footer__knot" />
      </div>
      <div className="footer__inner">
        <img
          className="footer__wordmark"
          src="/images/logo-wordmark-light.png"
          alt={`${couple.first} & ${couple.second}`}
          width="1125"
          height="153"
        />
        <p className="footer__date">
          {event.dateLong} &middot; {event.city}
        </p>
        <p className="footer__small">
          With love, {couple.first} &amp; {couple.second}
        </p>
      </div>
    </footer>
  );
}
