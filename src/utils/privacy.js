// Privacy Guardian helpers: sensitive-text detection + canvas pixelation. Everything runs locally.

const PATTERNS = [
  {
    type: 'phone',
    // Indian mobile numbers and generic international numbers.
    regex: /(?:\+?\d{1,3}[\s-]?)?(?:\(?\d{2,5}\)?[\s-]?)?\d{3,5}[\s-]?\d{4,5}\b/g,
    validate: (m) => m.replace(/\D/g, '').length >= 10,
  },
  {
    type: 'email',
    regex: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g,
  },
  {
    type: 'address',
    regex:
      /\b(?:plot|flat|door|house|h\.?\s?no\.?|apartment|apt|street|st\.|road|rd\.|lane|colony|nagar|layout|block|sector|near|opp\.?|opposite)\b[^\n,.;]{0,50}|\b[1-9]\d{5}\b/gi,
  },
  {
    type: 'id',
    // Aadhaar-style 12-digit numbers and PAN-style IDs.
    regex: /\b\d{4}\s?\d{4}\s?\d{4}\b|\b[A-Z]{5}\d{4}[A-Z]\b/g,
  },
];

export function detectSensitive(text) {
  const findings = [];
  if (!text) return findings;
  const seen = new Set();
  PATTERNS.forEach((p) => {
    const matches = text.match(p.regex) || [];
    matches.forEach((m) => {
      const value = m.trim();
      if (!value) return;
      if (p.validate && !p.validate(value)) return;
      const key = `${p.type}:${value.toLowerCase()}`;
      if (seen.has(key)) return;
      seen.add(key);
      findings.push({ type: p.type, value });
    });
  });
  return findings;
}

export function maskValue(value) {
  if (!value) return '';
  if (value.length <= 4) return '••••';
  return `${value.slice(0, 2)}${'•'.repeat(Math.max(2, value.length - 4))}${value.slice(-2)}`;
}

/**
 * Pixelate a region of `src` (a canvas) onto `ctx`. Block size grows with the region height
 * so even large text becomes unreadable, then a soft tint is added.
 */
export function pixelateRegion(ctx, src, rect, blockSize = 12) {
  const x = Math.max(0, Math.round(rect.x));
  const y = Math.max(0, Math.round(rect.y));
  const w = Math.min(src.width - x, Math.round(rect.w));
  const h = Math.min(src.height - y, Math.round(rect.h));
  if (w < 2 || h < 2) return;

  const block = Math.max(blockSize, Math.round(h / 2.5));
  const sw = Math.max(1, Math.ceil(w / block));
  const sh = Math.max(1, Math.ceil(h / block));

  const tmp = document.createElement('canvas');
  tmp.width = sw;
  tmp.height = sh;
  const tctx = tmp.getContext('2d');
  tctx.drawImage(src, x, y, w, h, 0, 0, sw, sh);

  ctx.save();
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(tmp, 0, 0, sw, sh, x, y, w, h);
  ctx.fillStyle = 'rgba(79, 70, 229, 0.32)';
  ctx.fillRect(x, y, w, h);
  ctx.restore();
}

// Known sensitive zones on the bundled demo screenshot (600 x 640 px).
export const DEMO_ZONES = [
  { type: 'phone', x: 140, y: 306, w: 235, h: 40 },
  { type: 'email', x: 140, y: 400, w: 320, h: 34 },
  { type: 'address', x: 40, y: 524, w: 410, h: 34 },
];

export const DEMO_SCREEN_TEXT =
  'Call me: +91 90000 12345\nMail me: demo.person@mailbox.test\nI know where you stay: Plot 14, Lotus Lane, Demo Nagar';
