// POST /api/lead — recebe um lead do quiz e salva no banco. Público (sem auth).
const { sql, ensureTable, readBody } = require('../lib/util');

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ error: 'method' }); return; }
  try {
    await ensureTable();
    const b = await readBody(req);
    const whatsapp = String(b.whatsapp || '').slice(0, 25);
    if (!whatsapp) { res.status(400).json({ error: 'whatsapp obrigatório' }); return; }
    const name    = b.name    ? String(b.name).slice(0, 80)    : null;
    const gender  = b.gender  ? String(b.gender).slice(0, 40)  : null;
    const age     = b.age     ? String(b.age).slice(0, 20)     : null;
    const profile = b.profile ? String(b.profile).slice(0, 40) : null;
    const scores  = JSON.stringify(b.scores  || {});
    const answers = JSON.stringify(b.answers || []);
    const utm     = JSON.stringify(b.utm     || {});
    const id = b.id ? parseInt(b.id, 10) : null;
    if (id) {
      await sql`
        UPDATE leads
        SET name=${name}, whatsapp=${whatsapp}, gender=${gender}, age=${age}, profile=${profile},
            scores=${scores}::jsonb, answers=${answers}::jsonb, utm=${utm}::jsonb
        WHERE id=${id}`;
      res.status(200).json({ ok: true, id });
    } else {
      const rows = await sql`
        INSERT INTO leads (name, whatsapp, gender, age, profile, scores, answers, utm)
        VALUES (${name}, ${whatsapp}, ${gender}, ${age}, ${profile}, ${scores}::jsonb, ${answers}::jsonb, ${utm}::jsonb)
        RETURNING id`;
      res.status(200).json({ ok: true, id: rows[0].id });
    }
  } catch (e) {
    console.error('lead error:', e);
    res.status(500).json({ error: 'server' });
  }
};
