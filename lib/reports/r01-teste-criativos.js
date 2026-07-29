// Relatório 01 — Teste de criativos (17/07 a 28/07/2026).
// Documento estático, servido por api/report.js SÓ para quem está logado no /admin.
// Dados apurados em 28/jul/2026 cruzando Meta Marketing API + tabela sessions + CRM.
module.exports = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>Relatório 01 · Teste de criativos · Kenji Hirota</title>
<link rel="icon" type="image/png" href="/favicon.png" />
<style>
  :root{
    --paper:#f7f6fb; --card:#ffffff; --ink:#211e33; --muted:#6b6880; --line:#e7e4f2;
    --accent:#5b3df0; --teal:#00a184; --gold:#9a6b1a; --goldsoft:#f4ecda;
    --good:#0e8f66; --bad:#c25348; --chip:#efecfa; --codebg:#f1eef9;
  }
  @media (prefers-color-scheme: dark){
    :root{ --paper:#141220; --card:#1e1b2c; --ink:#eceaf6; --muted:#9d99b4; --line:#322e48;
      --accent:#7c63f5; --teal:#2aa593; --gold:#d3a94f; --goldsoft:#332c1d;
      --good:#3cb98d; --bad:#e07a6e; --chip:#2a2640; --codebg:#282344; }
  }
  :root[data-theme="dark"]{ --paper:#141220; --card:#1e1b2c; --ink:#eceaf6; --muted:#9d99b4; --line:#322e48;
    --accent:#7c63f5; --teal:#2aa593; --gold:#d3a94f; --goldsoft:#332c1d;
    --good:#3cb98d; --bad:#e07a6e; --chip:#2a2640; --codebg:#282344; }
  :root[data-theme="light"]{ --paper:#f7f6fb; --card:#ffffff; --ink:#211e33; --muted:#6b6880; --line:#e7e4f2;
    --accent:#5b3df0; --teal:#00a184; --gold:#9a6b1a; --goldsoft:#f4ecda;
    --good:#0e8f66; --bad:#c25348; --chip:#efecfa; --codebg:#f1eef9; }

  *{box-sizing:border-box}
  body{margin:0;background:var(--paper);color:var(--ink);
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Inter,Arial,sans-serif;
    line-height:1.55;font-size:15.5px;-webkit-font-smoothing:antialiased}
  .wrap{max-width:1020px;margin:0 auto;padding:40px 22px 80px}
  h1{font-size:clamp(24px,4vw,34px);line-height:1.15;margin:6px 0 10px;letter-spacing:-.02em;text-wrap:balance}
  h2{font-size:20px;margin:0 0 4px;letter-spacing:-.01em;text-wrap:balance}
  h3{font-size:16px;margin:22px 0 8px}
  p{max-width:72ch}
  .eyebrow{font-size:11.5px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}
  .lede{color:var(--muted);font-size:15px;max-width:78ch}
  .meta-row{display:flex;gap:18px;flex-wrap:wrap;margin:16px 0 0;font-size:13px;color:var(--muted)}
  .meta-row b{color:var(--ink);font-weight:700}
  section{margin-top:46px}
  .card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:20px 22px}
  .grid{display:grid;gap:12px}
  .g3{grid-template-columns:repeat(auto-fit,minmax(230px,1fr))}
  .g2{grid-template-columns:repeat(auto-fit,minmax(300px,1fr))}

  .tile{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:16px 18px}
  .tile .n{font-size:26px;font-weight:850;letter-spacing:-.02em;font-variant-numeric:tabular-nums;line-height:1.15}
  .tile .l{font-size:12px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-top:4px}
  .tile .s{font-size:12.5px;color:var(--muted);margin-top:4px}

  .finding{display:flex;gap:14px;padding:14px 0;border-bottom:1px solid var(--line);align-items:flex-start}
  .finding:last-child{border-bottom:0}
  .finding .tag{flex:0 0 auto;font-size:11px;font-weight:800;letter-spacing:.08em;padding:4px 9px;border-radius:999px;background:var(--chip);color:var(--accent);margin-top:2px;white-space:nowrap}
  .finding p{margin:0}

  .tblwrap{overflow-x:auto;-webkit-overflow-scrolling:touch;border:1px solid var(--line);border-radius:14px;background:var(--card)}
  table{border-collapse:collapse;width:100%;font-size:13.5px;min-width:640px}
  th{font-size:11px;text-transform:uppercase;letter-spacing:.07em;color:var(--muted);font-weight:800;
    text-align:left;padding:12px 12px;border-bottom:1px solid var(--line);white-space:nowrap}
  td{padding:10px 12px;border-bottom:1px solid var(--line);vertical-align:middle;font-variant-numeric:tabular-nums}
  tr:last-child td{border-bottom:0}
  tr:hover td{background:color-mix(in srgb, var(--chip) 45%, transparent)}
  th.num,td.num{text-align:right}
  td.adname{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12.5px;font-weight:600;white-space:nowrap}
  tr.champ td{background:color-mix(in srgb, var(--chip) 70%, transparent)}
  tr.total td{font-weight:800;border-top:2px solid var(--line);background:color-mix(in srgb, var(--chip) 35%, transparent)}
  .up{color:var(--good);font-weight:700}.down{color:var(--bad);font-weight:700}
  .dim{color:var(--muted)}
  .cellnote{font-size:11px;color:var(--muted);display:block}

  .bar{height:10px;background:var(--line);border-radius:6px;overflow:hidden;min-width:56px}
  .bar>i{display:block;height:100%;border-radius:0 4px 4px 0;background:var(--accent);min-width:2px}
  .bar>i.t{background:var(--teal)} .bar>i.g{background:var(--gold)}
  .barrow{display:grid;grid-template-columns:minmax(120px,180px) 1fr 64px;gap:10px;align-items:center;padding:6px 0;font-size:13px}
  .barrow .lab{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .barrow .val{text-align:right;font-variant-numeric:tabular-nums;font-weight:700}
  .barrow:hover{background:color-mix(in srgb, var(--chip) 45%, transparent);border-radius:8px}
  .pair{display:flex;height:12px;border-radius:6px;overflow:hidden;background:var(--line)}
  .pair>i{display:block;height:100%}
  .pair>i.c{background:var(--accent);margin-right:2px;border-radius:4px 0 0 4px}
  .pair>i.d{background:var(--teal);border-radius:0 4px 4px 0}
  .legend{display:flex;gap:16px;flex-wrap:wrap;font-size:12.5px;color:var(--muted);margin:8px 0 2px}
  .legend .sw{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:6px;vertical-align:baseline}

  .qa{border-left:3px solid var(--accent);padding:2px 0 2px 18px;margin:26px 0}
  .qa .q{font-weight:800;font-size:16px;margin:0 0 8px}
  .qa .a-short{display:inline-block;background:var(--chip);color:var(--accent);font-weight:800;font-size:13px;padding:5px 12px;border-radius:999px;margin-bottom:10px}
  .qa p{margin:8px 0}

  .callout{border:1px solid var(--line);border-left:4px solid var(--gold);background:var(--goldsoft);border-radius:12px;padding:14px 18px;margin:18px 0;font-size:14px}
  .callout.bad{border-left-color:var(--bad);background:color-mix(in srgb, var(--bad) 9%, var(--card))}
  code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.86em;background:var(--codebg);padding:1px 6px;border-radius:6px}

  .plan .item{display:flex;gap:14px;padding:13px 0;border-bottom:1px solid var(--line);align-items:flex-start}
  .plan .item:last-child{border-bottom:0}
  .prio{flex:0 0 auto;font-size:11px;font-weight:850;padding:4px 9px;border-radius:7px;margin-top:2px;letter-spacing:.05em}
  .p0{background:color-mix(in srgb, var(--bad) 14%, var(--card));color:var(--bad)}
  .p1{background:color-mix(in srgb, var(--gold) 16%, var(--card));color:var(--gold)}
  .p2{background:var(--chip);color:var(--muted)}
  .plan p{margin:0}
  .plan b{font-weight:750}

  .foot{margin-top:56px;padding-top:18px;border-top:1px solid var(--line);font-size:12.5px;color:var(--muted)}
  .foot p{max-width:none}
  @media (prefers-reduced-motion: no-preference){ .bar>i,.pair>i{transition:width .5s ease} }
  @media print{ body{background:#fff} .card,.tile,.tblwrap{break-inside:avoid} }
</style>
</head>
<body>
<div class="wrap">

<header>
  <div class="eyebrow">Relatório 01 · CRO &amp; Mídia</div>
  <h1>O que cada AD está realmente entregando — vendas, métricas e os vazamentos do funil</h1>
  <p class="lede">Varredura completa cruzando Meta Marketing API (gasto, CPC, CTR, hook, body por campanha/AD), o banco do funil (1.374 sessões, passagem tela a tela) e o CRM (128 leads reais, 16 compradores com produto atribuído). Todos os CPLs foram <b>recalculados na mão</b> cruzando <code>utm_campaign + utm_content</code> — o cruzamento só por nome duplicava leads entre campanhas.</p>
  <div class="meta-row">
    <span>Período <b>16–28 jul 2026</b></span>
    <span>Investimento <b>R$ 2.067,39</b></span>
    <span>Leads reais <b>128</b> (sem teste)</span>
    <span>Vendas CRM <b>16 · R$ 1.461,90</b></span>
    <span>Fuso <b>Brasília</b></span>
  </div>
</header>

<section>
  <div class="grid g3">
    <div class="tile"><div class="n">R$ 1.461,90</div><div class="l">Receita atribuída (CRM)</div><div class="s">o pixel só enxergou R$ 307 — 44% das vendas</div></div>
    <div class="tile"><div class="n">0,71</div><div class="l">ROAS front blended</div><div class="s">front recupera 71% do tráfego antes da esteira</div></div>
    <div class="tile"><div class="n">R$ 91,37</div><div class="l">Ticket médio por comprador</div><div class="s">attach do bump: 40% · upsell Pilares: 2 de 16</div></div>
    <div class="tile"><div class="n">21,3%</div><div class="l">Passam da tela de início</div><div class="s">79% do tráfego pago morre antes do quiz</div></div>
    <div class="tile"><div class="n">6 <span style="font-size:15px;color:var(--muted)">de 16</span></div><div class="l">Vendas vêm do AD 03</div><div class="s">R$ 586,30 · ROAS front 0,97 — quase se paga sozinho</div></div>
    <div class="tile"><div class="n">6 <span style="font-size:15px;color:var(--muted)">de 7</span></div><div class="l">Vendas do comercial vêm de AD 03 + 01 + 04</div><div class="s">lead do AD 06 só compra sozinho</div></div>
  </div>
</section>

<section>
  <div class="eyebrow">TL;DR</div>
  <h2>Seis achados que pagam o relatório</h2>
  <div class="card" style="margin-top:12px">
    <div class="finding"><span class="tag">CAMPEÃO</span><p><b>AD 03 é o criativo validado do funil</b> — 6 das 16 vendas, R$ 586,30, presente em 4 campanhas. Somando todo o gasto dele (R$ 606,80), ele praticamente se paga só no front (ROAS 0,97), <i>antes</i> de esteira, upsell e mentoria.</p></div>
    <div class="finding"><span class="tag">POR QUÊ</span><p><b>Ele não vence em nenhuma métrica de topo.</b> Hook médio (10–23%), CPC caro (R$ 3,45–6,51). Onde ele esmaga: <b>qualidade do clique</b> — 34–49% de start rate no quiz e a melhor passagem até a VSL. Quem clica no AD 03 vem <i>pra fazer o teste</i>. Congruência anúncio→página vale mais que hook bonito.</p></div>
    <div class="finding"><span class="tag">GARGALO</span><p><b>O vazamento do funil não é o quiz — é a tela de início.</b> 79% de todas as sessões morrem sem clicar INICIAR. Quem inicia, chega na VSL em taxa altíssima (60–100% de passagem interna). Todo o dinheiro de otimização de página está numa tela só.</p></div>
    <div class="finding"><span class="tag">ABO×CBO</span><p><b>Pro AD 03, a CBO paga clique mais caro e vende mais.</b> CPC na CBO foi até 89% maior que na ABO — e mesmo assim entregou CPL 46% menor e 4 das 6 vendas. A entrega da CBO encontra comprador; a da ABO encontra clicador. Clique barato ≠ lead que compra.</p></div>
    <div class="finding"><span class="tag">COMERCIAL</span><p><b>O comercial converte lead de AD 03 e AD 01</b> (6 das 7 vendas fechadas na mão). O AD 06 — justamente o de CPL mais barato — tem <b>zero</b> vendas via comercial: o lead dele compra self-service ou não compra.</p></div>
    <div class="finding"><span class="tag">TRACKING</span><p><b>Tracking sujo já custou atribuição real:</b> a maior compradora da base (R$ 346,90, Fundamentos + Pilares) veio de campanha com UTM literal <code>{{ad.name}}</code> sem preencher. E o Purchase do pixel só bate com 44% das vendas do CRM — otimizar campanha por pixel hoje é dirigir olhando um retrovisor embaçado.</p></div>
  </div>
</section>

<section>
  <div class="eyebrow">§1 · Vendas por AD</div>
  <h2>Placar real de vendas — direto dos cards do CRM</h2>
  <p class="lede">Compras atribuídas lead a lead (produto + valor), somando todas as campanhas em que cada AD rodou. CPA real = gasto total do AD ÷ vendas CRM.</p>
  <div class="tblwrap" style="margin-top:12px">
  <table>
    <thead><tr>
      <th>AD</th><th class="num">Vendas</th><th>Receita</th><th class="num">Comercial</th><th class="num">Direto</th>
      <th class="num">Ticket médio</th><th class="num">Gasto total</th><th class="num">CPA real</th><th class="num">ROAS front</th>
    </tr></thead>
    <tbody>
      <tr class="champ"><td class="adname">AD 03 🏆</td><td class="num"><b>6</b></td>
        <td><div style="display:flex;align-items:center;gap:8px"><b style="white-space:nowrap">R$ 586,30</b><div class="bar" style="flex:1"><i class="g" style="width:100%"></i></div></div></td>
        <td class="num">4</td><td class="num">2</td><td class="num">R$ 97,72</td><td class="num">R$ 606,80</td><td class="num">R$ 101,13</td><td class="num up">0,97</td></tr>
      <tr><td class="adname">AD 01</td><td class="num"><b>3</b></td>
        <td><div style="display:flex;align-items:center;gap:8px"><b style="white-space:nowrap">R$ 189,50</b><div class="bar" style="flex:1"><i class="g" style="width:32%"></i></div></div></td>
        <td class="num">2</td><td class="num">1</td><td class="num">R$ 63,17</td><td class="num">R$ 271,83</td><td class="num">R$ 90,61</td><td class="num">0,70</td></tr>
      <tr><td class="adname">AD 06</td><td class="num"><b>2</b></td>
        <td><div style="display:flex;align-items:center;gap:8px"><b style="white-space:nowrap">R$ 99,80</b><div class="bar" style="flex:1"><i class="g" style="width:17%"></i></div></div></td>
        <td class="num">0</td><td class="num">2</td><td class="num">R$ 49,90</td><td class="num">R$ 269,15</td><td class="num">R$ 134,58</td><td class="num down">0,37</td></tr>
      <tr><td class="adname">AD 04</td><td class="num">1</td>
        <td><div style="display:flex;align-items:center;gap:8px"><b style="white-space:nowrap">R$ 69,80</b><div class="bar" style="flex:1"><i class="g" style="width:12%"></i></div></div></td>
        <td class="num">1</td><td class="num">0</td><td class="num">R$ 69,80</td><td class="num">R$ 64,40</td><td class="num">R$ 64,40</td><td class="num">1,08 <span class="cellnote">n=1 · sorte, não sinal</span></td></tr>
      <tr><td class="adname">AD 08</td><td class="num">1</td>
        <td><div style="display:flex;align-items:center;gap:8px"><b style="white-space:nowrap">R$ 69,80</b><div class="bar" style="flex:1"><i class="g" style="width:12%"></i></div></div></td>
        <td class="num">0</td><td class="num">1</td><td class="num">R$ 69,80</td><td class="num">R$ 288,81</td><td class="num">R$ 288,81</td><td class="num down">0,24</td></tr>
      <tr><td class="adname">AD 05</td><td class="num">1</td>
        <td><div style="display:flex;align-items:center;gap:8px"><b style="white-space:nowrap">R$ 49,90</b><div class="bar" style="flex:1"><i class="g" style="width:9%"></i></div></div></td>
        <td class="num">0</td><td class="num">1</td><td class="num">R$ 49,90</td><td class="num">R$ 108,18</td><td class="num">R$ 108,18</td><td class="num">0,46</td></tr>
      <tr><td class="adname">AD 02 · Cópia Adv.</td><td class="num">1</td>
        <td><div style="display:flex;align-items:center;gap:8px"><b style="white-space:nowrap">R$ 49,90</b><div class="bar" style="flex:1"><i class="g" style="width:9%"></i></div></div></td>
        <td class="num">0</td><td class="num">1</td><td class="num">R$ 49,90</td><td class="num">R$ 61,22</td><td class="num">R$ 61,22</td><td class="num">0,82 <span class="cellnote">n=1</span></td></tr>
      <tr><td class="adname dim">{{ad.name}} ⚠️</td><td class="num">1</td>
        <td><div style="display:flex;align-items:center;gap:8px"><b style="white-space:nowrap">R$ 346,90</b><div class="bar" style="flex:1"><i class="g" style="width:59%"></i></div></div></td>
        <td class="num">0</td><td class="num">1</td><td class="num">R$ 346,90</td><td class="num dim">—</td><td class="num dim">—</td><td class="num dim">sem atribuição</td></tr>
      <tr><td class="adname dim">AD 02 · AD 07 · AD 09</td><td class="num">0</td><td class="dim">—</td><td class="num">0</td><td class="num">0</td><td class="num dim">—</td><td class="num">R$ 337,11</td><td class="num dim">∞</td><td class="num down">0,00</td></tr>
      <tr class="total"><td>TOTAL</td><td class="num">16</td><td><b>R$ 1.461,90</b></td><td class="num">7</td><td class="num">9</td><td class="num">R$ 91,37</td><td class="num">R$ 2.067,39</td><td class="num">R$ 129,21</td><td class="num">0,71</td></tr>
    </tbody>
  </table>
  </div>
  <div class="callout" style="margin-top:14px">💡 <b>Mix de produtos nas 16 vendas:</b> Fundamentos 15× (R$ 748,50) · Metas em Movimento 6× (R$ 119,40) · Pilares 2× (R$ 594,00). O <b>bump tem 40% de attach</b> (6 de 15 que levaram o Fundamentos) — está funcionando. O Pilares aparece em só 2 vendas mas responde por 41% da receita: <b>o dinheiro está no degrau de cima</b>, exatamente a tese da esteira.</div>
  <div class="callout bad">⚠️ <b>2 vendidos sem compra atribuída no CRM:</b> Jean (AD 02, ABO V1) e Beatriz (campanha com UTM quebrada). Atribuir os produtos deles muda o placar — o AD 02 pode ter 1 venda "invisível" hoje.</div>
</section>

<section>
  <div class="eyebrow">§2 · As perguntas do briefing, respondidas com número</div>
  <h2>Q&amp;A do analista</h2>

  <div class="qa">
    <p class="q">“O AD 03 teve melhor CPC e melhor hook em ABO ou CBO?”</p>
    <span class="a-short">CPC melhor na ABO · Hook melhor na CBO — e a CBO é onde ele vende</span>
    <div class="tblwrap">
    <table>
      <thead><tr><th>AD 03 em…</th><th class="num">Dias</th><th class="num">Gasto</th><th class="num">CPC</th><th class="num">CTR</th><th class="num">Hook</th><th class="num">Body</th><th class="num">Leads*</th><th class="num">CPL*</th><th class="num">Vendas CRM</th></tr></thead>
      <tbody>
        <tr><td class="adname">ABO V1 (Quizz-Vendas)</td><td class="num">11</td><td class="num">R$ 62,15</td><td class="num up">R$ 3,45</td><td class="num">0,76%</td><td class="num down">10,5%</td><td class="num">1,31%</td><td class="num">3</td><td class="num">R$ 20,72</td><td class="num">1 (com.)</td></tr>
        <tr><td class="adname">ABO V2 FRIO</td><td class="num">7</td><td class="num">R$ 160,03</td><td class="num">R$ 4,45</td><td class="num">1,99%</td><td class="num">19,9%</td><td class="num">2,16%</td><td class="num">6</td><td class="num">R$ 26,67</td><td class="num">1</td></tr>
        <tr class="champ"><td class="adname">CBO V3 (1-1-5)</td><td class="num">4</td><td class="num">R$ 286,33</td><td class="num down">R$ 6,51</td><td class="num">2,02%</td><td class="num up">22,7%</td><td class="num up">2,75%</td><td class="num"><b>20</b></td><td class="num up">R$ 14,32</td><td class="num"><b>4</b> (3 com. + 1)</td></tr>
        <tr><td class="adname">CBO solo (1-1-1)</td><td class="num">1</td><td class="num">R$ 98,29</td><td class="num">R$ 4,91</td><td class="num">1,43%</td><td class="num">15,4%</td><td class="num">2,29%</td><td class="num">10</td><td class="num up">R$ 9,83</td><td class="num dim">cedo demais</td></tr>
      </tbody>
    </table>
    </div>
    <p><b>Leitura de CRO sênior:</b> a ABO comprou o clique mais barato (R$ 3,45) e o hook mais fraco; a CBO 1-1-5 pagou o clique mais caro da série (R$ 6,51, +89%) e mesmo assim entregou o <b>CPL 46% menor</b> e concentrou 4 das 6 vendas. Ou seja: o leilão da CBO está achando um público que <i>entra e completa o quiz</i> — e a CBO solo, com 1 dia de vida, já mostra o melhor CPL (R$ 9,83) e o melhor start rate do funil inteiro (48,6%). O CPC isolado teria levado à conclusão errada.</p>
  </div>

  <div class="qa">
    <p class="q">“Qual AD, mesmo com menos vendas, trouxe o melhor CPL?”</p>
    <span class="a-short">AD 06 — R$ 9,69 por lead, o melhor CPL com volume do funil</span>
    <p>O AD 06 gerou <b>27 leads a R$ 9,97 de média</b> (R$ 9,69 na ABO V2) — quase metade do CPL geral. Mas veja o contraste de qualidade: cada lead do AD 06 vale <b>R$ 3,70 em receita</b>, contra <b>R$ 15,03 por lead do AD 03</b> (4× mais). Menção honrosa: AD 05 na CBO fez CPL de R$ 8,48, porém com 4 leads — micro-amostra, não dá pra afirmar nada.</p>
    <p><b>Como usar o AD 06:</b> ele não é ruim — é outro papel. É máquina de encher a base barato (lembrando: 38% de start rate, funil interno saudável). Enquanto a venda direta dele não destrava, é o alimentador perfeito pros disparos de WhatsApp + página de diagnóstico por perfil quando a Evolution API sair do standby.</p>
  </div>

  <div class="qa">
    <p class="q">“Algum AD vende mais pelo comercial do que no direto?”</p>
    <span class="a-short">Sim — AD 03 (4×2) e AD 01 (2×1). E o AD 06 é o oposto: 0 pelo comercial</span>
    <div class="legend"><span><span class="sw" style="background:var(--accent)"></span>Comercial (fechado na mão)</span><span><span class="sw" style="background:var(--teal)"></span>Direto (sozinho)</span></div>
    <div>
      <div class="barrow"><span class="lab">AD 03</span><div class="pair"><i class="c" style="width:66.7%"></i><i class="d" style="width:33.3%"></i></div><span class="val">4 · 2</span></div>
      <div class="barrow"><span class="lab">AD 01</span><div class="pair"><i class="c" style="width:66.7%"></i><i class="d" style="width:33.3%"></i></div><span class="val">2 · 1</span></div>
      <div class="barrow"><span class="lab">AD 04</span><div class="pair"><i class="c" style="width:100%"></i></div><span class="val">1 · 0</span></div>
      <div class="barrow"><span class="lab">AD 06</span><div class="pair"><i class="d" style="width:100%"></i></div><span class="val">0 · 2</span></div>
      <div class="barrow"><span class="lab">AD 05 / 08 / 02-Adv</span><div class="pair"><i class="d" style="width:100%"></i></div><span class="val">0 · 3</span></div>
    </div>
    <p><b>Insight operacional:</b> o lead que veio de AD 03/AD 01 <i>atende e fecha no WhatsApp</i> — 86% das vendas do comercial saem deles. O lead do AD 06 ignora abordagem (ou não foi abordado — vale conferir com o Kalebe). Direcionar a energia do comercial por origem de AD é ganho imediato e grátis.</p>
  </div>

  <div class="qa">
    <p class="q">“Algum AD apresenta métricas secundárias melhores que o AD 03?”</p>
    <span class="a-short">Vários — em CPC e hook. Nenhum no pacote completo. E é daí que saem as variações</span>
    <div class="grid g2" style="margin-top:8px">
      <div class="card">
        <h3 style="margin-top:0">Melhores CPC (link)</h3>
        <div class="barrow"><span class="lab">AD 01 · ABO V1</span><div class="bar"><i style="width:100%"></i></div><span class="val">R$ 1,29</span></div>
        <div class="barrow"><span class="lab">AD 07 · CBO</span><div class="bar"><i style="width:80%"></i></div><span class="val">R$ 1,61</span></div>
        <div class="barrow"><span class="lab">AD 06 · CBO solo</span><div class="bar"><i style="width:67%"></i></div><span class="val">R$ 1,93</span></div>
        <div class="barrow"><span class="lab">AD 02 · ABO V1</span><div class="bar"><i style="width:61%"></i></div><span class="val">R$ 2,11</span></div>
        <div class="barrow"><span class="lab dim">AD 03 (melhor caso)</span><div class="bar"><i style="width:37%"></i></div><span class="val dim">R$ 3,45</span></div>
      </div>
      <div class="card">
        <h3 style="margin-top:0">Melhores Hook rate (3s ÷ impressões)</h3>
        <div class="barrow"><span class="lab">AD 07 · CBO ⚠️R$8</span><div class="bar"><i style="width:100%"></i></div><span class="val">49,2%</span></div>
        <div class="barrow"><span class="lab">AD 08 · CBO</span><div class="bar"><i style="width:73%"></i></div><span class="val">36,0%</span></div>
        <div class="barrow"><span class="lab">AD 08 · ABO V2</span><div class="bar"><i style="width:62%"></i></div><span class="val">30,7%</span></div>
        <div class="barrow"><span class="lab">AD 09 · ABO V2</span><div class="bar"><i style="width:53%"></i></div><span class="val">26,2%</span></div>
        <div class="barrow"><span class="lab dim">AD 03 (melhor caso)</span><div class="bar"><i style="width:46%"></i></div><span class="val dim">22,7%</span></div>
      </div>
    </div>
    <p style="margin-top:12px"><b>O padrão que importa:</b> AD 08 prende atenção como ninguém (30–36% de hook) mas só 24% de start e 1 venda — atenção sem intenção. AD 01 tem o clique mais barato do funil mas afoga 87% do tráfego na tela de início. O AD 03 não lidera nada disso e vende 6. <b>A variação ideal do AD 03 rouba a abertura do AD 08/07 e mantém a promessa/CTA do AD 03</b> — critério de aprovação: hook ≥ 25% <i>mantendo</i> start rate ≥ 35% e CPL ≤ R$ 15.</p>
  </div>
</section>

<section>
  <div class="eyebrow">§3 · Funil do quiz por AD</div>
  <h2>Onde cada AD sangra dentro da página</h2>
  <p class="lede">Sessões reais tela a tela (18 etapas), agregadas por criativo em todas as campanhas. As duas métricas decisivas: % que clica INICIAR e % que passa da tela do WhatsApp depois de chegar nela.</p>
  <div class="grid g2" style="margin-top:12px">
    <div class="card">
      <h3 style="margin-top:0">Start rate — % que clica INICIAR</h3>
      <div class="barrow"><span class="lab">AD 03 CBO 111</span><div class="bar"><i style="width:100%"></i></div><span class="val">48,6%</span></div>
      <div class="barrow"><span class="lab">AD 06</span><div class="bar"><i style="width:78%"></i></div><span class="val">38,0%</span></div>
      <div class="barrow"><span class="lab">link_in_bio</span><div class="bar"><i style="width:72%"></i></div><span class="val">35,0%</span></div>
      <div class="barrow"><span class="lab">AD 03</span><div class="bar"><i style="width:70%"></i></div><span class="val">34,2%</span></div>
      <div class="barrow"><span class="lab">AD 09</span><div class="bar"><i style="width:52%"></i></div><span class="val">25,5%</span></div>
      <div class="barrow"><span class="lab">AD 08</span><div class="bar"><i style="width:49%"></i></div><span class="val">24,0%</span></div>
      <div class="barrow"><span class="lab">AD 06 CBO 111</span><div class="bar"><i style="width:49%"></i></div><span class="val">23,8%</span></div>
      <div class="barrow"><span class="lab">AD 05</span><div class="bar"><i style="width:43%"></i></div><span class="val">21,0%</span></div>
      <div class="barrow"><span class="lab">AD 02 Cópia Adv.</span><div class="bar"><i style="width:28%"></i></div><span class="val">13,6%</span></div>
      <div class="barrow"><span class="lab">AD 01</span><div class="bar"><i style="width:27%"></i></div><span class="val">13,0%</span></div>
      <div class="barrow"><span class="lab">AD 07</span><div class="bar"><i style="width:26%"></i></div><span class="val">12,5%</span></div>
      <div class="barrow"><span class="lab">AD 02</span><div class="bar"><i style="width:25%"></i></div><span class="val">12,2%</span></div>
      <div class="barrow"><span class="lab">AD 04</span><div class="bar"><i style="width:18%"></i></div><span class="val">8,7%</span></div>
      <div class="barrow"><span class="lab">AD 01 Cópia Adv.</span><div class="bar"><i style="width:9%"></i></div><span class="val">4,5%</span></div>
    </div>
    <div class="card">
      <h3 style="margin-top:0">Passagem do WhatsApp — % que vira lead ao chegar lá</h3>
      <div class="barrow"><span class="lab">AD 03 CBO 111</span><div class="bar"><i class="t" style="width:100%"></i></div><span class="val">100%</span></div>
      <div class="barrow"><span class="lab">AD 05 · AD 02 · AD 07</span><div class="bar"><i class="t" style="width:100%"></i></div><span class="val">100%</span></div>
      <div class="barrow"><span class="lab">AD 06</span><div class="bar"><i class="t" style="width:88%"></i></div><span class="val">88,5%</span></div>
      <div class="barrow"><span class="lab">AD 03</span><div class="bar"><i class="t" style="width:86%"></i></div><span class="val">85,7%</span></div>
      <div class="barrow"><span class="lab">link_in_bio</span><div class="bar"><i class="t" style="width:81%"></i></div><span class="val">81,3%</span></div>
      <div class="barrow"><span class="lab">AD 09</span><div class="bar"><i class="t" style="width:80%"></i></div><span class="val">80,0%</span></div>
      <div class="barrow"><span class="lab">AD 08</span><div class="bar"><i class="t" style="width:69%"></i></div><span class="val">68,8%</span></div>
      <div class="barrow"><span class="lab">AD 01</span><div class="bar"><i class="t" style="width:68%"></i></div><span class="val">68,2%</span></div>
      <p style="font-size:13px;color:var(--muted);margin-top:10px">28 sessões pararam <i>exatamente</i> na tela do WhatsApp no período — 2º maior vazamento da página, e é pior justamente nos ADs de clique “curioso” (AD 01, AD 08).</p>
    </div>
  </div>
  <div class="callout" style="margin-top:14px">🎯 <b>O caso AD 01 é o mais caro do funil:</b> maior tráfego de todos (246 sessões pagas) e só 13% de start — <b>214 cliques pagos morreram na porta</b>. O anúncio promete algo que a tela de início não ecoa. Consertar essa ponte (headline da intro espelhando o gancho do criativo — dá pra fazer dinâmico por <code>utm_content</code> no <code>index.html</code>) pode multiplicar leads sem R$ 1 a mais de mídia. As cópias “Advantage” são a prova do desastre: o enhancement do Meta muda o criativo, quebra a congruência e o start despenca pra 4,5%.</div>
</section>

<section>
  <div class="eyebrow">§4 · Quem compra</div>
  <h2>Perfil do comprador — pra copy e pra abordagem</h2>
  <div class="grid g2" style="margin-top:12px">
    <div class="card">
      <h3 style="margin-top:0">Conversão em venda por perfil procrastinador</h3>
      <div class="barrow"><span class="lab">Sobrecarregado</span><div class="bar"><i style="width:100%"></i></div><span class="val">19,0%</span></div>
      <div class="barrow"><span class="lab">Impulsivo</span><div class="bar"><i style="width:84%"></i></div><span class="val">16,0%</span></div>
      <div class="barrow"><span class="lab">Perfeccionista</span><div class="bar"><i style="width:60%"></i></div><span class="val">11,4%</span></div>
      <div class="barrow"><span class="lab">Evitativo</span><div class="bar"><i style="width:56%"></i></div><span class="val">10,7%</span></div>
      <div class="barrow"><span class="lab">Indeciso</span><div class="bar"><i style="width:28%"></i></div><span class="val">5,3%</span></div>
      <p style="font-size:13px;color:var(--muted);margin-top:10px">Sobrecarregado também lidera em receita (R$ 516,50). O Indeciso quase não compra — ironicamente coerente com o perfil (“e se eu escolher errado?”). Perfeccionista paga ticket alto quando compra (Pilares).</p>
    </div>
    <div class="card">
      <h3 style="margin-top:0">Idade, gênero e placement</h3>
      <div class="barrow"><span class="lab">35 a 44</span><div class="bar"><i class="t" style="width:100%"></i></div><span class="val">16,0%</span></div>
      <div class="barrow"><span class="lab">55 ou mais</span><div class="bar"><i class="t" style="width:92%"></i></div><span class="val">14,7%</span></div>
      <div class="barrow"><span class="lab">45 a 54</span><div class="bar"><i class="t" style="width:81%"></i></div><span class="val">12,9%</span></div>
      <div class="barrow"><span class="lab">25 a 34</span><div class="bar"><i class="t" style="width:50%"></i></div><span class="val">8,0%</span></div>
      <div class="barrow"><span class="lab">18 a 24</span><div class="bar"><i class="t" style="width:48%"></i></div><span class="val">7,7%</span></div>
      <p style="font-size:13px;color:var(--muted);margin-top:10px"><b>35+ compra ~2× mais que &lt;35</b> — e 51% da base já tem 45+. Compradores: 9 mulheres / 7 homens. Placement das vendas: IG Feed 5 · IG Reels 5 · IG Stories 3 · FB Reels 2 — Stories converte acima do peso.</p>
    </div>
  </div>
</section>

<section>
  <div class="eyebrow">§5 · Matriz completa</div>
  <h2>Todas as métricas, AD por AD, campanha por campanha</h2>
  <p class="lede">CPL e leads corrigidos pelo cruzamento <code>utm_campaign + utm_content</code> (o painel hoje duplica leads quando o mesmo nome de AD roda em mais de uma campanha — os valores abaixo são os corretos).</p>
  <div class="tblwrap" style="margin-top:12px">
  <table style="min-width:900px">
    <thead><tr><th>Campanha</th><th>AD</th><th class="num">Gasto</th><th class="num">Leads</th><th class="num">CPL</th><th class="num">CPC</th><th class="num">CTR</th><th class="num">Hook</th><th class="num">Body</th><th class="num">Vendas</th><th class="num">Receita</th></tr></thead>
    <tbody>
      <tr><td class="dim">ABO V2 FRIO</td><td class="adname">AD 06</td><td class="num">222,95</td><td class="num">23</td><td class="num up">9,69</td><td class="num">3,72</td><td class="num">1,55%</td><td class="num">17,4%</td><td class="num">1,78%</td><td class="num">2</td><td class="num">99,80</td></tr>
      <tr><td class="dim">ABO V2 FRIO</td><td class="adname">AD 01</td><td class="num">180,47</td><td class="num">7</td><td class="num">25,78</td><td class="num">3,92</td><td class="num">1,02%</td><td class="num">23,7%</td><td class="num">1,42%</td><td class="num">1</td><td class="num">69,80</td></tr>
      <tr><td class="dim">ABO V2 FRIO</td><td class="adname">AD 03</td><td class="num">160,03</td><td class="num">6</td><td class="num">26,67</td><td class="num">4,45</td><td class="num">1,99%</td><td class="num">19,9%</td><td class="num">2,16%</td><td class="num">1</td><td class="num">49,90</td></tr>
      <tr><td class="dim">ABO V2 FRIO</td><td class="adname">AD 09</td><td class="num">118,27</td><td class="num">8</td><td class="num">14,78</td><td class="num">4,38</td><td class="num">1,09%</td><td class="num">26,2%</td><td class="num">1,58%</td><td class="num">0</td><td class="num dim">—</td></tr>
      <tr><td class="dim">ABO V2 FRIO</td><td class="adname">AD 05</td><td class="num">74,26</td><td class="num">2</td><td class="num">37,13</td><td class="num">3,23</td><td class="num">1,23%</td><td class="num">19,1%</td><td class="num">0,85%</td><td class="num">1</td><td class="num">49,90</td></tr>
      <tr><td class="dim">ABO V2 FRIO</td><td class="adname">AD 04</td><td class="num">64,40</td><td class="num">1</td><td class="num down">64,40</td><td class="num down">12,88</td><td class="num">0,55%</td><td class="num">20,8%</td><td class="num">0,88%</td><td class="num">1</td><td class="num">69,80</td></tr>
      <tr><td class="dim">ABO V2 FRIO</td><td class="adname">AD 07</td><td class="num">63,83</td><td class="num">2</td><td class="num">31,92</td><td class="num">3,99</td><td class="num">0,93%</td><td class="num">21,6%</td><td class="num">0,99%</td><td class="num">0</td><td class="num dim">—</td></tr>
      <tr><td class="dim">ABO V2 FRIO</td><td class="adname">AD 08</td><td class="num">63,32</td><td class="num">1</td><td class="num down">63,32</td><td class="num up">2,44</td><td class="num">1,55%</td><td class="num up">30,7%</td><td class="num">1,08%</td><td class="num">0</td><td class="num dim">—</td></tr>
      <tr class="champ"><td class="dim">CBO V3 (1-1-5)</td><td class="adname">AD 03</td><td class="num">286,33</td><td class="num">20</td><td class="num up">14,32</td><td class="num">6,51</td><td class="num">2,02%</td><td class="num">22,7%</td><td class="num">2,75%</td><td class="num"><b>4</b></td><td class="num"><b>486,50</b></td></tr>
      <tr><td class="dim">CBO V3 (1-1-5)</td><td class="adname">AD 08</td><td class="num">225,49</td><td class="num">8</td><td class="num">28,19</td><td class="num">5,24</td><td class="num">1,38%</td><td class="num up">36,0%</td><td class="num">1,61%</td><td class="num">1</td><td class="num">69,80</td></tr>
      <tr><td class="dim">CBO V3 (1-1-5)</td><td class="adname">AD 05</td><td class="num">33,92</td><td class="num">4</td><td class="num up">8,48</td><td class="num">4,85</td><td class="num">1,23%</td><td class="num">26,1%</td><td class="num up">3,17%</td><td class="num">0</td><td class="num dim">—</td></tr>
      <tr><td class="dim">CBO V3 (1-1-5)</td><td class="adname">AD 02</td><td class="num">31,06</td><td class="num">0</td><td class="num dim">—</td><td class="num">7,77</td><td class="num">0,91%</td><td class="num">23,1%</td><td class="num">0,68%</td><td class="num">0</td><td class="num dim">—</td></tr>
      <tr><td class="dim">CBO V3 (1-1-5)</td><td class="adname">AD 07</td><td class="num">8,06</td><td class="num">0</td><td class="num dim">—</td><td class="num up">1,61</td><td class="num">2,82%</td><td class="num up">49,2%</td><td class="num">1,69%</td><td class="num">0</td><td class="num dim">—</td></tr>
      <tr><td class="dim">ABO V1</td><td class="adname">AD 02</td><td class="num">115,89</td><td class="num">6</td><td class="num">19,32</td><td class="num">2,11</td><td class="num">0,89%</td><td class="num">15,6%</td><td class="num">0,58%</td><td class="num">0</td><td class="num dim">—</td></tr>
      <tr><td class="dim">ABO V1</td><td class="adname">AD 01</td><td class="num">91,36</td><td class="num">8</td><td class="num up">11,42</td><td class="num up">1,29</td><td class="num">0,87%</td><td class="num">24,9%</td><td class="num">1,35%</td><td class="num">2</td><td class="num">119,70</td></tr>
      <tr><td class="dim">ABO V1</td><td class="adname">AD 03</td><td class="num">62,15</td><td class="num">3</td><td class="num">20,72</td><td class="num">3,45</td><td class="num">0,76%</td><td class="num down">10,5%</td><td class="num">1,31%</td><td class="num">1</td><td class="num">49,90</td></tr>
      <tr><td class="dim">ABO V1</td><td class="adname">Cópias Advantage (4)</td><td class="num">121,11</td><td class="num">3</td><td class="num down">40,37</td><td class="num">2,26</td><td class="num">0,66%</td><td class="num">21,9%</td><td class="num">0,79%</td><td class="num">1</td><td class="num">49,90</td></tr>
      <tr><td class="dim">CBO solo AD 03</td><td class="adname">AD 03 CBO 111</td><td class="num">98,29</td><td class="num">10</td><td class="num up">9,83</td><td class="num">4,91</td><td class="num">1,43%</td><td class="num">15,4%</td><td class="num">2,29%</td><td class="num dim">1d</td><td class="num dim">—</td></tr>
      <tr><td class="dim">CBO solo AD 06</td><td class="adname">AD 06 CBO 111</td><td class="num">46,20</td><td class="num">4</td><td class="num">11,55</td><td class="num up">1,93</td><td class="num">1,94%</td><td class="num">15,9%</td><td class="num">1,70%</td><td class="num dim">1d</td><td class="num dim">—</td></tr>
    </tbody>
  </table>
  </div>
</section>

<section>
  <div class="eyebrow">§6 · Higiene de tracking</div>
  <h2>O que está sujando os dados (e já custou dinheiro)</h2>
  <div class="card" style="margin-top:12px">
    <div class="finding"><span class="tag" style="color:var(--bad);background:color-mix(in srgb, var(--bad) 12%, var(--card))">R$ 347</span><p><b>UTM literal sem preencher.</b> Uma campanha rodou com <code>utm_content={{ad.name}}</code> cru (sem o Meta substituir). A maior compradora da base (Fundamentos + Pilares, R$ 346,90) caiu nesse buraco — nunca saberemos qual AD a trouxe. <b>Ação:</b> conferir o campo “Parâmetros de URL” de TODA campanha nova antes de ativar.</p></div>
    <div class="finding"><span class="tag">IDs</span><p><b>Uma campanha usou <code>{{ad.id}}</code></b> em vez de <code>{{ad.name}}</code> — leads chegaram como “52523300891571”. Os IDs foram mapeados pros nomes nesta análise, mas padronize o template: <code>utm_source=facebook&amp;utm_medium=paid&amp;utm_campaign={{campaign.name}}&amp;utm_term={{adset.name}}&amp;utm_content={{ad.name}}&amp;placement={{placement}}</code></p></div>
    <div class="finding"><span class="tag">RENOMEIO</span><p><b>Campanhas renomeadas em voo</b> (“QUIZZ - VENDAS - V2 - FRIO” virou “[QUIZZ] - [VENDAS] - [ABO] - [FRIO]”). O UTM congela o nome do momento do clique → o cruzamento quebra silenciosamente. <b>Regra: nome de campanha ativa não se mexe.</b></p></div>
    <div class="finding"><span class="tag">PIXEL 44%</span><p><b>O Purchase do pixel viu 7 vendas (R$ 307)</b>; o CRM tem 16 (R$ 1.462). Com match de 44%, otimizar campanha por Purchase ainda é cedo — o evento Lead (que dispara no funil) segue sendo o sinal mais confiável pro leilão por enquanto.</p></div>
    <div class="finding"><span class="tag">NOMES</span><p><b>Mesmo nome de AD em várias campanhas</b> faz o painel duplicar leads no nível de anúncio (o cruzamento é por nome). Os CPLs desta análise estão corrigidos; a recomendação é sufixar o nome do AD por campanha (como “AD 03 CBO 111” já faz) ou ajustar o <code>api/campaigns.js</code> pra cruzar por campanha + conteúdo.</p></div>
  </div>
</section>

<section>
  <div class="eyebrow">§7 · Plano de ação</div>
  <h2>O que fazer com tudo isso — em ordem de impacto</h2>
  <div class="card plan" style="margin-top:12px">
    <div class="item"><span class="prio p0">P0</span><p><b>Escalar o AD 03 na CBO solo</b> — melhor CPL (9,83), melhor start rate do funil (48,6%) e herdeiro do criativo que já quase se paga no front. Deixar 3–4 dias sem mexer antes de julgar (1 dia de dado ainda é leilão aprendendo).</p></div>
    <div class="item"><span class="prio p0">P0</span><p><b>Comercial com mira:</b> priorizar abordagem nos leads de <b>AD 03 e AD 01</b> (86% das vendas do comercial) e nos perfis <b>Sobrecarregado / Perfeccionista 35+</b>. Leads de AD 06 vão pra régua de nutrição, não pra fila de ligação.</p></div>
    <div class="item"><span class="prio p0">P0</span><p><b>Fechar os buracos de dado:</b> atribuir as compras de Jean e Beatriz no CRM, padronizar o template de UTM em toda campanha e congelar nomes de campanhas ativas.</p></div>
    <div class="item"><span class="prio p1">P1</span><p><b>Variações do AD 03 (o pedido central):</b> manter promessa + CTA (“faz o teste”) intactos e testar só a abertura — (a) hook emprestado do padrão AD 08 (36%), (b) hook do AD 07 (49% com R$ 8 — revalidar com verba), (c) versão falando “nem sei por onde começar” (dor do Sobrecarregado, perfil que mais compra), (d) versão com cara/ritmo pra 45+. <b>Régua de aprovação: hook ≥ 25% E start ≥ 35% E CPL ≤ R$ 15.</b> Hook alto com start baixo = reprovado (é o erro do AD 08).</p></div>
    <div class="item"><span class="prio p1">P1</span><p><b>Atacar a tela de início</b> (79% de perda global): teste A da headline dinâmica por <code>utm_content</code> (a intro ecoa o gancho do AD que trouxe o clique — mudança só no <code>index.html</code>); teste B de fricção (intro mais enxuta). O quiz interno já retém 60–100%; cada ponto de start é quase um ponto de lead.</p></div>
    <div class="item"><span class="prio p1">P1</span><p><b>Microcopy na tela do WhatsApp</b> (28 desistências ali): reforço de segurança tipo “seu resultado chega no seu WhatsApp · sem spam, prometido” — barato de testar, e o vazamento é maior justamente nos ADs de clique curioso.</p></div>
    <div class="item"><span class="prio p2">P2</span><p><b>Cortar sem dó:</b> cópias Advantage (R$ 121 → 3 leads; o enhancement do Meta quebra a congruência), AD 04 (start 8,7%, CPC R$ 12,88) e AD 02 (12% de start, 0 vendas nos dois formatos — reavaliar só depois de atribuir a possível venda do Jean).</p></div>
    <div class="item"><span class="prio p2">P2</span><p><b>AD 06 = motor da base:</b> manter rodando barato e ligar a esteira de aproveitamento (disparo pós-quiz com <code>/diagnostico/{perfil}</code> quando a Evolution API sair do standby). O lead dele não fecha no 1:1 — deixa o funil trabalhar.</p></div>
  </div>
</section>

<section class="foot">
  <p><b>Método e ressalvas.</b> Fontes: Meta Marketing API (insights por campanha/conjunto/anúncio, 01 mai–28 jul 2026), tabela <code>sessions</code> (funil de 18 etapas por sessão) e CRM (compras atribuídas manualmente por lead — fonte da verdade de venda). Leads de teste excluídos de tudo. Amostra de vendas: <b>n = 16</b> — as direções são sólidas e consistentes entre métricas independentes (start rate, CPL, vendas), mas diferenças menores que 2× devem ser lidas como ruído; nenhuma decisão irreversível por casa decimal. CPLs em nível de AD corrigidos por <code>utm_campaign + utm_content</code>; funil por AD agrega campanhas (a sessão não grava a campanha no <code>adFunnel</code> atual). ROAS front considera apenas receita de produtos atribuída no CRM — esteira, recorrência e mentoria ficam de fora (ou seja: o número real do negócio é melhor que o daqui). Vendas/Purchase do pixel citados apenas como diagnóstico de tracking. Relatório gerado por análise direta dos dados em 28/jul/2026 · Brainfy × Kenji Hirota.</p>
</section>

</div>
</body>
</html>`;
