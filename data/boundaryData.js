// Digital Boundary Planner — a small rule engine that builds a personalised checklist.

export const ITEMS = {
  // ------- Before
  b_share_plan: { en: 'Share who, where and when with a Trusted Circle member.', te: 'ఎవరితో, ఎక్కడ, ఎప్పుడు అనేది విశ్వసనీయ వలయంలోని ఒకరితో పంచుకోండి.' },
  b_verify: { en: 'Voice- or video-call them first; check their profile age, photos and mutual friends.', te: 'ముందుగా వాయిస్/వీడియో కాల్ చేయండి; వారి ప్రొఫైల్ వయసు, ఫోటోలు, పరస్పర మిత్రులను పరిశీలించండి.' },
  b_reverse_search: { en: 'Reverse-image-search their profile photos to check they are not stolen.', te: 'వారి ప్రొఫైల్ ఫోటోలు దొంగిలించినవి కాదని రివర్స్ ఇమేజ్ సెర్చ్‌తో చూడండి.' },
  b_public_place: { en: 'Pick a busy public place you know, with CCTV, light and exits.', te: 'మీకు తెలిసిన, CCTV, వెలుతురు, నిష్క్రమణ మార్గాలు ఉన్న రద్దీ ప్రజా ప్రదేశాన్ని ఎంచుకోండి.' },
  b_daylight: { en: 'Prefer daytime. If it is evening, pick a well-lit venue near transport.', te: 'పగటి సమయాన్ని ఇష్టపడండి. సాయంత్రమైతే రవాణా సౌకర్యం, వెలుతురు ఉన్న చోటు ఎంచుకోండి.' },
  b_own_transport: { en: 'Arrange your own transport both ways; do not accept a ride from them.', te: 'రెండు వైపులా మీ స్వంత రవాణా ఏర్పాటు చేసుకోండి; వారి వాహనంలో వెళ్లకండి.' },
  b_battery: { en: 'Charge your phone fully and carry a power bank.', te: 'ఫోన్‌ను పూర్తిగా ఛార్జ్ చేయండి; పవర్ బ్యాంక్ తీసుకెళ్లండి.' },
  b_safety_phrase: { en: 'Agree on a discreet safety phrase with your trusted contact (see Safety Phrases).', te: 'విశ్వసనీయ వ్యక్తితో రహస్య భద్రతా పదబంధాన్ని నిర్ణయించుకోండి (Safety Phrases చూడండి).' },
  b_live_share: { en: 'Turn on temporary location sharing with ONE trusted person only.', te: 'ఒక్క విశ్వసనీయ వ్యక్తితో మాత్రమే తాత్కాలిక లొకేషన్ షేరింగ్ ఆన్ చేయండి.' },
  b_limit_info: { en: 'Do not share your home address, workplace or daily routine.', te: 'ఇంటి చిరునామా, పని ప్రదేశం, దినచర్యను పంచుకోకండి.' },
  b_no_private: { en: 'Decide in advance not to go to a private place or accept drinks you did not see being made.', te: 'ప్రైవేట్ ప్రదేశానికి వెళ్లకూడదని, తయారుచేయడం చూడని పానీయాలు తీసుకోకూడదని ముందే నిర్ణయించుకోండి.' },
  b_checkin_times: { en: 'Set check-in times (for example 30 minutes after arriving, and when leaving).', te: 'చెక్-ఇన్ సమయాలు నిర్ణయించండి (ఉదా: చేరిన 30 నిమిషాలకు, బయలుదేరినప్పుడు).' },
  b_limits: { en: "Decide your limits beforehand. You don't owe anyone an explanation for saying no.", te: "మీ హద్దులను ముందే నిర్ణయించుకోండి. 'వద్దు' అనడానికి ఎవరికీ వివరణ ఇవ్వాల్సిన అవసరం లేదు." },
  // ------- During
  d_arrive_early: { en: 'Arrive a little early and choose a seat facing the entrance.', te: 'కాస్త ముందుగా చేరి, ప్రవేశ ద్వారం కనిపించే సీటు ఎంచుకోండి.' },
  d_keep_drink: { en: 'Keep your drink and belongings with you at all times.', te: 'మీ పానీయం, వస్తువులను ఎల్లప్పుడూ మీ దగ్గరే ఉంచుకోండి.' },
  d_trust_gut: { en: 'Trust your instincts. If it feels off, leave and use your safety phrase.', te: 'మీ అంతర్దృష్టిని నమ్మండి. తేడాగా అనిపిస్తే వెళ్లిపోండి, భద్రతా పదబంధాన్ని వాడండి.' },
  d_no_photos: { en: 'Do not share photos of your ID, ticket or home during the meetup.', te: 'కలిసే సమయంలో మీ ID, టికెట్ లేదా ఇంటి ఫోటోలను పంచుకోకండి.' },
  // ------- After
  a_checkin: { en: 'Message your trusted contact as soon as you are safely home.', te: 'ఇంటికి సురక్షితంగా చేరగానే విశ్వసనీయ వ్యక్తికి సందేశం పంపండి.' },
  a_review: { en: 'Note anything that felt wrong. Block and report if needed, and log it in an incident.', te: 'తేడాగా అనిపించినవి నోట్ చేయండి. అవసరమైతే బ్లాక్, రిపోర్ట్ చేసి, ఒక ఇన్సిడెంట్‌లో నమోదు చేయండి.' },
  // ------- Travel
  t_itinerary: { en: 'Share your itinerary and accommodation details with a Trusted Circle member.', te: 'మీ ప్రయాణ షెడ్యూల్, బస వివరాలను విశ్వసనీయ వలయంలోని ఒకరితో పంచుకోండి.' },
  t_verify_stay: { en: 'Check reviews and verified listings for your stay; avoid unverified lodging.', te: 'బస కోసం రివ్యూలు, ధృవీకరించిన లిస్టింగ్‌లను చూడండి; ధృవీకరించని లాడ్జింగ్‌లను నివారించండి.' },
  t_docs_copy: { en: 'Keep digital and paper copies of ID and tickets in separate places.', te: 'ID, టికెట్ల డిజిటల్, కాగితపు కాపీలను వేర్వేరు చోట్ల ఉంచండి.' },
  t_cab: { en: 'Book cabs through official apps; check the plate and driver, and share trip status.', te: 'అధికారిక యాప్‌ల ద్వారా క్యాబ్ బుక్ చేయండి; నంబర్ ప్లేట్, డ్రైవర్‌ను సరిచూడండి; ట్రిప్ స్టేటస్ పంచుకోండి.' },
  t_night_arrival: { en: 'Avoid very late arrivals; if unavoidable, pre-book a pickup.', te: 'అర్ధరాత్రి చేరికలను నివారించండి; తప్పనిసరైతే ముందే పికప్ బుక్ చేయండి.' },
  t_emergency_nums: { en: 'Save local emergency numbers and the nearest police station and hospital.', te: 'స్థానిక అత్యవసర నంబర్లు, సమీప పోలీస్ స్టేషన్, ఆసుపత్రి వివరాలను సేవ్ చేసుకోండి.' },
  t_room_lock: { en: 'On arrival, check room locks and exits and keep the door latched.', te: 'చేరగానే గది తాళాలు, నిష్క్రమణ మార్గాలను తనిఖీ చేసి, తలుపు గడియ వేసి ఉంచండి.' },
  t_connectivity: { en: 'Make sure your phone has working data/SIM and download offline maps.', te: 'ఫోన్‌లో డేటా/SIM పని చేస్తోందో చూసుకోండి; ఆఫ్‌లైన్ మ్యాప్‌లు డౌన్‌లోడ్ చేయండి.' },
  t_cash_backup: { en: 'Carry a small backup of cash and a spare payment method.', te: 'కొద్దిగా అదనపు నగదు, ప్రత్యామ్నాయ చెల్లింపు మార్గం ఉంచుకోండి.' },
  // ------- Marketplace
  m_public_exchange: { en: 'Meet at a busy public spot (store lobby, mall entrance); never at your home.', te: 'రద్దీగా ఉండే ప్రజా ప్రదేశంలో (స్టోర్ లాబీ, మాల్ ద్వారం) కలవండి; మీ ఇంట్లో ఎప్పుడూ కాదు.' },
  m_bring_someone: { en: 'Bring a friend, or tell someone the exact spot and time.', te: 'స్నేహితులను తీసుకెళ్లండి, లేదా ఖచ్చితమైన స్థలం, సమయం ఎవరికైనా చెప్పండి.' },
  m_no_advance: { en: 'Never pay an "advance" via a link, and never scan a QR code to RECEIVE money.', te: '"అడ్వాన్స్"ను లింక్ ద్వారా చెల్లించకండి, డబ్బు పొందడానికి QR కోడ్ ఎప్పుడూ స్కాన్ చేయకండి.' },
  m_verify_buyer: { en: "Check the other person's profile, reviews and number; be wary of urgency.", te: 'అవతలి వ్యక్తి ప్రొఫైల్, రివ్యూలు, నంబర్‌ను పరిశీలించండి; తొందర పెడితే జాగ్రత్త.' },
  m_verify_payment: { en: 'Confirm the payment in your own bank app before handing over the item.', te: 'వస్తువు ఇచ్చే ముందు మీ స్వంత బ్యాంక్ యాప్‌లో చెల్లింపును నిర్ధారించుకోండి.' },
  m_screenshot_chat: { en: 'Keep screenshots of the listing and chat until the deal is complete.', te: 'డీల్ పూర్తయ్యే వరకు లిస్టింగ్, చాట్ స్క్రీన్‌షాట్లు ఉంచుకోండి.' },
  m_no_courier: { en: 'Be wary of "army", "courier pickup" or "official" stories — common scam scripts.', te: '"ఆర్మీ", "కొరియర్ పికప్", "అధికారిక" కథలపై జాగ్రత్త — ఇవి సాధారణ స్కామ్ స్క్రిప్టులు.' },
};

