// POST /api/update — atualiza um lead: status (novo/contatado/vendido/perdido/teste),
// tag 💼 Comercial (venda fechada pelo comercial + valor) e/ou 🛒 compras atribuídas (LTV). Protegido.
const { sql, ensureTable, isAuthed, readBody } = require('../lib/util');
const ALLOWED = ['novo', 'contatado', 'vendido', 'reembolsado', 'perdido', 'teste'];

module.exports = async (req, res) => {
  if (!isAuthed(req)) { res.status(401).json({ error: 'auth' }); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'method' }); return; }
  const b = await readBody(req);
  const id = parseInt(b.id, 10);
  const hasStatus = b.status !== undefined;
  const hasCom = b.comercial !== undefined;
  const hasPur = b.purchases !== undefined;
  if (!id || (!hasStatus && !hasCom && !hasPur)) { res.status(400).json({ error: 'params' }); return; }
  if (hasStatus && !ALLOWED.includes(String(b.status))) { res.status(400).json({ error: 'params' }); return; }
  let saleValue = null;
  if (hasCom && b.comercial && b.sale_value != null && b.sale_value !== '') {
    saleValue = Number(b.sale_value);
    if (!isFinite(saleValue) || saleValue < 0) { res.status(400).json({ error: 'params' }); return; }
  }
  let purchases = null;
  if (hasPur) {
    if (!Array.isArray(b.purchases) || b.purchases.length > 100) { res.status(400).json({ error: 'params' }); return; }
    purchases = b.purchases.map(p => ({
      name: String((p && p.name) || '').trim().slice(0, 120),
      value: Number(p && p.value),
      at: (p && p.at) ? String(p.at).slice(0, 40) : new Date().toISOString(),
    }));
    if (purchases.some(p => !p.name || !isFinite(p.value) || p.value < 0)) { res.status(400).json({ error: 'params' }); return; }
  }
  try {
    await ensureTable();
    // status_at só avança quando o status realmente muda (arrastar pra mesma coluna não reordena o card)
    if (hasStatus) {
      const s = String(b.status);
      await sql`UPDATE leads SET status=${s},
                  status_at = CASE WHEN status <> ${s} THEN now() ELSE status_at END
                WHERE id=${id}`;
    }
    if (hasCom) await sql`UPDATE leads SET comercial=${!!b.comercial}, sale_value=${b.comercial ? saleValue : null} WHERE id=${id}`;
    if (hasPur) await sql`UPDATE leads SET purchases=${JSON.stringify(purchases)}::jsonb WHERE id=${id}`;
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error('update error:', e);
    res.status(500).json({ error: 'server' });
  }
};
