import { daysAgo } from '../utils/ids';

export const MOODS = [
  { value: 1, emoji: '😞', label: { en: 'Very low', te: 'చాలా బాధగా' } },
  { value: 2, emoji: '😟', label: { en: 'Low', te: 'బాధగా' } },
  { value: 3, emoji: '😐', label: { en: 'Okay', te: 'పర్వాలేదు' } },
  { value: 4, emoji: '🙂', label: { en: 'Good', te: 'బాగుంది' } },
  { value: 5, emoji: '😊', label: { en: 'Great', te: 'చాలా బాగుంది' } },
];

export const JOURNAL_PROMPTS = [
  { en: 'What felt hardest today, and what helped even a little?', te: 'ఈ రోజు ఏది కష్టంగా అనిపించింది, కొంచెం అయినా ఏది సహాయపడింది?' },
  { en: 'One thing I did today to protect myself:', te: 'నన్ను నేను రక్షించుకోవడానికి ఈ రోజు నేను చేసిన ఒక పని:' },
  { en: 'Who made me feel supported this week?', te: 'ఈ వారం ఎవరు నాకు మద్దతుగా అనిపించారు?' },
  { en: 'If a friend were in my place, what would I tell her?', te: 'నా స్థానంలో స్నేహితురాలు ఉంటే నేను ఆమెకు ఏమి చెప్పేదాన్ని?' },
];

export function buildDemoJournal() {
  return [
    {
      id: 'j1',
      demo: true,
      date: daysAgo(5, 22, 0),
      mood: 2,
      text: 'Found out about the fake profile today. I felt sick and angry. Kavya stayed on the phone with me for an hour.',
    },
    {
      id: 'j2',
      demo: true,
      date: daysAgo(3, 21, 30),
      mood: 3,
      text: 'Reported the profile and warned my class group. Feeling a bit lighter now that I have a plan.',
    },
    {
      id: 'j3',
      demo: true,
      date: daysAgo(1, 20, 45),
      mood: 4,
      text: 'Slept better. Rhea called while I walked back. I am proud that I saved everything in one place.',
    },
  ];
}
