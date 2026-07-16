// POST /api/delete — exclui um lead por id. Protegido (exige cookie de sessão).
const { sql, isAuthed, readBody } = require('../lib/util');

module.exports = async (req, res) => {
  if (!isAuthed(req)) { res.status(401).json({ error: 'auth' }); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'method' }); return; }
  const b = await readBody(req);
  const id = parseInt(b.id, 10);
  if (!id) { res.status(400).json({ error: 'params' }); return; }
  try {
    await sql`DELETE FROM leads WHERE id=${id}`;
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error('delete error:', e);
    res.status(500).json({ error: 'server' });
  }
};
