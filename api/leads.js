// GET /api/leads — lista todos os leads. Protegido (exige cookie de sessão).
const { sql, ensureTable, isAuthed } = require('../lib/util');

module.exports = async (req, res) => {
  if (!isAuthed(req)) { res.status(401).json({ error: 'auth' }); return; }
  try {
    await ensureTable();
    const rows = await sql`
      SELECT id, created_at, whatsapp, gender, age, profile, scores, answers, utm, status
      FROM leads ORDER BY created_at DESC LIMIT 2000`;
    res.status(200).json({ leads: rows });
  } catch (e) {
    console.error('leads error:', e);
    res.status(500).json({ error: 'server' });
  }
};
