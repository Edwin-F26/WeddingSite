import useCountdown from '../hooks/useCountdown';
import { event } from '../data/wedding';

const pad = (n) => String(n).padStart(2, '0');

export default function Countdown() {
  const { done, days, hours, minutes, seconds } = useCountdown(event.dateISO);

  if (done) {
    return (
      <p className="countdown countdown--done" data-reveal>
        Today is the day!
      </p>
    );
  }

  const parts = [
    ['Days', days],
    ['Hours', pad(hours)],
    ['Minutes', pad(minutes)],
    ['Seconds', pad(seconds)],
  ];

  return (
    <div className="countdown" data-reveal aria-label="Countdown to the wedding">
      {parts.map(([label, value]) => (
        <div key={label} className="countdown__cell">
          <span className="countdown__value">{value}</span>
          <span className="countdown__label">{label}</span>
        </div>
      ))}
    </div>
  );
}
