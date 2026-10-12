/* Hand-drawn style SVG ornaments. All use currentColor so they inherit theme. */

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

/** Horizontal divider with curled ends and a small central rosette. */
export function Flourish({ className = '', width = 260 }) {
  return (
    <svg
      className={`orn orn--flourish ${className}`}
      viewBox="0 0 260 28"
      width={width}
      aria-hidden="true"
    >
      <g {...stroke}>
        <path d="M6 14 H104" />
        <path d="M156 14 H254" />
        <path d="M10 14 c-4 -4 -4 -10 2 -10 s6 8 -2 10" />
        <path d="M250 14 c4 -4 4 -10 -2 -10 s-6 8 2 10" />
        <path d="M98 14 c6 -5 10 -5 14 0 c-4 5 -8 5 -14 0z" />
        <path d="M162 14 c-6 -5 -10 -5 -14 0 c4 5 8 5 14 0z" />
        <path d="M130 5 c-3 3 -3 6 0 9 c3 -3 3 -6 0 -9z" />
        <path d="M130 23 c-3 -3 -3 -6 0 -9 c3 3 3 6 0 9z" />
        <path d="M121 14 c3 -3 6 -3 9 0 c-3 3 -6 3 -9 0z" />
        <path d="M139 14 c-3 -3 -6 -3 -9 0 c3 3 6 3 9 0z" />
      </g>
      <circle cx="130" cy="14" r="1.6" fill="currentColor" />
    </svg>
  );
}

/** Short divider used between small text blocks. */
export function Rule({ className = '' }) {
  return (
    <svg
      className={`orn orn--rule ${className}`}
      viewBox="0 0 120 10"
      width="120"
      aria-hidden="true"
    >
      <g {...stroke}>
        <path d="M2 5 H48" />
        <path d="M72 5 H118" />
        <path d="M60 1 l4 4 -4 4 -4 -4z" />
      </g>
    </svg>
  );
}

/** Corner flourish for the invitation frame. Rotate via CSS for other corners. */
export function Corner({ className = '' }) {
  return (
    <svg
      className={`orn orn--corner ${className}`}
      viewBox="0 0 60 60"
      width="60"
      aria-hidden="true"
    >
      <g {...stroke}>
        <path d="M4 56 V22 C4 12 12 4 22 4 H56" />
        <path d="M12 56 V26 C12 18 18 12 26 12 H56" opacity="0.5" />
        <path d="M14 14 c6 0 10 4 10 10 c-6 0 -10 -4 -10 -10z" />
        <path d="M30 6 c0 5 -3 8 -8 8" />
        <path d="M6 30 c5 0 8 -3 8 -8" />
      </g>
      <circle cx="14" cy="14" r="1.6" fill="currentColor" />
    </svg>
  );
}

/** Ribbon bow in line-art. */
export function Bow({ className = '', width = 96 }) {
  return (
    <svg
      className={`orn orn--bow ${className}`}
      viewBox="0 0 96 44"
      width={width}
      aria-hidden="true"
    >
      <g {...stroke}>
        <path d="M48 20 C 38 6, 14 4, 10 14 C 6 24, 30 30, 48 20z" />
        <path d="M48 20 C 58 6, 82 4, 86 14 C 90 24, 66 30, 48 20z" />
        <path d="M48 20 C 44 26, 40 34, 34 41" />
        <path d="M48 20 C 52 26, 56 34, 62 41" />
        <path d="M44 17 c2 -2 6 -2 8 0 c2 3 1 6 -4 7 c-5 -1 -6 -4 -4 -7z" />
        <path d="M22 16 c6 0 14 2 20 4" opacity="0.5" />
        <path d="M74 16 c-6 0 -14 2 -20 4" opacity="0.5" />
      </g>
    </svg>
  );
}

/** Two entwined rings with a sprig – replaces the hands illustration. */
export function Rings({ className = '', width = 220 }) {
  return (
    <svg
      className={`orn orn--rings ${className}`}
      viewBox="0 0 220 150"
      width={width}
      aria-hidden="true"
    >
      <g {...stroke}>
        <circle cx="92" cy="86" r="40" />
        <circle cx="92" cy="86" r="34" opacity="0.5" />
        <circle cx="134" cy="86" r="40" />
        <circle cx="134" cy="86" r="34" opacity="0.5" />
        <path d="M134 40 l-7 6 h14z M127 46 l7 8 7 -8" />
        <path d="M30 120 C 60 100, 70 70, 60 36" />
        <path d="M56 50 c-10 -2 -16 2 -20 10 c8 2 16 -2 20 -10z" />
        <path d="M60 70 c10 -2 16 2 20 10 c-8 2 -16 -2 -20 -10z" />
        <path d="M50 96 c-10 -2 -16 2 -20 10 c8 2 16 -2 20 -10z" />
        <path d="M190 120 C 160 100, 150 70, 160 36" />
        <path d="M164 50 c10 -2 16 2 20 10 c-8 2 -16 -2 -20 -10z" />
        <path d="M160 70 c-10 -2 -16 2 -20 10 c8 2 16 -2 20 -10z" />
        <path d="M170 96 c10 -2 16 2 20 10 c-8 2 -16 -2 -20 -10z" />
      </g>
      <circle cx="60" cy="36" r="1.8" fill="currentColor" />
      <circle cx="160" cy="36" r="1.8" fill="currentColor" />
    </svg>
  );
}

