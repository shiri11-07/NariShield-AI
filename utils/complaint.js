import { CATEGORIES, SEVERITY } from '../data/categories';

// Builds an editable complaint draft the user can copy or download. Nothing is sent anywhere.
export function buildComplaintDraft(incident, lang, fmt, { name = '', contact = '' } = {}) {
  const tr = (o) => (o && (o[lang] || o.en)) || '';
  const events = [...(incident.events || [])].sort((a, b) => new Date(a.date) - new Date(b.date));
  const profileUrl = events.find((event) => event.url)?.url || '[Add profile or account URL]';
  const formattedDate = incident.createdAt ? fmt(incident.createdAt) : '';
  const firstNoticed = formattedDate && formattedDate !== '—' ? formattedDate : '[Add incident date and time]';
  const description = incident.summary?.trim() || '[Describe what happened]';
  const evidence = events.length
    ? events.map((event, index) => `${index + 1}. ${event.type || 'record'}: ${event.title || '[Add evidence description]'}`).join('\n')
    : '[List available screenshots, links, messages, or other evidence]';
  const cat = tr(CATEGORIES[incident.category]?.label);
  const sev = tr(SEVERITY[incident.severity]?.label);
  const L =
    lang === 'te'
      ? {
          to: 'గౌరవనీయులైన అధికారికి / సైబర్ క్రైమ్ సెల్ / ప్లాట్‌ఫారమ్ గ్రీవెన్స్ అధికారికి,',
          subject: `విషయం: ${cat} గురించి ఫిర్యాదు`,
          intro: 'నేను ఈ క్రింది సంఘటన గురించి ఫిర్యాదు చేస్తున్నాను:',
          details: 'వివరాలు',
          platform: 'ప్లాట్‌ఫారమ్',
          type: 'సంఘటన రకం',
          severity: 'తీవ్రత',
          first: 'మొదట గమనించిన తేదీ',
          what: 'ఏం జరిగింది',
          timeline: 'సంఘటనల క్రమం',
          evidence: 'నా వద్ద ఉన్న ఆధారాలు: స్క్రీన్‌షాట్లు, లింకులు, సందేశాలు (అభ్యర్థనపై అందిస్తాను).',
          request: 'అభ్యర్థన: ఈ విషయాన్ని పరిశీలించి, అవసరమైన చర్యలు తీసుకోవాలని, సంబంధిత కంటెంట్/ఖాతాను తొలగించాలని కోరుతున్నాను. దయచేసి ఫిర్యాదు రసీదు/రిఫరెన్స్ నంబర్ ఇవ్వగలరు.',
          thanks: 'ధన్యవాదాలతో,',
          note: '(ఇది NariShield AI సృష్టించిన డ్రాఫ్ట్. పంపే ముందు సరిచూసి మార్చుకోండి. ఇది న్యాయ సలహా కాదు.)',
        }
      : {
          to: 'To the Officer-in-charge / Cyber Crime Cell / Platform Grievance Officer,',
          subject: `Subject: Complaint regarding ${cat}`,
          intro: 'I am writing to report the following incident:',
          details: 'Details',
          platform: 'Platform',
          profileUrl: 'Suspected profile / account URL',
          type: 'Type of incident',
          severity: 'Severity (my assessment)',
          first: 'First noticed on',
          what: 'What happened',
          timeline: 'Timeline of events',
          evidence: 'Available evidence',
          request:
            'Request: Please investigate, take the necessary action, and remove the offending content/account. Kindly provide an acknowledgement or reference number for this complaint.',
          thanks: 'Sincerely,',
          note: '(Draft generated locally by NariShield AI. Review and edit before sending. This is not legal advice.)',
        };

  const profileUrlLabel = L.profileUrl || (lang === 'te' ? 'అనుమానాస్పద ప్రొఫైల్ / ఖాతా URL' : 'Suspected profile / account URL');
  const lines = [];
  lines.push(L.to, '', L.subject, '', L.intro, '');
  lines.push(`${L.details}:`);
  lines.push(`- ${L.type}: ${cat}`);
  lines.push(`- ${L.platform}: ${incident.platform || '[Add platform]'}`);
  lines.push(`- ${profileUrlLabel}: ${profileUrl}`);
  lines.push(`- ${L.severity}: ${sev}`);
  lines.push(`- ${L.first}: ${firstNoticed}`);
  lines.push('', `${L.what}:`, description);
  lines.push('', `${L.timeline}:`);
  if (!events.length) lines.push('- [Add incident date/time and timeline details]');
  events.forEach((e, i) => {
    lines.push(`${i + 1}. ${fmt(e.date)} — ${e.title}${e.detail ? `: ${e.detail}` : ''}${e.url ? ` [${e.url}]` : ''}`);
  });
  lines.push('', `${L.evidence}:`, evidence, '', L.request, '', L.thanks, name || '[Your name]', contact || '[Your contact details]', '', L.note);
  return lines.join('\n');
}
