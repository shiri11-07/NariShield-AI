import { daysAgo } from '../utils/ids';

// Fictional demo incidents (all names, handles and numbers are made up).
export function buildDemoIncidents() {
  return [
    {
      id: 'demo_fake_insta',
      demo: true,
      title: 'Fake Instagram profile using my photos',
      category: 'fake_profile',
      severity: 'high',
      platform: 'Instagram',
      status: 'in_progress',
      createdAt: daysAgo(6, 9, 30),
      summary:
        'A profile named "meera.rao_official" copied my photos and bio and is messaging people from my college asking for small "urgent" payments.',
      checklist: { save_url: true, screenshots: true, report_platform: true, warn_contacts: true, ev_url: true, ev_screens: true, ev_username: true },
      events: [
        { id: 'e1', type: 'url', date: daysAgo(6, 9, 40), title: 'Fake profile link saved', detail: 'instagram.com/meera.rao_official (fictional)', url: 'instagram.com/meera.rao_official' },
        { id: 'e2', type: 'screenshot', date: daysAgo(6, 9, 55), title: 'Screenshots of profile & bio', detail: 'Profile grid copied from my account. 214 followers.' },
        { id: 'e3', type: 'message', date: daysAgo(5, 18, 10), title: 'Friend received payment request', detail: 'Friend "Kavya" got a DM asking for ₹2,000 "for an emergency". She did not pay.' },
        { id: 'e4', type: 'report', date: daysAgo(5, 19, 0), title: 'Reported to Instagram', detail: 'Impersonation report filed. Ref: IG-DEMO-48213', },
        { id: 'e5', type: 'note', date: daysAgo(3, 11, 15), title: 'Warned classmates', detail: 'Posted a story and messaged the class group not to engage.' },
      ],
    },
    {
      id: 'demo_whatsapp_threat',
      demo: true,
      title: 'Threatening WhatsApp messages',
      category: 'threat',
      severity: 'critical',
      platform: 'WhatsApp',
      status: 'open',
      createdAt: daysAgo(2, 21, 5),
      summary:
        'An unknown number sent several messages saying "I know your hostel gate timings" and "you will regret ignoring me". I feel unsafe walking back at night.',
      checklist: { tell_trusted: true, screenshots: true, ev_screens: true, ev_phone: true },
      events: [
        { id: 'e1', type: 'message', date: daysAgo(2, 21, 5), title: 'First threatening message', detail: '"You will regret ignoring me." from +91 90000 00001 (fictional)' },
        { id: 'e2', type: 'screenshot', date: daysAgo(2, 21, 20), title: 'Screenshots with timestamps', detail: 'Saved 6 screenshots including the sender profile.' },
        { id: 'e3', type: 'message', date: daysAgo(1, 7, 45), title: 'Second message: hostel timings', detail: 'Mentioned my hostel gate timings. Blocked? Not yet — kept for evidence.' },
        { id: 'e4', type: 'note', date: daysAgo(1, 8, 10), title: 'Told warden & Rhea', detail: 'Warden informed; sister Rhea will call me during my walk back.' },
      ],
    },
    {
      id: 'demo_marketplace_scam',
      demo: true,
      title: 'Marketplace buyer asked me to scan a QR code',
      category: 'phishing',
      severity: 'medium',
      platform: 'Marketplace',
      status: 'resolved',
      createdAt: daysAgo(14, 16, 0),
      summary:
        'While selling an old tablet, a "buyer" wanted to pay an advance and sent a QR code for me to scan "to receive" money. I recognised the scam and did not scan it.',
      checklist: { dont_click: true, screenshots: true, verify_official: true, report_phishing: true, block_after: true, ev_link: true, ev_phone: true, ev_dates: true },
      events: [
        { id: 'e1', type: 'message', date: daysAgo(14, 16, 0), title: 'Buyer asks to pay advance', detail: 'Said he was in the army and could only pay via QR.' },
        { id: 'e2', type: 'screenshot', date: daysAgo(14, 16, 10), title: 'QR code screenshot', detail: 'Did not scan. Saved the image and chat.' },
        { id: 'e3', type: 'report', date: daysAgo(14, 17, 0), title: 'Reported the listing chat', detail: 'Reported on the marketplace app and cybercrime.gov.in (demo).' },
        { id: 'e4', type: 'note', date: daysAgo(12, 10, 0), title: 'Marked resolved', detail: 'Buyer account removed by the platform.' },
      ],
    },
    {
      id: 'demo_harassing_dm',
      demo: true,
      title: 'Harassing DMs from anonymous accounts',
      category: 'harassment',
      severity: 'medium',
      platform: 'Instagram',
      status: 'open',
      createdAt: daysAgo(4, 22, 30),
      summary:
        'After I posted a reel, multiple anonymous accounts sent insulting and sexual comments in my DMs. They create a new account every time I block one.',
      checklist: { screenshots: true, mute_filter: true, ev_screens: true },
      events: [
        { id: 'e1', type: 'message', date: daysAgo(4, 22, 30), title: 'First wave of abusive DMs', detail: '4 accounts, all created this week.' },
        { id: 'e2', type: 'screenshot', date: daysAgo(4, 22, 45), title: 'Saved DMs before blocking', detail: 'Screenshots include account handles and timestamps.' },
        { id: 'e3', type: 'note', date: daysAgo(3, 9, 0), title: 'Turned on message filters', detail: 'Hidden Words + restricted message requests from non-followers.' },
        { id: 'e4', type: 'message', date: daysAgo(1, 23, 10), title: 'New account, same pattern', detail: 'Same wording as before. Added to the log.' },
      ],
    },
  ];
}
