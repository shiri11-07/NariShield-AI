import { useEffect, useState } from 'react';

/**
 * useState that is mirrored to window.localStorage.
 * Everything NariShield stores stays on this device — nothing is ever sent anywhere.
 * `initialValue` may be a value or a lazy function (used to seed demo data once).
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) return JSON.parse(raw);
    } catch (err) {
      /* corrupted or unavailable storage: fall through to the initial value */
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      // Storage may be unavailable or full. Do not log application data from this hook.
    }
  }, [key, value]);

  return [value, setValue];
}
