// GET /api/report?id=01 — devolve o HTML completo de um relatório. Protegido (mesmo login do /admin).
// Serve por função (e não como arquivo estático) porque o relatório tem gasto, receita e estratégia interna:
// arquivo em /public ficaria acessível a qualquer um com a URL.
// ?embed=1 → força o tema claro (o painel é claro; evita relatório escuro dentro do iframe).
const { isAuthed } = require('../lib/util');
const { find } = require('../lib/reports');

function page(title, msg) {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/><title>${title}</title></head>
    <body style="margin:0;display:grid;place-items:center;min-height:100dvh;background:#f5f3fb;color:#6b6a80;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;text-align:center;padding:24px">
    <div><h1 style="font-size:18px;color:#1b1a2e;margin:0 0 6px">${title}</h1><p style="margin:0;font-size:14px">${msg}</p></div>
    </body></html>`;
}

module.exports = async (req, res) => {
  const q = req.query || {};
  const send = (code, html) => {
    res.statusCode = code;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'private, no-store');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    res.end(html);
  };

  if (!isAuthed(req)) { send(401, page('Sessão expirada', 'Entre de novo no painel para ver este relatório.')); return; }

  const r = find(q.id);
  if (!r) { send(404, page('Relatório não encontrado', 'Esse relatório não existe (ou foi removido do catálogo).')); return; }

  const html = q.embed === '1'
    ? r.html.replace('<html lang="pt-BR">', '<html lang="pt-BR" data-theme="light">')
    : r.html;
  send(200, html);
};
