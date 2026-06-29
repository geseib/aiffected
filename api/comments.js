import crypto from 'crypto';
import { getDb, body } from './_db.js';

const MAX = 280;
const PALETTE = ['#5eead4', '#60a5fa', '#c084fc', '#fbbf24', '#fb7185', '#34d399'];

function ipHash(req) {
  const ip = (req.headers['x-forwarded-for'] || '').toString().split(',')[0].trim() || '0';
  return crypto
    .createHash('sha256')
    .update(ip + (process.env.IP_SALT || 'aiffected'))
    .digest('hex')
    .slice(0, 16);
}

export default async function handler(req, res) {
  try {
    const db = await getDb();
    const col = db.collection('comments');

    if (req.method === 'GET') {
      const brief = (req.query.brief || '').toString();
      if (!brief) return res.status(400).json({ error: 'brief required' });
      const comments = await col
        .find({ brief, status: 'approved' })
        .sort({ createdAt: -1 })
        .limit(120)
        .project({ text: 1, name: 1, color: 1, createdAt: 1 })
        .toArray();
      res.setHeader('Cache-Control', 'public, s-maxage=20, stale-while-revalidate=60');
      return res.status(200).json({ comments });
    }

    if (req.method === 'POST') {
      const { brief, name, text } = body(req);
      if (!brief || !text || typeof text !== 'string') {
        return res.status(400).json({ error: 'brief and text required' });
      }
      const clean = text.trim().slice(0, MAX);
      if (!clean) return res.status(400).json({ error: 'empty comment' });
      const nm = (name || '').toString().trim().slice(0, 40);
      const ih = ipHash(req);

      // light rate guard: max 4 submissions per minute per (hashed) IP
      const since = new Date(Date.now() - 60_000);
      const recent = await col.countDocuments({ ipHash: ih, createdAt: { $gt: since } });
      if (recent >= 4) return res.status(429).json({ error: 'slow down a moment' });

      await col.insertOne({
        brief: brief.toString().slice(0, 60),
        name: nm || null,
        text: clean,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        status: 'pending',
        createdAt: new Date(),
        ipHash: ih,
      });
      return res.status(201).json({ ok: true, pending: true });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: 'server error' });
  }
}
