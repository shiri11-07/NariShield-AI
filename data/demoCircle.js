// Fictional Trusted Circle contacts for the demo.
export const ROLES = {
  responder: { label: { en: 'First responder', te: 'తక్షణ సహాయకురాలు/సహాయకుడు' } },
  keeper: { label: { en: 'Evidence keeper', te: 'ఆధారాల సంరక్షకులు' } },
  support: { label: { en: 'Emotional support', te: 'భావోద్వేగ మద్దతు' } },
  legal: { label: { en: 'Legal / official help', te: 'న్యాయ / అధికారిక సహాయం' } },
};

export const METHODS = {
  call: { label: { en: 'Phone call', te: 'ఫోన్ కాల్' } },
  sms: { label: { en: 'SMS', te: 'SMS' } },
  whatsapp: { label: { en: 'WhatsApp', te: 'వాట్సాప్' } },
  email: { label: { en: 'Email', te: 'ఇమెయిల్' } },
  in_person: { label: { en: 'In person', te: 'ప్రత్యక్షంగా' } },
};

export function buildDemoCircle() {
  return [
    {
      id: 'c_rhea',
      demo: true,
      name: 'Demo contact A',
      relationship: 'Fictional family member',
      method: 'call',
      role: 'responder',
      note: 'Fictional example: agree on how and when this person may be contacted.',
    },
    {
      id: 'c_kavya',
      demo: true,
      name: 'Demo contact B',
      relationship: 'Fictional friend',
      method: 'whatsapp',
      role: 'keeper',
      note: 'Fictional example: decide together whether this person should keep a copy of evidence.',
    },
    {
      id: 'c_prakash',
      demo: true,
      name: 'Demo contact C',
      relationship: 'Fictional neighbour',
      method: 'in_person',
      role: 'responder',
      note: 'Fictional example: record only arrangements you have personally confirmed.',
    },
  ];
}
