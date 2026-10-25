export function uid(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

export function daysAgo(n, hour = 10, minute = 0) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

export function hoursAgo(n) {
  return new Date(Date.now() - n * 3600 * 1000).toISOString();
}

export function formatDate(iso, lang = 'en', withTime = true) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  const opts = withTime
    ? { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }
    : { day: 'numeric', month: 'short', year: 'numeric' };
  try {
    return new Intl.DateTimeFormat(lang === 'te' ? 'te-IN' : 'en-IN', opts).format(d);
  } catch (err) {
    return d.toLocaleString();
  }
}

export function toLocalInputValue(iso) {
  const d = iso ? new Date(iso) : new Date();
  const pad = (x) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function clamp(n, lo, hi) {
  return Math.min(hi, Math.max(lo, n));
}
