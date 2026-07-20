// POST /api/update — muda o status de um lead (novo/contatado/vendido/perdido). Protegido.
const { sql, isAuthed, readBody } = require('../lib/util');
const ALLOWED = ['novo', 'contatado', 'vendido', 'perdido', 'teste'];

module.exports = async (req, res) => {
  if (!isAuthed(req)) { res.status(401).json({ error: 'auth' }); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'method' }); return; }
  const b = await readBody(req);
  const id = parseInt(b.id, 10);
  const status = String(b.status || '');
  if (!id || !ALLOWED.includes(status)) { res.status(400).json({ error: 'params' }); return; }
  try {
    await sql`UPDATE leads SET status=${status} WHERE id=${id}`;
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error('update error:', e);
    res.status(500).json({ error: 'server' });
  }
};
