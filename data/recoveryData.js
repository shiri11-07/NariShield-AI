// Emotional Recovery Companion content (bilingual).

export const RECOVERY_GROUPS = [
  {
    id: 'healing',
    icon: 'HeartPulse',
    title: { en: 'Recovery checklist', te: 'కోలుకునే చెక్‌లిస్ట్' },
    items: [
      { id: 'r_talk', text: { en: 'I talked to someone I trust about what happened', te: 'జరిగిన దాని గురించి నమ్మకమైన వారితో మాట్లాడాను' } },
      { id: 'r_report', text: { en: 'I filed a report (platform or cybercrime portal)', te: 'ఫిర్యాదు నమోదు చేశాను (ప్లాట్‌ఫారమ్ లేదా సైబర్‌క్రైమ్ పోర్టల్)' } },
      { id: 'r_evidence', text: { en: 'My evidence is saved in one safe place', te: 'నా ఆధారాలు ఒకే సురక్షిత ప్రదేశంలో భద్రపరిచాను' } },
      { id: 'r_break', text: { en: 'I took a screen break of a few hours', te: 'కొన్ని గంటల స్క్రీన్ విరామం తీసుకున్నాను' } },
      { id: 'r_rest', text: { en: 'I slept properly and ate a meal today', te: 'ఈ రోజు సరిగ్గా నిద్రపోయాను, భోజనం చేశాను' } },
      { id: 'r_pro', text: { en: 'I considered speaking to a counsellor or helpline', te: 'కౌన్సెలర్ లేదా హెల్ప్‌లైన్‌తో మాట్లాడడం గురించి ఆలోచించాను' } },
    ],
  },
  {
    id: 'security',
    icon: 'KeyRound',
    title: { en: 'Account security reminders', te: 'ఖాతా భద్రతా రిమైండర్లు' },
    items: [
      { id: 's_pw', text: { en: 'Changed passwords on my important accounts', te: 'ముఖ్యమైన ఖాతాల పాస్‌వర్డ్‌లు మార్చాను' } },
      { id: 's_2fa', text: { en: 'Turned on two-factor authentication', te: 'టూ-ఫ్యాక్టర్ ఆథెంటికేషన్ ఆన్ చేశాను' } },
      { id: 's_devices', text: { en: 'Logged out of unknown devices and sessions', te: 'తెలియని పరికరాలు, సెషన్ల నుండి లాగ్ అవుట్ అయ్యాను' } },
      { id: 's_privacy', text: { en: 'Reviewed privacy settings on social apps', te: 'సోషల్ యాప్‌లలో ప్రైవసీ సెట్టింగ్‌లు సమీక్షించాను' } },
      { id: 's_recovery', text: { en: 'Updated recovery email and phone numbers', te: 'రికవరీ ఇమెయిల్, ఫోన్ నంబర్లు నవీకరించాను' } },
      { id: 's_apps', text: { en: 'Removed apps with unneeded permissions', te: 'అనవసర అనుమతులున్న యాప్‌లను తొలగించాను' } },
      { id: 's_search', text: { en: 'Searched my own name to see what is public', te: 'నా పేరును సెర్చ్ చేసి ఏమి పబ్లిక్‌గా ఉందో చూశాను' } },
    ],
  },
  {
    id: 'wellbeing',
    icon: 'Sprout',
    title: { en: 'Digital wellbeing tips', te: 'డిజిటల్ శ్రేయస్సు చిట్కాలు' },
    items: [
      { id: 'w_filter', text: { en: 'Set up mute / keyword filters for unwanted content', te: 'అవాంఛిత కంటెంట్ కోసం మ్యూట్/కీవర్డ్ ఫిల్టర్లు ఏర్పాటు చేశాను' } },
      { id: 'w_notif', text: { en: 'Turned off notifications at night', te: 'రాత్రిపూట నోటిఫికేషన్‌లు ఆఫ్ చేశాను' } },
      { id: 'w_curate', text: { en: 'Followed supportive, uplifting accounts', te: 'ప్రోత్సాహకరమైన, సానుకూల ఖాతాలను ఫాలో అయ్యాను' } },
      { id: 'w_limit', text: { en: 'Set a daily limit on scrolling', te: 'రోజువారీ స్క్రోలింగ్‌పై పరిమితి పెట్టుకున్నాను' } },
      { id: 'w_good', text: { en: 'Noted one good thing from today', te: 'ఈ రోజు జరిగిన ఒక మంచి విషయాన్ని నోట్ చేశాను' } },
      { id: 'w_move', text: { en: 'Moved my body for ten minutes (walk / stretch)', te: 'పది నిమిషాలు శరీరాన్ని కదిలించాను (నడక/స్ట్రెచ్)' } },
    ],
  },
];

