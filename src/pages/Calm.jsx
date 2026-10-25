import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, MessageCircle, Phone, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLang } from '../context/LanguageContext';
import { METHODS } from '../data/demoCircle';
import LanguageToggle from '../components/LanguageToggle';
import Modal from '../components/Modal';

// Breathing cycle: inhale 4s, hold 4s, exhale 6s.
const PHASES = [
  { key: 'calm.inhale', secs: 4, scale: 1.45 },
  { key: 'calm.hold', secs: 4, scale: 1.45 },
  { key: 'calm.exhale', secs: 6, scale: 1 },
];

const GROUNDING = ['calm.g5', 'calm.g4', 'calm.g3', 'calm.g2', 'calm.g1'];
const CHECKLIST = ['calm.c1', 'calm.c2', 'calm.c3', 'calm.c4', 'calm.c5'];

export default function Calm() {
  const { t, tr } = useLang();
  const { circle } = useApp();
  const [elapsed, setElapsed] = useState(0);
  const [grounded, setGrounded] = useState({});
  const [checked, setChecked] = useState({});
  const [demoSend, setDemoSend] = useState(null);

  useEffect(() => {
    const id = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  // Derive the breathing phase and countdown from one counter (no state set inside updaters).
  const cycle = PHASES.reduce((n, p) => n + p.secs, 0);
  let within = elapsed % cycle;
  let phase = 0;
  while (within >= PHASES[phase].secs) {
    within -= PHASES[phase].secs;
    phase += 1;
  }
  const count = PHASES[phase].secs - within;

  const current = PHASES[phase];

  return (
    <div className="calm-bg min-h-screen px-4 py-6 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <Link to="/" className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl border border-white/40 px-4 font-semibold hover:bg-white/10">
            <ArrowLeft size={20} aria-hidden="true" />
            {t('calm.exit')}
          </Link>
          <LanguageToggle />
        </div>

        <h1 className="text-center text-3xl font-extrabold">{t('calm.title')}</h1>
        <p className="mx-auto mt-2 max-w-xl text-center text-lg text-indigo-100">{t('calm.subtitle')}</p>

        {/* Breathing */}
        <section aria-label={t('calm.breathing')} className="my-10 flex flex-col items-center">
          <div className="relative flex h-72 w-72 items-center justify-center">
            <motion.div
              className="absolute h-44 w-44 rounded-full bg-gradient-to-br from-brand-300 to-blush-300 opacity-90 shadow-glow"
              animate={{ scale: current.scale }}
              transition={{ duration: current.secs, ease: 'easeInOut' }}
              aria-hidden="true"
            />
            <div className="relative text-center" role="timer" aria-live="polite">
              <p className="text-2xl font-bold text-ink">{t(current.key)}</p>
              <p className="text-4xl font-extrabold text-ink">{count}</p>
            </div>
          </div>
          <p className="text-indigo-100">{t('calm.breathHint')}</p>
        </section>

        {/* Grounding */}
        <section className="mb-6 rounded-3xl bg-white/10 p-5 backdrop-blur" aria-labelledby="g-h">
          <h2 id="g-h" className="mb-1 text-xl font-bold">{t('calm.grounding')}</h2>
          <p className="mb-4 text-indigo-100">{t('calm.groundingHint')}</p>
          <div className="space-y-2">
            {GROUNDING.map((k) => (
              <button
                key={k}
                type="button"
                role="checkbox"
                aria-checked={!!grounded[k]}
                onClick={() => setGrounded((g) => ({ ...g, [k]: !g[k] }))}
                className={`flex min-h-[56px] w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-lg ${
                  grounded[k] ? 'border-emerald-300 bg-emerald-500/30' : 'border-white/30 bg-white/5 hover:bg-white/15'
                }`}
              >
                <span className={`flex h-7 w-7 items-center justify-center rounded-full border-2 ${grounded[k] ? 'border-emerald-300 bg-emerald-400 text-ink' : 'border-white/60'}`} aria-hidden="true">
                  {grounded[k] && <Check size={16} strokeWidth={3} />}
                </span>
                {t(k)}
              </button>
            ))}
          </div>
        </section>

        {/* Emergency checklist */}
        <section className="mb-6 rounded-3xl bg-white/10 p-5 backdrop-blur" aria-labelledby="c-h">
          <h2 id="c-h" className="mb-4 text-xl font-bold">{t('calm.checklist')}</h2>
          <div className="space-y-2">
            {CHECKLIST.map((k) => (
              <button
                key={k}
                type="button"
                role="checkbox"
                aria-checked={!!checked[k]}
                onClick={() => setChecked((g) => ({ ...g, [k]: !g[k] }))}
                className={`flex min-h-[56px] w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-lg ${
                  checked[k] ? 'border-emerald-300 bg-emerald-500/30' : 'border-white/30 bg-white/5 hover:bg-white/15'
                }`}
              >
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg border-2 ${checked[k] ? 'border-emerald-300 bg-emerald-400 text-ink' : 'border-white/60'}`} aria-hidden="true">
                  {checked[k] && <Check size={16} strokeWidth={3} />}
                </span>
                {t(k)}
              </button>
            ))}
          </div>
          <a href="tel:112" className="mt-4 flex min-h-[56px] items-center justify-center gap-2 rounded-2xl bg-white text-lg font-bold text-red-700">
            <Phone size={22} aria-hidden="true" />
            {t('calm.call112')}
          </a>
        </section>

        {/* Trusted circle one-tap panel (simulated) */}
        <section className="mb-10 rounded-3xl bg-white/10 p-5 backdrop-blur" aria-labelledby="t-h">
          <h2 id="t-h" className="mb-1 text-xl font-bold">{t('calm.circle')}</h2>
          <p className="mb-4 text-indigo-100">{t('calm.circleHint')}</p>
          {circle.length === 0 ? (
            <Link to="/circle" className="inline-flex min-h-[56px] items-center rounded-2xl bg-white px-5 font-bold text-brand-800">
              {t('calm.addCircle')}
            </Link>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {circle.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setDemoSend(c)}
                    className="flex min-h-[72px] w-full items-center gap-3 rounded-2xl bg-white p-3 text-left text-ink shadow-lg hover:bg-brand-50"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-blush-400 text-xl font-bold text-white" aria-hidden="true">
                      {c.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-lg font-bold">{c.name}</span>
                      <span className="block text-sm text-slate-600">{c.relationship} · {tr(METHODS[c.method]?.label)}</span>
                    </span>
                    <MessageCircle size={22} className="ml-auto text-brand-600" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <Modal open={!!demoSend} onClose={() => setDemoSend(null)} title={t('calm.demoTitle')}>
        {demoSend && (
          <div className="space-y-4 text-ink">
            <p className="rounded-2xl bg-amber-50 p-3 text-sm font-semibold text-amber-800">{t('calm.demoBanner')}</p>
            <p className="text-base">{t('calm.demoMessage', { name: demoSend.name })}</p>
            <blockquote className="rounded-2xl border-l-4 border-brand-500 bg-brand-50 p-4 text-base">
              {t('calm.demoText')}
            </blockquote>
            {demoSend.note && <p className="text-sm text-slate-600">{t('circle.noteLabel')}: {demoSend.note}</p>}
            <button type="button" className="btn-primary w-full" onClick={() => setDemoSend(null)}>
              <Send size={18} aria-hidden="true" />
              {t('calm.demoDone')}
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