export const SCENARIOS = {
  meetup: {
    icon: 'Coffee',
    title: { en: 'First meetup', te: 'మొదటి సమావేశం' },
    desc: { en: 'Meeting someone from online for the first time', te: 'ఆన్‌లైన్‌లో పరిచయమైన వారిని మొదటిసారి కలవడం' },
    before: ['b_share_plan', 'b_verify', 'b_public_place', 'b_battery', 'b_safety_phrase', 'b_limit_info', 'b_limits'],
    during: ['d_arrive_early', 'd_keep_drink', 'd_trust_gut'],
    after: ['a_checkin', 'a_review'],
  },
  travel: {
    icon: 'Plane',
    title: { en: 'Travel', te: 'ప్రయాణం' },
    desc: { en: 'A trip, commute or stay in an unfamiliar place', te: 'తెలియని చోటికి ప్రయాణం, వెళ్లడం లేదా బస' },
    before: ['t_itinerary', 't_verify_stay', 't_docs_copy', 't_emergency_nums', 't_connectivity', 'b_battery', 'b_live_share'],
    during: ['t_room_lock', 'd_trust_gut', 't_cash_backup'],
    after: ['a_checkin', 'a_review'],
  },
  marketplace: {
    icon: 'ShoppingBag',
    title: { en: 'Marketplace meeting', te: 'మార్కెట్‌ప్లేస్ సమావేశం' },
    desc: { en: 'Buying or selling an item in person', te: 'వస్తువు కొనడం/అమ్మడం కోసం కలవడం' },
    before: ['m_verify_buyer', 'm_public_exchange', 'm_no_advance', 'm_no_courier', 'b_share_plan', 'b_limit_info', 'm_screenshot_chat'],
    during: ['m_bring_someone', 'm_verify_payment', 'd_trust_gut'],
    after: ['a_checkin', 'a_review'],
  },
};