export const ENCOURAGEMENTS = [
  { en: 'What happened is not your fault. Asking for help is a strength, not a weakness.', te: 'జరిగిన దానిలో మీ తప్పు లేదు. సహాయం అడగడం బలహీనత కాదు, బలం.' },
  { en: 'You have already taken steps most people struggle to take. Be proud of that.', te: 'చాలామందికి కష్టమైన అడుగులను మీరు ఇప్పటికే వేశారు. దానికి గర్వపడండి.' },
  { en: 'Healing is not a straight line. A hard day does not erase your progress.', te: 'కోలుకోవడం సరళ రేఖ కాదు. కష్టమైన రోజు మీ పురోగతిని చెరిపేయదు.' },
  { en: 'You deserve to feel safe online and offline. Small steps still count.', te: 'ఆన్‌లైన్‌లో, ఆఫ్‌లైన్‌లో మీరు సురక్షితంగా ఉండటానికి అర్హులు. చిన్న అడుగులు కూడా లెక్కలోకి వస్తాయి.' },
  { en: 'You are not alone. The people in your Trusted Circle want to help.', te: 'మీరు ఒంటరి కాదు. మీ విశ్వసనీయ వలయంలోని వారు సహాయం చేయాలనుకుంటున్నారు.' },
  { en: 'Rest is productive. Your mind and body are doing hard work right now.', te: 'విశ్రాంతి కూడా ఉత్పాదకతే. మీ మనసు, శరీరం ఇప్పుడు కష్టపడి పనిచేస్తున్నాయి.' },
  { en: 'Your feelings are valid — anger, fear, numbness, all of them.', te: 'మీ భావాలు సహజమైనవే — కోపం, భయం, మొద్దుబారడం, అన్నీ.' },
];

export const PRIVACY_REMINDERS = [
  { en: 'Keep your evidence folder offline or in a locked folder — not in a shared album.', te: 'మీ ఆధారాల ఫోల్డర్‌ను ఆఫ్‌లైన్‌లో లేదా లాక్ చేసిన ఫోల్డర్‌లో ఉంచండి — షేర్డ్ ఆల్బమ్‌లో కాదు.' },
  { en: 'Blur phone numbers, emails and addresses in screenshots before sharing them with anyone.', te: 'స్క్రీన్‌షాట్లను ఎవరితోనైనా పంచే ముందు ఫోన్ నంబర్లు, ఇమెయిల్‌లు, చిరునామాలను బ్లర్ చేయండి.' },
  { en: 'Share your live location with one trusted person only — never publicly.', te: 'లైవ్ లొకేషన్‌ను ఒక్క విశ్వసనీయ వ్యక్తితోనే పంచుకోండి — బహిరంగంగా ఎప్పుడూ కాదు.' },
  { en: 'Use a different password for every important account and a password manager if you can.', te: 'ప్రతి ముఖ్యమైన ఖాతాకు వేర్వేరు పాస్‌వర్డ్ వాడండి; వీలైతే పాస్‌వర్డ్ మేనేజర్ వాడండి.' },
  { en: 'Review who can see your followers, tags and story replies every few months.', te: 'మీ ఫాలోవర్లు, ట్యాగ్‌లు, స్టోరీ రిప్లైలను ఎవరు చూడగలరో కొన్ని నెలలకోసారి సమీక్షించండి.' },
  { en: 'NariShield stores everything only in this browser. Clear data from Settings anytime.', te: 'NariShield అన్నింటినీ ఈ బ్రౌజర్‌లో మాత్రమే నిల్వ చేస్తుంది. ఎప్పుడైనా డేటాను తొలగించవచ్చు.' },
];
