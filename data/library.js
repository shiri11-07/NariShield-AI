// Shared, bilingual (English / Telugu) building blocks used by the AI assistant,
// the decision tree, the incident action plans and the dashboard.
// Helpline numbers are for India — always verify locally.

export const ACTIONS = {
  save_url: {
    en: 'Copy and save the profile / post / chat link before reporting — links vanish once content is removed.',
    te: 'రిపోర్ట్ చేసే ముందు ప్రొఫైల్/పోస్ట్/చాట్ లింక్‌ను కాపీ చేసి భద్రపరచండి — కంటెంట్ తొలగించాక లింకులు మాయమవుతాయి.',
  },
  screenshots: {
    en: 'Take full-screen screenshots that show the username, date/time and the content.',
    te: 'యూజర్‌నేమ్, తేదీ/సమయం, కంటెంట్ కనిపించేలా పూర్తి స్క్రీన్ స్క్రీన్‌షాట్లు తీసుకోండి.',
  },
  dont_engage: {
    en: 'Do not reply, argue or negotiate. Engaging can escalate things.',
    te: 'స్పందించకండి, వాదించకండి, బేరసారాలు చేయకండి. స్పందిస్తే పరిస్థితి మరింత ముదరవచ్చు.',
  },
  dont_delete: {
    en: "Don't delete chats or posts yet — they are your evidence. Mute or restrict instead.",
    te: 'చాట్‌లు/పోస్ట్‌లను ఇంకా తొలగించకండి — అవి మీ ఆధారాలు. బదులుగా మ్యూట్ లేదా రిస్ట్రిక్ట్ చేయండి.',
  },
  block_after: {
    en: "Block the account only after you've saved your evidence.",
    te: 'ఆధారాలు భద్రపరిచిన తర్వాతే ఖాతాను బ్లాక్ చేయండి.',
  },
  report_platform: {
    en: "Report it using the platform's in-app Report option (impersonation / abuse form).",
    te: "ప్లాట్‌ఫారమ్‌లోని 'Report' ఎంపిక (ఇంపర్సనేషన్/దుర్వినియోగ ఫారమ్) ద్వారా ఫిర్యాదు చేయండి.",
  },
  report_cyber: {
    en: 'File a complaint on the National Cybercrime Reporting Portal (cybercrime.gov.in).',
    te: 'నేషనల్ సైబర్‌క్రైమ్ రిపోర్టింగ్ పోర్టల్ (cybercrime.gov.in)లో ఫిర్యాదు నమోదు చేయండి.',
  },
  call_1930: {
    en: 'If money was lost, call 1930 immediately and inform your bank — speed matters.',
    te: 'డబ్బు పోతే వెంటనే 1930కు కాల్ చేసి మీ బ్యాంకుకు చెప్పండి — వేగమే కీలకం.',
  },
  call_112: {
    en: "If you are in immediate danger, call 112 now. You don't need evidence to ask for help.",
    te: 'తక్షణ ప్రమాదంలో ఉంటే వెంటనే 112కు కాల్ చేయండి. సహాయం అడగడానికి ఆధారాలు అవసరం లేదు.',
  },
  helpline_1091: {
    en: 'Call the Women Helpline 1091 for support and guidance.',
    te: 'మద్దతు, సలహా కోసం మహిళా హెల్ప్‌లైన్ 1091కు కాల్ చేయండి.',
  },
  dont_pay: {
    en: 'Do not pay or send more images. Paying rarely stops it — demands usually increase.',
    te: 'డబ్బు చెల్లించకండి, మరిన్ని ఫోటోలు పంపకండి. చెల్లించినా ఆగదు; డిమాండ్లు పెరుగుతాయి.',
  },
  tell_trusted: {
    en: "Tell someone from your Trusted Circle — you don't have to handle this alone.",
    te: 'మీ విశ్వసనీయ వలయం (Trusted Circle)లోని ఒకరికి చెప్పండి — దీన్ని ఒంటరిగా ఎదుర్కోవాల్సిన అవసరం లేదు.',
  },
  secure_accounts: {
    en: 'Change passwords, turn on two-factor authentication and review logged-in devices.',
    te: 'పాస్‌వర్డ్‌లు మార్చండి, టూ-ఫ్యాక్టర్ ఆథెంటికేషన్ ఆన్ చేయండి, లాగిన్ అయిన పరికరాలను సమీక్షించండి.',
  },
  lock_profile: {
    en: 'Set your social profiles to private and review who can see your photos and followers.',
    te: 'సోషల్ ప్రొఫైల్‌లను ప్రైవేట్ చేయండి; మీ ఫోటోలు, ఫాలోవర్లను ఎవరు చూడగలరో సమీక్షించండి.',
  },
  warn_contacts: {
    en: 'Warn friends and family that a fake account exists; ask them not to engage and to report it.',
    te: 'నకిలీ ఖాతా ఉందని మిత్రులు, కుటుంబానికి తెలియజేయండి; స్పందించవద్దని, రిపోర్ట్ చేయమని చెప్పండి.',
  },
  stopncii: {
    en: 'Use StopNCII.org to create a digital fingerprint (hash) of intimate images so partner platforms can block them. The images stay on your device.',
    te: 'StopNCII.org ద్వారా ఫోటోల డిజిటల్ ఫింగర్‌ప్రింట్ (హ్యాష్) సృష్టించండి — భాగస్వామ్య ప్లాట్‌ఫారమ్‌లు వాటిని నిరోధిస్తాయి. ఫోటోలు మీ పరికరంలోనే ఉంటాయి.',
  },
  takedown: {
    en: 'Request removal on each platform and search engine using their non-consensual intimate image forms.',
    te: 'ప్రతి ప్లాట్‌ఫారమ్/సెర్చ్ ఇంజిన్‌లో అనుమతి లేని ప్రైవేట్ చిత్రాల తొలగింపు ఫారమ్‌ల ద్వారా తొలగింపు కోరండి.',
  },
  childline: {
    en: 'If anyone in the images is under 18, call Childline 1098 and report on cybercrime.gov.in.',
    te: 'చిత్రాల్లో 18 ఏళ్ల లోపు వారు ఉంటే చైల్డ్‌లైన్ 1098కు కాల్ చేసి, cybercrime.gov.inలో ఫిర్యాదు చేయండి.',
  },
  no_forward: {
    en: 'Do not forward or re-share the images, even to report them. Share links and usernames instead.',
    te: 'చిత్రాలను ఫార్వర్డ్ చేయకండి, మళ్లీ పంచకండి — రిపోర్ట్ కోసం కూడా కాదు. బదులుగా లింకులు, యూజర్‌నేమ్‌లను పంచండి.',
  },
  legal_notice: {
    en: 'Consider a written warning or legal notice through a lawyer or legal-aid cell. Keep a copy.',
    te: 'న్యాయవాది లేదా లీగల్ ఎయిడ్ ద్వారా లిఖితపూర్వక హెచ్చరిక/లీగల్ నోటీసు పంపడం పరిశీలించండి; ప్రతిని ఉంచుకోండి.',
  },
  boundary_msg: {
    en: 'If it feels safe, you may set a boundary once. You do not need to reply. If replying could increase risk, preserve evidence, avoid further engagement, and use the platform’s reporting and blocking tools when appropriate.',
    te: "ఒకే ఒక స్పష్టమైన, ప్రశాంతమైన సందేశం పంపండి: 'నన్ను మళ్లీ సంప్రదించకండి.' తర్వాత స్పందించకండి; ఆ సందేశాన్ని భద్రపరచండి.",
  },
  scan_device: {
    en: 'Check your phone for unknown apps, device-admin permissions and unfamiliar trackers. Consider a factory reset after saving evidence.',
    te: 'మీ ఫోన్‌లో తెలియని యాప్‌లు, డివైస్ అడ్మిన్ అనుమతులు, తెలియని ట్రాకర్లు ఉన్నాయేమో తనిఖీ చేయండి; ఆధారాలు భద్రపరిచాక ఫ్యాక్టరీ రీసెట్ పరిశీలించండి.',
  },
  location_share: {
    en: 'Review location sharing in your Google / Apple accounts, Find My and social apps.',
    te: 'Google/Apple ఖాతాలు, Find My, సోషల్ యాప్‌లలో లొకేషన్ షేరింగ్‌ను సమీక్షించండి.',
  },
  vary_routine: {
    en: 'Vary your routes and routines, avoid sharing live location publicly, and tell your Trusted Circle your plans.',
    te: 'మార్గాలు, దినచర్యలను మారుస్తూ ఉండండి; లైవ్ లొకేషన్‌ను బహిరంగంగా పంచకండి; మీ ప్రణాళికలను విశ్వసనీయ వలయానికి తెలియజేయండి.',
  },
  dont_click: {
    en: "Do not click the link or open attachments, and don't call numbers given in the message.",
    te: 'లింక్ క్లిక్ చేయకండి, అటాచ్‌మెంట్లు తెరవకండి; సందేశంలోని నంబర్లకు కాల్ చేయకండి.',
  },
  report_phishing: {
    en: "Report the message or number as spam / phishing in your messaging app and on the platform.",
    te: 'మెసేజింగ్ యాప్‌లో, ప్లాట్‌ఫారమ్‌లో ఆ సందేశం/నంబర్‌ను స్పామ్ లేదా ఫిషింగ్‌గా రిపోర్ట్ చేయండి.',
  },
  bank_block: {
    en: 'Contact your bank to block the card / UPI and freeze suspicious transactions.',
    te: 'కార్డ్/UPIని బ్లాక్ చేయడానికి, అనుమానాస్పద లావాదేవీలను నిలిపివేయడానికి బ్యాంకును సంప్రదించండి.',
  },
  change_pw_now: {
    en: 'Immediately change the password of any account where you entered details.',
    te: 'వివరాలు నమోదు చేసిన ఖాతాల పాస్‌వర్డ్‌లను వెంటనే మార్చండి.',
  },
  verify_official: {
    en: "Verify through the official website / app or the number printed on your card — not the details in the message.",
    te: 'సందేశంలో ఇచ్చిన వివరాలతో కాకుండా అధికారిక వెబ్‌సైట్/యాప్ లేదా కార్డుపై ఉన్న నంబర్‌తో ధృవీకరించండి.',
  },
  mute_filter: {
    en: 'Use mute, restrict and keyword filters to cut exposure without deleting evidence.',
    te: 'ఆధారాలను తొలగించకుండానే మ్యూట్, రిస్ట్రిక్ట్, కీవర్డ్ ఫిల్టర్లతో ఎక్స్‌పోజర్ తగ్గించండి.',
  },
  report_mob: {
    en: 'Report each account and post, and ask the platform to treat it as coordinated harassment.',
    te: 'ప్రతి ఖాతాను, పోస్ట్‌ను రిపోర్ట్ చేయండి; సమన్వయంతో జరిగే వేధింపులుగా పరిగణించమని ప్లాట్‌ఫారమ్‌ను కోరండి.',
  },
  support_wellbeing: {
    en: 'Take a screen break and talk to someone you trust. None of this is your fault.',
    te: 'స్క్రీన్ నుండి విరామం తీసుకోండి, నమ్మకమైన వారితో మాట్లాడండి. ఇందులో మీ తప్పేమీ లేదు.',
  },
  report_internal: {
    en: 'If this involves your workplace or college, inform the Internal Committee (POSH) or HR in writing.',
    te: 'పని/కాలేజీ సంబంధితమైతే ఇంటర్నల్ కమిటీ (POSH) లేదా HRకు లిఖితపూర్వకంగా తెలియజేయండి.',
  },
  visit_police: {
    en: 'If you feel unsafe, visit the nearest police station or women\'s help desk with your evidence and ask for an acknowledgement of your complaint.',
    te: 'అసురక్షితంగా అనిపిస్తే ఆధారాలతో సమీప పోలీస్ స్టేషన్/మహిళా హెల్ప్‌డెస్క్‌కు వెళ్లండి; ఫిర్యాదు రసీదు అడగండి.',
  },
};

