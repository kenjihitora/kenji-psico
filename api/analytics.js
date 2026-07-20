// GET /api/analytics?from=YYYY-MM-DD&to=YYYY-MM-DD — métricas do funil. Protegido.
const { sql, ensureTable, isAuthed } = require('../lib/util');

module.exports = async (req, res) => {
  if (!isAuthed(req)) { res.status(401).json({ error: 'auth' }); return; }
  try {
    await ensureTable();
    const q = req.query || {};
    const fromD = q.from ? new Date(q.from + 'T00:00:00') : new Date(Date.now() - 30 * 864e5);
    const toD   = q.to   ? new Date(q.to   + 'T00:00:00') : new Date();
    const toEnd = new Date(toD.getTime() + 864e5); // fim do dia (exclusivo)
    const fromISO = fromD.toISOString(), toISO = toEnd.toISOString();

    // funil: quantas sessões atingiram cada etapa (agrupado por max_step)
    const funnel = await sql`
      SELECT max_step, count(*)::int AS n
      FROM sessions
      WHERE created_at >= ${fromISO} AND created_at < ${toISO}
      GROUP BY max_step ORDER BY max_step`;

    const sessions = await sql`SELECT count(*)::int AS n FROM sessions
      WHERE created_at >= ${fromISO} AND created_at < ${toISO}`;
    const leads = await sql`SELECT count(*)::int AS n FROM leads
      WHERE created_at >= ${fromISO} AND created_at < ${toISO} AND status <> 'teste'`;

    // leads por anúncio (UTM)
    const byAd = await sql`
      SELECT coalesce(nullif(utm->>'utm_source',''),'(direto)') AS source,
             coalesce(nullif(utm->>'utm_campaign',''),'—') AS campaign,
             coalesce(nullif(utm->>'utm_content',''), nullif(utm->>'utm_term',''), '—') AS ad,
             count(*)::int AS leads
      FROM leads
      WHERE created_at >= ${fromISO} AND created_at < ${toISO} AND status <> 'teste'
      GROUP BY 1,2,3 ORDER BY leads DESC LIMIT 100`;

    // leads por perfil
    const byProfile = await sql`
      SELECT coalesce(profile,'—') AS profile, count(*)::int AS n
      FROM leads WHERE created_at >= ${fromISO} AND created_at < ${toISO} AND status <> 'teste'
      GROUP BY 1 ORDER BY n DESC`;

    res.status(200).json({ funnel, sessions: sessions[0].n, leads: leads[0].n, byAd, byProfile });
  } catch (e) {
    console.error('analytics error:', e);
    res.status(500).json({ error: 'server' });
  }
};
