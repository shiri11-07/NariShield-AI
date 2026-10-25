export const CATEGORIES = {
  fake_profile: {
    color: '#8b5cf6',
    icon: 'UserX',
    label: { en: 'Fake profile', te: 'నకిలీ ప్రొఫైల్' },
  },
  blackmail: {
    color: '#ef4444',
    icon: 'AlertOctagon',
    label: { en: 'Blackmail', te: 'బ్లాక్‌మెయిల్' },
  },
  sextortion: {
    color: '#be185d',
    icon: 'EyeOff',
    label: { en: 'Sextortion / intimate images', te: 'సెక్స్‌టార్షన్ / ప్రైవేట్ చిత్రాలు' },
  },
  stalking: {
    color: '#f59e0b',
    icon: 'Footprints',
    label: { en: 'Stalking', te: 'వెంబడించడం' },
  },
  phishing: {
    color: '#0ea5e9',
    icon: 'MailWarning',
    label: { en: 'Phishing / scam', te: 'ఫిషింగ్ / మోసం' },
  },
  threat: {
    color: '#dc2626',
    icon: 'Siren',
    label: { en: 'Threats', te: 'బెదిరింపులు' },
  },
  harassment: {
    color: '#6366f1',
    icon: 'MessageSquareWarning',
    label: { en: 'Harassment', te: 'వేధింపులు' },
  },
  other: {
    color: '#64748b',
    icon: 'ShieldAlert',
    label: { en: 'Other / unsure', te: 'ఇతర / తెలియదు' },
  },
};

export const SEVERITY = {
  low: { rank: 1, color: '#059669', bg: '#d1fae5', label: { en: 'Low', te: 'తక్కువ' } },
  medium: { rank: 2, color: '#b45309', bg: '#fef3c7', label: { en: 'Medium', te: 'మధ్యస్థం' } },
  high: { rank: 3, color: '#c2410c', bg: '#ffedd5', label: { en: 'High', te: 'ఎక్కువ' } },
  critical: { rank: 4, color: '#b91c1c', bg: '#fee2e2', label: { en: 'Critical', te: 'అత్యంత తీవ్రం' } },
};

export const SEVERITY_ORDER = ['low', 'medium', 'high', 'critical'];

export const STATUS = {
  open: { label: { en: 'Open', te: 'తెరిచి ఉంది' }, color: '#b91c1c', bg: '#fee2e2' },
  in_progress: { label: { en: 'In progress', te: 'జరుగుతోంది' }, color: '#b45309', bg: '#fef3c7' },
  resolved: { label: { en: 'Resolved', te: 'పరిష్కరించబడింది' }, color: '#047857', bg: '#d1fae5' },
};

export const EVENT_TYPES = {
  screenshot: { icon: 'Image', color: '#8b5cf6', label: { en: 'Screenshot', te: 'స్క్రీన్‌షాట్' } },
  url: { icon: 'Link2', color: '#0ea5e9', label: { en: 'Link / URL', te: 'లింక్ / URL' } },
  message: { icon: 'MessageSquare', color: '#ec4899', label: { en: 'Message', te: 'సందేశం' } },
  note: { icon: 'StickyNote', color: '#f59e0b', label: { en: 'Note', te: 'గమనిక' } },
  report: { icon: 'FileCheck2', color: '#10b981', label: { en: 'Report filed', te: 'ఫిర్యాదు నమోదు' } },
  call: { icon: 'PhoneIncoming', color: '#6366f1', label: { en: 'Call', te: 'కాల్' } },
};

export const PLATFORMS = [
  'Instagram',
  'WhatsApp',
  'Facebook',
  'X / Twitter',
  'Telegram',
  'Snapchat',
  'Email',
  'SMS',
  'Marketplace',
  'Other',
];
