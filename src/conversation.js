// Shared config for the per-brief poll + comments.

export const POLL = {
  question: 'After reading this — your gut?',
  options: [
    { id: 'adapt', label: "We'll adapt, like always" },
    { id: 'different', label: "This time's different" },
    { id: 'unsure', label: 'Too soon to tell' },
  ],
};

export const PALETTE = ['#5eead4', '#60a5fa', '#c084fc', '#fbbf24', '#fb7185', '#34d399'];

// Conversation starters that float in the overlay so it's alive from day one,
// blended with real (approved) comments as they come in. On-topic, anonymous.
export const SEED_COMMENTS = [
  'My whole team already runs on this — we just haven’t said it out loud.',
  'Every generation thinks its tech is the end of work. Mine included.',
  'The trades will be fine. Try getting a robot to fix a Victorian boiler.',
  'It’s not the jobs I worry about, it’s the meaning.',
  'Cheaper everything sounds great — until your paycheck is the thing getting cheaper.',
  'We adapted to the tractor, the PC, the internet. We’ll adapt to this.',
  'Adapted, sure — after a lot of people got crushed in between.',
  'Whoever owns the models owns the future. That’s the whole ballgame.',
  'I’d take a four-day week tomorrow. Bring it on.',
  'My kids ask what they should study. I genuinely don’t know what to tell them.',
  'Productivity is up, my rent is up, my pay is flat. Tell me how this ends well.',
  'Maybe “a job” just stops being the way we split up the pie.',
];
