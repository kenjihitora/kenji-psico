// Relatorio 05 - Performance do Periodo 4 (18/ago a 04/set/2026).
// Continuacao direta do Relatorio 04, que fechou em 17/ago. Documento protegido por login.
// Fontes: Meta API (campanha/conjunto/anuncio + pixel), tabela sessions (funil), CRM (coorte + caixa).
// CSS identico ao r03 (copiado na geracao para manter o padrao visual).
module.exports = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>Relatorio 05 - Performance do Periodo 4 - Kenji Hirota</title>
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
  table{border-collapse:collapse;width:100%;font-size:13.5px;min-width:620px}
  th{font-size:11px;text-transform:uppercase;letter-spacing:.07em;color:var(--muted);font-weight:800;
    text-align:left;padding:12px 12px;border-bottom:1px solid var(--line);white-space:nowrap}
  td{padding:10px 12px;border-bottom:1px solid var(--line);vertical-align:middle;font-variant-numeric:tabular-nums}
  tr:last-child td{border-bottom:0}
  tr:hover td{background:color-mix(in srgb, var(--chip) 45%, transparent)}
  th.num,td.num{text-align:right}
  td.adname{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12.5px;font-weight:600;white-space:nowrap}
  tr.champ td{background:color-mix(in srgb, var(--chip) 70%, transparent)}
  tr.alerta td{background:color-mix(in srgb, var(--bad) 8%, transparent)}
  tr.total td{font-weight:800;border-top:2px solid var(--line);background:color-mix(in srgb, var(--chip) 35%, transparent)}
  .up{color:var(--good);font-weight:700}.down{color:var(--bad);font-weight:700}
  .dim{color:var(--muted)}
  .cellnote{font-size:11px;color:var(--muted);display:block}

  .bar{height:10px;background:var(--line);border-radius:6px;overflow:hidden;min-width:56px}
  .bar>i{display:block;height:100%;border-radius:0 4px 4px 0;background:var(--accent);min-width:2px}
  .bar>i.t{background:var(--teal)} .bar>i.g{background:var(--gold)} .bar>i.r{background:var(--bad)}
  .barrow{display:grid;grid-template-columns:minmax(60px,190px) minmax(0,1fr) 74px;gap:10px;align-items:center;padding:6px 0;font-size:13px}
  .barrow>*{min-width:0}
  .barrow .lab{font-size:12.5px;font-weight:650;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .barrow .val{text-align:right;font-variant-numeric:tabular-nums;font-weight:700}
  .barrow:hover{background:color-mix(in srgb, var(--chip) 45%, transparent);border-radius:8px}
  .legend{display:flex;gap:16px;flex-wrap:wrap;font-size:12.5px;color:var(--muted);margin:8px 0 2px}
  .legend .sw{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:6px;vertical-align:baseline}

  /* comparativo P1 x P2 */
  .cmp{display:grid;grid-template-columns:minmax(120px,1.4fr) 1fr 1fr 78px;gap:8px;align-items:center;
    padding:9px 10px;border-radius:9px;font-size:13.5px}
  .cmp:nth-child(even){background:color-mix(in srgb, var(--chip) 40%, transparent)}
  .cmp .met{font-weight:650}
  .cmp .v{text-align:right;font-variant-numeric:tabular-nums;font-weight:750}
  .cmp .v.old{color:var(--muted);font-weight:600}
  .cmp .d{text-align:right;font-size:12.5px;font-weight:800;font-variant-numeric:tabular-nums}
  .cmphead{font-size:10.5px;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:var(--muted)}
  .cmphead .v{font-weight:800}

  .qa{border-left:3px solid var(--accent);padding:2px 0 2px 18px;margin:26px 0}
  .qa .q{font-weight:800;font-size:16px;margin:0 0 8px}
  .qa .a-short{display:inline-block;background:var(--chip);color:var(--accent);font-weight:800;font-size:13px;padding:5px 12px;border-radius:999px;margin-bottom:10px}
  .qa p{margin:8px 0}

  .callout{border:1px solid var(--line);border-left:4px solid var(--gold);background:var(--goldsoft);border-radius:12px;padding:14px 18px;margin:18px 0;font-size:14px}
  .callout.bad{border-left-color:var(--bad);background:color-mix(in srgb, var(--bad) 9%, var(--card))}
  .callout.good{border-left-color:var(--good);background:color-mix(in srgb, var(--good) 9%, var(--card))}
  code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.86em;background:var(--codebg);padding:1px 6px;border-radius:6px}

  .plan .item{display:flex;gap:14px;padding:13px 0;border-bottom:1px solid var(--line);align-items:flex-start}
  .plan .item:last-child{border-bottom:0}
  .prio{flex:0 0 auto;font-size:11px;font-weight:850;padding:4px 9px;border-radius:7px;margin-top:2px;letter-spacing:.05em}
  .p0{background:color-mix(in srgb, var(--bad) 14%, var(--card));color:var(--bad)}
  .p1{background:color-mix(in srgb, var(--gold) 16%, var(--card));color:var(--gold)}
  .p2{background:var(--chip);color:var(--muted)}
  .plan p{margin:0}
  .plan b{font-weight:750}

  .veredito{display:flex;gap:12px;align-items:flex-start;padding:12px 0;border-bottom:1px solid var(--line)}
  .veredito:last-child{border-bottom:0}
  .vmark{flex:0 0 auto;width:26px;height:26px;border-radius:8px;display:grid;place-items:center;font-size:14px;font-weight:800}
  .vok{background:color-mix(in srgb, var(--good) 15%, var(--card));color:var(--good)}
  .vno{background:color-mix(in srgb, var(--bad) 15%, var(--card));color:var(--bad)}
  .vwait{background:var(--chip);color:var(--muted)}
  .veredito p{margin:0;font-size:14px}

  .foot{margin-top:56px;padding-top:18px;border-top:1px solid var(--line);font-size:12.5px;color:var(--muted)}
  .foot p{max-width:none}
  @media (prefers-reduced-motion: no-preference){ .bar>i{transition:width .5s ease} }
  @media print{ body{background:#fff} .card,.tile,.tblwrap{break-inside:avoid} }
  @media(max-width:560px){ .cmp{grid-template-columns:1fr 64px 64px 62px;font-size:12.5px} }
</style>
</head>
<body>
<div class="wrap">

<header>
  <div class="eyebrow">Relatório 05 · Performance · Período 4</div>
  <h1>R$ 1.550, 225 leads, 16 vendas — o controle que o R04 pediu foi feito, e respondeu</h1>
  <p class="lede">Continuação direta do Relatório 04, que fechou em 17/ago. Cobre <b>18/ago a 04/set</b> — 18 dias, 3 campanhas, e a primeira vez que o funil roda com <b>a VSL de volta</b> e com o <b>pixel enxergando compras</b>. A análise começa no gerenciador (§2–§5) e desce até o CRM (§6–§9), o quiz (§10) e a higiene de dados (§11). O §7 responde a pergunta que o R04 deixou aberta.</p>
  <div class="meta-row">
    <span>Período 4 <b>18/ago – 04/set 2026</b></span>
    <span>Investimento <b>R$ 1.549,68</b></span>
    <span>Leads <b>225</b></span>
    <span>Vendas <b>16</b></span>
    <span>Fontes <b>Meta API · sessions · CRM · pixel</b></span>
  </div>
</header>

<section>
  <div class="grid g3">
    <div class="tile"><div class="n">R$ 1.549,68</div><div class="l">Investido</div><div class="s">3 campanhas · 16 dias com verba</div></div>
    <div class="tile"><div class="n">R$ 6,89</div><div class="l">CPL real</div><div class="s">melhor da história do funil · −43% vs R04</div></div>
    <div class="tile"><div class="n">225</div><div class="l">Leads</div><div class="s">de 1.020 sessões — 22,1%</div></div>
    <div class="tile"><div class="n">16</div><div class="l">Vendas na coorte</div><div class="s">7,1% dos leads · 8 sem valor no CRM</div></div>
    <div class="tile"><div class="n">R$ 478,80</div><div class="l">Receita registrada</div><div class="s">estimada ~R$ 878 · ROAS 0,31 → ~0,57</div></div>
    <div class="tile"><div class="n">11</div><div class="l">Compras no pixel</div><div class="s">R$ 483,12 · o tracking chegou</div></div>
  </div>
</section>

<section>
  <h2>1. O resumo, antes dos detalhes</h2>
  <div class="card">
    <div class="finding"><span class="tag">RESPOSTA</span><p><b>A pergunta do R04 está respondida: era a página, não o criativo.</b> O R04 não conseguiu separar "AD 11 fadigou" de "a landing converte pior" porque os dois mudaram no mesmo dia. O P0 pedia religar com AD 11 + VSL como controle. Foi feito em 25/ago — e o mesmo criativo, agora com 6 semanas de idade, entregou <b>CPL R$ 5,81, 166 leads e 8 compras no pixel</b>. Um anúncio fadigado não faz o melhor número da própria história.</p></div>
    <div class="finding"><span class="tag">ESTRUTURA</span><p><b>A mesma peça custou metade quando ficou sozinha.</b> O AD 11 num conjunto CBO com 5 anúncios pagou CPC R$ 3,61 e CPL R$ 9,83. O AD 11 sozinho, em conjunto aberto 1-1-1, pagou <b>CPC R$ 1,94 e CPL R$ 5,92</b>. O criativo é o mesmo. O que mudou foi a estrutura — e os 4 anúncios que dividiam verba com ele levaram 24% do orçamento para produzir 5 leads a R$ 21 cada (§3).</p></div>
    <div class="finding"><span class="tag">TRACKING</span><p><b>Pela primeira vez as colunas de venda do painel têm número.</b> 11 compras e R$ 483,12 atribuídos pelo pixel, 46 inícios de checkout. Dá pra ver o funil inteiro: <b>VSL → checkout 23,4% → compra 23,9%</b>. Mas o pixel conta <i>itens</i>, não pedidos — o CPA de R$ 140,88 está otimista (§5).</p></div>
    <div class="finding"><span class="tag">DINHEIRO</span><p><b>Ainda não paga no front — e o número real é desconhecido.</b> ROAS registrado 0,31. Só que <b>metade das 16 vendas está no CRM sem valor</b>. Se as 8 forem o produto de entrada, a receita vai a ~R$ 878 e o ROAS a ~0,57. Entre 0,31 e 0,57 há uma decisão de escala inteira, e ela depende de 8 cliques no CRM (§6, §11).</p></div>
    <div class="finding"><span class="tag">RITMO</span><p><b>O funil passou a vender no mesmo dia.</b> As 16 vendas da coorte fecharam em menos de 24h após o lead. No R03 a mediana era 4,3 dias — era o comercial fechando no WhatsApp. Agora é a VSL fechando na hora. A regra "não julgue antes de 7 dias" continua valendo para o comercial, mas o direto pode ser lido em 48h (§8).</p></div>
    <div class="finding"><span class="tag">RETRATAÇÃO</span><p><b>O achado "mais sólido do projeto" não replicou.</b> O R03 dizia que o Sobrecarregado converte 17% e o Indeciso 2,7% (p≈0,04). Neste período o ranking <b>inverteu por completo</b>: Sobrecarregado ficou em último (2,4%) e o Perfeccionista em primeiro (13,9%). Com 16 vendas espalhadas em 5 perfis, isso é ruído — e a recomendação de priorizar a fila por perfil cai (§9).</p></div>
    <div class="finding"><span class="tag">AGORA</span><p><b>O vencedor está pausado.</b> As duas campanhas com o AD 11 estão em PAUSED desde 03/set. A única verba ativa hoje é o teste de criativos (R$ 75/dia). Se a pausa foi por caixa, tudo bem; se foi por dúvida, os dados deste relatório dizem para religar (§13).</p></div>
  </div>
</section>

<section>
  <h2>2. Gerenciador: as três campanhas</h2>
  <p>Três campanhas em sequência, quase sem sobreposição. A concentração foi para o lado certo: <b>62% da verba numa campanha de um anúncio só</b>, o vencedor.</p>
  <div class="tblwrap">
  <table>
    <thead><tr><th>Campanha</th><th>Dias</th><th class="num">Gasto</th><th class="num">Cliques</th><th class="num">CPC</th><th class="num">CTR</th><th class="num">Hook</th><th class="num">Leads</th><th class="num">CPL</th><th class="num">Início</th><th class="num">VSL</th><th class="num">Compras</th><th class="num">Receita</th></tr></thead>
    <tbody>
      <tr><td class="adname">[ADS CAMP] [CBO]<span class="cellnote">18–22/ago · conj. 1-1-5 · pausada</span></td><td>5</td><td class="num">R$ 429,69</td><td class="num">111</td><td class="num">R$ 3,87</td><td class="num">0,99%</td><td class="num">30,0%</td><td class="num">38</td><td class="num">R$ 11,31</td><td class="num">37,0%</td><td class="num">19,1%</td><td class="num dim">—*</td><td class="num dim">—*</td></tr>
      <tr class="champ"><td class="adname">[CBO] [AD 11] — (teste trackeamento)<span class="cellnote">25/ago–04/set · conj. aberto 1-1-1 · pausada</span></td><td>10</td><td class="num">R$ 965,18</td><td class="num">498</td><td class="num">R$ 1,94</td><td class="num">1,20%</td><td class="num">31,9%</td><td class="num">166</td><td class="num">R$ 5,81</td><td class="num">44,5%</td><td class="num">21,9%</td><td class="num">8</td><td class="num">R$ 351,36</td></tr>
      <tr><td class="adname">[CBO] [TESTE DE ADS]<span class="cellnote">01–04/set · conj. aberto 1-1-X · ativa</span></td><td>3</td><td class="num">R$ 154,81</td><td class="num">55</td><td class="num">R$ 2,81</td><td class="num">0,86%</td><td class="num">27,2%</td><td class="num">20</td><td class="num">R$ 7,74</td><td class="num">39,0%</td><td class="num">23,4%</td><td class="num">3</td><td class="num">R$ 131,76</td></tr>
      <tr class="total"><td>Total</td><td>16</td><td class="num">R$ 1.549,68</td><td class="num">664</td><td class="num">R$ 2,33</td><td class="num">1,12%</td><td class="num">31,1%</td><td class="num">224</td><td class="num">R$ 6,92</td><td class="num">42,6%</td><td class="num">21,5%</td><td class="num">11</td><td class="num">R$ 483,12</td></tr>
    </tbody>
  </table>
  </div>
  <p class="dim" style="font-size:12.5px">* A primeira campanha rodou antes do pixel de compra ser ligado — as colunas de compra dela estão vazias por instrumento, não por resultado. As 4 vendas do CRM dessa campanha aparecem no §6.</p>
  <h3>Semana a semana</h3>
  <div class="card">
    <div class="cmp cmphead"><span class="met">Semana</span><span class="v">Gasto · Leads</span><span class="v">CPL · CPC</span><span class="d">Início · VSL</span></div>
    <div class="cmp"><span class="met">18–24/ago <span class="dim">(ADS CAMP)</span></span><span class="v old">R$ 429,69 · 38</span><span class="v">R$ 11,31 · R$ 3,87</span><span class="d dim">39,3% · 20,2%</span></div>
    <div class="cmp"><span class="met">25–31/ago <span class="dim">(AD 11 1-1-1)</span></span><span class="v old">R$ 704,08 · 111</span><span class="v">R$ 6,34 · R$ 1,95</span><span class="d dim">43,9% · 20,7%</span></div>
    <div class="cmp"><span class="met">01–04/set <span class="dim">(AD 11 + teste)</span></span><span class="v old">R$ 415,91 · 75</span><span class="v">R$ 5,55 · R$ 2,17</span><span class="d dim">44,0% · 24,1%</span></div>
  </div>
  <p>O CPL caiu <b>51% da primeira para a terceira semana</b> com o hook praticamente constante (30,0% → 32,7%). Não foi o anúncio ficando melhor. Foi a verba parando de vazar.</p>
</section>

<section>
  <h2>3. A mesma peça, metade do preço</h2>
  <p>Este é o achado de gerenciador mais importante do período, e ele tem um teste quase limpo dentro dos dados: <b>o mesmo criativo rodou nas duas estruturas.</b></p>
  <div class="tblwrap">
  <table>
    <thead><tr><th>AD 11 em…</th><th>Conjunto</th><th class="num">Gasto</th><th class="num">CPC</th><th class="num">CTR</th><th class="num">Hook</th><th class="num">Leads</th><th class="num">CPL</th><th class="num">Início</th><th class="num">VSL</th></tr></thead>
    <tbody>
      <tr class="alerta"><td class="adname">[ADS CAMP] com 4 irmãos</td><td class="adname">[CONJ 1] [CBO 1-1-5]</td><td class="num">R$ 324,46</td><td class="num">R$ 3,61</td><td class="num">0,97%</td><td class="num">33,0%</td><td class="num">33</td><td class="num">R$ 9,83</td><td class="num">48,2%</td><td class="num">25,0%</td></tr>
      <tr class="champ"><td class="adname">campanha própria, sozinho</td><td class="adname">[ABERTO] [CBO 1-1-1]</td><td class="num">R$ 965,18</td><td class="num">R$ 1,94</td><td class="num">1,20%</td><td class="num">31,9%</td><td class="num">163</td><td class="num">R$ 5,92</td><td class="num">44,6%</td><td class="num">21,8%</td></tr>
    </tbody>
  </table>
  </div>
  <p>Hook igual, start rate igual, VSL igual — <b>a página e o criativo se comportaram do mesmo jeito nos dois casos</b>. O que mudou foi o preço do clique: R$ 3,61 → R$ 1,94. Isso é leilão e entrega, não copy.</p>
  <div class="callout"><b>Onde os R$ 105 foram parar.</b> No conjunto 1-1-5, a CBO entregou R$ 105,23 (24% da campanha) para AD 06, AD 05, AD 03 e AD 01. Resultado: <b>5 leads, CPL R$ 21,05</b>. O AD 06 teve start rate de 14,8% — de cada 100 que clicaram, 15 começaram o quiz. É incongruência entre o que o anúncio promete e o que a página entrega, exatamente o defeito que o R01 já tinha registrado nele.</div>
  <div class="callout good"><b>A leitura pra escalar:</b> o vencedor vai sozinho em conjunto aberto 1-1-1, e teste de criativo vai em campanha separada — que é <b>exatamente o desenho adotado a partir de 25/ago</b>. Está certo. O ponto é não voltar atrás.</div>
  <h3>Dia a dia — CPL</h3>
  <div class="card">
    <div class="barrow"><span class="lab">18/08 · R$ 112 · 14 leads</span><span class="bar"><i style="width:50%"></i></span><span class="val">R$ 7,98</span></div>
    <div class="barrow"><span class="lab">19/08 · R$ 72 · 5</span><span class="bar"><i class="r" style="width:91%"></i></span><span class="val">R$ 14,36</span></div>
    <div class="barrow"><span class="lab">20/08 · R$ 77 · 5</span><span class="bar"><i class="r" style="width:98%"></i></span><span class="val">R$ 15,47</span></div>
    <div class="barrow"><span class="lab">21/08 · R$ 123 · 10</span><span class="bar"><i class="r" style="width:78%"></i></span><span class="val">R$ 12,30</span></div>
    <div class="barrow"><span class="lab">22/08 · R$ 46 · 4</span><span class="bar"><i class="r" style="width:72%"></i></span><span class="val">R$ 11,47</span></div>
    <div class="barrow"><span class="lab dim">23–24/08 · sem verba</span><span class="bar"></span><span class="val dim">—</span></div>
    <div class="barrow"><span class="lab">25/08 · R$ 100 · 11</span><span class="bar"><i style="width:57%"></i></span><span class="val">R$ 9,08</span></div>
    <div class="barrow"><span class="lab">26/08 · R$ 102 · 11</span><span class="bar"><i style="width:58%"></i></span><span class="val">R$ 9,27</span></div>
    <div class="barrow"><span class="lab">27/08 · R$ 87 · 14</span><span class="bar"><i class="t" style="width:39%"></i></span><span class="val">R$ 6,25</span></div>
    <div class="barrow"><span class="lab">28/08 · R$ 108 · 19</span><span class="bar"><i class="t" style="width:36%"></i></span><span class="val">R$ 5,68</span></div>
    <div class="barrow"><span class="lab">29/08 · R$ 79 · 5</span><span class="bar"><i class="r" style="width:100%"></i></span><span class="val">R$ 15,85</span></div>
    <div class="barrow"><span class="lab">30/08 · R$ 120 · 25</span><span class="bar"><i class="t" style="width:30%"></i></span><span class="val">R$ 4,81</span></div>
    <div class="barrow"><span class="lab">31/08 · R$ 107 · 26</span><span class="bar"><i class="t" style="width:26%"></i></span><span class="val">R$ 4,12</span></div>
    <div class="barrow"><span class="lab">01/09 · R$ 98 · 12</span><span class="bar"><i style="width:51%"></i></span><span class="val">R$ 8,13</span></div>
    <div class="barrow"><span class="lab">02/09 · R$ 161 · 34</span><span class="bar"><i class="t" style="width:30%"></i></span><span class="val">R$ 4,74</span></div>
    <div class="barrow"><span class="lab">03/09 · R$ 147 · 28</span><span class="bar"><i class="t" style="width:33%"></i></span><span class="val">R$ 5,27</span></div>
    <div class="barrow"><span class="lab dim">04/09 · R$ 11 · 1 (parcial)</span><span class="bar"><i style="width:67%"></i></span><span class="val dim">R$ 10,61</span></div>
    <div class="legend"><span><span class="sw" style="background:var(--teal)"></span>abaixo de R$ 7</span><span><span class="sw" style="background:var(--accent)"></span>R$ 7–10</span><span><span class="sw" style="background:var(--bad)"></span>acima de R$ 10</span></div>
  </div>
  <p>Os cinco dias da campanha 1-1-5 são os cinco dias vermelhos do início. A partir de 27/ago, com o AD 11 sozinho, o CPL não passou de R$ 9,27 exceto num único dia (29/ago, 5 leads em R$ 79 — variação normal de um dia isolado). <b>30 e 31/ago foram os dois melhores dias da história do funil: R$ 4,81 e R$ 4,12.</b></p>
</section>

<section>
  <h2>4. Conjuntos e anúncios</h2>
  <div class="tblwrap">
  <table>
    <thead><tr><th>Anúncio</th><th>Campanha</th><th class="num">Gasto</th><th class="num">CPC</th><th class="num">CTR</th><th class="num">Hook</th><th class="num">Leads</th><th class="num">CPL</th><th class="num">Início</th><th class="num">VSL</th><th class="num">Vendas CRM</th></tr></thead>
    <tbody>
      <tr class="champ"><td class="adname">AD 11 [AD 03 + Tela Div.]</td><td class="adname">AD 11 1-1-1</td><td class="num">R$ 965,18</td><td class="num">R$ 1,94</td><td class="num">1,20%</td><td class="num">31,9%</td><td class="num">163</td><td class="num">R$ 5,92</td><td class="num">44,6%</td><td class="num">21,8%</td><td class="num">9</td></tr>
      <tr><td class="adname">AD 11</td><td class="adname">ADS CAMP</td><td class="num">R$ 324,46</td><td class="num">R$ 3,61</td><td class="num">0,97%</td><td class="num">33,0%</td><td class="num">33</td><td class="num">R$ 9,83</td><td class="num">48,2%</td><td class="num">25,0%</td><td class="num">4</td></tr>
      <tr><td class="adname">AD 18</td><td class="adname">TESTE DE ADS</td><td class="num">R$ 140,26</td><td class="num">R$ 2,75</td><td class="num">0,84%</td><td class="num">27,2%</td><td class="num">18</td><td class="num">R$ 7,79</td><td class="num">38,9%</td><td class="num">22,2%</td><td class="num">2</td></tr>
      <tr class="alerta"><td class="adname">AD 06</td><td class="adname">ADS CAMP</td><td class="num">R$ 74,24</td><td class="num">R$ 4,95</td><td class="num">1,08%</td><td class="num">15,1%</td><td class="num">5</td><td class="num">R$ 14,85</td><td class="num">14,8%</td><td class="num">8,2%</td><td class="num">1</td></tr>
      <tr class="alerta"><td class="adname">AD 05</td><td class="adname">ADS CAMP</td><td class="num">R$ 23,32</td><td class="num">R$ 5,83</td><td class="num">0,95%</td><td class="num">20,6%</td><td class="num">0</td><td class="num dim">—</td><td class="num">10,0%</td><td class="num">0</td><td class="num">0</td></tr>
      <tr><td class="adname">AD 16</td><td class="adname">TESTE DE ADS</td><td class="num">R$ 12,43</td><td class="num">R$ 3,11</td><td class="num">1,43%</td><td class="num">27,6%</td><td class="num">2</td><td class="num">R$ 6,22</td><td class="num">40,0%</td><td class="num">40,0%</td><td class="num">0</td></tr>
      <tr class="alerta"><td class="adname">AD 03</td><td class="adname">ADS CAMP</td><td class="num">R$ 7,07</td><td class="num">R$ 3,54</td><td class="num">1,36%</td><td class="num">8,8%</td><td class="num">0</td><td class="num dim">—</td><td class="num">0</td><td class="num">0</td><td class="num">0</td></tr>
      <tr><td class="adname">AD 17 <span class="dim">(pausado)</span></td><td class="adname">TESTE DE ADS</td><td class="num">R$ 2,12</td><td class="num dim">—</td><td class="num">0</td><td class="num">28,9%</td><td class="num">0</td><td class="num dim">—</td><td class="num dim">—</td><td class="num dim">—</td><td class="num">0</td></tr>
      <tr><td class="adname">AD 01</td><td class="adname">ADS CAMP</td><td class="num">R$ 0,60</td><td class="num dim">—</td><td class="num dim">—</td><td class="num">33,3%</td><td class="num">0</td><td class="num dim">—</td><td class="num dim">—</td><td class="num dim">—</td><td class="num">0</td></tr>
    </tbody>
  </table>
  </div>
  <h3>Leitura por anúncio</h3>
  <div class="card">
    <div class="finding"><span class="tag">AD 11</span><p><b>O criativo do projeto.</b> 196 leads nas duas campanhas, 13 vendas no CRM, e o melhor CPL que já existiu. Está com <b>6 semanas de idade e sem sinal de fadiga</b> — o hook de 31,9% é igual ao da estreia. Vale registrar que o AD 03, o "campeão histórico", fadigou em 3 semanas; o AD 11 é o mesmo AD 03 com outra tela de abertura. A variação de imagem prolongou a vida do gancho, como o R03 previa.</p></div>
    <div class="finding"><span class="tag">AD 18</span><p><b>Promissor, e cedo.</b> 3 dias, R$ 140, 18 leads a R$ 7,79 — e <b>2 vendas</b>, uma delas pelo comercial. Conversão de 11,1% em cima de 18 leads não é conclusão, é sinal. Mais 4 dias e R$ 150 antes de decidir.</p></div>
    <div class="finding"><span class="tag">AD 16 · 17</span><p><b>Sem dado.</b> O AD 16 gastou R$ 12 (2 leads, os dois chegaram na VSL). O AD 17 foi <b>pausado com R$ 2,12</b> — 97 impressões e hook de 28,9%, que não é ruim. Se a pausa foi por decisão criativa, tudo bem; se foi por número, foi cedo demais para haver número.</p></div>
    <div class="finding"><span class="tag">AD 06</span><p><b>Confirmado pela terceira vez: enche base, não vende.</b> R$ 74, 5 leads a R$ 14,85, start rate 14,8%. Um em cinco comprou, mas em cinco leads isso não significa nada. Aposentar da campanha de escala.</p></div>
    <div class="finding"><span class="tag">AD 19–22</span><p><b>Estáticos preparados, ainda sem verba.</b> Aparecem nas sessões só como cliques de teste (4 cada, encoding quebrado — §11). Quando subirem, é o primeiro teste de imagem estática do projeto.</p></div>
  </div>
</section>

<section>
  <h2>5. O tracking chegou — e mostrou o fim do funil</h2>
  <p>A campanha de 25/ago se chama "(teste trackeamento)" e o teste deu certo: <b>o pixel passou a registrar InitiateCheckout e Purchase</b>. Pela primeira vez o painel tem Vendas, Faturamento, ROAS e Custo/IC preenchidos. Isso abre uma etapa do funil que nunca tinha sido medida.</p>
  <div class="card">
    <div class="barrow"><span class="lab">Chegou na VSL</span><span class="bar"><i style="width:100%"></i></span><span class="val">197</span></div>
    <div class="barrow"><span class="lab">Iniciou checkout</span><span class="bar"><i class="g" style="width:23%"></i></span><span class="val">46</span></div>
    <div class="barrow"><span class="lab">Comprou (itens no pixel)</span><span class="bar"><i class="t" style="width:6%"></i></span><span class="val">11</span></div>
  </div>
  <div class="grid g3" style="margin-top:14px">
    <div class="tile"><div class="n">23,4%</div><div class="l">VSL → checkout</div><div class="s">46 de 197</div></div>
    <div class="tile"><div class="n">23,9%</div><div class="l">Checkout → compra</div><div class="s">11 de 46</div></div>
    <div class="tile"><div class="n">R$ 33,69</div><div class="l">Custo por início de checkout</div><div class="s">R$ 140,88 por item comprado</div></div>
  </div>
  <div class="callout"><b>O pixel conta itens, não pedidos.</b> Meta registrou 11 compras e R$ 483,12. No CRM, as 8 vendas com valor têm exatamente <b>11 itens</b> (7 Fundamentos, 2 Metas em Movimento, 2 Gestão de Tempo) somando R$ 428,90 — mais R$ 49,90 de uma venda comercial. Ou seja: a Kiwify dispara um Purchase por produto, e o order bump vira "segunda compra". <b>O CPA de R$ 140,88 é por item</b>; por pedido registrado é R$ 193,71; por venda do CRM (as 16) é R$ 96,86. Usar o do CRM para decidir.</div>
  <div class="callout good"><b>O que isso permite a partir de agora:</b> otimizar a campanha por <code>Purchase</code> em vez de <code>Lead</code>. Com 11 eventos em 10 dias ainda é pouco para o algoritmo (ele pede ~50 por semana), então a recomendação é <b>continuar em Lead e deixar o Purchase acumular</b> — mas o caminho está aberto.</div>
</section>

<section>
  <h2>6. O dinheiro, em três leituras</h2>
  <div class="tblwrap">
  <table>
    <thead><tr><th>Leitura</th><th class="num">Receita</th><th class="num">ROAS</th><th>O que inclui</th></tr></thead>
    <tbody>
      <tr><td><b>Registrada</b> (coorte, CRM)</td><td class="num">R$ 478,80</td><td class="num">0,31</td><td>8 vendas com valor lançado + 1 comercial com valor</td></tr>
      <tr class="champ"><td><b>Estimada</b> (coorte)</td><td class="num">~R$ 878</td><td class="num">~0,57</td><td>+ as 8 vendas sem valor, ao preço de entrada (R$ 49,90)</td></tr>
      <tr><td><b>Caixa</b> (compras carimbadas no período)</td><td class="num">R$ 765,80</td><td class="num">0,49</td><td>13 itens, inclui R$ 297 de um lead de 08/ago que fechou Pilares em 18/ago</td></tr>
      <tr><td><b>Pixel</b> (Meta)</td><td class="num">R$ 483,12</td><td class="num">0,31</td><td>só checkout, só as 2 campanhas com tracking</td></tr>
    </tbody>
  </table>
  </div>
  <p>As quatro leituras contam a mesma história com precisões diferentes: <b>o front-end paga entre 31% e 57% do que gasta</b>, e o número exato está travado atrás de 8 vendas que o CRM sabe que existem mas não sabe quanto valem.</p>
  <h3>Ticket e composição</h3>
  <p>Entre as 8 vendas com valor, o ticket médio foi <b>R$ 59,85</b>. Duas delas (25%) levaram order bump — Metas em Movimento e Gestão de Tempo juntos, R$ 89,70. A venda de <b>Pilares da Produtividade (R$ 297)</b> saiu de um lead do AD 11 de 08/ago, fechada pelo comercial 10 dias depois: é a esteira funcionando, e é onde o ROAS do funil se decide — não no front.</p>
  <div class="callout bad"><b>A venda órfã do R04 continua órfã.</b> O lead de 07/ago marcado como vendido sem valor, apontado como P0 no relatório anterior, segue sem valor. E agora tem mais 8 na mesma situação. <b>Na base inteira: 49 vendidos, 11 sem valor (22%).</b> O pixel da Meta hoje sabe mais sobre a receita deste funil do que o próprio CRM.</div>
</section>

<section>
  <h2>7. A pergunta do R04, respondida</h2>
  <p>O Relatório 04 terminou com uma dúvida honesta: em 06/ago a VSL virou landing page <i>e</i> o AD 11 entrou na terceira semana, no mesmo dia. A queda de 7,1% para 3,2% de conversão podia ser qualquer um dos dois. O P0 pedia religar com AD 11 + VSL como controle. Foi feito.</p>
  <div class="card">
    <div class="cmp cmphead"><span class="met">Métrica</span><span class="v">R04 · LP</span><span class="v">R05 · VSL</span><span class="d">Δ</span></div>
    <div class="cmp"><span class="met">Investimento</span><span class="v old">R$ 756,59</span><span class="v">R$ 1.549,68</span><span class="d dim">+105%</span></div>
    <div class="cmp"><span class="met">Leads</span><span class="v old">63</span><span class="v">225</span><span class="d up">+257%</span></div>
    <div class="cmp"><span class="met">CPL</span><span class="v old">R$ 12,01</span><span class="v">R$ 6,89</span><span class="d up">−43%</span></div>
    <div class="cmp"><span class="met">CPC</span><span class="v old">R$ 3,54</span><span class="v">R$ 2,33</span><span class="d up">−34%</span></div>
    <div class="cmp"><span class="met">Sessão → lead</span><span class="v old">14,2%</span><span class="v">22,1%</span><span class="d up">+56%</span></div>
    <div class="cmp"><span class="met">Vendas na coorte</span><span class="v old">2</span><span class="v">16</span><span class="d up">8×</span></div>
    <div class="cmp"><span class="met">Conversão lead → venda</span><span class="v old">3,2%</span><span class="v">7,1%</span><span class="d up">+122%</span></div>
    <div class="cmp"><span class="met">Receita registrada</span><span class="v old">R$ 79,80</span><span class="v">R$ 478,80</span><span class="d up">6×</span></div>
    <div class="cmp"><span class="met">ROAS registrado</span><span class="v old">0,11</span><span class="v">0,31</span><span class="d up">2,8×</span></div>
  </div>
  <p>A conversão lead→venda voltou <b>exatamente</b> ao nível do R03 (7,1%), que era o último período com VSL. O criativo é o mesmo do R04, três semanas mais velho. <b>Se a idade do criativo explicasse a queda, ela teria piorado, não revertido.</b></p>
  <div class="callout bad"><b>Onde eu seguro:</b> não é um teste A/B limpo. Junto com a VSL voltou também uma estrutura de campanha melhor (§3), e parte da melhora de CPL é dela, não da página. O que a estrutura <i>não</i> explica é a conversão lead→venda — o lead custa menos por causa do leilão, mas compra mais por causa do que encontra depois do quiz. A leitura mais provável, com essa ressalva: <b>a VSL vende; a landing page vendia menos; o AD 11 nunca foi o problema.</b></div>
</section>

<section>
  <h2>8. O funil passou a vender no mesmo dia</h2>
  <p>No R03, a mediana entre virar lead e comprar era de <b>4,3 dias</b>, e 26% das compras vinham depois de uma semana. Era a assinatura do comercial: o lead entrava, o time abordava, negociava, fechava. Neste período:</p>
  <div class="grid g3">
    <div class="tile"><div class="n">16 de 16</div><div class="l">Vendas em menos de 24h</div><div class="s">mediana: mesmo dia</div></div>
    <div class="tile"><div class="n">14 de 16</div><div class="l">Vendas no direto</div><div class="s">só 2 pelo comercial</div></div>
    <div class="tile"><div class="n">10 dias</div><div class="l">A exceção</div><div class="s">o Pilares de R$ 297, pelo comercial</div></div>
  </div>
  <p>A VSL fecha na sessão. O comercial passou a ser o <b>segundo degrau</b> — o upsell — e não o primeiro. Isso muda uma regra operacional do projeto:</p>
  <div class="callout"><b>Regra 5, refinada.</b> "Nunca julgar campanha antes de 7 dias" continua valendo para a receita do comercial e da esteira. Mas <b>a conversão direta pode ser lida em 48h</b> — se o lead não comprou no dia, a chance dele comprar sozinho depois é pequena. Para decisão de mídia no front, o relógio ficou muito mais curto.</div>
</section>

<section>
  <h2>9. Quem compra</h2>
  <h3>Por idade — replicou</h3>
  <div class="tblwrap">
  <table>
    <thead><tr><th>Faixa</th><th class="num">Leads</th><th class="num">Vendas</th><th class="num">Conversão</th><th class="num">Receita</th></tr></thead>
    <tbody>
      <tr><td>18 a 24</td><td class="num">62</td><td class="num">3</td><td class="num">4,8%</td><td class="num">R$ 89,70</td></tr>
      <tr><td>25 a 34</td><td class="num">58</td><td class="num">2</td><td class="num">3,4%</td><td class="num dim">R$ 0</td></tr>
      <tr class="champ"><td>35 a 44</td><td class="num">53</td><td class="num">5</td><td class="num">9,4%</td><td class="num">R$ 139,60</td></tr>
      <tr class="champ"><td>45 a 54</td><td class="num">28</td><td class="num">4</td><td class="num">14,3%</td><td class="num">R$ 149,70</td></tr>
      <tr><td>55 ou mais</td><td class="num">24</td><td class="num">2</td><td class="num">8,3%</td><td class="num">R$ 99,80</td></tr>
      <tr class="total"><td>35+</td><td class="num">105</td><td class="num">11</td><td class="num">10,5%</td><td class="num">R$ 389,10</td></tr>
      <tr class="total"><td>Abaixo de 35</td><td class="num">120</td><td class="num">5</td><td class="num">4,2%</td><td class="num">R$ 89,70</td></tr>
    </tbody>
  </table>
  </div>
  <p><b>35+ converte 2,5× mais que abaixo de 35</b> (10,5% × 4,2%) e concentra 81% da receita. O R03 tinha achado ~2×. Replicou. É o único corte demográfico do projeto que se sustentou em dois períodos independentes — e é o critério que deveria substituir o perfil na fila do comercial.</p>
  <p>Gênero: mulheres são 26% dos leads e converteram 10,2% (6 de 59); homens 6,0% (10 de 166). Diferença de 1,7×, mas com 6 vendas de um lado é <b>hipótese</b>, não achado. Fica anotado para o R06.</p>
  <h3>Por perfil — não replicou</h3>
  <div class="tblwrap">
  <table>
    <thead><tr><th>Perfil</th><th class="num">R03 · conversão</th><th class="num">R03 · posição</th><th class="num">R05 · leads</th><th class="num">R05 · vendas</th><th class="num">R05 · conversão</th><th class="num">R05 · posição</th></tr></thead>
    <tbody>
      <tr class="alerta"><td>🌀 Sobrecarregado</td><td class="num">17,0%</td><td class="num">1º</td><td class="num">42</td><td class="num">1</td><td class="num">2,4%</td><td class="num"><b>5º</b></td></tr>
      <tr><td>⚡ Impulsivo</td><td class="num">12,8%</td><td class="num">2º</td><td class="num">63</td><td class="num">3</td><td class="num">4,8%</td><td class="num">3º</td></tr>
      <tr><td>🚪 Evitativo</td><td class="num">9,8%</td><td class="num">3º</td><td class="num">54</td><td class="num">6</td><td class="num">11,1%</td><td class="num">2º</td></tr>
      <tr class="champ"><td>🎯 Perfeccionista</td><td class="num">9,4%</td><td class="num">4º</td><td class="num">36</td><td class="num">5</td><td class="num">13,9%</td><td class="num"><b>1º</b></td></tr>
      <tr><td>🧭 Indeciso</td><td class="num">2,7%</td><td class="num">5º</td><td class="num">30</td><td class="num">1</td><td class="num">3,3%</td><td class="num">4º</td></tr>
    </tbody>
  </table>
  </div>
  <div class="callout bad"><b>Retratação.</b> O R03 chamou a tabela de perfil × venda de "o achado mais sólido do projeto" (n=229, p≈0,04). Neste período, com n=225, <b>o primeiro virou último e o quarto virou primeiro</b>. Duas amostras do mesmo tamanho não podem ambas estar certas — e a explicação mais simples é que 16 vendas divididas em 5 perfis são 1 a 6 vendas por célula, onde uma venda a mais ou a menos muda a posição. O p≈0,04 foi uma coincidência de amostra, ou o mecanismo mudou (o comercial do R03 fechava Sobrecarregados no WhatsApp; a VSL do R05 fecha Perfeccionistas na hora). Em qualquer dos casos: <b>o perfil não é base para priorizar a fila do comercial.</b> A idade é.</div>
</section>

<section>
  <h2>10. O quiz — melhor a cada período</h2>
  <div class="card">
    <div class="barrow"><span class="lab">Abriu e saiu na intro</span><span class="bar"><i class="r" style="width:100%"></i></span><span class="val">615</span></div>
    <div class="barrow"><span class="lab">Passou da intro</span><span class="bar"><i style="width:66%"></i></span><span class="val">405</span></div>
    <div class="barrow"><span class="lab">Terminou as 7 perguntas</span><span class="bar"><i style="width:47%"></i></span><span class="val">292</span></div>
    <div class="barrow"><span class="lab">Chegou no WhatsApp</span><span class="bar"><i style="width:47%"></i></span><span class="val">289</span></div>
    <div class="barrow"><span class="lab">Virou lead</span><span class="bar"><i class="t" style="width:37%"></i></span><span class="val">225</span></div>
    <div class="barrow"><span class="lab">Chegou na VSL</span><span class="bar"><i class="t" style="width:32%"></i></span><span class="val">197</span></div>
  </div>
  <div class="grid g3" style="margin-top:14px">
    <div class="tile"><div class="n">60,3%</div><div class="l">Perda na intro</div><div class="s">R04: 66,7% · R01: 79%</div></div>
    <div class="tile"><div class="n">21,5%</div><div class="l">Perda na tela do WhatsApp</div><div class="s">R04: 28%</div></div>
    <div class="tile"><div class="n">75,5%</div><div class="l">Retenção nas 7 perguntas</div><div class="s">R04: 72,5% · R02: 80,7%</div></div>
    <div class="tile"><div class="n">87,6%</div><div class="l">Leads que chegam na VSL</div><div class="s">197 de 225</div></div>
    <div class="tile"><div class="n">4min58</div><div class="l">Mediana até a VSL</div><div class="s">p25 3min45 · p75 6min42</div></div>
    <div class="tile"><div class="n">55,6%</div><div class="l">Passou da intro → lead</div><div class="s">R04: 42,6%</div></div>
  </div>
  <p>Três períodos seguidos de melhora na intro: 79% → 66,7% → 60,3%. A tela não mudou; o tráfego mudou — o AD 11 traz gente mais congruente com a promessa. E <b>a tela do WhatsApp perdeu menos</b> (21,5% contra 28%), o que é coerente com lead mais quente. O quiz está entregando 87,6% dos leads na VSL. Daqui para frente, o ganho do funil não está no quiz.</p>
  <h3>Início do quiz por anúncio</h3>
  <div class="card">
    <div class="barrow"><span class="lab">AD 11 (ADS CAMP)</span><span class="bar"><i class="t" style="width:100%"></i></span><span class="val">48,2%</span></div>
    <div class="barrow"><span class="lab">AD 11 [Tela Div.] (1-1-1)</span><span class="bar"><i class="t" style="width:93%"></i></span><span class="val">44,6%</span></div>
    <div class="barrow"><span class="lab">AD 18</span><span class="bar"><i style="width:81%"></i></span><span class="val">38,9%</span></div>
    <div class="barrow"><span class="lab">AD 06</span><span class="bar"><i class="r" style="width:31%"></i></span><span class="val">14,8%</span></div>
    <div class="barrow"><span class="lab">AD 05</span><span class="bar"><i class="r" style="width:21%"></i></span><span class="val">10,0%</span></div>
  </div>
  <p>Horário e dia da semana: terça a quinta concentraram 63% dos leads, sábado 4%. Os picos de hora foram 20h e 23h. Mantenho o arquivamento do R03 — com uma campanha só rodando de cada vez, dia da semana e data de início da campanha se confundem.</p>
</section>

<section>
  <h2>11. Higiene de dados</h2>
  <p>Melhorou muito em relação ao R04 — <b>99% dos leads chegaram com fbclid e a Meta cruzou 224 dos 225 leads</b> (no R04 faltavam 28%). Mas apareceram defeitos novos, e o mais caro de todos piorou.</p>
  <div class="tblwrap">
  <table>
    <thead><tr><th>#</th><th>Defeito</th><th>Impacto medido</th><th>Conserto</th></tr></thead>
    <tbody>
      <tr class="alerta"><td>1</td><td><b>8 das 16 vendas sem valor no CRM</b> (50%); na base, 11 de 49 (22%). A órfã do R04 continua órfã</td><td>ROAS real desconhecido entre 0,31 e ~0,57 — a decisão de escala depende disso</td><td>Lançar as 8 agora; automatizar via webhook da Kiwify → CRM</td></tr>
      <tr class="alerta"><td>2</td><td><b>O "+" no nome do anúncio</b> — "AD 11 [AD 03 + Tela Div.]" às vezes chega como "AD 11 [AD 03&nbsp;&nbsp;&nbsp;Tela Div.]" (o "+" vira espaço)</td><td>3 leads e 8 sessões separados do criativo certo</td><td>Não usar "+" em nome de anúncio</td></tr>
      <tr><td>3</td><td><b>32 sessões de teste</b> — 8 anúncios com UTM duplamente codificada (AD+16, AD+17, AD+18, AD+19..22 ESTÁTICO…), exatamente 4 sessões cada, 0 leads</td><td>Infla a perda na intro em ~1 ponto</td><td>Filtrar UTMs com "+" ou "%" no painel; ou testar com <code>?teste=1</code></td></tr>
      <tr><td>4</td><td><b>Produto digitado livre</b> — "Gestao de tempo" e "Gestão de Tempo" são a mesma coisa; nenhum está no array <code>PRODUCTS</code></td><td>Quebra a leitura por produto</td><td>Adicionar Gestão de Tempo (R$ 19,90) ao <code>PRODUCTS</code></td></tr>
      <tr><td>5</td><td><b>Pixel conta itens, não pedidos</b> (11 itens = 8 pedidos)</td><td>CPA do painel 28% otimista; ROAS do pixel bate com o CRM por coincidência</td><td>Usar CPA do CRM; ou pedir à Kiwify um Purchase por pedido</td></tr>
      <tr><td>6</td><td><b>AD 11 sob dois nomes</b> de novo (AD 11 · AD 11 [AD 03 + Tela Div.])</td><td>Painel mostra 2 anúncios; é 1</td><td>Somar na mão (feito aqui); padronizar no próximo</td></tr>
      <tr><td>7</td><td><code>{{ad.name}}</code> literal — 1 sessão</td><td>Reincidência, sem lead desta vez</td><td>Conferir template antes de ativar</td></tr>
    </tbody>
  </table>
  </div>
</section>

<section>
  <h2>12. Veredito sobre o que foi dito antes</h2>
  <div class="card">
    <div class="veredito"><span class="vmark vok">✓</span><p><b>"Religar com AD 11 + VSL como controle" (R04, P0).</b> <b>Feito e validado.</b> Melhor CPL da história, conversão de volta a 7,1%.</p></div>
    <div class="veredito"><span class="vmark vno">✗</span><p><b>"O AD 11 fadigou" (hipótese em suspenso no R04).</b> <b>Refutado.</b> Seis semanas de idade, hook igual ao da estreia, CPL recorde.</p></div>
    <div class="veredito"><span class="vmark vok">✓</span><p><b>"A landing page convertia pior" (hipótese em suspenso no R04).</b> <b>Provável</b> — é a explicação que sobra quando o criativo é descartado. Não é teste limpo (§7).</p></div>
    <div class="veredito"><span class="vmark vok">✓</span><p><b>"Varie a imagem, nunca o gancho" (R03).</b> <b>Confirmado de novo.</b> O AD 11 é o AD 03 com outra tela; durou o dobro.</p></div>
    <div class="veredito"><span class="vmark vok">✓</span><p><b>"35+ compra ~2× mais" (R02/R03).</b> <b>Replicou:</b> 2,5× neste período, 81% da receita.</p></div>
    <div class="veredito"><span class="vmark vno">✗</span><p><b>"Perfil × venda é o achado mais sólido do projeto" (R03).</b> <b>Não replicou — ranking invertido.</b> Retirado da base de decisão (§9).</p></div>
    <div class="veredito"><span class="vmark vno">✗</span><p><b>"Lançar os R$ 39,90 da venda órfã" (R04, P0).</b> <b>Não feito.</b> E o problema cresceu: 8 novas sem valor.</p></div>
    <div class="veredito"><span class="vmark vok">✓</span><p><b>"Purchase/CAPI" (pendência desde o R01).</b> <b>Ligado.</b> 11 compras e 46 checkouts no pixel.</p></div>
    <div class="veredito"><span class="vmark vok">✓</span><p><b>"Aposentar a fórmula AD 03 + H 08" (R04).</b> <b>Feito.</b> Nenhum dos AD 12–15 rodou.</p></div>
    <div class="veredito"><span class="vmark vok">✓</span><p><b>"Corrigir os UTMs" (R04, P0).</b> <b>Feito em grande parte:</b> 99% com fbclid, 1 lead sem atribuição contra 8 no R04. Sobrou o "+" (§11).</p></div>
    <div class="veredito"><span class="vmark vwait">?</span><p><b>"Nunca julgar campanha antes de 7 dias" (regra 5).</b> <b>Refinada:</b> vale para o comercial e a esteira; o direto fecha no dia (§8).</p></div>
    <div class="veredito"><span class="vmark vno">✗</span><p><b>"Decidir o destino da /webinar" (R04, P1).</b> <b>Não feito.</b> A página continua no ar prometendo uma aula de 15/ago. A <code>/oferta/{perfil}</code> também segue acessível.</p></div>
  </div>
</section>

<section>
  <h2>13. O plano</h2>
  <div class="card plan">
    <div class="item"><span class="prio p0">P0</span><p><b>Lançar valor nas 8 vendas sem valor</b> (e na órfã do R04). São 9 cliques no CRM e a diferença entre ROAS 0,31 e ~0,57. Nenhuma decisão de escala deveria ser tomada antes disso.</p></div>
    <div class="item"><span class="prio p0">P0</span><p><b>Religar o AD 11 em [ABERTO] [CBO 1-1-1].</b> Está pausado desde 03/set e é o melhor CPL da história do funil. Se a pausa foi por caixa, ok. Se foi por dúvida, a dúvida acabou.</p></div>
    <div class="item"><span class="prio p0">P0</span><p><b>Automatizar a receita no CRM.</b> A Kiwify já fala com a Meta; precisa falar com o CRM também (webhook de compra aprovada → <code>purchases</code> do lead pelo telefone). O pixel não pode saber mais que a base.</p></div>
    <div class="item"><span class="prio p1">P1</span><p><b>Manter o desenho atual:</b> vencedor sozinho em 1-1-1, testes em campanha separada. É o que fez o CPL cair 51% em 3 semanas.</p></div>
    <div class="item"><span class="prio p1">P1</span><p><b>AD 18: mais 4 dias e R$ 150 antes de julgar.</b> Está em 11% de conversão com 18 leads — sinal, não conclusão. Se sustentar, é o segundo criativo de escala.</p></div>
    <div class="item"><span class="prio p1">P1</span><p><b>Fila do comercial por idade, não por perfil.</b> 35+ converte 2,5× e replicou; perfil inverteu. Trocar o critério.</p></div>
    <div class="item"><span class="prio p1">P1</span><p><b>Aposentar AD 06 e AD 05 da escala.</b> Start rate de 14,8% e 10%. Terceira confirmação.</p></div>
    <div class="item"><span class="prio p2">P2</span><p><b>Tirar o "+" dos nomes de anúncio</b> e adicionar Gestão de Tempo ao <code>PRODUCTS</code> (§11).</p></div>
    <div class="item"><span class="prio p2">P2</span><p><b>Decidir /webinar e /oferta.</b> As duas seguem no ar sem função. Terceiro relatório seguido que pede isso.</p></div>
    <div class="item"><span class="prio p2">P2</span><p><b>Quando o Purchase passar de ~50/semana, testar otimizar por compra.</b> Hoje são 11 em 10 dias — cedo.</p></div>
  </div>
</section>

<div class="foot">
  <p><b>Metodologia.</b> Período 18/08 a 04/09/2026 (dados até 07h de 04/09), fuso de Brasília. Gasto, cliques, CPC, CTR, hook, body, InitiateCheckout e Purchase vêm da Meta Marketing API por campanha, conjunto e anúncio. Sessões e etapas vêm da tabela <code>sessions</code> (funil de 18 telas; VSL = etapa 17). Leads, status, tag comercial e compras vêm do CRM; 2 leads 🧪 Teste excluídos. "Coorte" = lead que entrou no período, com o que comprou em qualquer data. "Caixa" = compra carimbada no período, de qualquer lead. "Estimada" = coorte + vendas sem valor ao preço do produto de entrada (R$ 49,90) — é um piso, não uma medição. Lag lead→venda usa <code>status_at</code>.</p>
  <p><b>Limites conhecidos.</b> 16 vendas é amostra suficiente para ROAS e CPL, mas não para cortes finos: qualquer célula com menos de 10 vendas (perfil, gênero, anúncio de teste) é direcional. A comparação VSL × landing page não é um teste controlado — a estrutura de campanha mudou junto. O pixel conta itens, não pedidos. O cruzamento Meta × funil é por nome de anúncio, e o AD 11 aparece sob dois nomes (somados na mão aqui). O período inclui 2 dias sem verba (23–24/ago).</p>
  <p>Relatório 05 · gerado em 04/set/2026 · documento interno, protegido por login.</p>
</div>

</div>

</body>
</html>`;
