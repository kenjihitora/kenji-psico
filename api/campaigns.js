// GET /api/campaigns?level=campaign|adset|ad&parent=<id>&from=YYYY-MM-DD&to=YYYY-MM-DD
// Espelho do Gerenciador do Meta: campanhas → conjuntos → anúncios, com as métricas de DR. Protegido.
const { isAuthed } = require('../lib/util');
const API_VER = process.env.META_API_VERSION || 'v21.0';
const G = `https://graph.facebook.com/${API_VER}`;

// tipos de ação equivalentes (pega o 1o que existir, evita dupla contagem)
const PURCHASE = ['omni_purchase', 'purchase', 'offsite_conversion.fb_pixel_purchase'];
const CHECKOUT = ['omni_initiated_checkout', 'initiate_checkout', 'offsite_conversion.fb_pixel_initiate_checkout'];

function pick(arr, types) {
  if (!Array.isArray(arr)) return 0;
  for (const t of types) { const h = arr.find(a => a.action_type === t); if (h) return Number(h.value) || 0; }
  return 0;
}
function sumType(arr, type) {
  if (!Array.isArray(arr)) return 0;
  return arr.reduce((s, a) => s + (a.action_type === type ? (Number(a.value) || 0) : 0), 0);
}
function sumAll(arr) { return Array.isArray(arr) ? arr.reduce((s, a) => s + (Number(a.value) || 0), 0) : 0; }
function runDays(startISO, stopISO) {
  if (!startISO) return null;
  const start = new Date(startISO).getTime(); if (isNaN(start)) return null;
  let end = Date.now();
  if (stopISO) { const st = new Date(stopISO).getTime(); if (!isNaN(st) && st < end) end = st; }
  return Math.max(0, Math.round((end - start) / 864e5));
}
async function getJSON(url) { const r = await fetch(url); const j = await r.json().catch(() => ({})); return { ok: r.ok, j }; }

module.exports = async (req, res) => {
  if (!isAuthed(req)) { res.status(401).json({ error: 'auth' }); return; }
  try {
    const token = process.env.META_ACCESS_TOKEN;
    let acct = process.env.META_AD_ACCOUNT_ID || '';
    if (!token || !acct) { res.status(200).json({ connected: false }); return; }
    if (!/^act_/.test(acct)) acct = 'act_' + acct;

    const q = req.query || {};
    const level = ['campaign', 'adset', 'ad'].includes(q.level) ? q.level : 'campaign';
    const parent = q.parent || '';
    const from = q.from || new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
    const to   = q.to   || new Date().toISOString().slice(0, 10);
    const tr = encodeURIComponent(JSON.stringify({ since: from, until: to }));

    // objeto-base pros insights + edge de metadados (nome/status/datas) por nível
    let insObj, entityUrl, idField, nameField;
    if (level === 'campaign') {
      insObj = acct; idField = 'campaign_id'; nameField = 'campaign_name';
      entityUrl = `${G}/${acct}/campaigns?fields=id,name,effective_status,start_time,stop_time&limit=500&access_token=${token}`;
    } else if (level === 'adset') {
      if (!parent) { res.status(400).json({ error: 'parent' }); return; }
      insObj = parent; idField = 'adset_id'; nameField = 'adset_name';
      entityUrl = `${G}/${parent}/adsets?fields=id,name,effective_status,start_time,end_time&limit=500&access_token=${token}`;
    } else {
      if (!parent) { res.status(400).json({ error: 'parent' }); return; }
      insObj = parent; idField = 'ad_id'; nameField = 'ad_name';
      entityUrl = `${G}/${parent}/ads?fields=id,name,effective_status,created_time&limit=500&access_token=${token}`;
    }

    const fields = [idField, nameField, 'account_currency', 'spend', 'impressions',
      'inline_link_clicks', 'inline_link_click_ctr', 'actions', 'action_values',
      'purchase_roas', 'video_p75_watched_actions'].join(',');
    const insUrl = `${G}/${insObj}/insights?level=${level}&fields=${fields}&time_range=${tr}&limit=500&access_token=${token}`;

    const [ins, ent] = await Promise.all([getJSON(insUrl), getJSON(entityUrl)]);
    if (!ins.ok || ins.j.error) {
      res.status(200).json({ connected: true, level, error: (ins.j.error && ins.j.error.message) || 'Erro na API do Meta' });
      return;
    }

    const meta = {};
    ((ent.j && ent.j.data) || []).forEach(e => {
      meta[e.id] = { status: e.effective_status, start: e.start_time || e.created_time, stop: e.stop_time || e.end_time || null };
    });

    const data = ins.j.data || [];
    const currency = (data[0] && data[0].account_currency) || 'BRL';

    function metrics(d) {
      const spend = Number(d.spend) || 0, impr = Number(d.impressions) || 0, clicks = Number(d.inline_link_clicks) || 0;
      const vendas = pick(d.actions, PURCHASE);
      const fat = pick(d.action_values, PURCHASE);
      const ic = pick(d.actions, CHECKOUT);
      const v3 = sumType(d.actions, 'video_view');           // "video view" do Meta = 3 segundos
      const p75 = sumAll(d.video_p75_watched_actions);
      return { spend, impr, clicks, vendas, fat, ic, v3, p75 };
    }

    const rows = data.map(d => {
      const m = metrics(d), e = meta[d[idField]] || {};
      return {
        id: d[idField], name: d[nameField], status: e.status || null,
        spend: m.spend,
        clicks: m.clicks,
        vendas: m.vendas,
        faturamento: m.fat,
        roas: pick(d.purchase_roas, ['omni_purchase', 'purchase']) || (m.spend ? m.fat / m.spend : 0),
        cpa: m.vendas ? m.spend / m.vendas : null,
        custo_ic: m.ic ? m.spend / m.ic : null,
        cpc: m.clicks ? m.spend / m.clicks : null,
        ctr: d.inline_link_click_ctr != null ? Number(d.inline_link_click_ctr) : (m.impr ? m.clicks / m.impr * 100 : null),
        hook: m.impr ? m.v3 / m.impr * 100 : null,
        body: m.impr ? m.p75 / m.impr * 100 : null,
        dias: runDays(e.start, e.stop)
      };
    }).sort((a, b) => b.spend - a.spend);

    const T = data.reduce((a, d) => {
      const m = metrics(d);
      a.spend += m.spend; a.impr += m.impr; a.clicks += m.clicks;
      a.vendas += m.vendas; a.fat += m.fat; a.ic += m.ic; a.v3 += m.v3; a.p75 += m.p75;
      return a;
    }, { spend: 0, impr: 0, clicks: 0, vendas: 0, fat: 0, ic: 0, v3: 0, p75: 0 });
    const totals = {
      spend: T.spend, clicks: T.clicks, vendas: T.vendas, faturamento: T.fat,
      roas: T.spend ? T.fat / T.spend : 0,
      cpa: T.vendas ? T.spend / T.vendas : null,
      custo_ic: T.ic ? T.spend / T.ic : null,
      cpc: T.clicks ? T.spend / T.clicks : null,
      ctr: T.impr ? T.clicks / T.impr * 100 : null,
      hook: T.impr ? T.v3 / T.impr * 100 : null,
      body: T.impr ? T.p75 / T.impr * 100 : null
    };

    res.status(200).json({ connected: true, level, currency, rows, totals });
  } catch (e) {
    console.error('campaigns error:', e);
    res.status(500).json({ error: 'server' });
  }
};