// A boundary is optional; this Telugu guidance mirrors the context-sensitive English copy above.
ACTIONS.boundary_msg.te = 'సురక్షితంగా అనిపిస్తే, మీరు ఒకసారి హద్దు చెప్పవచ్చు. జవాబు ఇవ్వాల్సిన అవసరం లేదు. జవాబు ఇవ్వడం ప్రమాదాన్ని పెంచవచ్చని అనిపిస్తే, ఆధారాలను భద్రపరచండి, మరింత స్పందించవద్దు; తగినప్పుడు ప్లాట్‌ఫారమ్ రిపోర్ట్, బ్లాక్ సాధనాలను వాడండి.';

export const EVIDENCE = {
  ev_url: { en: 'Profile / post / chat links', te: 'ప్రొఫైల్/పోస్ట్/చాట్ లింకులు' },
  ev_screens: {
    en: 'Full-screen screenshots with date and time visible',
    te: 'తేదీ, సమయం కనిపించే పూర్తి స్క్రీన్‌షాట్లు',
  },
  ev_username: { en: 'Username / handle and profile ID', te: 'యూజర్‌నేమ్/హ్యాండిల్ మరియు ప్రొఫైల్ ID' },
  ev_phone: { en: "Sender's phone number or account ID", te: 'పంపినవారి ఫోన్ నంబర్ లేదా ఖాతా ID' },
  ev_threat_text: {
    en: 'Exact wording of the threats (unedited)',
    te: 'బెదిరింపుల ఖచ్చితమైన పదాలు (ఎడిట్ చేయకుండా)',
  },
  ev_payment: {
    en: 'Payment receipts, transaction IDs and bank SMS',
    te: 'చెల్లింపు రసీదులు, ట్రాన్సాక్షన్ IDలు, బ్యాంక్ SMSలు',
  },
  ev_original: {
    en: 'Your original photos / files being misused (to prove ownership)',
    te: 'దుర్వినియోగం అవుతున్న మీ అసలు ఫోటోలు/ఫైళ్లు (యాజమాన్యం చూపడానికి)',
  },
  ev_reports: { en: 'Report reference / ticket numbers', te: 'రిపోర్ట్ రిఫరెన్స్/టికెట్ నంబర్లు' },
  ev_link: {
    en: 'Screenshot of the phishing link or message (do not open it)',
    te: 'ఫిషింగ్ లింక్ లేదా సందేశం స్క్రీన్‌షాట్ (తెరవకండి)',
  },
  ev_device: {
    en: 'Screenshots of suspicious apps, trackers and settings',
    te: 'అనుమానాస్పద యాప్‌లు, ట్రాకర్లు, సెట్టింగ్‌ల స్క్రీన్‌షాట్లు',
  },
  ev_pattern: {
    en: 'A dated log of repeated incidents (shows a pattern)',
    te: 'తేదీలతో కూడిన సంఘటనల లాగ్ (పునరావృత ప్రవర్తనను చూపడానికి)',
  },
  ev_witness: { en: 'Names and contacts of anyone who saw it', te: 'చూసినవారి పేర్లు, సంప్రదింపు వివరాలు' },
  ev_audio: {
    en: 'Call recordings / voicemails (where lawful)',
    te: 'కాల్ రికార్డింగ్‌లు/వాయిస్‌మెయిల్స్ (చట్టబద్ధంగా ఉంటే)',
  },
  ev_dates: {
    en: 'Exact date and time of every message',
    te: 'ప్రతి సందేశం యొక్క ఖచ్చితమైన తేదీ, సమయం',
  },
};

