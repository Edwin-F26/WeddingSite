import { useEffect, useState } from 'react';
import { couple } from '../data/wedding';

const LINKS = [
  { href: '#invitation', label: 'Invitation' },
  { href: '#location', label: 'Location' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#dress-code', label: 'Dress Code' },
  { href: '#rsvp', label: 'RSVP' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <a href="#invitation" className="nav__brand">
        <img
          className="nav__monogram"
          src="/images/logo-monogram.png"
          alt={`${couple.first} & ${couple.second} monogram`}
          width="907"
          height="405"
        />
      </a>
      <nav aria-label="Sections">
        <ul className="nav__links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
