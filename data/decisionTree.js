// Dynamic Safety Decision Tree.
// Every path ends in a different outcome (different severity, steps, evidence list and resources).
// Node types: question { q, options: [{ label, next }] }  |  outcome { outcome: true, ... }

export const TREE_START = 'start';

export const START_OPTIONS_ICONS = {
  fp1: 'UserX',
  th1: 'Siren',
  sx1: 'EyeOff',
  st1: 'Footprints',
  ph1: 'MailWarning',
  hr1: 'MessageSquareWarning',
};

export const NODES = {
  // ------------------------------------------------------------------ START
  start: {
    q: { en: 'What best describes what is happening?', te: 'ఏం జరుగుతోందో ఏది ఉత్తమంగా వర్ణిస్తుంది?' },
    options: [
      { label: { en: 'Someone created a fake profile of me', te: 'ఎవరో నా నకిలీ ప్రొఫైల్ సృష్టించారు' }, next: 'fp1' },
      { label: { en: 'I am being threatened or blackmailed', te: 'నన్ను బెదిరిస్తున్నారు లేదా బ్లాక్‌మెయిల్ చేస్తున్నారు' }, next: 'th1' },
      { label: { en: 'My private photos or videos are being used against me', te: 'నా ప్రైవేట్ ఫోటోలు/వీడియోలు నాకు వ్యతిరేకంగా వాడుతున్నారు' }, next: 'sx1' },
      { label: { en: 'Someone is following or tracking me', te: 'ఎవరో నన్ను వెంబడిస్తున్నారు లేదా ట్రాక్ చేస్తున్నారు' }, next: 'st1' },
      { label: { en: 'A suspicious link, payment or OTP request', te: 'అనుమానాస్పద లింక్, చెల్లింపు లేదా OTP అభ్యర్థన' }, next: 'ph1' },
      { label: { en: 'I am receiving abusive or harassing messages', te: 'నాకు దుర్భాషలాడే లేదా వేధించే సందేశాలు వస్తున్నాయి' }, next: 'hr1' },
    ],
  },

  // ----------------------------------------------------------- FAKE PROFILE
  fp1: {
    q: { en: 'Are your photos being used on the fake profile?', te: 'నకిలీ ప్రొఫైల్‌లో మీ ఫోటోలు వాడుతున్నారా?' },
    options: [
      { label: { en: 'Yes, my photos are used', te: 'అవును, నా ఫోటోలు వాడుతున్నారు' }, next: 'fp2' },
      { label: { en: 'No, not my photos', te: 'కాదు, నా ఫోటోలు కాదు' }, next: 'fp3' },
    ],
  },
  fp2: {
    q: {
      en: 'Is money or a favour being demanded — from you or from your contacts?',
      te: 'డబ్బు లేదా ఫేవర్ అడుగుతున్నారా — మీ నుండి లేదా మీ కాంటాక్ట్‌ల నుండి?',
    },
    options: [
      { label: { en: 'Yes, money / favours are being asked', te: 'అవును, డబ్బు/ఫేవర్లు అడుగుతున్నారు' }, next: 'o_fp_money' },
      { label: { en: 'No, no money is involved', te: 'లేదు, డబ్బు ప్రమేయం లేదు' }, next: 'o_fp_photos' },
    ],
  },
  fp3: {
    q: { en: 'What is the fake profile doing?', te: 'నకిలీ ప్రొఫైల్ ఏం చేస్తోంది?' },
    options: [
      { label: { en: 'Pretending to be me (my name / details)', te: 'నా పేరు/వివరాలతో నాలా నటిస్తోంది' }, next: 'o_fp_name' },
      { label: { en: 'Posting abusive or false content about me', te: 'నా గురించి దూషణ లేదా తప్పుడు కంటెంట్ పోస్ట్ చేస్తోంది' }, next: 'o_fp_defame' },
    ],
  },

  o_fp_money: {
    outcome: true,
    category: 'fake_profile',
    severity: 'high',
    title: { en: 'Impersonation scam in progress', te: 'ఇంపర్సనేషన్ స్కామ్ జరుగుతోంది' },
    summary: {
      en: 'Your identity is being used to extract money. Time matters: alert your contacts first so nobody pays, then report.',
      te: 'మీ గుర్తింపును ఉపయోగించి డబ్బు వసూలు చేస్తున్నారు. సమయం కీలకం: ఎవరూ చెల్లించకుండా ముందు మీ కాంటాక్ట్‌లను హెచ్చరించండి, తర్వాత ఫిర్యాదు చేయండి.',
    },
    steps: ['save_url', 'screenshots', 'warn_contacts', 'call_1930', 'report_platform', 'report_cyber', 'secure_accounts'],
    evidence: ['ev_url', 'ev_screens', 'ev_username', 'ev_payment', 'ev_original'],
    resources: ['cybercrime', 'h1930', 'platform'],
  },
  o_fp_photos: {
    outcome: true,
    category: 'fake_profile',
    severity: 'medium',
    title: { en: 'Photo misuse / identity misuse', te: 'ఫోటోల దుర్వినియోగం / గుర్తింపు దుర్వినియోగం' },
    summary: {
      en: 'Your photos are used without consent but no money is involved yet. Document and report quickly, before the profile gains followers.',
      te: 'మీ ఫోటోలు అనుమతి లేకుండా వాడుతున్నారు, కానీ ఇంకా డబ్బు ప్రమేయం లేదు. ప్రొఫైల్‌కు ఫాలోవర్లు పెరిగే ముందే నమోదు చేసి ఫిర్యాదు చేయండి.',
    },
    steps: ['save_url', 'screenshots', 'report_platform', 'lock_profile', 'warn_contacts', 'report_cyber', 'tell_trusted'],
    evidence: ['ev_url', 'ev_screens', 'ev_username', 'ev_original', 'ev_reports'],
    resources: ['platform', 'cybercrime'],
  },
  o_fp_name: {
    outcome: true,
    category: 'fake_profile',
    severity: 'medium',
    title: { en: 'Name-only impersonation', te: 'పేరు మాత్రమే వాడే ఇంపర్సనేషన్' },
    summary: {
      en: "Someone uses your name or details without your photos. Platforms treat this as impersonation — a clear report with proof of who you are usually works.",
      te: 'ఎవరో మీ ఫోటోలు లేకుండా మీ పేరు/వివరాలు వాడుతున్నారు. ప్లాట్‌ఫారమ్‌లు దీన్ని ఇంపర్సనేషన్‌గా పరిగణిస్తాయి — మీరు ఎవరో రుజువుతో స్పష్టమైన ఫిర్యాదు సాధారణంగా ఫలిస్తుంది.',
    },
    steps: ['save_url', 'screenshots', 'report_platform', 'lock_profile', 'dont_engage', 'warn_contacts'],
    evidence: ['ev_url', 'ev_screens', 'ev_username', 'ev_reports'],
    resources: ['platform', 'cybercrime'],
  },
  o_fp_defame: {
    outcome: true,
    category: 'fake_profile',
    severity: 'high',
    title: { en: 'Targeted fake content about you', te: 'మీ గురించి లక్ష్యంగా చేసిన నకిలీ కంటెంట్' },
    summary: {
      en: 'The profile is being used to damage your reputation. Preserve every post, report it as harassment, and consider a formal complaint.',
      te: 'మీ పేరు చెడగొట్టడానికి ప్రొఫైల్ వాడుతున్నారు. ప్రతి పోస్ట్‌ను భద్రపరచండి, వేధింపులుగా రిపోర్ట్ చేయండి, అధికారిక ఫిర్యాదు పరిశీలించండి.',
    },
    steps: ['save_url', 'screenshots', 'dont_engage', 'report_platform', 'report_cyber', 'legal_notice', 'tell_trusted', 'support_wellbeing'],
    evidence: ['ev_url', 'ev_screens', 'ev_username', 'ev_pattern', 'ev_witness'],
    resources: ['platform', 'cybercrime', 'h1091'],
  },

  // ------------------------------------------------------ THREAT / BLACKMAIL
  th1: {
    q: {
      en: 'Is there a threat of physical harm to you or your family?',
      te: 'మీకు లేదా మీ కుటుంబానికి శారీరక హాని చేస్తామనే బెదిరింపు ఉందా?',
    },
    options: [
      { label: { en: 'Yes, physical harm is threatened', te: 'అవును, శారీరక హాని బెదిరింపు ఉంది' }, next: 'o_th_phys' },
      { label: { en: 'No, not physical harm', te: 'లేదు, శారీరక హాని కాదు' }, next: 'th2' },
    ],
  },
  th2: {
    q: {
      en: 'Are they demanding money, favours, or something in return for silence?',
      te: 'మౌనంగా ఉండడానికి బదులుగా డబ్బు, ఫేవర్లు లేదా మరేదైనా డిమాండ్ చేస్తున్నారా?',
    },
    options: [
      { label: { en: 'Yes, they want something', te: 'అవును, ఏదో కావాలంటున్నారు' }, next: 'th3' },
      { label: { en: 'No demand, just threats', te: 'డిమాండ్ లేదు, బెదిరింపులు మాత్రమే' }, next: 'o_th_abuse' },
    ],
  },
  th3: {
    q: {
      en: 'Do they claim to have private photos, videos or secrets about you?',
      te: 'మీ గురించిన ప్రైవేట్ ఫోటోలు, వీడియోలు లేదా రహస్యాలు తమ వద్ద ఉన్నాయని చెబుతున్నారా?',
    },
    options: [
      { label: { en: 'Yes, private images / videos', te: 'అవును, ప్రైవేట్ ఫోటోలు/వీడియోలు' }, next: 'o_sextortion' },
      { label: { en: 'No, something else (secrets, claims, dues)', te: 'కాదు, వేరేది (రహస్యాలు, ఆరోపణలు, బాకీలు)' }, next: 'o_blackmail' },
    ],
  },

  o_th_phys: {
    outcome: true,
    category: 'threat',
    severity: 'critical',
    title: { en: 'Immediate safety comes first', te: 'తక్షణ భద్రతే ముందు' },
    summary: {
      en: 'A threat of physical harm is an emergency. Get to a safe place near other people, call for help, and collect evidence only when you are safe.',
      te: 'శారీరక హాని బెదిరింపు అత్యవసర పరిస్థితి. ఇతరులు ఉన్న సురక్షిత ప్రదేశానికి చేరండి, సహాయం కోసం కాల్ చేయండి; సురక్షితంగా ఉన్నాకే ఆధారాలు సేకరించండి.',
    },
    steps: ['call_112', 'tell_trusted', 'screenshots', 'save_url', 'visit_police', 'report_cyber', 'vary_routine'],
    evidence: ['ev_threat_text', 'ev_phone', 'ev_screens', 'ev_dates', 'ev_audio'],
    resources: ['e112', 'h1091', 'cybercrime'],
  },
  o_th_abuse: {
    outcome: true,
    category: 'threat',
    severity: 'high',
    title: { en: 'Threats without demands', te: 'డిమాండ్ లేని బెదిరింపులు' },
    summary: {
      en: 'Intimidation without a demand is still harassment. Do not respond, preserve everything, and report — patterns matter.',
      te: 'డిమాండ్ లేని భయపెట్టడం కూడా వేధింపే. స్పందించకండి, అన్నీ భద్రపరచండి, రిపోర్ట్ చేయండి — తీరు (pattern) ముఖ్యం.',
    },
    steps: ['dont_engage', 'screenshots', 'save_url', 'report_platform', 'report_cyber', 'tell_trusted', 'block_after'],
    evidence: ['ev_threat_text', 'ev_phone', 'ev_screens', 'ev_dates'],
    resources: ['cybercrime', 'platform', 'h1091'],
  },
  o_sextortion: {
    outcome: true,
    category: 'sextortion',
    severity: 'critical',
    title: { en: 'Sextortion / intimate-content blackmail', te: 'సెక్స్‌టార్షన్ / ప్రైవేట్ కంటెంట్ బ్లాక్‌మెయిల్' },
    summary: {
      en: 'Someone is using private images to pressure you. It is a crime and not your fault. Do not pay or send anything more — block the leverage, not yourself.',
      te: 'ఎవరో ప్రైవేట్ చిత్రాలతో మిమ్మల్ని ఒత్తిడి చేస్తున్నారు. ఇది నేరం, మీ తప్పు కాదు. చెల్లించకండి, ఇంకేమీ పంపకండి — వారి బలాన్ని అడ్డుకోండి, మిమ్మల్ని మీరు కాదు.',
    },
    steps: ['dont_pay', 'dont_engage', 'screenshots', 'save_url', 'stopncii', 'report_cyber', 'tell_trusted', 'secure_accounts', 'support_wellbeing'],
    evidence: ['ev_screens', 'ev_username', 'ev_phone', 'ev_payment', 'ev_dates'],
    resources: ['cybercrime', 'stopncii', 'h1930', 'h1091'],
  },
  o_blackmail: {
    outcome: true,
    category: 'blackmail',
    severity: 'high',
    title: { en: 'Blackmail for money or favours', te: 'డబ్బు లేదా ఫేవర్ల కోసం బ్లాక్‌మెయిల్' },
    summary: {
      en: 'Blackmailers count on panic and secrecy. Do not pay, keep every message, and report — you are likely not the only target.',
      te: 'బ్లాక్‌మెయిలర్లు భయం, గోప్యతపై ఆధారపడతారు. చెల్లించకండి, ప్రతి సందేశాన్ని ఉంచండి, ఫిర్యాదు చేయండి — మీరు ఒక్కరే లక్ష్యం కాకపోవచ్చు.',
    },
    steps: ['dont_pay', 'dont_engage', 'dont_delete', 'screenshots', 'report_cyber', 'call_1930', 'tell_trusted'],
    evidence: ['ev_threat_text', 'ev_phone', 'ev_payment', 'ev_dates'],
    resources: ['cybercrime', 'h1930', 'h1091'],
  },

  // ------------------------------------------------------------ INTIMATE IMAGES
  sx1: {
    q: {
      en: 'What is the situation with the images or videos?',
      te: 'చిత్రాలు లేదా వీడియోల పరిస్థితి ఏమిటి?',
    },
    options: [
      { label: { en: 'They have already been shared or posted', te: 'అవి ఇప్పటికే పంచబడ్డాయి లేదా పోస్ట్ చేయబడ్డాయి' }, next: 'o_sx_leaked' },
      { label: { en: 'Someone is threatening to share them', te: 'ఎవరో వాటిని పంచుతామని బెదిరిస్తున్నారు' }, next: 'sx2' },
      { label: { en: 'Someone in them is under 18', te: 'వాటిలో ఉన్నవారు 18 ఏళ్ల లోపు వారు' }, next: 'o_sx_minor' },
    ],
  },
  sx2: {
    q: { en: 'Is the person asking for money or more images?', te: 'ఆ వ్యక్తి డబ్బు లేదా మరిన్ని చిత్రాలు అడుగుతున్నారా?' },
    options: [
      { label: { en: 'Yes, money or more images', te: 'అవును, డబ్బు లేదా మరిన్ని చిత్రాలు' }, next: 'o_sx_demand' },
      { label: { en: 'No, only the threat so far', te: 'లేదు, ఇప్పటివరకు బెదిరింపు మాత్రమే' }, next: 'o_sx_threat' },
    ],
  },
  o_sx_leaked: {
    outcome: true,
    category: 'sextortion',
    severity: 'critical',
    title: { en: 'Images already shared — act on takedown', te: 'చిత్రాలు ఇప్పటికే పంచబడ్డాయి — తొలగింపుపై చర్య తీసుకోండి' },
    summary: {
      en: 'Focus on stopping the spread: hash the images with StopNCII, request takedowns, and file a complaint. You are not to blame.',
      te: 'వ్యాప్తిని ఆపడంపై దృష్టి పెట్టండి: StopNCIIతో చిత్రాలను హ్యాష్ చేయండి, తొలగింపు కోరండి, ఫిర్యాదు చేయండి. మీ తప్పు లేదు.',
    },
    steps: ['screenshots', 'save_url', 'stopncii', 'takedown', 'report_cyber', 'tell_trusted', 'secure_accounts', 'support_wellbeing'],
    evidence: ['ev_url', 'ev_screens', 'ev_username', 'ev_reports'],
    resources: ['stopncii', 'cybercrime', 'h1091'],
  },
  o_sx_minor: {
    outcome: true,
    category: 'sextortion',
    severity: 'critical',
    title: { en: 'A minor is involved', te: '18 ఏళ్ల లోపు వారు ప్రమేయం ఉంది' },
    summary: {
      en: 'Images of anyone under 18 are treated with the highest seriousness. Do not forward or keep copies — contact Childline and report right away.',
      te: '18 ఏళ్ల లోపు వారి చిత్రాలను అత్యంత తీవ్రంగా పరిగణిస్తారు. వాటిని ఫార్వర్డ్ చేయకండి, కాపీలు ఉంచకండి — చైల్డ్‌లైన్‌ను సంప్రదించి వెంటనే ఫిర్యాదు చేయండి.',
    },
    steps: ['childline', 'no_forward', 'report_cyber', 'tell_trusted', 'dont_engage', 'support_wellbeing'],
    evidence: ['ev_url', 'ev_username', 'ev_phone'],
    resources: ['childline', 'cybercrime', 'e112'],
  },
  o_sx_demand: {
    outcome: true,
    category: 'sextortion',
    severity: 'critical',
    title: { en: 'Sextortion with demands', te: 'డిమాండ్లతో సెక్స్‌టార్షన్' },
    summary: {
      en: 'Demands for money or more images only grow if you comply. Stop all contact, preserve proof, and report immediately.',
      te: 'డబ్బు లేదా మరిన్ని చిత్రాల డిమాండ్లు మీరు అంగీకరిస్తే పెరుగుతూనే ఉంటాయి. అన్ని సంప్రదింపులు ఆపండి, రుజువులు భద్రపరచండి, వెంటనే ఫిర్యాదు చేయండి.',
    },
    steps: ['dont_pay', 'dont_engage', 'screenshots', 'save_url', 'stopncii', 'report_cyber', 'call_1930', 'tell_trusted', 'secure_accounts'],
    evidence: ['ev_screens', 'ev_username', 'ev_phone', 'ev_payment', 'ev_dates'],
    resources: ['cybercrime', 'stopncii', 'h1930', 'h1091'],
  },
  o_sx_threat: {
    outcome: true,
    category: 'sextortion',
    severity: 'high',
    title: { en: 'Threat to share private images', te: 'ప్రైవేట్ చిత్రాలు పంచుతామనే బెదిరింపు' },
    summary: {
      en: 'No demand yet, but the threat itself is serious. Act early: pre-emptively hash the images, secure accounts and report.',
      te: 'ఇంకా డిమాండ్ లేదు, కానీ బెదిరింపే తీవ్రం. ముందే చర్య తీసుకోండి: చిత్రాలను ముందస్తుగా హ్యాష్ చేయండి, ఖాతాలను భద్రపరచండి, ఫిర్యాదు చేయండి.',
    },
    steps: ['dont_engage', 'screenshots', 'save_url', 'stopncii', 'report_cyber', 'secure_accounts', 'tell_trusted'],
    evidence: ['ev_screens', 'ev_username', 'ev_phone', 'ev_dates'],
    resources: ['cybercrime', 'stopncii', 'h1091'],
  },

  // --------------------------------------------------------------- STALKING
  st1: {
    q: {
      en: 'Is this someone you know — an ex-partner, colleague or acquaintance?',
      te: 'ఇది మీకు తెలిసిన వ్యక్తా — మాజీ భాగస్వామి, సహోద్యోగి లేదా పరిచయస్థుడా?',
    },
    options: [
      { label: { en: 'Yes, I know them', te: 'అవును, నాకు తెలుసు' }, next: 'st2' },
      { label: { en: 'No, a stranger or unknown', te: 'కాదు, అపరిచితుడు లేదా తెలియదు' }, next: 'st3' },
    ],
  },
  st2: {
    q: { en: 'Have you clearly told them to stop?', te: 'ఆపమని మీరు స్పష్టంగా చెప్పారా?' },
    options: [
      { label: { en: 'Yes, and they continue', te: 'అవును, అయినా కొనసాగిస్తున్నారు' }, next: 'o_st_persist' },
      { label: { en: 'Not yet', te: 'ఇంకా లేదు' }, next: 'o_st_first' },
    ],
  },
  st3: {
    q: {
      en: 'Do you suspect your phone, accounts or belongings are being tracked?',
      te: 'మీ ఫోన్, ఖాతాలు లేదా వస్తువులు ట్రాక్ చేయబడుతున్నాయని అనుమానమా?',
    },
    options: [
      { label: { en: 'Yes — device or account tracking', te: 'అవును — పరికరం లేదా ఖాతా ట్రాకింగ్' }, next: 'o_st_device' },
      { label: { en: 'No — they follow me online or in person', te: 'కాదు — ఆన్‌లైన్‌లో లేదా ప్రత్యక్షంగా వెంబడిస్తున్నారు' }, next: 'o_st_stranger' },
    ],
  },
  o_st_persist: {
    outcome: true,
    category: 'stalking',
    severity: 'high',
    title: { en: 'Known person persisting after a clear "stop"', te: 'స్పష్టంగా "ఆపు" అన్నా కొనసాగిస్తున్న తెలిసిన వ్యక్తి' },
    summary: {
      en: 'Continued contact after a clear refusal is stalking. Build a dated record, involve your Trusted Circle, and move toward a formal complaint or legal notice.',
      te: 'స్పష్టమైన తిరస్కరణ తర్వాత కూడా సంప్రదించడం స్టాకింగ్. తేదీలతో రికార్డు తయారు చేయండి, విశ్వసనీయ వలయాన్ని భాగం చేయండి, అధికారిక ఫిర్యాదు లేదా లీగల్ నోటీసు వైపు వెళ్లండి.',
    },
    steps: ['dont_delete', 'screenshots', 'save_url', 'tell_trusted', 'legal_notice', 'report_cyber', 'visit_police', 'vary_routine', 'secure_accounts'],
    evidence: ['ev_pattern', 'ev_dates', 'ev_screens', 'ev_witness', 'ev_audio'],
    resources: ['cybercrime', 'h1091', 'e112'],
  },
  o_st_first: {
    outcome: true,
    category: 'stalking',
    severity: 'medium',
    title: { en: 'Set a clear boundary first', te: 'ముందుగా స్పష్టమైన హద్దు పెట్టండి' },
    summary: {
      en: 'A single, calm "do not contact me" message creates a clear line and a record. After that, no replies — document any further contact.',
      te: 'ఒకే ఒక ప్రశాంతమైన "నన్ను సంప్రదించకండి" సందేశం స్పష్టమైన హద్దును, రికార్డును ఇస్తుంది. ఆ తర్వాత స్పందించవద్దు — మరింత సంప్రదింపులను నమోదు చేయండి.',
    },
    steps: ['boundary_msg', 'screenshots', 'dont_engage', 'tell_trusted', 'lock_profile', 'vary_routine'],
    evidence: ['ev_screens', 'ev_dates', 'ev_pattern'],
    resources: ['h1091', 'cybercrime'],
  },
  o_st_device: {
    outcome: true,
    category: 'stalking',
    severity: 'high',
    title: { en: 'Possible device or account tracking', te: 'పరికరం లేదా ఖాతా ట్రాకింగ్ అయ్యే అవకాశం' },
    summary: {
      en: 'Record what you find before changing anything (the tracker may alert the stalker). Then clean your devices and accounts from a safe device.',
      te: 'ఏదైనా మార్చే ముందు కనుగొన్నదాన్ని నమోదు చేయండి (ట్రాకర్ స్టాకర్‌ను అప్రమత్తం చేయవచ్చు). తర్వాత సురక్షిత పరికరం నుండి మీ పరికరాలు, ఖాతాలను శుభ్రం చేయండి.',
    },
    steps: ['dont_delete', 'scan_device', 'location_share', 'secure_accounts', 'tell_trusted', 'report_cyber', 'visit_police'],
    evidence: ['ev_device', 'ev_screens', 'ev_pattern'],
    resources: ['cybercrime', 'h1091'],
  },
  o_st_stranger: {
    outcome: true,
    category: 'stalking',
    severity: 'high',
    title: { en: 'Unknown person following you', te: 'అపరిచితుడు మిమ్మల్ని వెంబడిస్తున్నాడు' },
    summary: {
      en: 'Make your routine less predictable, keep people informed of your movements, and log every sighting with date, time and place.',
      te: 'మీ దినచర్యను ఊహించలేని విధంగా మార్చండి, మీ కదలికల గురించి ఇతరులకు తెలియజేయండి, ప్రతి సంఘటనను తేదీ, సమయం, ప్రదేశంతో నమోదు చేయండి.',
    },
    steps: ['vary_routine', 'tell_trusted', 'dont_engage', 'screenshots', 'report_cyber', 'visit_police'],
    evidence: ['ev_pattern', 'ev_dates', 'ev_screens', 'ev_witness'],
    resources: ['h1091', 'cybercrime', 'e112'],
  },

  // ------------------------------------------------------- PHISHING / SCAM
  ph1: {
    q: { en: 'How far did it go?', te: 'ఇది ఎంతవరకు వెళ్లింది?' },
    options: [
      { label: { en: 'I only received it — I have not acted', te: 'నాకు వచ్చింది మాత్రమే — నేను ఏమీ చేయలేదు' }, next: 'o_ph_safe' },
      { label: { en: 'I clicked a link or entered details', te: 'నేను లింక్ క్లిక్ చేశాను లేదా వివరాలు నమోదు చేశాను' }, next: 'o_ph_clicked' },
      { label: { en: 'I shared an OTP or paid money', te: 'నేను OTP పంచుకున్నాను లేదా డబ్బు చెల్లించాను' }, next: 'o_ph_paid' },
    ],
  },
  o_ph_safe: {
    outcome: true,
    category: 'phishing',
    severity: 'low',
    title: { en: 'Good catch — contain and report', te: 'బాగా గుర్తించారు — అరికట్టి రిపోర్ట్ చేయండి' },
    summary: {
      en: 'You stopped it in time. Do not click anything, verify only through official channels, and report so others are protected too.',
      te: 'మీరు సమయానికి ఆపారు. ఏదీ క్లిక్ చేయకండి, అధికారిక మార్గాల ద్వారానే ధృవీకరించండి, ఇతరులు కూడా రక్షించబడేలా రిపోర్ట్ చేయండి.',
    },
    steps: ['dont_click', 'screenshots', 'verify_official', 'report_phishing', 'block_after'],
    evidence: ['ev_link', 'ev_phone', 'ev_dates'],
    resources: ['cybercrime', 'platform'],
  },
  o_ph_clicked: {
    outcome: true,
    category: 'phishing',
    severity: 'high',
    title: { en: 'Possible credential exposure', te: 'ఆధారాలు బహిర్గతమై ఉండవచ్చు' },
    summary: {
      en: 'Treat entered details as compromised. Change passwords right now, secure your bank, and report before anything is misused.',
      te: 'నమోదు చేసిన వివరాలు రాజీపడినట్లుగా భావించండి. ఇప్పుడే పాస్‌వర్డ్‌లు మార్చండి, బ్యాంక్‌ను భద్రపరచండి, దుర్వినియోగం కాకముందే రిపోర్ట్ చేయండి.',
    },
    steps: ['change_pw_now', 'secure_accounts', 'bank_block', 'screenshots', 'report_phishing', 'report_cyber'],
    evidence: ['ev_link', 'ev_screens', 'ev_dates'],
    resources: ['cybercrime', 'h1930'],
  },
  o_ph_paid: {
    outcome: true,
    category: 'phishing',
    severity: 'critical',
    title: { en: 'Money or OTP already shared', te: 'డబ్బు లేదా OTP ఇప్పటికే పంచబడింది' },
    summary: {
      en: 'Minutes count. Call 1930 and your bank right now — quick reporting can help freeze the money.',
      te: 'నిమిషాలే కీలకం. ఇప్పుడే 1930కు, మీ బ్యాంకుకు కాల్ చేయండి — త్వరగా ఫిర్యాదు చేస్తే డబ్బును నిలిపివేయడానికి అవకాశం ఉంటుంది.',
    },
    steps: ['call_1930', 'bank_block', 'change_pw_now', 'screenshots', 'report_cyber', 'tell_trusted'],
    evidence: ['ev_payment', 'ev_link', 'ev_phone', 'ev_screens'],
    resources: ['h1930', 'cybercrime'],
  },

  // ------------------------------------------------------------- HARASSMENT
  hr1: {
    q: { en: 'Who is sending the messages?', te: 'సందేశాలు ఎవరు పంపుతున్నారు?' },
    options: [
      { label: { en: 'Someone I know', te: 'నాకు తెలిసిన వ్యక్తి' }, next: 'hr2' },
      { label: { en: 'A stranger or anonymous account', te: 'అపరిచితుడు లేదా అజ్ఞాత ఖాతా' }, next: 'o_hr_stranger' },
      { label: { en: 'Many accounts at once (a pile-on)', te: 'ఒకేసారి చాలా ఖాతాలు (గుంపు దాడి)' }, next: 'o_hr_mob' },
    ],
  },
  hr2: {
    q: {
      en: 'Are the messages sexual, or targeting you for who you are?',
      te: 'సందేశాలు లైంగికంగా ఉన్నాయా లేదా మీరు ఎవరో అనే కారణంగా లక్ష్యంగా చేసుకున్నవా?',
    },
    options: [
      { label: { en: 'Yes, sexual or identity-based', te: 'అవును, లైంగిక లేదా గుర్తింపు ఆధారిత' }, next: 'o_hr_sexual' },
      { label: { en: 'No, rude / insulting but not sexual', te: 'కాదు, అసభ్యంగా/అవమానకరంగా ఉన్నా లైంగికం కాదు' }, next: 'o_hr_known' },
    ],
  },
  o_hr_sexual: {
    outcome: true,
    category: 'harassment',
    severity: 'high',
    title: { en: 'Sexual harassment by a known person', te: 'తెలిసిన వ్యక్తి చేస్తున్న లైంగిక వేధింపులు' },
    summary: {
      en: 'Sexual or identity-based harassment can be reported through several routes at once — platform, Internal Committee and cybercrime portal. Document first.',
      te: 'లైంగిక లేదా గుర్తింపు ఆధారిత వేధింపులను ఒకేసారి అనేక మార్గాల్లో — ప్లాట్‌ఫారమ్, ఇంటర్నల్ కమిటీ, సైబర్‌క్రైమ్ పోర్టల్ — ఫిర్యాదు చేయవచ్చు. ముందు నమోదు చేయండి.',
    },
    steps: ['screenshots', 'save_url', 'boundary_msg', 'report_platform', 'report_internal', 'report_cyber', 'tell_trusted', 'support_wellbeing'],
    evidence: ['ev_screens', 'ev_dates', 'ev_pattern', 'ev_witness'],
    resources: ['cybercrime', 'platform', 'h1091'],
  },
  o_hr_known: {
    outcome: true,
    category: 'harassment',
    severity: 'medium',
    title: { en: 'Rude or insulting messages from someone you know', te: 'తెలిసిన వ్యక్తి నుండి అసభ్య/అవమానకర సందేశాలు' },
    summary: {
      en: 'Set one clear boundary, reduce exposure with mute/restrict, and keep a record in case it escalates.',
      te: 'ఒక స్పష్టమైన హద్దు పెట్టండి, మ్యూట్/రిస్ట్రిక్ట్‌తో ఎక్స్‌పోజర్ తగ్గించండి, పరిస్థితి ముదిరితే అవసరమయ్యేలా రికార్డు ఉంచండి.',
    },
    steps: ['screenshots', 'boundary_msg', 'mute_filter', 'tell_trusted', 'report_platform'],
    evidence: ['ev_screens', 'ev_dates', 'ev_pattern'],
    resources: ['platform', 'cybercrime'],
  },
  o_hr_stranger: {
    outcome: true,
    category: 'harassment',
    severity: 'medium',
    title: { en: 'Anonymous or stranger harassment', te: 'అజ్ఞాత లేదా అపరిచిత వేధింపులు' },
    summary: {
      en: "Don't engage. Capture the handle, report it, then block and tighten your privacy so they can't reach you again.",
      te: 'స్పందించకండి. హ్యాండిల్‌ను నమోదు చేయండి, రిపోర్ట్ చేయండి, తర్వాత బ్లాక్ చేసి ప్రైవసీని కఠినం చేయండి, తద్వారా వారు మళ్లీ చేరలేరు.',
    },
    steps: ['screenshots', 'save_url', 'dont_engage', 'report_platform', 'block_after', 'lock_profile', 'mute_filter'],
    evidence: ['ev_screens', 'ev_username', 'ev_dates'],
    resources: ['platform', 'cybercrime'],
  },
  o_hr_mob: {
    outcome: true,
    category: 'harassment',
    severity: 'high',
    title: { en: 'Coordinated pile-on', te: 'సమన్వయంతో గుంపు దాడి' },
    summary: {
      en: 'Many accounts at once usually means coordination. Record the pattern, report in bulk, lean on filters, and lean on people who care about you.',
      te: 'ఒకేసారి అనేక ఖాతాలంటే సాధారణంగా సమన్వయం ఉంటుంది. తీరును నమోదు చేయండి, ఒకేసారి రిపోర్ట్ చేయండి, ఫిల్టర్లు వాడండి, మీ గురించి పట్టించుకునే వారిపై ఆధారపడండి.',
    },
    steps: ['screenshots', 'save_url', 'dont_engage', 'report_mob', 'mute_filter', 'lock_profile', 'tell_trusted', 'support_wellbeing', 'report_cyber'],
    evidence: ['ev_url', 'ev_screens', 'ev_pattern', 'ev_username'],
    resources: ['platform', 'cybercrime', 'h1091'],
  },
};

export function getNode(id) {
  return NODES[id] || null;
}
