// GET /api/campaigns?from=YYYY-MM-DD&to=YYYY-MM-DD
// Campanhas do Meta (Marketing API) cruzadas com os nossos leads (por utm_campaign). Protegido.
const { sql, ensureTable, isAuthed } = require('../lib/util');

const API_VER = process.env.META_API_VERSION || 'v21.0';

// tipos de ação de "lead" que o Meta pode devolver — pegamos o 1o que existir (evita dupla contagem)
const LEAD_ACTIONS = ['offsite_conversion.fb_pixel_lead', 'lead', 'onsite_conversion.lead_grouped', 'leadgen.other'];
function metaLeads(actions) {
  if (!Array.isArray(actions)) return 0;
  for (const t of LEAD_ACTIONS) {
    const hit = actions.find(a => a.action_type === t);
    if (hit) return Number(hit.value) || 0;
  }
  return 0;
}

module.exports = async (req, res) => {
  if (!isAuthed(req)) { res.status(401).json({ error: 'auth' }); return; }
  try {
    const token = process.env.META_ACCESS_TOKEN;
    let acct = process.env.META_AD_ACCOUNT_ID || '';
    // sem credenciais → estado "não conectado" (a aba mostra o passo-a-passo)
    if (!token || !acct) { res.status(200).json({ connected: false }); return; }
    if (!/^act_/.test(acct)) acct = 'act_' + acct; // aceita com ou sem prefixo act_

    await ensureTable();
    const q = req.query || {};
    const from = q.from || new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
    const to   = q.to   || new Date().toISOString().slice(0, 10);

    // 1) insights do Meta, agregado por campanha no período
    const fields = 'campaign_id,campaign_name,spend,impressions,clicks,ctr,actions,account_currency';
    const params = new URLSearchParams({
      level: 'campaign',
      fields,
      time_range: JSON.stringify({ since: from, until: to }),
      limit: '500',
      access_token: token
    });
    const r = await fetch(`https://graph.facebook.com/${API_VER}/${acct}/insights?${params}`);
    const j = await r.json().catch(() => ({}));
    if (!r.ok || j.error) {
      res.status(200).json({ connected: true, error: (j.error && j.error.message) || 'Erro na API do Meta' });
      return;
    }
    const rows = j.data || [];
    const currency = (rows[0] && rows[0].account_currency) || 'BRL';

    // 2) nossos leads por campanha (utm_campaign), mesmo período, ignorando 'teste'
    const fromISO = new Date(from + 'T00:00:00').toISOString();
    const toEnd   = new Date(new Date(to + 'T00:00:00').getTime() + 864e5).toISOString(); // fim do dia (exclusivo)
    const ours = await sql`
      SELECT coalesce(nullif(utm->>'utm_campaign',''),'(sem campanha)') AS campaign,
             count(*)::int AS leads,
             count(*) FILTER (WHERE status='vendido')::int AS vendidos
      FROM leads
      WHERE created_at >= ${fromISO} AND created_at < ${toEnd} AND status <> 'teste'
      GROUP BY 1`;
    const ourMap = {};
    ours.forEach(o => { ourMap[o.campaign] = { leads: o.leads, vendidos: o.vendidos }; });

    // 3) junta pelo NOME da campanha (utm_campaign = campaign.name do Meta)
    const campaigns = rows.map(c => {
      const spend = Number(c.spend) || 0;
      const ml = metaLeads(c.actions);
      const our = ourMap[c.campaign_name] || { leads: 0, vendidos: 0 };
      return {
        id: c.campaign_id,
        name: c.campaign_name,
        spend,
        impressions: Number(c.impressions) || 0,
        clicks: Number(c.clicks) || 0,
        ctr: Number(c.ctr) || 0,
        meta_leads: ml,
        meta_cpl: ml ? spend / ml : null,
        our_leads: our.leads,
        our_cpl: our.leads ? spend / our.leads : null,
        vendidos: our.vendidos,
        cpa: our.vendidos ? spend / our.vendidos : null
      };
    }).sort((a, b) => b.spend - a.spend);

    // totais
    const t = campaigns.reduce((a, c) => {
      a.spend += c.spend; a.impressions += c.impressions; a.clicks += c.clicks;
      a.meta_leads += c.meta_leads; a.our_leads += c.our_leads; a.vendidos += c.vendidos;
      return a;
    }, { spend: 0, impressions: 0, clicks: 0, meta_leads: 0, our_leads: 0, vendidos: 0 });
    t.our_cpl = t.our_leads ? t.spend / t.our_leads : null;
    t.cpa = t.vendidos ? t.spend / t.vendidos : null;
    t.ctr = t.impressions ? (t.clicks / t.impressions * 100) : 0;

    res.status(200).json({ connected: true, from, to, currency, campaigns, totals: t });
  } catch (e) {
    console.error('campaigns error:', e);
    res.status(500).json({ error: 'server' });
  }
};
