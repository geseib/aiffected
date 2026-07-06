// ---------------------------------------------------------------------------
// Briefs: single-concept, share-sized mini-pages in the same style as the full
// site. Each is its own static URL (/b/<slug>/) with its own social-card meta,
// and each funnels to the matching section of the full page.
//
// Adding a brief = adding one entry here, then running `npm run briefs` to
// regenerate the static HTML (and `npm run og` to refresh the share images).
// ---------------------------------------------------------------------------

export const BRIEFS = [
  {
    slug: 'gdp-up-jobs-down',
    eyebrow: 'The paradox',
    title: ['The economy can grow ', { em: '+20%', tone: 'up' }, ' while ', { em: '1 in 5', tone: 'down' }, ' lose their jobs.'],
    dek: 'GDP measures what we make — not how many of us it takes to make it. Generative AI is pulling those two apart. Drag the slider.',
    question:
      'Every machine age was supposed to end work — and every time, the jobs came back. Is this the one that’s finally different, or just the latest false alarm?',
    kind: 'paradox',
    voice: 'amodei',
    deep: 'simulator',
    cta: 'See how it works →',
    poll: {
      question: 'Can output keep rising while jobs fall?',
      options: [
        { id: 'split', label: 'Yes — they’ve already split' },
        { id: 'catchup', label: 'Only until new jobs catch up' },
        { id: 'wont', label: 'No, it won’t happen' },
      ],
    },
    seeds: [
      'GDP is a terrible measure of whether people are actually okay.',
      'My company’s revenue is up and headcount is down. It’s already happening.',
      'More output with fewer people is the goal of every business on earth.',
      'If nobody has a paycheck, who buys all this extra output?',
      'Growth that never reaches wages isn’t growth I can feel.',
    ],
    ogTitle: 'GDP up, jobs down — the paradox',
    ogDesc: 'How an economy can grow 10–20% while unemployment climbs from 4% toward 20%. A 30-second interactive brief.',
  },
  {
    slug: 'the-human-ledger',
    eyebrow: 'The human ledger',
    title: ['A paycheck was never the ', { em: 'only thing', tone: 'accent' }, ' a job paid out.'],
    dek: 'Hand everyone an income and you refund one line of this ledger. The other four, money can’t buy.',
    question:
      'People found purpose long before the 40-hour week, and might again. Does a life really need a job to have a point — or are we selling ourselves short?',
    kind: 'ledger',
    voice: 'sinek',
    deep: 'society',
    cta: 'Draw your own social contract →',
    poll: {
      question: 'Say the income’s replaced — what would you miss most then?',
      options: [
        { id: 'purpose', label: 'The sense of purpose' },
        { id: 'people', label: 'The people / belonging' },
        { id: 'structure', label: 'The structure / routine' },
        { id: 'status', label: 'The status / identity' },
      ],
    },
    seeds: [
      'Retirement wrecked my dad until he found a workshop and a routine.',
      'Honestly? I’d miss my coworkers more than the work itself.',
      'Status is the quiet one. “What do you do” is really “who are you.”',
      'Money’s replaceable. A reason to get up in the morning isn’t.',
      'I volunteer more than I work, and it means ten times as much.',
    ],
    ogTitle: 'The human ledger — what a job really pays out',
    ogDesc: 'A wage, yes — but also structure, contribution, status, belonging. A money-only answer leaves four lines unpaid.',
  },
  {
    slug: 'now-what',
    eyebrow: 'The question underneath',
    title: ['If we don’t need everyone to work, ', { em: 'who is it for?', tone: 'accent' }],
    dek: 'A job was three quiet promises: I make something better · I provide for the people I love · I pay into the world that raised me. Pull the job and they come loose — from yourself out to the world.',
    question:
      'Give people time and they rarely sit idle — they build, make, care, create. Are we underestimating ourselves, or is this wishful thinking?',
    kind: 'rings',
    voice: 'keynes',
    deep: 'meaning',
    cta: 'Sit with the whole question →',
    poll: {
      question: 'In a world with little paid work, would you find purpose?',
      options: [
        { id: 'easily', label: 'Easily — I’ve got a list' },
        { id: 'effort', label: 'With some effort' },
        { id: 'struggle', label: 'I’d struggle' },
      ],
    },
    seeds: [
      'Give me a workshop, a garden and grandkids. I’m set.',
      'I honestly don’t know who I’d be without my work. That scares me.',
      'We’d reinvent “contribution” — it just wouldn’t come with a paycheck.',
      'Idle hands are a myth. People build, make, tinker, organize.',
      'Meaning doesn’t arrive automatically. Someone has to build the scaffolding.',
    ],
    ogTitle: 'Now what? — purpose after work',
    ogDesc: 'If machines make the wealth and we share it out, would any of it mean anything? The question the economics can’t answer.',
  },
  {
    slug: 'the-great-decoupling',
    eyebrow: 'The mechanism',
    title: ['For 200 years pay rose with ', { em: 'productivity', tone: 'up' }, '. Then it ', { em: 'stopped', tone: 'down' }, '.'],
    dek: 'The economy keeps making more per hour. Your paycheck stopped coming along for the ride. Economists call it the great decoupling — and AI pours fuel on it.',
    question:
      'Past productivity booms eventually pulled wages up with them. Will this one too — or has the link between output and pay broken for good?',
    kind: 'decoupling',
    voice: 'brynjolfsson',
    deep: 'mechanism',
    cta: 'See the mechanism →',
    poll: {
      question: 'Will pay ever catch back up to productivity?',
      options: [
        { id: 'yes', label: 'Yes, eventually' },
        { id: 'policy', label: 'Only if policy forces it' },
        { id: 'broken', label: 'No — the link is broken' },
      ],
    },
    seeds: [
      'Productivity has doubled since the ’70s. My grandfather’s one wage bought a house.',
      'The gains went somewhere. Look at who owns the stock.',
      'Unions falling and the gap widening isn’t a coincidence.',
      'Cheaper TVs don’t make up for unaffordable rent.',
      'Pay follows leverage, not output — and workers lost the leverage.',
    ],
    ogTitle: 'The great decoupling — when pay stopped following productivity',
    ogDesc: 'For two centuries wages rose with output per hour. Then they split. AI widens the gap.',
  },
  {
    slug: 'escape-route-closes',
    eyebrow: 'Wave 2 · robotics',
    title: ['The “safe” jobs were only safe ', { em: 'until the robots arrived', tone: 'down' }, '.'],
    dek: 'Wave 1 hit the desks. Wave 2 is robotics — and the manual work people fled into for safety floods next. Flip the wave and watch.',
    question:
      'But robots have been “five years away” for decades, and a clogged drain still needs a human. Are these jobs really next — or is the sky not falling?',
    kind: 'sectors',
    voice: 'frey',
    deep: 'waves',
    cta: 'Explore the three waves →',
    poll: {
      type: 'slider',
      question: 'How long before AI could do your job?',
      options: [
        { id: 'y2', label: '2 years', value: 2 },
        { id: 'y5', label: '5 years', value: 5 },
        { id: 'y10', label: '10 years', value: 10 },
        { id: 'never', label: 'Never', value: null },
      ],
    },
    seeds: [
      'Show me a robot that can re-wire a 1920s house. I’ll wait.',
      'Warehouses are already more robot than human.',
      'Self-driving trucks have been “next year” for ten years now.',
      'Dexterity is the last mile — and it’s a very long mile.',
      'Care work is human work. You can’t automate a held hand.',
    ],
    ogTitle: 'The escape route closes — robotics floods the safe jobs',
    ogDesc: 'The manual jobs people fled into for safety — warehouses, driving, repair, care — are next.',
  },
  {
    slug: 'who-gets-the-gains',
    eyebrow: 'The distribution',
    title: ['When machines make the money, ', { em: 'who gets it?', tone: 'accent' }],
    dek: 'Once output detaches from labour, the gains flow to whoever owns the machines — unless we decide otherwise. Move the dial.',
    question:
      'But yesterday’s windfalls spread eventually — cheaper goods, whole new industries. Won’t this one too, left alone? Or does it need a push?',
    kind: 'split',
    voice: 'piketty',
    deep: 'simulator',
    cta: 'Build the whole economy →',
    poll: {
      question: 'Who should the AI windfall belong to?',
      options: [
        { id: 'builders', label: 'Those who built it' },
        { id: 'taxed', label: 'Markets — taxed to share' },
        { id: 'everyone', label: 'Shared with everyone' },
      ],
    },
    seeds: [
      'It’s built on everyone’s data. The gains aren’t only theirs.',
      'Punish the builders and nobody builds the next breakthrough.',
      'A sovereign wealth fund for AI — Norway did it with oil.',
      'Whoever owns the compute owns the century.',
      'Tax it like any windfall and use it to fund the transition.',
    ],
    ogTitle: 'Who gets the gains when machines make the money?',
    ogDesc: 'Output detaches from labour and income flows to whoever owns the machines — unless policy intervenes.',
  },
  {
    slug: 'still-in-the-loop',
    eyebrow: 'Wave 3 · autonomy',
    title: ['What happens when the machines ', { em: 'no longer need us', tone: 'down' }, '?'],
    dek: 'Wave 3 is autonomy: systems that set their own goals and improve themselves. The question stops being about jobs and becomes whether humans keep any leverage at all.',
    question:
      'But genuinely self-directing machines may be further off than the headlines promise. How close are we really — and is this fear, or forecast?',
    kind: 'gauge',
    voice: 'harari',
    deep: 'waves',
    cta: 'Reach Wave 3 →',
    poll: {
      question: 'How close is genuinely autonomous AI?',
      options: [
        { id: 'soon', label: 'Years, not decades' },
        { id: 'far', label: 'Decades away' },
        { id: 'hype', label: 'Overhyped — not soon' },
      ],
    },
    seeds: [
      'Self-improving systems are a different species of risk.',
      'We can barely stop it making things up. Autonomy? Please.',
      'The scary part isn’t capability — it’s who holds the off-switch.',
      'Every demo looks closer than the deployment ever is.',
      'If it writes its own goals, “unemployment” is the least of our worries.',
    ],
    ogTitle: 'Still in the loop? — the autonomy question',
    ogDesc: 'When AI runs the whole loop itself, the question stops being jobs and becomes human leverage.',
  },
  {
    slug: 'is-it-alarmist',
    eyebrow: 'The strongest objection',
    title: ['Is this just ', { em: 'alarmism?', tone: 'accent' }],
    dek: 'Every revolution destroyed jobs and created new ones we couldn’t imagine. Won’t AI do the same? It’s the best argument against all of this — so take it seriously.',
    question:
      'Two hundred years of false alarms is a good reason for doubt. It’s also no guarantee. So — false alarm again, or the one that finally isn’t?',
    kind: 'debate',
    voice: 'autor',
    deep: 'alarmist',
    cta: 'Weigh both sides →',
    poll: {
      question: 'Cry wolf, or the one that’s real?',
      options: [
        { id: 'wolf', label: 'Cry wolf — we’ll adapt' },
        { id: 'real', label: 'This one’s real' },
        { id: 'unsure', label: 'Genuinely unsure' },
      ],
    },
    seeds: [
      'Doomsayers have been wrong for two hundred years straight.',
      'They were also right that it’d be brutal in the meantime.',
      '“This time is different” — famous last words.',
      'The boy cried wolf — but in the story, the wolf does come.',
      'Plan for the bad version, hope for the good. Cheap insurance.',
    ],
    ogTitle: 'Is this just alarmism? — the strongest objection',
    ogDesc: 'Every revolution created new jobs we couldn’t imagine. Will AI? The best argument against the doom case.',
  },
];

export const briefBySlug = (slug) => BRIEFS.find((b) => b.slug === slug);
