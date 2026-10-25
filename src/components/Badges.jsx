import { CATEGORIES, SEVERITY, STATUS } from '../data/categories';
import { useLang } from '../context/LanguageContext';
import Icon from './Icon';

// Badges always combine colour with a text label so meaning never relies on colour alone.
export function SeverityBadge({ level, className = '' }) {
  const { tr, t } = useLang();
  const s = SEVERITY[level] || SEVERITY.medium;
  return (
    <span
      className={`chip ${className}`}
      style={{ color: s.color, background: s.bg, borderColor: s.color }}
      title={t('common.severity')}
    >
      <span className="h-2 w-2 rounded-full" style={{ background: s.color }} aria-hidden="true" />
      {tr(s.label)}
    </span>
  );
}

export function StatusBadge({ status, className = '' }) {
  const { tr } = useLang();
  const s = STATUS[status] || STATUS.open;
  return (
    <span className={`chip ${className}`} style={{ color: s.color, background: s.bg, borderColor: s.color }}>
      {tr(s.label)}
    </span>
  );
}

export function CategoryChip({ category, className = '' }) {
  const { tr } = useLang();
  const c = CATEGORIES[category] || CATEGORIES.other;
  return (
    <span className={`chip bg-white/80 ${className}`} style={{ color: c.color, borderColor: c.color }}>
      <Icon name={c.icon} size={15} />
      {tr(c.label)}
    </span>
  );
}