export const OPTIONS = {
  time: [
    { id: 'day', label: { en: 'Daytime', te: 'పగలు' }, points: 0 },
    { id: 'evening', label: { en: 'Evening', te: 'సాయంత్రం' }, points: 1 },
    { id: 'night', label: { en: 'Night', te: 'రాత్రి' }, points: 2 },
  ],
  venue: [
    { id: 'public', label: { en: 'Busy public place', te: 'రద్దీ ప్రజా ప్రదేశం' }, points: 0 },
    { id: 'semi', label: { en: 'Semi-public (quiet cafe, park)', te: 'అర్ధ-ప్రజా (నిశ్శబ్ద కేఫ్, పార్క్)' }, points: 1 },
    { id: 'private', label: { en: 'Private place / home', te: 'ప్రైవేట్ ప్రదేశం / ఇల్లు' }, points: 3 },
  ],
  familiarity: [
    { id: 'new', label: { en: 'Only met online', te: 'ఆన్‌లైన్‌లో మాత్రమే పరిచయం' }, points: 2 },
    { id: 'some', label: { en: 'Spoken a few times', te: 'కొన్నిసార్లు మాట్లాడాం' }, points: 1 },
    { id: 'known', label: { en: 'Verified / known by friends', te: 'ధృవీకరించిన / స్నేహితులకు తెలిసినవారు' }, points: 0 },
  ],
  transport: [
    { id: 'own', label: { en: 'My own vehicle', te: 'నా స్వంత వాహనం' }, points: 0 },
    { id: 'cab', label: { en: 'Cab / auto', te: 'క్యాబ్ / ఆటో' }, points: 1 },
    { id: 'public', label: { en: 'Public transport / walking', te: 'ప్రజా రవాణా / నడక' }, points: 1 },
    { id: 'theirs', label: { en: 'Their vehicle', te: 'వారి వాహనం' }, points: 3 },
  ],
  duration: [
    { id: 'short', label: { en: 'Under 2 hours', te: '2 గంటల లోపు' }, points: 0 },
    { id: 'half', label: { en: 'Half a day', te: 'సగం రోజు' }, points: 1 },
    { id: 'overnight', label: { en: 'Overnight / multi-day', te: 'రాత్రంతా / అనేక రోజులు' }, points: 2 },
  ],
  payment: [
    { id: 'cash', label: { en: 'Cash on meeting', te: 'కలిసినప్పుడు నగదు' }, points: 0 },
    { id: 'upi_after', label: { en: 'UPI after I verify', te: 'నేను ధృవీకరించాక UPI' }, points: 0 },
    { id: 'upi_before', label: { en: 'They want advance / QR first', te: 'ముందే అడ్వాన్స్ / QR అడుగుతున్నారు' }, points: 3 },
  ],
};

