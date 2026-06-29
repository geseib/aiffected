import { getDb, body } from './_db.js';

// Option ids are defined per-brief on the client; accept any safe short slug.
const OK = /^[a-z0-9_-]{1,32}$/;

export default async function handler(req, res) {
  try {
    const db = await getDb();
    const col = db.collection('polls');

    if (req.method === 'GET') {
      const brief = (req.query.brief || '').toString();
      if (!brief) return res.status(400).json({ error: 'brief required' });
      const doc = await col.findOne({ _id: brief });
      res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=30');
      return res.status(200).json({ counts: (doc && doc.counts) || {} });
    }

    if (req.method === 'POST') {
      const { brief, option } = body(req);
      if (!brief || typeof option !== 'string' || !OK.test(option)) {
        return res.status(400).json({ error: 'bad request' });
      }
      await col.updateOne(
        { _id: brief.toString().slice(0, 60) },
        { $inc: { [`counts.${option}`]: 1 } },
        { upsert: true }
      );
      const doc = await col.findOne({ _id: brief });
      return res.status(200).json({ counts: (doc && doc.counts) || {} });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: 'server error' });
  }
}
