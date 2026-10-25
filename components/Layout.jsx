import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BookHeart,
  FolderLock,
  GitBranch,
  GitCompare,
  HeartPulse,
  LayoutDashboard,
  Home,
  Menu,
  MapPinned,
  MessageCircleHeart,
  MessageSquareQuote,
  ScanEye,
  ShieldCheck,
  Users,
  Wind,
  X,
} from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';
import AccessibilityControls from './AccessibilityControls';
import Toasts from './Toasts';
import { pageTransition } from '../animations/variants';

const NAV = [
  { items: [{ to: '/', icon: LayoutDashboard, key: 'nav.dashboard', end: true }] },
  {
    section: 'sec.understand',
    items: [
      { to: '/assistant', icon: MessageCircleHeart, key: 'nav.assistant' },
      { to: '/guide', icon: GitBranch, key: 'nav.guide' },
      { to: '/comparator', icon: GitCompare, key: 'nav.comparator' },
    ],
  },
  {
    section: 'sec.organize',
    items: [
      { to: '/evidence', icon: FolderLock, key: 'nav.evidence' },
      { to: '/privacy', icon: ScanEye, key: 'nav.privacy' },
      { to: '/journal', icon: BookHeart, key: 'nav.journal' },
    ],
  },
  {
    section: 'sec.act',
    items: [
      { to: '/circle', icon: Users, key: 'nav.circle' },
      { to: '/boundary', icon: MapPinned, key: 'nav.boundary' },
      { to: '/phrases', icon: MessageSquareQuote, key: 'nav.phrases' },
    ],
  },
  {
    section: 'sec.recover',
    items: [{ to: '/recovery', icon: HeartPulse, key: 'nav.recovery' }],
  },
];

function NavList({ onNavigate }) {
  const { t } = useLang();
  return (
    <nav aria-label={t('nav.main')} className="flex flex-col gap-1">
      {NAV.map((group, gi) => (
        <div key={gi} className="mb-2">
          {group.section && (
            <p className="mb-1 px-4 text-xs font-bold uppercase tracking-wider text-brand-700">{t(group.section)}</p>
          )}
          {group.items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onNavigate}
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
            >
              <item.icon size={20} aria-hidden="true" />
              <span>{t(item.key)}</span>
            </NavLink>
          ))}
        </div>
      ))}
    </nav>
  );
}

export default function Layout() {
  const { t } = useLang();
  const location = useLocation();
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    setDrawer(false);
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  const bottomItems = [
    { to: '/', icon: Home, key: 'nav.home', end: true },
    { to: '/assistant', icon: MessageCircleHeart, key: 'nav.assistantShort' },
    { to: '/guide', icon: GitBranch, key: 'nav.guideShort' },
    { to: '/evidence', icon: FolderLock, key: 'nav.evidenceShort' },
  ];

  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only-focusable fixed left-4 top-4 z-[100] rounded-xl bg-brand-700 px-4 py-3 font-semibold text-white"
      >
        {t('common.skip')}
      </a>

      <header className="sticky top-0 z-40 border-b border-white/70 bg-white/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="btn-soft btn-sm !min-h-[44px] !min-w-[44px] !px-2 lg:hidden"
              aria-label={t('nav.openMenu')}
              aria-expanded={drawer}
            >
              <Menu size={22} aria-hidden="true" />
            </button>
            <Link to="/" className="flex items-center gap-2.5" aria-label="NariShield AI">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-blush-500 text-white shadow-lg shadow-brand-500/30">
                <ShieldCheck size={24} aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block text-lg font-extrabold tracking-tight text-ink">
                  Nari<span className="gradient-text">Shield</span> AI
                </span>
                <span className="hidden text-xs font-medium text-slate-600 sm:block">{t('app.tagline')}</span>
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <AccessibilityControls />
            <LanguageToggle />
            <Link to="/calm" className="btn-pink btn-sm hidden md:inline-flex">
              <Wind size={18} aria-hidden="true" />
              {t('nav.calm')}
            </Link>
          </div>
        </div>
      </header>

      <div className="border-b border-amber-200 bg-amber-50/90">
        <div className="mx-auto max-w-7xl px-4 py-2.5 text-sm font-medium text-amber-900">
          {t('app.prototypeNotice')}
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
        <aside className="sticky top-24 hidden max-h-[calc(100vh-7rem)] w-64 shrink-0 self-start overflow-y-auto scroll-thin lg:block">
          <div className="glass p-3">
            <NavList />
          </div>
        </aside>

        <main id="main" className="min-w-0 flex-1 pb-32 lg:pb-12" tabIndex={-1}>
          <motion.div key={location.pathname} {...pageTransition}>
            <Outlet />
          </motion.div>
          <footer className="mt-10 text-center text-sm text-slate-600">
            <p>{t('footer.privacy')}</p>
            <p className="mt-1">{t('footer.disclaimer')}</p>
          </footer>
        </main>
      </div>

      {/* Calm First floating button */}
      <Link
        to="/calm"
        aria-label={t('nav.calmAria')}
        className="fixed bottom-24 right-4 z-40 flex min-h-[56px] items-center gap-2 rounded-full bg-gradient-to-r from-blush-500 to-brand-600 px-5 py-3 font-bold text-white shadow-xl shadow-brand-600/40 transition hover:scale-105 active:scale-95 lg:bottom-8 lg:right-8"
      >
        <Wind size={22} aria-hidden="true" />
        <span>{t('nav.calm')}</span>
      </Link>

      {/* Mobile bottom bar */}
      <nav
        aria-label={t('nav.quick')}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/70 bg-white/85 backdrop-blur-xl lg:hidden"
      >
        <ul className="mx-auto grid max-w-md grid-cols-5">
          {bottomItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex min-h-[60px] flex-col items-center justify-center gap-0.5 text-xs font-semibold ${
                    isActive ? 'text-brand-700' : 'text-slate-600'
                  }`
                }
              >
                <item.icon size={22} aria-hidden="true" />
                {t(item.key)}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="flex min-h-[60px] w-full flex-col items-center justify-center gap-0.5 text-xs font-semibold text-slate-600"
            >
              <Menu size={22} aria-hidden="true" />
              {t('nav.more')}
            </button>
          </li>
        </ul>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawer && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setDrawer(false)} aria-hidden="true" />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="glass-strong absolute inset-y-0 left-0 w-[86%] max-w-sm overflow-y-auto rounded-l-none p-4"
              role="dialog"
              aria-modal="true"
              aria-label={t('nav.main')}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-lg font-extrabold text-ink">NariShield AI</span>
                <button
                  type="button"
                  onClick={() => setDrawer(false)}
                  className="btn-soft btn-sm !min-h-[44px] !min-w-[44px] !px-2"
                  aria-label={t('common.close')}
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>
              <NavList onNavigate={() => setDrawer(false)} />
              <Link to="/calm" className="btn-pink mt-3 w-full">
                <Wind size={20} aria-hidden="true" />
                {t('nav.calm')}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toasts />
    </div>
  );
}
