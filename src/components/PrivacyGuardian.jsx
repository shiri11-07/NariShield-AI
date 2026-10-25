import { useCallback, useEffect, useRef, useState } from 'react';
import { Eraser, ImagePlus, ScanSearch, Save, Undo2, Wand2 } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { assetUrl, compressImage, loadImage, readFileAsDataURL } from '../utils/imageTools';
import { DEMO_SCREEN_TEXT, DEMO_ZONES, detectSensitive, maskValue, pixelateRegion } from '../utils/privacy';

const TYPE_KEYS = { phone: 'privacy.phone', email: 'privacy.email', address: 'privacy.address', id: 'privacy.id' };

/**
 * Privacy Guardian: blur sensitive areas of a screenshot before it is saved. 100% local (canvas).
 * Text detection works on text the user pastes — there is no OCR; regions are drawn by hand
 * (or applied automatically for the bundled demo screenshot).
 */
export default function PrivacyGuardian({ onSave, saveLabel }) {
  const { t } = useLang();
  const canvasRef = useRef(null);
  const sourceRef = useRef(null); // pristine copy of the image
  const drag = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [regions, setRegions] = useState([]);
  const [text, setText] = useState('');
  const [findings, setFindings] = useState([]);
  const [error, setError] = useState('');

  const redraw = useCallback(
    (list, preview) => {
      const canvas = canvasRef.current;
      const src = sourceRef.current;
      if (!canvas || !src) return;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(src, 0, 0);
      list.forEach((r) => pixelateRegion(ctx, src, r));
      if (preview) {
        ctx.save();
        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = Math.max(2, canvas.width / 300);
        ctx.setLineDash([8, 6]);
        ctx.strokeRect(preview.x, preview.y, preview.w, preview.h);
        ctx.restore();
      }
    },
    [],
  );

  useEffect(() => {
    if (loaded) redraw(regions);
  }, [regions, loaded, redraw]);

  const setImage = async (src, demo = false) => {
    setError('');
    try {
      const img = await loadImage(src);
      const source = document.createElement('canvas');
      source.width = img.naturalWidth || img.width || 600;
      source.height = img.naturalHeight || img.height || 640;
      const sctx = source.getContext('2d');
      sctx.fillStyle = '#fff';
      sctx.fillRect(0, 0, source.width, source.height);
      sctx.drawImage(img, 0, 0, source.width, source.height);
      sourceRef.current = source;
      const canvas = canvasRef.current;
      canvas.width = source.width;
      canvas.height = source.height;
      setRegions([]);
      setFindings([]);
      setText(demo ? DEMO_SCREEN_TEXT : '');
      setIsDemo(demo);
      setLoaded(true);
      redraw([]);
    } catch (e) {
      setError(t('privacy.loadError'));
    }
  };

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError(t('privacy.notImage'));
      return;
    }
    const url = await readFileAsDataURL(file);
    await setImage(url, false);
    e.target.value = '';
  };

  const loadDemo = () => setImage(assetUrl('demo-images/demo-chat-screenshot.svg'), true);

  const scan = () => setFindings(detectSensitive(text));

  const autoBlurDemo = () => {
    setRegions((r) => [...r, ...DEMO_ZONES.map((z) => ({ x: z.x, y: z.y, w: z.w, h: z.h }))]);
    setFindings(detectSensitive(text));
  };

  // Pointer drawing: coordinates are mapped from CSS pixels to canvas pixels.
  const toCanvas = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  };
  const onDown = (e) => {
    if (!loaded) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    drag.current = toCanvas(e);
  };
  const onMove = (e) => {
    if (!drag.current) return;
    const p = toCanvas(e);
    const s = drag.current;
    redraw(regions, { x: Math.min(s.x, p.x), y: Math.min(s.y, p.y), w: Math.abs(p.x - s.x), h: Math.abs(p.y - s.y) });
  };
  const onUp = (e) => {
    if (!drag.current) return;
    const p = toCanvas(e);
    const s = drag.current;
    drag.current = null;
    const r = { x: Math.min(s.x, p.x), y: Math.min(s.y, p.y), w: Math.abs(p.x - s.x), h: Math.abs(p.y - s.y) };
    if (r.w > 6 && r.h > 6) setRegions((list) => [...list, r]);
    else redraw(regions);
  };

  const save = async () => {
    const data = canvasRef.current.toDataURL('image/png');
    const compact = await compressImage(data, 900, 0.75);
    onSave?.({ image: compact, blurred: regions.length });
  };

  return (
    <div className="space-y-5">
      <p className="rounded-2xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">{t('privacy.local')}</p>

      <div className="flex flex-wrap gap-3">
        <label className="btn-primary cursor-pointer">
          <ImagePlus size={20} aria-hidden="true" />
          {t('privacy.upload')}
          <input type="file" accept="image/*" className="sr-only" onChange={onFile} />
        </label>
        <button type="button" className="btn-soft" onClick={loadDemo}>
          {t('privacy.useDemo')}
        </button>
      </div>
      {error && <p role="alert" className="font-semibold text-red-700">{error}</p>}

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="overflow-auto rounded-2xl border border-brand-200 bg-white/60 p-2 scroll-thin">
            <canvas
              ref={canvasRef}
              width={600}
              height={400}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              className={`mx-auto max-h-[480px] w-auto max-w-full touch-none rounded-xl ${loaded ? 'cursor-crosshair' : 'hidden'}`}
              aria-label={t('privacy.canvasLabel')}
            />
            {!loaded && <p className="p-10 text-center text-slate-600">{t('privacy.empty')}</p>}
          </div>
          {loaded && <p className="mt-2 text-sm text-slate-600">{t('privacy.drawHint')}</p>}
          {loaded && <p className="mt-2 text-sm font-medium text-slate-700">{t('privacy.reviewHint')}</p>}
          {loaded && (
            <div className="mt-3 flex flex-wrap gap-3">
              {isDemo && (
                <button type="button" className="btn-pink btn-sm" onClick={autoBlurDemo}>
                  <Wand2 size={18} aria-hidden="true" />
                  {t('privacy.autoBlur')}
                </button>
              )}
              <button type="button" className="btn-soft btn-sm" onClick={() => setRegions((r) => r.slice(0, -1))} disabled={!regions.length}>
                <Undo2 size={18} aria-hidden="true" />
                {t('privacy.undo')}
              </button>
              <button type="button" className="btn-soft btn-sm" onClick={() => setRegions([])} disabled={!regions.length}>
                <Eraser size={18} aria-hidden="true" />
                {t('privacy.clear')}
              </button>
              {onSave && (
                <button type="button" className="btn-primary btn-sm" onClick={save}>
                  <Save size={18} aria-hidden="true" />
                  {saveLabel || t('privacy.saveBlurred')}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <label className="label" htmlFor="pg-text">{t('privacy.pasteLabel')}</label>
          <textarea
            id="pg-text"
            className="input min-h-[120px]"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('privacy.pastePlaceholder')}
          />
          <button type="button" className="btn-soft btn-sm w-full" onClick={scan} disabled={!text.trim()}>
            <ScanSearch size={18} aria-hidden="true" />
            {t('privacy.scan')}
          </button>
          {findings.length > 0 && (
            <ul className="space-y-2" aria-live="polite">
              {findings.map((f, i) => (
                <li key={i} className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm">
                  <span className="font-bold text-amber-900">{t(TYPE_KEYS[f.type])}</span>
                  <span className="ml-2 font-mono text-amber-900">{maskValue(f.value)}</span>
                </li>
              ))}
              <li className="text-sm font-semibold text-slate-700">{t('privacy.foundHint', { n: findings.length })}</li>
            </ul>
          )}
          {findings.length === 0 && text.trim() && <p className="text-sm text-slate-600">{t('privacy.scanHint')}</p>}
        </div>
      </div>
    </div>
  );
}
