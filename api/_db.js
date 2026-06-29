// Cached MongoDB connection for Vercel serverless functions. The client (and
// its connection promise) is stashed on globalThis so warm invocations reuse
// the same pool instead of reconnecting on every request.
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'aiffected';

export async function getDb() {
  if (!uri) throw new Error('MONGODB_URI is not set');
  if (!globalThis.__aiffectedMongo) {
    const client = new MongoClient(uri, { maxPoolSize: 5 });
    globalThis.__aiffectedMongo = client.connect();
  }
  const client = await globalThis.__aiffectedMongo;
  return client.db(dbName);
}

// Small JSON body helper — Vercel parses JSON bodies for us, but guard anyway.
export function body(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}
