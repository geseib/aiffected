import { ObjectId } from 'mongodb';
import { getDb, body } from './_db.js';

// Admin-only. Authenticated with a shared secret in the ADMIN_TOKEN env var,
// sent by the /admin page as the x-admin-token header.
function authed(req) {
  const t = req.headers['x-admin-token'];
  return !!t && !!process.env.ADMIN_TOKEN && t === process.env.ADMIN_TOKEN;
}

export default async function handler(req, res) {
  if (!authed(req)) return res.status(401).json({ error: 'unauthorized' });
  try {
    const db = await getDb();
    const col = db.collection('comments');

    if (req.method === 'GET') {
      const status = (req.query.status || 'pending').toString();
      const comments = await col.find({ status }).sort({ createdAt: -1 }).limit(300).toArray();
      return res.status(200).json({ comments });
    }

    if (req.method === 'POST') {
      const { id, action } = body(req);
      if (!id || !['approve', 'reject', 'delete'].includes(action)) {
        return res.status(400).json({ error: 'bad request' });
      }
      let _id;
      try {
        _id = new ObjectId(id);
      } catch {
        return res.status(400).json({ error: 'bad id' });
      }
      if (action === 'delete') {
        await col.deleteOne({ _id });
      } else {
        await col.updateOne({ _id }, { $set: { status: action === 'approve' ? 'approved' : 'rejected' } });
      }
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: 'server error' });
  }
}
