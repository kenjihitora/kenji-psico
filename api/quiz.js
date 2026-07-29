// GET /api/quiz?from=&to=&source=meta — analítico profundo do QUIZ (sessões). Protegido.
// Complementa o /api/analytics: aqui o foco é o comportamento dentro da página —
// quanto tempo cada sessão durou até parar, em que hora/dia o pessoal responde e o funil por anúncio.
const { sql, ensureTable, isAuthed } = require('../lib/util');

const META = ['facebook', 'fb', 'instagram', 'ig', 'meta', 'messenger', 'msg', 'an'];

module.exports = async (req, res) => {
  if (!isAuthed(req)) { res.status(401).json({ error: 'auth' }); return; }
  try {
    await ensureTable();
    const q = req.query || {};
    const fromISO = new Date((q.from || '2026-05-01') + 'T00:00:00-03:00').toISOString();
    const toISO = new Date(new Date((q.to || '2026-12-31') + 'T00:00:00-03:00').getTime() + 864e5).toISOString();
    const inc = q.source !== 'meta';

    // duração da sessão (do 1º ao último passo) por etapa de parada
    const dur = await sql`
      SELECT max_step,
             count(*)::int AS n,
             round(avg(extract(epoch FROM updated_at - created_at)))::int AS avg_s,
             round(percentile_cont(0.5) WITHIN GROUP (ORDER BY extract(epoch FROM updated_at - created_at)))::int AS p50_s,
             round(percentile_cont(0.9) WITHIN GROUP (ORDER BY extract(epoch FROM updated_at - created_at)))::int AS p90_s,
             count(*) FILTER (WHERE extract(epoch FROM updated_at - created_at) < 5)::int AS quicaram
      FROM sessions
      WHERE created_at >= ${fromISO} AND created_at < ${toISO}
        AND (${inc} OR (nullif(utm->>'utm_campaign','') IS NOT NULL AND lower(coalesce(utm->>'utm_source','')) = ANY(${META})))
      GROUP BY max_step ORDER BY max_step`;

    // hora do dia (Brasília) — sessões iniciadas e sessões que viraram lead (max_step >= 13)
    const hora = await sql`
      SELECT extract(hour FROM (created_at AT TIME ZONE 'America/Sao_Paulo'))::int AS h,
             count(*)::int AS sessoes,
             count(*) FILTER (WHERE max_step >= 1)::int AS iniciaram,
             count(*) FILTER (WHERE max_step >= 13)::int AS leads
      FROM sessions
      WHERE created_at >= ${fromISO} AND created_at < ${toISO}
        AND (${inc} OR (nullif(utm->>'utm_campaign','') IS NOT NULL AND lower(coalesce(utm->>'utm_source','')) = ANY(${META})))
      GROUP BY 1 ORDER BY 1`;

    // dia da semana (0=domingo)
    const dow = await sql`
      SELECT extract(dow FROM (created_at AT TIME ZONE 'America/Sao_Paulo'))::int AS d,
             count(*)::int AS sessoes,
             count(*) FILTER (WHERE max_step >= 1)::int AS iniciaram,
             count(*) FILTER (WHERE max_step >= 13)::int AS leads
      FROM sessions
      WHERE created_at >= ${fromISO} AND created_at < ${toISO}
        AND (${inc} OR (nullif(utm->>'utm_campaign','') IS NOT NULL AND lower(coalesce(utm->>'utm_source','')) = ANY(${META})))
      GROUP BY 1 ORDER BY 1`;

    // tempo de quem completou o quiz até a captura do WhatsApp (etapa 13) e até a VSL (17)
    const tempoCompleto = await sql`
      SELECT count(*)::int AS n,
             round(percentile_cont(0.5) WITHIN GROUP (ORDER BY extract(epoch FROM updated_at - created_at)))::int AS p50_s,
             round(percentile_cont(0.25) WITHIN GROUP (ORDER BY extract(epoch FROM updated_at - created_at)))::int AS p25_s,
             round(percentile_cont(0.75) WITHIN GROUP (ORDER BY extract(epoch FROM updated_at - created_at)))::int AS p75_s
      FROM sessions
      WHERE created_at >= ${fromISO} AND created_at < ${toISO} AND max_step >= 17
        AND (${inc} OR (nullif(utm->>'utm_campaign','') IS NOT NULL AND lower(coalesce(utm->>'utm_source','')) = ANY(${META})))`;

    res.status(200).json({ dur, hora, dow, tempoCompleto: tempoCompleto[0] });
  } catch (e) {
    console.error('quiz error:', e);
    res.status(500).json({ error: 'server' });
  }
};
