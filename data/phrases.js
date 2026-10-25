// Safety Phrase Generator — discreet, pre-agreed phrases (demo only; nothing is ever sent).

export const INTENTS = [
  {
    id: 'leave',
    icon: 'DoorOpen',
    title: { en: 'I need an excuse to leave', te: 'వెళ్లిపోవడానికి ఒక సాకు కావాలి' },
    meaning: { en: "I'm uncomfortable. Call me with an urgent reason so I can leave.", te: 'నాకు అసౌకర్యంగా ఉంది. నేను వెళ్లిపోవడానికి అత్యవసర కారణంతో కాల్ చేయండి.' },
    phrases: [
      { en: 'Can you send me the blue notebook?', te: 'నీలం నోట్‌బుక్ పంపగలవా?' },
      { en: 'I forgot to switch off the stove at home.', te: 'ఇంట్లో స్టవ్ ఆపడం మర్చిపోయాను.' },
      { en: 'Amma is asking where I kept the keys.', te: 'తాళాలు ఎక్కడ పెట్టానని అమ్మ అడుగుతోంది.' },
    ],
  },
  {
    id: 'pickup',
    icon: 'Car',
    title: { en: 'Please come and get me', te: 'దయచేసి వచ్చి నన్ను తీసుకెళ్లండి' },
    meaning: { en: 'Come to my location and pick me up now.', te: 'నా వద్దకు వచ్చి ఇప్పుడే నన్ను తీసుకెళ్లండి.' },
    phrases: [
      { en: 'Did you feed the cat today?', te: 'ఈ రోజు పిల్లికి పాలు పెట్టావా?' },
      { en: 'Can you bring the black bag when you come?', te: 'నువ్వు వచ్చేటప్పుడు నల్ల బ్యాగ్ తీసుకురాగలవా?' },
      { en: 'Are we still having dinner at home tonight?', te: 'ఈ రాత్రి ఇంట్లోనే భోజనమా?' },
    ],
  },
  {
    id: 'call',
    icon: 'PhoneCall',
    title: { en: 'Call me right now', te: 'ఇప్పుడే నాకు కాల్ చేయండి' },
    meaning: { en: 'Please phone me immediately and keep me talking.', te: 'వెంటనే నాకు ఫోన్ చేసి మాట్లాడుతూ ఉండండి.' },
    phrases: [
      { en: 'Is the tea order still on for five?', te: 'ఐదు గంటలకు టీ ఆర్డర్ ఇంకా ఉందా?' },
      { en: 'Did you get my message about the fabric?', te: 'బట్ట గురించి నా సందేశం అందిందా?' },
      { en: "Can you check tomorrow's class timing for me?", te: 'రేపటి క్లాస్ సమయం చూసి చెబుతావా?' },
    ],
  },
  {
    id: 'unsafe',
    icon: 'TriangleAlert',
    title: { en: 'I feel unsafe here', te: 'ఇక్కడ నాకు అసురక్షితంగా ఉంది' },
    meaning: { en: 'I feel unsafe. Start our check-in plan and track my messages.', te: 'నాకు అసురక్షితంగా ఉంది. మన చెక్-ఇన్ ప్రణాళికను ప్రారంభించి నా సందేశాలను గమనించండి.' },
    phrases: [
      { en: "I think I left my charger at Aunt Lakshmi's.", te: 'నా ఛార్జర్ లక్ష్మీ ఆంటీ ఇంట్లో మర్చిపోయినట్లున్నాను.' },
      { en: 'The weather feels strange here today.', te: 'ఈ రోజు ఇక్కడ వాతావరణం వింతగా ఉంది.' },
      { en: 'It is getting chilly, I might need my shawl.', te: 'చలిగా ఉంది, నా శాలువా కావాలేమో.' },
    ],
  },
  {
    id: 'help',
    icon: 'LifeBuoy',
    title: { en: 'Send help / alert others', te: 'సహాయం పంపండి / ఇతరులను అప్రమత్తం చేయండి' },
    meaning: { en: 'I need urgent help. Alert the circle and call 112 if you cannot reach me.', te: 'నాకు అత్యవసర సహాయం కావాలి. వలయాన్ని అప్రమత్తం చేయండి; నన్ను చేరలేకపోతే 112కు కాల్ చేయండి.' },
    phrases: [
      { en: 'Please bring the green umbrella.', te: 'దయచేసి ఆకుపచ్చ గొడుగు తీసుకురండి.' },
      { en: 'I need the red folder urgently.', te: 'నాకు ఎర్ర ఫోల్డర్ అత్యవసరంగా కావాలి.' },
      { en: 'Can you water the tulasi plant for me tonight?', te: 'ఈ రాత్రి తులసి మొక్కకు నీళ్లు పోస్తావా?' },
    ],
  },
  {
    id: 'safe',
    icon: 'BadgeCheck',
    title: { en: "I'm safe — all clear", te: 'నేను సురక్షితంగా ఉన్నాను — అంతా బాగుంది' },
    meaning: { en: "I'm okay. No action needed.", te: 'నేను బాగున్నాను. ఏ చర్యా అవసరం లేదు.' },
    phrases: [
      { en: 'The mango pickle turned out great.', te: 'మామిడికాయ పచ్చడి చాలా బాగా కుదిరింది.' },
      { en: 'Everything is on schedule.', te: 'అంతా షెడ్యూల్ ప్రకారమే ఉంది.' },
      { en: 'Tell Amma the parcel has arrived.', te: 'పార్సెల్ వచ్చిందని అమ్మకు చెప్పు.' },
    ],
  },
];
