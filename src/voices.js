// ---------------------------------------------------------------------------
// "The Chorus" — real voices from the people arguing about AI, work and the
// social contract. Deliberately balanced: builders, economists, critics, civic
// leaders and writers on meaning — not a single camp.
//
// Quotes are drawn from the linked works and public interviews; the source link
// goes to the work itself (or a stable page about it) so a reader can verify and
// read in full. `pos` places each voice on a 0–100 spectrum from
// "the technology delivers" (0) to "politics decides the outcome" (100).
// ---------------------------------------------------------------------------

export const CAMPS = {
  builder: { label: 'The builders', color: '#5eead4' },
  economist: { label: 'The economists', color: '#fbbf24' },
  critic: { label: 'The critics', color: '#fb7185' },
  civic: { label: 'The civic voices', color: '#60a5fa' },
  purpose: { label: 'On meaning', color: '#c084fc' },
};

export const SPECTRUM_ENDS = ['The technology delivers', 'Politics decides the outcome'];

export const VOICES = {
  andreessen: {
    name: 'Marc Andreessen',
    role: 'Venture capitalist, a16z',
    monogram: 'MA',
    short: 'Andreessen',
    camp: 'builder',
    pos: 5,
    quote: 'AI is quite possibly the most important — and best — thing our civilization has ever created.',
    preview: 'Quite possibly the most important — and best — thing our civilization has ever created.',
    context:
      'The maximalist optimist case: abundance is coming and the fears are overblown. Worth taking seriously — and testing against every other voice here.',
    source: { label: '“Why AI Will Save the World” — a16z (2023)', url: 'https://a16z.com/ai-will-save-the-world/' },
  },
  amodei: {
    name: 'Dario Amodei',
    role: 'CEO, Anthropic',
    monogram: 'DA',
    short: 'Amodei',
    camp: 'builder',
    pos: 28,
    quote:
      'AI could eliminate half of all entry-level white-collar jobs — and spike unemployment to 10–20% in the next one to five years.',
    preview: 'AI could spike unemployment to 10–20% in the next one to five years.',
    context:
      'Not a critic — the head of a leading AI lab, putting hard numbers on the disruption. This page exists because a builder said the quiet part out loud.',
    source: { label: 'Anthropic CEO, 2025 (Axios)', url: 'https://www.axios.com/2025/05/28/ai-jobs-white-collar-half-eliminate-anthropic-dario-amodei' },
  },
  brynjolfsson: {
    name: 'Erik Brynjolfsson',
    role: 'Stanford economist',
    monogram: 'EB',
    short: 'Brynjolfsson',
    camp: 'economist',
    pos: 44,
    quote:
      "There's no economic law that says everyone, or even most people, will automatically benefit from technological progress.",
    preview: "There's no economic law that says most people automatically benefit from technological progress.",
    context:
      'Named “the great decoupling” — productivity and median incomes pulling apart. The exact mechanism this whole page is built on.',
    source: { label: '“The Second Machine Age” (2014)', url: 'https://en.wikipedia.org/wiki/The_Second_Machine_Age' },
  },
  keynes: {
    name: 'John Maynard Keynes',
    role: 'Economist, writing in 1930',
    monogram: 'JMK',
    short: 'Keynes',
    camp: 'economist',
    pos: 50,
    quote:
      'We are being afflicted with a new disease… technological unemployment — due to our discovery of means of economising the use of labour outrunning the pace at which we can find new uses for labour.',
    preview: 'A new disease: technological unemployment.',
    context:
      'Written in 1930. Keynes also predicted automation would buy us a 15-hour week — the leisure half of the bargain we are still waiting on.',
    source: {
      label: '“Economic Possibilities for Our Grandchildren” (1930)',
      url: 'https://en.wikipedia.org/wiki/Economic_Possibilities_for_our_Grandchildren',
    },
  },
  frey: {
    name: 'Carl Benedikt Frey & Michael Osborne',
    role: 'Oxford researchers',
    monogram: 'F&O',
    short: 'Frey & Osborne',
    camp: 'economist',
    pos: 55,
    quote: 'About 47% of total US employment is at risk of computerisation.',
    preview: 'About 47% of US jobs are at risk of computerisation.',
    context:
      'The 2013 study that first put a number on it — and that was before generative AI and modern robotics. Read it as the size of the lever, not a verdict.',
    source: {
      label: '“The Future of Employment”, Oxford (2013)',
      url: 'https://www.oxfordmartin.ox.ac.uk/publications/the-future-of-employment',
    },
  },
  sinek: {
    name: 'Simon Sinek',
    role: 'Author, “Start With Why”',
    monogram: 'SS',
    short: 'Sinek',
    camp: 'purpose',
    pos: 52,
    quote:
      "Working hard for something we don't care about is called stress. Working hard for something we love is called passion.",
    preview: "Work we don't care about is stress; work we love is passion.",
    context:
      'The reminder that a job is never only a wage. Automate the work and you still have to replace the purpose — the hardest line in the human ledger.',
    source: { label: 'Simon Sinek — “Start With Why”', url: 'https://simonsinek.com/books/start-with-why/' },
  },
  obama: {
    name: 'Barack Obama',
    role: '44th US President',
    monogram: 'BO',
    short: 'Obama',
    camp: 'civic',
    pos: 66,
    quote:
      'Whether a universal basic income is the right model… that is a debate that we will be having over the next ten or twenty years.',
    preview: 'Universal basic income… a debate for the next ten or twenty years.',
    context:
      'A sitting president, in 2016, naming the redistribution question as a defining economic debate of the AI era — long before it was urgent.',
    source: { label: 'Wired, Oct 2016 (with Joi Ito)', url: 'https://www.wired.com/2016/10/president-obama-mit-joi-ito-interview/' },
  },
  acemoglu: {
    name: 'Daron Acemoglu & Simon Johnson',
    role: 'MIT economists (Acemoglu, Nobel 2024)',
    monogram: 'A&J',
    short: 'Acemoglu & Johnson',
    camp: 'economist',
    pos: 72,
    quote:
      'There is nothing automatic about new technologies bringing widespread prosperity. Whether they do is a choice.',
    preview: 'Nothing automatic about new technology bringing shared prosperity. It is a choice.',
    context:
      'The thesis of this entire page, from a Nobel economist: the technology sets the stakes; institutions and power decide who the gains reach.',
    source: { label: '“Power and Progress” (2023)', url: 'https://en.wikipedia.org/wiki/Power_and_Progress' },
  },
  piketty: {
    name: 'Thomas Piketty',
    role: 'Economist, “Capital in the 21st Century”',
    monogram: 'TP',
    short: 'Piketty',
    camp: 'economist',
    pos: 80,
    quote:
      'When the rate of return on capital exceeds the rate of growth of output, capitalism automatically generates arbitrary and unsustainable inequalities.',
    preview: 'When returns on capital outrun growth, inequality compounds on its own.',
    context:
      'If AI sends income to whoever owns the machines, Piketty’s r > g is the engine that widens that gap automatically — unless policy intervenes.',
    source: {
      label: '“Capital in the Twenty-First Century” (2013)',
      url: 'https://en.wikipedia.org/wiki/Capital_in_the_Twenty-First_Century',
    },
  },
  graeber: {
    name: 'David Graeber',
    role: 'Anthropologist, “Bullshit Jobs”',
    monogram: 'DG',
    short: 'Graeber',
    camp: 'critic',
    pos: 76,
    quote:
      'Huge swathes of people spend their entire working lives performing tasks they secretly believe do not really need to be performed.',
    preview: "People spend their working lives on tasks they secretly believe needn't exist.",
    context:
      'The provocation that cuts both ways: if many jobs are already pointless, is automating them a tragedy — or a liberation we are too afraid to take?',
    source: { label: '“Bullshit Jobs: A Theory” (2018)', url: 'https://en.wikipedia.org/wiki/Bullshit_Jobs' },
  },
  harari: {
    name: 'Yuval Noah Harari',
    role: 'Historian, “Homo Deus”',
    monogram: 'YH',
    short: 'Harari',
    camp: 'critic',
    pos: 85,
    quote:
      'The most important question in 21st-century economics may well be: what should we do with all the superfluous people?',
    preview: 'What should we do with all the “superfluous” people?',
    context:
      'Harari’s “useless class” — his deliberately brutal name for the people an automated economy may no longer need. Wave 3, stated as bluntly as it gets.',
    source: {
      label: '“Homo Deus” (2016)',
      url: 'https://en.wikipedia.org/wiki/Homo_Deus:_A_Brief_History_of_Tomorrow',
    },
  },
  bregman: {
    name: 'Rutger Bregman',
    role: 'Historian, “Utopia for Realists”',
    monogram: 'RB',
    short: 'Bregman',
    camp: 'civic',
    pos: 90,
    quote: 'Poverty isn’t a lack of character. It’s a lack of cash.',
    preview: 'Poverty isn’t a lack of character; it’s a lack of cash.',
    context:
      'The case for meeting displacement with money, not moralising — basic income and a shorter week treated as serious policy rather than fantasy.',
    source: { label: '“Utopia for Realists” (2017)', url: 'https://en.wikipedia.org/wiki/Utopia_for_Realists' },
  },
  frankl: {
    name: 'Viktor Frankl',
    role: 'Psychiatrist, “Man’s Search for Meaning”',
    monogram: 'VF',
    short: 'Frankl',
    camp: 'purpose',
    pos: 60,
    quote: 'Life is never made unbearable by circumstances, but only by lack of meaning and purpose.',
    preview: 'Life is made unbearable not by circumstances, but by a lack of meaning.',
    context:
      'A psychiatrist who survived the camps: people can endure almost anything with a “why,” and unravel without one. Money is a “how.” It was never the “why.”',
    source: { label: '“Man’s Search for Meaning” (1946)', url: 'https://en.wikipedia.org/wiki/Man%27s_Search_for_Meaning' },
  },
  arendt: {
    name: 'Hannah Arendt',
    role: 'Philosopher, “The Human Condition”',
    monogram: 'HA',
    short: 'Arendt',
    camp: 'purpose',
    pos: 64,
    quote:
      'It is a society of laborers which is about to be liberated from the fetters of labor, and this society does no longer know of those other and higher activities for the sake of which this freedom would deserve to be won.',
    preview: 'A society of laborers about to be freed from labor — that no longer knows what to do with the freedom.',
    context:
      'Written in 1958, aimed squarely at now: we organized life around work so completely that we may have forgotten how to live without it.',
    source: { label: '“The Human Condition” (1958)', url: 'https://en.wikipedia.org/wiki/The_Human_Condition_(Arendt_book)' },
  },
  putnam: {
    name: 'Robert Putnam',
    role: 'Political scientist, “Bowling Alone”',
    monogram: 'RP',
    short: 'Putnam',
    camp: 'civic',
    pos: 70,
    quote:
      'Social capital — the web of connections among us — has been in steady decline, and we are the poorer and lonelier for it.',
    preview: 'Our connections to one another have been quietly collapsing — and we are the lonelier for it.',
    context:
      'His decades of data on community: belonging doesn’t maintain itself. If the workplace stops supplying it, something else has to be built — deliberately.',
    source: { label: '“Bowling Alone” (2000)', url: 'https://en.wikipedia.org/wiki/Bowling_Alone' },
  },
};

export const VOICE_ORDER = Object.keys(VOICES).sort((a, b) => VOICES[a].pos - VOICES[b].pos);