export function buildPlan(scenarioId, inputs) {
  const sc = SCENARIOS[scenarioId];
  const before = [...sc.before];
  const during = [...sc.during];
  const after = [...sc.after];
  const add = (list, id) => {
    if (!list.includes(id)) list.push(id);
  };

  if (inputs.time === 'night' || inputs.time === 'evening') {
    add(before, 'b_daylight');
    if (scenarioId === 'travel') add(before, 't_night_arrival');
    add(before, 'b_live_share');
  }
  if (inputs.venue === 'private' || inputs.venue === 'semi') {
    add(before, 'b_public_place');
    add(before, 'b_no_private');
    add(during, 'd_keep_drink');
  }
  if (inputs.familiarity === 'new') {
    add(before, 'b_verify');
    add(before, 'b_reverse_search');
    add(before, 'b_live_share');
  }
  if (inputs.transport === 'theirs' || inputs.transport === 'cab' || inputs.transport === 'public') {
    add(before, scenarioId === 'travel' ? 't_cab' : 'b_own_transport');
  }
  if (inputs.duration === 'overnight' || inputs.duration === 'half') {
    add(before, 'b_checkin_times');
    add(before, 'b_live_share');
  }
  if (scenarioId === 'marketplace' && inputs.payment === 'upi_before') {
    add(before, 'm_no_advance');
    add(during, 'm_verify_payment');
  }
  if (scenarioId !== 'marketplace') add(during, 'd_no_photos');

  let points = 0;
  ['time', 'venue', 'familiarity', 'transport', 'duration'].forEach((k) => {
    const opt = OPTIONS[k].find((o) => o.id === inputs[k]);
    if (opt) points += opt.points;
  });
  if (scenarioId === 'marketplace') {
    const opt = OPTIONS.payment.find((o) => o.id === inputs.payment);
    if (opt) points += opt.points;
  }
  const exposure = points <= 3 ? 'low' : points <= 7 ? 'medium' : 'high';

  return { before, during, after, exposure, points };
}
