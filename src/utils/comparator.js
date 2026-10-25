import { loadImage } from './imageTools';

// Rule-based fake-profile comparison. No machine learning: string distance, token overlap
// and a tiny perceptual "average hash" of the two images.

const HOMOGLYPHS = { 0: 'o', 1: 'l', '!': 'i', $: 's', '@': 'a', 3: 'e', 5: 's', 7: 't' };

export function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j += 1) dp[0][j] = j;
  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

export function stringSimilarity(a, b) {
  if (!a && !b) return 0;
  const longest = Math.max(a.length, b.length);
  if (!longest) return 0;
  return 1 - levenshtein(a, b) / longest;
}

function normalizeUsername(u) {
  const lower = (u || '').toLowerCase().replace(/^@/, '');
  const deglyph = lower
    .split('')
    .map((c) => HOMOGLYPHS[c] || c)
    .join('');
  return { raw: lower, core: deglyph.replace(/[._\-\s]/g, '') };
}

const SUFFIX_WORDS = ['official', 'real', 'original', 'new', 'backup', 'private', 'fanpage', 'verified', 'the'];

export function compareUsernames(genuine, suspect) {
  const g = normalizeUsername(genuine);
  const s = normalizeUsername(suspect);
  if (!g.core || !s.core) return { score: 0, flags: [] };

  let score = stringSimilarity(g.core, s.core);
  const flags = [];

  if (g.raw === s.raw) {
    flags.push('identical');
    score = 1;
  } else {
    if (s.core.includes(g.core) && s.core !== g.core) {
      flags.push('contains_original');
      score = Math.max(score, 0.85);
    }
    if (g.core === s.core && g.raw !== s.raw) {
      flags.push('lookalike_chars');
      score = Math.max(score, 0.95);
    }
    const extra = s.core.replace(g.core, '');
    if (SUFFIX_WORDS.some((w) => extra.includes(w))) flags.push('adds_official');
    if (/\d{2,}$/.test(s.raw) && !/\d{2,}$/.test(g.raw)) flags.push('adds_digits');
    if (/[._]{2,}|[._]$/.test(s.raw) && !/[._]$/.test(g.raw)) flags.push('extra_separators');
  }
  return { score: Math.min(1, score), flags };
}

function tokens(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

function bigrams(text) {
  const s = (text || '').toLowerCase().replace(/\s+/g, ' ').trim();
  const out = [];
  for (let i = 0; i < s.length - 1; i += 1) out.push(s.slice(i, i + 2));
  return out;
}

export function compareBios(genuine, suspect) {
  if (!genuine?.trim() || !suspect?.trim()) return { score: 0, hasBoth: false };
  const ta = new Set(tokens(genuine));
  const tb = new Set(tokens(suspect));
  const inter = [...ta].filter((t) => tb.has(t)).length;
  const union = new Set([...ta, ...tb]).size || 1;
  const jaccard = inter / union;

  const ba = bigrams(genuine);
  const bb = bigrams(suspect);
  const counts = {};
  ba.forEach((x) => {
    counts[x] = (counts[x] || 0) + 1;
  });
  let overlap = 0;
  bb.forEach((x) => {
    if (counts[x] > 0) {
      overlap += 1;
      counts[x] -= 1;
    }
  });
  const dice = ba.length + bb.length ? (2 * overlap) / (ba.length + bb.length) : 0;

  return { score: (jaccard + dice) / 2, hasBoth: true };
}

// ---------- image "average hash" ----------
const HASH_SIZE = 16;

async function grayscaleGrid(src) {
  const img = await loadImage(src);
  const canvas = document.createElement('canvas');
  canvas.width = HASH_SIZE;
  canvas.height = HASH_SIZE;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, HASH_SIZE, HASH_SIZE);
  ctx.drawImage(img, 0, 0, HASH_SIZE, HASH_SIZE);
  const { data } = ctx.getImageData(0, 0, HASH_SIZE, HASH_SIZE);
  const gray = [];
  for (let i = 0; i < data.length; i += 4) {
    gray.push(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
  }
  return gray;
}

function averageHash(gray) {
  const mean = gray.reduce((a, b) => a + b, 0) / gray.length;
  return gray.map((v) => (v >= mean ? 1 : 0));
}

function differenceHash(gray) {
  const bits = [];
  for (let y = 0; y < HASH_SIZE; y += 1) {
    for (let x = 0; x < HASH_SIZE - 1; x += 1) {
      bits.push(gray[y * HASH_SIZE + x] > gray[y * HASH_SIZE + x + 1] ? 1 : 0);
    }
  }
  return bits;
}

function hamming(a, b) {
  let d = 0;
  for (let i = 0; i < a.length; i += 1) if (a[i] !== b[i]) d += 1;
  return d;
}

export async function compareImages(srcA, srcB) {
  const [ga, gb] = await Promise.all([grayscaleGrid(srcA), grayscaleGrid(srcB)]);
  const a1 = averageHash(ga);
  const b1 = averageHash(gb);
  const a2 = differenceHash(ga);
  const b2 = differenceHash(gb);
  const simAvg = 1 - hamming(a1, b1) / a1.length;
  const simDiff = 1 - hamming(a2, b2) / a2.length;
  // Map the random-chance baseline (~0.5) to 0 so unrelated images do not look "50% similar".
  const raw = (simAvg + simDiff) / 2;
  const score = Math.max(0, Math.min(1, (raw - 0.5) * 2));
  return { score, raw };
}

export function verdictFor(overall) {
  if (overall >= 0.8) return 'very_likely';
  if (overall >= 0.6) return 'likely';
  if (overall >= 0.4) return 'some';
  return 'low';
}

export function combine({ image, username, bio }) {
  const parts = [];
  if (image != null) parts.push({ w: 0.4, v: image });
  if (username != null) parts.push({ w: 0.35, v: username });
  if (bio != null) parts.push({ w: 0.25, v: bio });
  if (!parts.length) return 0;
  const total = parts.reduce((a, p) => a + p.w, 0);
  return parts.reduce((a, p) => a + p.w * p.v, 0) / total;
}
