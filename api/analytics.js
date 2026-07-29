// GET /api/analytics?from=YYYY-MM-DD&to=YYYY-MM-DD&source=meta — métricas do funil. Protegido.
// source=meta → filtra só tráfego dos ANÚNCIOS pagos do Meta (utm_campaign presente + utm_source de Facebook/Instagram),
// deixando de fora orgânico (fbclid sem UTM), time/expert e quem abriu a URL direto.
const { sql, ensureTable, isAuthed } = require('../lib/util');

module.exports = async (req, res) => {
  if (!isAuthed(req)) { res.status(401).json({ error: 'auth' }); return; }
  try {
    await ensureTable();
    const q = req.query || {};
    const fromD = q.from ? new Date(q.from + 'T00:00:00-03:00') : new Date(Date.now() - 30 * 864e5);
    const toD   = q.to   ? new Date(q.to   + 'T00:00:00-03:00') : new Date();
    const toEnd = new Date(toD.getTime() + 864e5); // fim do dia (exclusivo)
    const fromISO = fromD.toISOString(), toISO = toEnd.toISOString();
    const inc = q.source !== 'meta'; // inc=true → todos; inc=false → só Meta (o filtro abaixo só "morde" quando inc=false)

    // funil: quantas sessões atingiram cada etapa (agrupado por max_step)
    const funnel = await sql`
      SELECT max_step, count(*)::int AS n
      FROM sessions
      WHERE created_at >= ${fromISO} AND created_at < ${toISO}
        AND (${inc} OR (nullif(utm->>'utm_campaign','') IS NOT NULL AND lower(coalesce(utm->>'utm_source','')) IN ('facebook','fb','instagram','ig','meta','messenger','msg','an')))
      GROUP BY max_step ORDER BY max_step`;

    const sessions = await sql`SELECT count(*)::int AS n FROM sessions
      WHERE created_at >= ${fromISO} AND created_at < ${toISO}
        AND (${inc} OR (nullif(utm->>'utm_campaign','') IS NOT NULL AND lower(coalesce(utm->>'utm_source','')) IN ('facebook','fb','instagram','ig','meta','messenger','msg','an')))`;

    const leads = await sql`SELECT count(*)::int AS n FROM leads
      WHERE created_at >= ${fromISO} AND created_at < ${toISO} AND status <> 'teste'
        AND (${inc} OR (nullif(utm->>'utm_campaign','') IS NOT NULL AND lower(coalesce(utm->>'utm_source','')) IN ('facebook','fb','instagram','ig','meta','messenger','msg','an')))`;

    // leads por anúncio (UTM)
    const byAd = await sql`
      SELECT coalesce(nullif(utm->>'utm_source',''),'(direto)') AS source,
             coalesce(nullif(utm->>'utm_campaign',''),'—') AS campaign,
             coalesce(nullif(utm->>'utm_content',''), nullif(utm->>'utm_term',''), '—') AS ad,
             count(*)::int AS leads
      FROM leads
      WHERE created_at >= ${fromISO} AND created_at < ${toISO} AND status <> 'teste'
        AND (${inc} OR (nullif(utm->>'utm_campaign','') IS NOT NULL AND lower(coalesce(utm->>'utm_source','')) IN ('facebook','fb','instagram','ig','meta','messenger','msg','an')))
      GROUP BY 1,2,3 ORDER BY leads DESC LIMIT 100`;

    // leads por perfil
    const byProfile = await sql`
      SELECT coalesce(profile,'—') AS profile, count(*)::int AS n
      FROM leads WHERE created_at >= ${fromISO} AND created_at < ${toISO} AND status <> 'teste'
        AND (${inc} OR (nullif(utm->>'utm_campaign','') IS NOT NULL AND lower(coalesce(utm->>'utm_source','')) IN ('facebook','fb','instagram','ig','meta','messenger','msg','an')))
      GROUP BY 1 ORDER BY n DESC`;

    // 💼 vendas do comercial (tag manual no CRM): total + por anúncio de origem do lead.
    // Reembolsado fica fora: o lead continua contando como lead, mas a venda não se sustenta.
    const comercial = await sql`
      SELECT count(*)::int AS vendas, coalesce(sum(sale_value),0)::float AS valor
      FROM leads WHERE created_at >= ${fromISO} AND created_at < ${toISO} AND status NOT IN ('teste','reembolsado') AND comercial
        AND (${inc} OR (nullif(utm->>'utm_campaign','') IS NOT NULL AND lower(coalesce(utm->>'utm_source','')) IN ('facebook','fb','instagram','ig','meta','messenger','msg','an')))`;

    const comercialByAd = await sql`
      SELECT coalesce(nullif(utm->>'utm_source',''),'(direto)') AS source,
             coalesce(nullif(utm->>'utm_campaign',''),'—') AS campaign,
             coalesce(nullif(utm->>'utm_content',''), nullif(utm->>'utm_term',''), '—') AS ad,
             count(*)::int AS vendas, coalesce(sum(sale_value),0)::float AS valor
      FROM leads
      WHERE created_at >= ${fromISO} AND created_at < ${toISO} AND status NOT IN ('teste','reembolsado') AND comercial
        AND (${inc} OR (nullif(utm->>'utm_campaign','') IS NOT NULL AND lower(coalesce(utm->>'utm_source','')) IN ('facebook','fb','instagram','ig','meta','messenger','msg','an')))
      GROUP BY 1,2,3 ORDER BY valor DESC, vendas DESC LIMIT 100`;

    // funil por anúncio (?adFunnel=1): sessões agrupadas por utm_content + max_step — passagem do quiz por AD
    let adFunnel = null;
    if (q.adFunnel === '1') {
      adFunnel = await sql`
        SELECT coalesce(nullif(utm->>'utm_content',''),'(sem utm)') AS ad, max_step, count(*)::int AS n
        FROM sessions
        WHERE created_at >= ${fromISO} AND created_at < ${toISO}
          AND (${inc} OR (nullif(utm->>'utm_campaign','') IS NOT NULL AND lower(coalesce(utm->>'utm_source','')) IN ('facebook','fb','instagram','ig','meta','messenger','msg','an')))
        GROUP BY 1,2 ORDER BY 1,2`;
    }

    res.status(200).json({ funnel, sessions: sessions[0].n, leads: leads[0].n, byAd, byProfile, comercial: comercial[0], comercialByAd, adFunnel });
  } catch (e) {
    console.error('analytics error:', e);
    res.status(500).json({ error: 'server' });
  }
};
