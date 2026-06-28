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
    kind: 'paradox',
    voice: 'amodei',
    deep: 'simulator',
    cta: 'See how it works →',
    ogTitle: 'GDP up, jobs down — the paradox',
    ogDesc: 'How an economy can grow 10–20% while unemployment climbs from 4% toward 20%. A 30-second interactive brief.',
  },
  {
    slug: 'the-human-ledger',
    eyebrow: 'The human ledger',
    title: ['A paycheck was never the ', { em: 'only thing', tone: 'accent' }, ' a job paid out.'],
    dek: 'Hand everyone an income and you refund one line of this ledger. The other four, money can’t buy.',
    kind: 'ledger',
    voice: 'sinek',
    deep: 'society',
    cta: 'Draw your own social contract →',
    ogTitle: 'The human ledger — what a job really pays out',
    ogDesc: 'A wage, yes — but also structure, contribution, status, belonging. A money-only answer leaves four lines unpaid.',
  },
  {
    slug: 'now-what',
    eyebrow: 'The question underneath',
    title: ['If we don’t need everyone to work, ', { em: 'who is it for?', tone: 'accent' }],
    dek: 'A job was three quiet promises: I make something better · I provide for the people I love · I pay into the world that raised me. Pull the job and they come loose — from yourself out to the world.',
    kind: 'rings',
    voice: 'keynes',
    deep: 'meaning',
    cta: 'Sit with the whole question →',
    ogTitle: 'Now what? — purpose after work',
    ogDesc: 'If machines make the wealth and we share it out, would any of it mean anything? The question the economics can’t answer.',
  },
];

export const briefBySlug = (slug) => BRIEFS.find((b) => b.slug === slug);