const HEART_PATH =
  'M50 88 C 22 68, 2 48, 2 28 C 2 13, 13 3, 26 3 C 37 3, 46 10, 50 19 C 54 10, 63 3, 74 3 C 87 3, 98 13, 98 28 C 98 48, 78 68, 50 88 Z';

/** Lace-edged heart used as the card inside the envelopes. */
export function HeartLace({ className = '' }) {
  return (
    <svg
      className={`orn orn--heart ${className}`}
      viewBox="0 0 100 92"
      aria-hidden="true"
    >
      <path
        d={HEART_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeDasharray="0.1 5.2"
        opacity="0.55"
      />
      <path d={HEART_PATH} fill="var(--cream)" stroke="currentColor" strokeWidth="0.8" />
      <path
        d={HEART_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeDasharray="1.2 2"
        transform="translate(50 46) scale(0.9) translate(-50 -46)"
        opacity="0.8"
      />
    </svg>
  );
}

/** Single petal used for floating background particles. */
export function Petal({ className = '', style }) {
  return (
    <svg
      className={`petal ${className}`}
      viewBox="0 0 24 32"
      aria-hidden="true"
      style={style}
    >
      <path
        d="M12 1 C 20 8, 24 18, 16 29 C 14 31, 10 31, 8 29 C 0 18, 4 8, 12 1 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ---- schedule icons ---- */

function Bouquet() {
  return (
    <g {...stroke}>
      <path d="M24 44 l-4 -16 h8z" />
      <path d="M20 30 c-8 -2 -12 -8 -10 -16 c8 0 12 6 10 16z" />
      <path d="M28 30 c8 -2 12 -8 10 -16 c-8 0 -12 6 -10 16z" />
      <circle cx="24" cy="14" r="5" />
      <circle cx="14" cy="22" r="3.5" />
      <circle cx="34" cy="22" r="3.5" />
      <path d="M18 34 l12 0" />
    </g>
  );
}

function RingsIcon() {
  return (
    <g {...stroke}>
      <circle cx="19" cy="28" r="11" />
      <circle cx="30" cy="28" r="11" />
      <path d="M30 12 l-4 4 h8z M26 16 l4 5 4 -5" />
    </g>
  );
}

function Glasses() {
  return (
    <g {...stroke}>
      <path d="M8 6 h12 l-2 14 c0 4 -3 6 -4 6 s-4 -2 -4 -6z" />
      <path d="M14 26 v12 M9 38 h10" />
      <path d="M28 6 h12 l-2 14 c0 4 -3 6 -4 6 s-4 -2 -4 -6z" />
      <path d="M34 26 v12 M29 38 h10" />
      <path d="M9 12 h10 M29 12 h10" opacity="0.5" />
    </g>
  );
}

function Dinner() {
  return (
    <g {...stroke}>
      <path d="M6 34 h36" />
      <path d="M10 32 c0 -10 7 -18 14 -18 s14 8 14 18" />
      <path d="M24 14 v-3 M22 9 h4" />
      <path d="M4 40 h40" opacity="0.5" />
    </g>
  );
}

function Moon() {
  return (
    <g {...stroke}>
      <path d="M30 8 a14 14 0 1 0 10 24 a11 11 0 0 1 -10 -24z" />
      <path d="M12 12 l1 3 3 1 -3 1 -1 3 -1 -3 -3 -1 3 -1z" />
      <path d="M10 30 l0.7 2 2 0.7 -2 0.7 -0.7 2 -0.7 -2 -2 -0.7 2 -0.7z" />
    </g>
  );
}

const ICONS = { bouquet: Bouquet, rings: RingsIcon, glasses: Glasses, dinner: Dinner, moon: Moon };

export function ScheduleIcon({ name, size = 48, className = '' }) {
  const Icon = ICONS[name] ?? Bouquet;
  return (
    <svg
      className={`orn orn--icon ${className}`}
      viewBox="0 0 48 48"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <Icon />
    </svg>
  );
}
