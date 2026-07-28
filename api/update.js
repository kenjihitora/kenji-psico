// POST /api/update — atualiza um lead: status (novo/contatado/vendido/perdido/teste)
// e/ou a tag 💼 Comercial (venda fechada pelo comercial + valor). Protegido.
const { sql, ensureTable, isAuthed, readBody } = require('../lib/util');
const ALLOWED = ['novo', 'contatado', 'vendido', 'perdido', 'teste'];

module.exports = async (req, res) => {
  if (!isAuthed(req)) { res.status(401).json({ error: 'auth' }); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'method' }); return; }
  const b = await readBody(req);
  const id = parseInt(b.id, 10);
  const hasStatus = b.status !== undefined;
  const hasCom = b.comercial !== undefined;
  if (!id || (!hasStatus && !hasCom)) { res.status(400).json({ error: 'params' }); return; }
  if (hasStatus && !ALLOWED.includes(String(b.status))) { res.status(400).json({ error: 'params' }); return; }
  let saleValue = null;
  if (hasCom && b.comercial && b.sale_value != null && b.sale_value !== '') {
    saleValue = Number(b.sale_value);
    if (!isFinite(saleValue) || saleValue < 0) { res.status(400).json({ error: 'params' }); return; }
  }
  try {
    await ensureTable();
    if (hasStatus) await sql`UPDATE leads SET status=${String(b.status)} WHERE id=${id}`;
    if (hasCom) await sql`UPDATE leads SET comercial=${!!b.comercial}, sale_value=${b.comercial ? saleValue : null} WHERE id=${id}`;
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error('update error:', e);
    res.status(500).json({ error: 'server' });
  }
};