export const RESOURCES = {
  cybercrime: {
    label: { en: 'National Cybercrime Reporting Portal', te: 'నేషనల్ సైబర్‌క్రైమ్ రిపోర్టింగ్ పోర్టల్' },
    detail: 'cybercrime.gov.in',
    url: 'https://cybercrime.gov.in',
  },
  h1930: {
    label: { en: 'Cyber Fraud Helpline', te: 'సైబర్ మోసాల హెల్ప్‌లైన్' },
    detail: '1930',
    tel: '1930',
  },
  h1091: {
    label: { en: 'Women Helpline', te: 'మహిళా హెల్ప్‌లైన్' },
    detail: '1091',
    tel: '1091',
  },
  e112: {
    label: { en: 'Emergency (Police / Ambulance)', te: 'అత్యవసర సేవ (పోలీస్/అంబులెన్స్)' },
    detail: '112',
    tel: '112',
  },
  stopncii: {
    label: { en: 'StopNCII.org (intimate image hashing)', te: 'StopNCII.org (ప్రైవేట్ చిత్రాల హ్యాషింగ్)' },
    detail: 'stopncii.org',
    url: 'https://stopncii.org',
  },
  childline: {
    label: { en: 'Childline', te: 'చైల్డ్‌లైన్' },
    detail: '1098',
    tel: '1098',
  },
  platform: {
    label: { en: 'In-app platform reporting', te: 'ప్లాట్‌ఫారమ్‌లో రిపోర్టింగ్' },
    detail: 'Report → Impersonation / Harassment',
  },
  telemanas: {
    label: { en: 'Tele-MANAS (mental health support)', te: 'టెలి-మానస్ (మానసిక ఆరోగ్య మద్దతు)' },
    detail: '14416',
    tel: '14416',
  },
};
