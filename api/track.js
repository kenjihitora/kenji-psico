// POST /api/track — registra o progresso da sessão no funil. Público (sem auth).
const { sql, ensureTable, readBody } = require('../lib/util');

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ error: 'method' }); return; }
  try {
    await ensureTable();
    const b = await readBody(req);
    const session = String(b.session || '').slice(0, 64);
    const step = parseInt(b.step, 10);
    if (!session || isNaN(step)) { res.status(400).json({ error: 'params' }); return; }
    const utm = JSON.stringify(b.utm || {});
    await sql`
      INSERT INTO sessions (session_id, max_step, utm)
      VALUES (${session}, ${step}, ${utm}::jsonb)
      ON CONFLICT (session_id) DO UPDATE
        SET max_step = GREATEST(sessions.max_step, ${step}), updated_at = now()`;
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error('track error:', e);
    res.status(500).json({ error: 'server' });
  }
};
