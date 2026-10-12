import { useEffect, useState } from 'react';

function diff(target) {
  const ms = Math.max(0, target - Date.now());
  const s = Math.floor(ms / 1000);
  return {
    done: ms === 0,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

export default function useCountdown(dateISO) {
  const target = new Date(dateISO).getTime();
  const [value, setValue] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setValue(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return value;
}
