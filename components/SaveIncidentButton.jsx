import { useNavigate } from 'react-router-dom';
import { FolderPlus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLang } from '../context/LanguageContext';
import { CATEGORIES } from '../data/categories';

// Turns guidance (assistant or decision tree) into a saved incident, carrying over ticked items.
export default function SaveIncidentButton({ category, severity, title, summary, checklist = {}, className = 'btn-primary' }) {
  const { addIncident, notify } = useApp();
  const { t, tr } = useLang();
  const navigate = useNavigate();
  const save = () => {
    const cat = CATEGORIES[category] ? category : 'other';
    const id = addIncident({
      title: title || tr(CATEGORIES[cat].label),
      category: cat,
      severity,
      summary,
      checklist,
      events: [
        {
          type: 'note',
          date: new Date().toISOString(),
          title: t('evidence.createdFromGuidance'),
          detail: summary ? summary.slice(0, 200) : '',
        },
      ],
    });
    notify(t('evidence.saved'));
    navigate(`/evidence/${id}`);
  };
  return (
    <button type="button" className={className} onClick={save}>
      <FolderPlus size={20} aria-hidden="true" />
      {t('evidence.saveAsIncident')}
    </button>
  );
}
