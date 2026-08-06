// Relatório 03 — Performance do Período 2 (29/jul a 06/ago/2026).
// Continuação direta dos relatórios 01 e 02, que fecharam em 28/jul. Documento protegido por login.
// Fontes: Meta API, tabela sessions, CRM (coorte por data de entrada do lead + caixa por data da compra).
module.exports = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>Relatório 03 · Performance do Período 2 · Kenji Hirota</title>
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
  <div class="eyebrow">Relatório 03 · Performance · Período 2</div>
  <h1>O que os R$ 897 gastos depois do último relatório realmente compraram</h1>
  <p class="lede">Continuação direta dos Relatórios 01 e 02, que fecharam em 28/jul. Aqui está tudo que aconteceu de <b>29/jul a 06/ago</b> — 9 dias, 3 criativos novos no ar e a CBO do AD 03 escalada. Cobre <b>os dois lados</b>: a performance de mídia (§1 a §5, §8) e a auditoria do quiz (§6 e §7), na mesma metodologia do Relatório 02, com as vendas de campanha e as do comercial somadas.</p>
  <div class="meta-row">
    <span>Período 2 <b>29/jul – 06/ago 2026</b></span>
    <span>Investimento <b>R$ 897,03</b></span>
    <span>Leads <b>98</b></span>
    <span>Sessões <b>449</b></span>
    <span>Respostas auditadas <b>686</b></span>
    <span>Vendas da coorte <b>7 · R$ 528,40</b></span>
    <span>Fuso <b>Brasília</b></span>
  </div>
  <div class="callout bad">⚠️ <b>Leia o §2 antes de tirar qualquer conclusão.</b> À primeira vista a conversão despencou (14,5% → 7,1%) e o ROAS caiu de 0,87 para 0,59. <b>Isso é uma ilusão de maturidade, não uma queda de performance.</b> Medido na mesma idade, o Período 2 está rigorosamente no mesmo ritmo do Período 1 — e há uma projeção sólida de ROAS 1,07 quando a coorte amadurecer.</div>
</header>

<section>
  <div class="grid g3">
    <div class="tile"><div class="n up">R$ 9,15</div><div class="l">CPL do período</div><div class="s">era R$ 15,89 · <b class="up">−42%</b></div></div>
    <div class="tile"><div class="n up">22,5%</div><div class="l">Sessão → lead</div><div class="s">era 11,2% · <b class="up">+101%</b> — dobrou</div></div>
    <div class="tile"><div class="n">0,59 <span style="font-size:15px;color:var(--muted)">→ 1,07</span></div><div class="l">ROAS front hoje → projetado</div><div class="s">a coorte tem 4,4 dias de idade média</div></div>
    <div class="tile"><div class="n up">1,72</div><div class="l">ROAS do AD 11</div><div class="s">a variação “mesmo gancho, tela nova” do AD 03</div></div>
    <div class="tile"><div class="n down">0,27</div><div class="l">ROAS do AD 03</div><div class="s">era 1,07 — o campeão fadigou</div></div>
    <div class="tile"><div class="n">R$ 798,20</div><div class="l">Caixa do período</div><div class="s">19 compras · R$ 269,80 de leads do P1</div></div>
  </div>
</section>

<section>
  <div class="eyebrow">TL;DR</div>
  <h2>Nove conclusões do período</h2>
  <div class="card" style="margin-top:12px">
    <div class="finding"><span class="tag">ARMADILHA</span><p><b>A “queda” de conversão não existe.</b> O P2 converteu 7,1% até agora; o P1, <i>medido na mesma idade de 4,4 dias</i>, tinha convertido 7,6%. São o mesmo número. A mediana entre virar lead e comprar é de <b>4,3 dias</b>, e 5 dos 19 compradores do P1 levaram <b>mais de 7 dias</b>. Comparar coorte nova com coorte madura é o erro que faz gestor pausar campanha boa.</p></div>
    <div class="finding"><span class="tag">O FUNIL DOBROU</span><p><b>Sessão → lead saiu de 11,2% para 22,5% — sem tocar numa linha do quiz.</b> O start rate foi de 21,4% para 35,6% e o abandono na tela do nome caiu de 20,7% para 6,2%. Como a página é exatamente a mesma, <b>a melhora inteira veio da qualidade do tráfego</b>: CBO concentrada e criativos novos.</p></div>
    <div class="finding"><span class="tag">NOVO CAMPEÃO</span><p><b>O AD 11 é a melhor mídia que já rodou neste funil</b> — ROAS front <b>1,72</b> com a coorte ainda verde, CPL R$ 8,50, 87% de conclusão das perguntas e 100% de passagem no WhatsApp. Ele é literalmente “AD 03 com tela diferente”: <b>a variação recomendada no Relatório 01, executada e validada.</b></p></div>
    <div class="finding"><span class="tag">A LIÇÃO</span><p><b>O AD 12 falhou — e ensinou a regra.</b> Ele é “AD 03 + o gancho do AD 08”, também recomendação do Relatório 01. O hook subiu como previsto (29,9%), mas <b>só 56,7% terminam as perguntas</b> — quase idêntico ao defeito do próprio AD 08 (51,6%). <b>Trocar o gancho importou o problema junto.</b> Variar a imagem funciona; variar o gancho quebra a intenção.</p></div>
    <div class="finding"><span class="tag">FADIGA</span><p><b>O AD 03 caiu de ROAS 1,07 para 0,27.</b> Consumiu 37% do investimento do período (R$ 333,93), trouxe o maior volume de leads (38) e converteu 1. O comportamento dentro da página continua ótimo (44% de start) — <b>o que quebrou foi a intenção de compra, não o interesse</b>. É a assinatura de fadiga de criativo depois de 3 semanas no ar.</p></div>
    <div class="finding"><span class="tag">RESOLVIDO</span><p><b>A anomalia da quarta-feira era ponto fora da curva.</b> No P1 a quarta era o pior dia (4,9% de sessão→lead). No P2 virou <b>o melhor</b> (30,1%, com 52 leads). Confirma o diagnóstico do Relatório 02: foi um problema pontual de entrega do Meta, não um padrão semanal. <b>Nada a corrigir.</b></p></div>
    <div class="finding"><span class="tag">QUIZ</span><p><b>O diagnóstico ficou mais frágil — e é o preço do lead barato.</b> Os empates no topo quase dobraram (15,3% → 27,6%) e <b>48% dos diagnósticos do P2 são decididos por 1 ponto ou menos</b>. O motor segue perfeito (98 de 98 reproduzidos); o que mudou foi o público: o tráfego novo responde de forma bem mais espalhada. <b>O CPL caiu 42%, mas veio com gente de padrão menos definido.</b></p></div>
    <div class="finding"><span class="tag">AGORA É FATO</span><p><b>Sobrecarregado 17,0% × Indeciso 2,7%.</b> Com 229 leads acumulados, a diferença entre o melhor e o pior perfil ficou <b>estatisticamente sólida</b> (p ≈ 0,04) — o Indeciso fez <b>0 vendas em 17 leads</b> no P2. É a conclusão mais acionável do relatório: <b>priorizar a fila do comercial por perfil</b> e escrever para a dor do Sobrecarregado.</p></div>
    <div class="finding"><span class="tag">AUTOCORREÇÃO</span><p><b>O Relatório 02 superestimou o problema da tela do nome.</b> Ele media 21,1% de abandono e eu classifiquei como P0. Com tráfego melhor, a mesma tela perde <b>6,2%</b>. O gargalo era, em boa parte, <b>tráfego frio — não UX</b>. A correção continua valendo, mas vale ~10 leads em 9 dias, não o que eu projetei. Desce para P1.</p></div>
  </div>
</section>

<section>
  <div class="eyebrow">§1 · Placar</div>
  <h2>Período 1 × Período 2, lado a lado</h2>
  <p class="lede">P1 = 17–28/jul (12 dias, R$ 2.080,97). P2 = 29/jul–06/ago (9 dias, R$ 897,03). Todos os números de venda vêm do CRM — campanha e comercial somados.</p>
  <div class="card" style="margin-top:12px">
    <div class="cmp cmphead"><span>Métrica</span><span class="v">Período 1</span><span class="v">Período 2</span><span class="d">Δ</span></div>
    <div class="cmp"><span class="met">Investimento</span><span class="v old">R$ 2.080,97</span><span class="v">R$ 897,03</span><span class="d dim">−57%</span></div>
    <div class="cmp"><span class="met">Leads</span><span class="v old">131</span><span class="v">98</span><span class="d dim">−25%</span></div>
    <div class="cmp"><span class="met">CPL</span><span class="v old">R$ 15,89</span><span class="v">R$ 9,15</span><span class="d up">−42%</span></div>
    <div class="cmp"><span class="met">Sessões</span><span class="v old">1.397</span><span class="v">449</span><span class="d dim">−68%</span></div>
    <div class="cmp"><span class="met">Start rate</span><span class="v old">21,4%</span><span class="v">35,6%</span><span class="d up">+66%</span></div>
    <div class="cmp"><span class="met">Sessão → lead</span><span class="v old">11,2%</span><span class="v">22,5%</span><span class="d up">+101%</span></div>
    <div class="cmp"><span class="met">Conversão lead → compra</span><span class="v old">14,5%</span><span class="v">7,1%</span><span class="d down">−51%*</span></div>
    <div class="cmp"><span class="met">Receita da coorte</span><span class="v old">R$ 1.801,50</span><span class="v">R$ 528,40</span><span class="d down">−71%*</span></div>
    <div class="cmp"><span class="met">Ticket médio</span><span class="v old">R$ 94,82</span><span class="v">R$ 75,49</span><span class="d down">−20%*</span></div>
    <div class="cmp"><span class="met">ROAS front</span><span class="v old">0,87</span><span class="v">0,59</span><span class="d down">−32%*</span></div>
    <div class="cmp"><span class="met"><b>ROAS front projetado</b></span><span class="v old">0,87</span><span class="v up">1,07</span><span class="d up">+23%</span></div>
  </div>
  <p style="font-size:13px;color:var(--muted);margin-top:8px">* Métricas marcadas dependem de maturação da coorte — leia o §2. A linha final é a comparação justa.</p>
  <div class="callout">📌 <b>Os números do P1 mudaram desde o Relatório 01.</b> Lá eram 129 leads, 17 compradores e R$ 1.531,70. Agora são <b>131 leads, 19 compradores e R$ 1.801,50</b>: dois leads entraram depois do corte e <b>três vendas de leads do P1 fecharam durante o P2</b> (R$ 269,80). O ROAS real do P1 não é 0,74 como publicado — é <b>0,87</b>. Isso não é erro do relatório anterior: é a coorte amadurecendo, exatamente o efeito que o §2 mede.</div>
</section>

<section>
  <div class="eyebrow">§2 · A correção que muda tudo</div>
  <h2>Maturidade da coorte: por que 7,1% e 14,5% são o mesmo número</h2>
  <p class="lede">Um lead não compra no dia em que entra. Medir uma coorte de 4 dias contra uma de 20 é comparar uma fruta verde com uma madura e concluir que a árvore piorou.</p>

  <div class="grid g2" style="margin-top:12px">
    <div class="card">
      <h3 style="margin-top:0">Quanto tempo o lead demora pra comprar</h3>
      <div class="barrow"><span class="lab">Mesmo dia (0–1d)</span><div class="bar"><i style="width:29%"></i></div><span class="val">2</span></div>
      <div class="barrow"><span class="lab">1 a 3 dias</span><div class="bar"><i style="width:100%"></i></div><span class="val">7</span></div>
      <div class="barrow"><span class="lab">3 a 7 dias</span><div class="bar"><i style="width:71%"></i></div><span class="val">5</span></div>
      <div class="barrow"><span class="lab">Mais de 7 dias</span><div class="bar"><i class="g" style="width:71%"></i></div><span class="val">5</span></div>
      <p style="font-size:13.5px;color:var(--muted);margin-top:10px">Compradores do P1, por tempo entre virar lead e comprar. <b>Mediana: 4,3 dias. Máximo: 11,4 dias.</b> Mais de um quarto comprou depois da primeira semana — quase sempre venda do comercial, que precisa de conversa.</p>
    </div>
    <div class="card">
      <h3 style="margin-top:0">A comparação justa</h3>
      <div class="barrow"><span class="lab">P1 · maduro (20 dias)</span><div class="bar"><i class="t" style="width:100%"></i></div><span class="val">14,5%</span></div>
      <div class="barrow"><span class="lab">P1 · com 4,4 dias</span><div class="bar"><i style="width:52%"></i></div><span class="val">7,6%</span></div>
      <div class="barrow"><span class="lab"><b>P2 · hoje (4,4 dias)</b></span><div class="bar"><i style="width:49%"></i></div><span class="val">7,1%</span></div>
      <p style="font-size:13.5px;color:var(--muted);margin-top:10px">A idade média do lead do P2 é de <b>4,4 dias</b>. Congelando o P1 nessa mesma idade, ele tinha 10 compradores — <b>7,6%</b>. O P2 tem 7 — <b>7,1%</b>. Diferença dentro do ruído. <b>A performance não caiu.</b></p>
    </div>
  </div>

  <div class="callout good">📈 <b>A projeção.</b> O P1 quase dobrou depois dos 4,4 dias: a conversão foi de 7,6% para 14,5% (fator <b>1,91×</b>) e a receita, de R$ 995,70 para R$ 1.801,50 (fator <b>1,81×</b>). Aplicando o fator de receita ao P2: <b>R$ 528,40 → R$ 956,00</b>, o que dá <b>ROAS front 1,07</b> sobre os R$ 897,03 gastos — melhor que os 0,87 do P1. Em compradores: dos 7 atuais para <b>~13</b>. <br><span style="font-size:13px">É projeção, não promessa: assume que o P2 se comporta como o P1 e que o comercial trabalha a base com a mesma intensidade. Revisar em 7 dias, quando a coorte estiver madura.</span></div>
</section>

<section>
  <div class="eyebrow">§3 · Por anúncio</div>
  <h2>Quem pagou a conta e quem queimou verba</h2>
  <p class="lede">Coorte do P2: leads que entraram no período e o que <i>eles</i> compraram até agora. Gasto e CPL cruzados por <code>utm_campaign + utm_content</code>.</p>
  <div class="tblwrap" style="margin-top:12px">
  <table>
    <thead><tr><th>Anúncio</th><th class="num">Gasto</th><th class="num">Leads</th><th class="num">CPL</th><th class="num">Compradores</th><th class="num">Receita</th><th class="num">CPA</th><th class="num">ROAS front</th></tr></thead>
    <tbody>
      <tr class="champ"><td class="adname">AD 11 🏆 <span class="cellnote">AD 03 + tela nova</span></td><td class="num">R$ 144,56</td><td class="num">17</td><td class="num up">R$ 8,50</td><td class="num"><b>3</b></td><td class="num"><b>R$ 249,20</b></td><td class="num up">R$ 48,19</td><td class="num up"><b>1,72</b></td></tr>
      <tr><td class="adname">AD 06</td><td class="num">R$ 196,65</td><td class="num">25</td><td class="num up">R$ 7,87</td><td class="num">3</td><td class="num">R$ 189,50</td><td class="num">R$ 65,55</td><td class="num">0,96</td></tr>
      <tr class="alerta"><td class="adname">AD 03 <span class="cellnote">campeão do P1</span></td><td class="num">R$ 333,93</td><td class="num">38</td><td class="num">R$ 8,79</td><td class="num down">1</td><td class="num">R$ 89,70</td><td class="num down">R$ 333,93</td><td class="num down"><b>0,27</b></td></tr>
      <tr class="alerta"><td class="adname">AD 12 <span class="cellnote">AD 03 + gancho do AD 08</span></td><td class="num">R$ 131,98</td><td class="num">14</td><td class="num">R$ 9,43</td><td class="num down">0</td><td class="num dim">—</td><td class="num dim">—</td><td class="num down">0,00</td></tr>
      <tr class="alerta"><td class="adname">AD 10 <span class="cellnote">pausado, e bem</span></td><td class="num">R$ 60,08</td><td class="num">2</td><td class="num down">R$ 30,04</td><td class="num">0</td><td class="num dim">—</td><td class="num dim">—</td><td class="num down">0,00</td></tr>
      <tr><td class="adname dim">AD 01 (ABO, resíduo)</td><td class="num">R$ 29,83</td><td class="num down">0</td><td class="num dim">—</td><td class="num">0</td><td class="num dim">—</td><td class="num dim">—</td><td class="num down">0,00</td></tr>
      <tr class="total"><td>TOTAL</td><td class="num">R$ 897,03</td><td class="num">98*</td><td class="num">R$ 9,15</td><td class="num">7</td><td class="num">R$ 528,40</td><td class="num">R$ 128,15</td><td class="num">0,59</td></tr>
    </tbody>
  </table>
  </div>
  <p style="font-size:12.5px;color:var(--muted);margin-top:8px">* 96 leads pagos + 2 orgânicos (link na bio e tráfego direto). Todos os ROAS desta tabela têm entre 0 e 3 vendas: leia como <b>direção</b>, não como medida fina.</p>

  <div class="callout bad">🔥 <b>O AD 03 é o problema do período.</b> Levou <b>37% de todo o investimento</b> (R$ 333,93) e devolveu R$ 89,70. Ele continua trazendo gente que gosta do quiz — 44% de start rate, o melhor de todos, e 76% terminam as perguntas. <b>O que morreu foi a intenção de comprar, não o interesse em responder.</b> Três semanas no ar para o mesmo público é fadiga clássica. Enquanto isso, sua própria variação (AD 11) faz ROAS 1,72 com um terço do orçamento.</div>
</section>

<section>
  <div class="eyebrow">§4 · O experimento dos criativos</div>
  <h2>As duas variações do AD 03 — e a regra que elas revelam</h2>
  <p class="lede">O Relatório 01 recomendou variar o AD 03 mantendo promessa e CTA. Duas variações foram para o ar. Uma funcionou muito bem, a outra falhou — e o <i>motivo</i> da falha é o achado mais útil deste relatório.</p>

  <div class="grid g2" style="margin-top:12px">
    <div class="card">
      <h3 style="margin-top:0">✅ AD 11 — trocou a <b>imagem</b>, manteve o gancho</h3>
      <div class="barrow"><span class="lab">Start rate</span><div class="bar"><i class="t" style="width:92%"></i></div><span class="val">40,4%</span></div>
      <div class="barrow"><span class="lab">Terminou as perguntas</span><div class="bar"><i class="t" style="width:100%"></i></div><span class="val up">87,0%</span></div>
      <div class="barrow"><span class="lab">Passou o WhatsApp</span><div class="bar"><i class="t" style="width:100%"></i></div><span class="val up">100%</span></div>
      <div class="barrow"><span class="lab">Sessão → lead</span><div class="bar"><i class="t" style="width:93%"></i></div><span class="val">28,1%</span></div>
      <div class="barrow"><span class="lab">ROAS front</span><div class="bar"><i class="t" style="width:100%"></i></div><span class="val up">1,72</span></div>
    </div>
    <div class="card">
      <h3 style="margin-top:0">❌ AD 12 — trocou o <b>gancho</b> (pegou o do AD 08)</h3>
      <div class="barrow"><span class="lab">Start rate</span><div class="bar"><i style="width:74%"></i></div><span class="val">32,6%</span></div>
      <div class="barrow"><span class="lab">Terminou as perguntas</span><div class="bar"><i class="r" style="width:65%"></i></div><span class="val down">56,7%</span></div>
      <div class="barrow"><span class="lab">Passou o WhatsApp</span><div class="bar"><i style="width:100%"></i></div><span class="val">100%</span></div>
      <div class="barrow"><span class="lab">Sessão → lead</span><div class="bar"><i style="width:50%"></i></div><span class="val">15,2%</span></div>
      <div class="barrow"><span class="lab">ROAS front</span><div class="bar"><i class="r" style="width:2%"></i></div><span class="val down">0,00</span></div>
    </div>
  </div>

  <div class="callout" style="margin-top:14px">🧬 <b>O gancho é o ativo — não a imagem.</b> O Relatório 02 tinha diagnosticado o AD 08 como “atenção sem intenção”: melhor hook do funil (36%) e só 51,6% terminando as perguntas. O AD 12 pegou emprestado exatamente esse gancho — e herdou exatamente esse defeito: hook subiu para <b>29,9%</b> (contra 20,8% do AD 03) e a conclusão das perguntas desabou para <b>56,7%</b>. <b>O gancho não carrega só atenção: ele carrega o tipo de pessoa que para pra assistir.</b><br><br>
  Isso corrige a recomendação que eu mesmo fiz no Relatório 01 (“roubar a abertura do AD 08”). A régua que eu propus — hook ≥25%, start ≥35%, CPL ≤R$15 — <b>aprovaria o AD 12</b> (hook 29,9%, CPL 9,43) e ela estava errada: faltava a métrica que realmente separa, que é a <b>conclusão das perguntas</b>. <b>Régua nova: conclusão das perguntas ≥ 75%</b> — o AD 11 faz 87%, o AD 03 faz 76%, o AD 12 faz 56,7%.</div>
</section>

<section>
  <div class="eyebrow">§5 · O funil</div>
  <h2>Dobrou de eficiência sem uma linha de código mudada</h2>
  <div class="card" style="margin-top:12px">
    <div class="cmp cmphead"><span>Etapa</span><span class="v">Período 1</span><span class="v">Período 2</span><span class="d">Δ</span></div>
    <div class="cmp"><span class="met">Passa da intro (start)</span><span class="v old">21,4%</span><span class="v">35,6%</span><span class="d up">+66%</span></div>
    <div class="cmp"><span class="met">Passa da tela do nome</span><span class="v old">79,3%</span><span class="v">93,8%</span><span class="d up">+18%</span></div>
    <div class="cmp"><span class="met">Passa o WhatsApp</span><span class="v old">84,3%</span><span class="v">94,4%</span><span class="d up">+12%</span></div>
    <div class="cmp"><span class="met">Sessão → lead</span><span class="v old">11,2%</span><span class="v">22,5%</span><span class="d up">+101%</span></div>
    <div class="cmp"><span class="met">Abandonos na tela do nome</span><span class="v old">62</span><span class="v">10</span><span class="d up">−84%</span></div>
    <div class="cmp"><span class="met">Abandonos no WhatsApp</span><span class="v old">29</span><span class="v">6</span><span class="d up">−79%</span></div>
    <div class="cmp"><span class="met">Tempo mediano de conclusão</span><span class="v old">4min59</span><span class="v">5min54</span><span class="d dim">+18%</span></div>
  </div>
  <p style="margin-top:14px"><b>Nenhuma dessas melhorias veio de mudança na página</b> — o <code>index.html</code> não foi tocado desde o Relatório 02. O quiz é exatamente o mesmo. Toda a diferença é <b>quem está chegando nele</b>.</p>
  <div class="callout bad">🔄 <b>Correção honesta do Relatório 02.</b> Lá eu classifiquei a tela do nome como gargalo <b>P0</b>, medindo 21,1% de abandono, e projetei ganho grande em removê-la. Com tráfego melhor, a mesma tela sem uma vírgula alterada perde <b>6,2%</b>. Ou seja: <b>boa parte do que eu li como problema de UX era problema de tráfego frio</b>. A tela ainda custa ~10 leads a cada 9 dias e continua valendo tirar — mas como <b>P1</b>, não P0. Quem estava certo era o dado novo, não a minha priorização.</div>
  <p><b>O que isso ensina para os próximos funis:</b> métrica de página medida sobre tráfego ruim mede o tráfego, não a página. Antes de reformar tela, vale sempre checar se o problema não está a montante — foi mais barato trocar criativo do que teria sido refazer o quiz.</p>
</section>

<section>
  <div class="eyebrow">§6 · O quiz por dentro</div>
  <h2>As respostas mudaram — e o diagnóstico ficou mais frágil</h2>
  <p class="lede">Auditoria das <b>686 respostas</b> dos 98 leads do P2 (1.603 no acumulado), na mesma metodologia do Relatório 02: motor de pontuação reimplementado por fora, empates, margens e distribuição por posição.</p>

  <div class="card" style="margin-top:12px">
    <div class="cmp cmphead"><span>Saúde do diagnóstico</span><span class="v">Período 1</span><span class="v">Período 2</span><span class="d">Δ</span></div>
    <div class="cmp"><span class="met">Motor reproduzido</span><span class="v old">131/131</span><span class="v">98/98</span><span class="d up">ok</span></div>
    <div class="cmp"><span class="met">Empates no topo</span><span class="v old">15,3%</span><span class="v">27,6%</span><span class="d down">+80%</span></div>
    <div class="cmp"><span class="met">Decididos por ≤1 ponto</span><span class="v old">37,4%</span><span class="v">48,0%</span><span class="d down">+28%</span></div>
    <div class="cmp"><span class="met">Vencedor fraco (≤3 de 8)</span><span class="v old">26,7%</span><span class="v">40,8%</span><span class="d down">+53%</span></div>
    <div class="cmp"><span class="met">Marcou 4+ perfis diferentes</span><span class="v old">44,3%</span><span class="v">45,9%</span><span class="d dim">+4%</span></div>
  </div>

  <div class="callout bad">🎲 <b>Quase metade dos diagnósticos do P2 é decidida por um ponto.</b> Os empates quase dobraram (15,3% → 27,6%) e os diagnósticos fracos saltaram de 26,7% para 40,8%. <b>O motor continua correto</b> — reproduzi 98 de 98 —, o que mudou foi <b>quem responde</b>: o tráfego novo distribui as respostas de forma bem mais espalhada. Ou seja, o mesmo movimento que barateou o lead pela metade também trouxe gente com padrão de procrastinação menos definido. <b>É o custo escondido do CPL de R$ 9,15.</b></div>

  <h3>O viés de posição: o alarme do Relatório 02 era exagerado</h3>
  <div class="grid g2">
    <div class="card">
      <h3 style="margin-top:0;font-size:14px">Período 1 — gradiente forte</h3>
      <div class="barrow"><span class="lab">1ª · Perfeccionista</span><div class="bar"><i style="width:100%"></i></div><span class="val">26,3%</span></div>
      <div class="barrow"><span class="lab">2ª · Evitativo</span><div class="bar"><i style="width:84%"></i></div><span class="val">22,2%</span></div>
      <div class="barrow"><span class="lab">3ª · Sobrecarregado</span><div class="bar"><i style="width:74%"></i></div><span class="val">19,4%</span></div>
      <div class="barrow"><span class="lab">4ª · Indeciso</span><div class="bar"><i style="width:60%"></i></div><span class="val">15,7%</span></div>
      <div class="barrow"><span class="lab">5ª · Impulsivo</span><div class="bar"><i style="width:62%"></i></div><span class="val">16,4%</span></div>
    </div>
    <div class="card">
      <h3 style="margin-top:0;font-size:14px">Período 2 — gradiente quase sumiu</h3>
      <div class="barrow"><span class="lab">1ª · Perfeccionista</span><div class="bar"><i class="t" style="width:100%"></i></div><span class="val">21,7%</span></div>
      <div class="barrow"><span class="lab">2ª · Evitativo</span><div class="bar"><i class="t" style="width:94%"></i></div><span class="val">20,4%</span></div>
      <div class="barrow"><span class="lab">3ª · Sobrecarregado</span><div class="bar"><i class="t" style="width:100%"></i></div><span class="val up">21,7%</span></div>
      <div class="barrow"><span class="lab">4ª · Indeciso</span><div class="bar"><i class="t" style="width:85%"></i></div><span class="val">18,5%</span></div>
      <div class="barrow"><span class="lab">5ª · Impulsivo</span><div class="bar"><i class="t" style="width:81%"></i></div><span class="val">17,6%</span></div>
    </div>
  </div>
  <div class="callout">🔬 <b>Autocorreção do Relatório 02.</b> Lá eu escrevi que o gradiente por posição (26,3% → 15,7%) era “a assinatura clássica de viés de posição” e que <b>não daria para afirmar que o Perfeccionista é o perfil mais comum</b>. <b>A ordem das opções não mudou</b> — o embaralhamento não foi implementado. Mesmo assim, no P2 o gradiente praticamente desapareceu e a <b>3ª posição empatou com a 1ª</b>. Se fosse viés puro de posição, isso seria impossível.<br><br>
  <b>Conclusão corrigida:</b> as respostas carregam sinal real do público — quando o público muda, a distribuição muda, mesmo com a ordem fixa. O viés de posição provavelmente existe, mas é <b>menor do que eu estimei</b>. A recomendação de embaralhar continua válida (é a única forma de separar os dois efeitos de vez), só que como <b>higiene de instrumento</b>, não como emergência.</div>

  <h3>Opções ímã e opções mortas mudaram de dono</h3>
  <div class="tblwrap">
  <table>
    <thead><tr><th>Pergunta</th><th>Opção ímã no P2</th><th>Opção morta no P2</th><th>O que mudou desde o P1</th></tr></thead>
    <tbody>
      <tr><td class="adname">P1</td><td>Indeciso 24,5%</td><td>Sobrecarregado 10,2%</td><td class="dim">Perfeccionista deixou de liderar</td></tr>
      <tr><td class="adname">P2</td><td><b>Impulsivo 38,8%</b></td><td>Perfeccionista 6,1%</td><td class="dim">Impulsivo passou o Evitativo</td></tr>
      <tr><td class="adname">P3</td><td>Indeciso 27,6%</td><td>Impulsivo 10,2%</td><td class="dim">estável</td></tr>
      <tr><td class="adname">P4</td><td>Evitativo 27,6%</td><td>Impulsivo 10,2%</td><td class="dim">estável</td></tr>
      <tr class="alerta"><td class="adname">P5</td><td><b>Perfeccionista 33,7%</b></td><td>Evitativo 10,2%</td><td class="dim">ímã caiu de 41,1% → 33,7%, mas segue sendo a pergunta mais desequilibrada</td></tr>
      <tr class="alerta"><td class="adname">P6</td><td>Sobrecarregado 34,7%</td><td class="down"><b>Impulsivo 4,1%</b></td><td class="dim">virou a opção mais morta do quiz (era 10,9%)</td></tr>
      <tr class="champ"><td class="adname">P7</td><td>Sobrecarregado 24,5%</td><td>Perfeccionista 16,3%</td><td class="dim">segue a mais equilibrada — a melhor pergunta</td></tr>
    </tbody>
  </table>
  </div>
  <p style="margin-top:10px"><b>Duas coisas se confirmam entre períodos:</b> a <b>P7 continua sendo a melhor pergunta</b> do quiz (a mais equilibrada nos dois recortes, e é a de peso 2 — o desenho estava certo), e a <b>P5 continua sendo a pior</b>, com um terço das pessoas marcando a mesma frase. E uma opção nova entrou na zona morta: <b>P6 · Impulsivo</b> <span class="opt" style="font-size:12.5px;color:var(--muted);font-style:italic">“Eu foco no agora. O futuro que espere.”</span> despencou para <b>4,1%</b> — hoje é a alternativa menos escolhida do funil inteiro.</p>
</section>

<section>
  <div class="eyebrow">§7 · Diagnóstico e venda</div>
  <h2>Uma hipótese que enfraqueceu e um padrão que virou fato</h2>

  <div class="qa">
    <p class="q">A hipótese do “diagnóstico frágil vende menos” se confirmou?</p>
    <span class="a-short">Não replicou no P2 — o sinal enfraqueceu bastante</span>
    <div class="card" style="margin-top:6px">
      <div class="cmp cmphead"><span>Conversão em compra</span><span class="v">Diagnóstico frágil</span><span class="v">Diagnóstico sólido</span><span class="d">Razão</span></div>
      <div class="cmp"><span class="met">Período 1</span><span class="v down">3,6% <span class="dim" style="font-weight:500">(1/28)</span></span><span class="v up">17,5% <span class="dim" style="font-weight:500">(18/103)</span></span><span class="d up">4,9×</span></div>
      <div class="cmp"><span class="met">Período 2</span><span class="v">6,5% <span class="dim" style="font-weight:500">(2/31)</span></span><span class="v">7,5% <span class="dim" style="font-weight:500">(5/67)</span></span><span class="d dim">1,15×</span></div>
      <div class="cmp"><span class="met"><b>Acumulado</b></span><span class="v down">5,1% <span class="dim" style="font-weight:500">(3/59)</span></span><span class="v up">13,5% <span class="dim" style="font-weight:500">(23/170)</span></span><span class="d">2,7×</span></div>
    </div>
    <p><b>No Relatório 02 essa diferença parecia de 4,9× e eu a marquei como “hipótese forte a testar”.</b> O período novo — que é exatamente o teste — <b>não replicou</b>: 6,5% contra 7,5%, praticamente empate. No acumulado a diferença cai para 2,7×, com <b>~6% de chance de ser sorte</b> (era ~10%). Melhorou a amostra e piorou o efeito: o padrão clássico de um achado inicial que era, em boa parte, ruído.</p>
    <p><b>Ressalva importante nos dois sentidos:</b> o P2 está imaturo, e o grupo frágil pode simplesmente demorar mais para converter. Além disso há um confundidor real — diagnóstico frágil está correlacionado com tráfego mais espalhado, e o mix de anúncios mudou. <b>Veredito prático:</b> não descartar, mas <b>tirar da fila de prioridade</b>. A melhoria de mostrar perfil primário + secundário continua valendo por ser melhor produto — só não dá mais para prometer que ela levanta a conversão.</p>
  </div>

  <div class="qa">
    <p class="q">Qual perfil realmente compra, agora com 229 leads?</p>
    <span class="a-short">Sobrecarregado 17,0% × Indeciso 2,7% — 6,3× de diferença, e agora é estatisticamente sólido</span>
    <div class="card" style="margin-top:6px">
      <div class="barrow"><span class="lab">🌀 Sobrecarregado</span><div class="bar"><i class="t" style="width:100%"></i></div><span class="val up">17,0%</span></div>
      <div class="barrow"><span class="lab">⚡ Impulsivo</span><div class="bar"><i class="t" style="width:75%"></i></div><span class="val">12,8%</span></div>
      <div class="barrow"><span class="lab">🚪 Evitativo</span><div class="bar"><i class="t" style="width:58%"></i></div><span class="val">9,8%</span></div>
      <div class="barrow"><span class="lab">🎯 Perfeccionista</span><div class="bar"><i class="t" style="width:55%"></i></div><span class="val">9,4%</span></div>
      <div class="barrow"><span class="lab">🧭 Indeciso</span><div class="bar"><i class="r" style="width:16%"></i></div><span class="val down">2,7%</span></div>
      <p style="font-size:13px;color:var(--muted);margin-top:10px">Acumulado dos dois períodos · Sobrecarregado 8 de 47 · Impulsivo 5 de 39 · Evitativo 5 de 51 · Perfeccionista 5 de 53 · Indeciso <b>1 de 37</b>.</p>
    </div>
    <p><b>Este é o achado mais sólido do relatório sobre o quiz.</b> Nos dois períodos, independentemente, o Sobrecarregado lidera e o Indeciso afunda — no P2 o Indeciso fez <b>0 vendas em 17 leads</b>. Somando, a diferença entre os dois passa no teste estatístico (<b>p ≈ 0,04</b>), o que quase nada mais neste relatório faz. <b>Dá para agir com confiança.</b></p>
    <p><b>Como usar amanhã:</b> priorizar a fila do comercial por perfil — Sobrecarregado e Impulsivo primeiro, Indeciso por último (ou só régua automática). E, na copy dos próximos criativos, falar a dor do Sobrecarregado (“nem sei por onde começar”, o excesso que paralisa), que é quem paga a conta em ambos os períodos.</p>
  </div>

  <div class="callout">⚠️ <b>Um contraste que vale registrar:</b> o Perfeccionista é o perfil mais <i>diagnosticado</i> do funil (53 leads, o maior de todos) e um dos que menos convertem (9,4%) — no P2, <b>0 de 18</b>. Se o viés de posição existir mesmo em alguma medida, ele está inflando justamente o perfil de pior retorno comercial. <b>Mais um motivo para embaralhar as opções</b>, agora por razão de negócio e não só metodológica.</p></div>
</section>

<section>
  <div class="eyebrow">§8 · Vendas</div>
  <h2>Comercial × direto, e o caixa do período</h2>
  <div class="grid g2" style="margin-top:12px">
    <div class="card">
      <h3 style="margin-top:0">Coorte do P2 — 7 compradores</h3>
      <div class="barrow"><span class="lab">💼 Comercial</span><div class="bar"><i style="width:75%"></i></div><span class="val">3</span></div>
      <div class="barrow"><span class="lab">🛒 Direto</span><div class="bar"><i class="t" style="width:100%"></i></div><span class="val">4</span></div>
      <p style="font-size:13.5px;color:var(--muted);margin-top:10px">R$ 209,40 do comercial · R$ 319,00 direto. No P1 o comercial era maioria (10 de 19, R$ 1.035,50 de R$ 1.801,50). <b>Como o comercial fecha mais tarde</b> — é ele que responde pelas vendas de 7+ dias — <b>essa proporção deve virar quando o P2 amadurecer</b>.</p>
    </div>
    <div class="card">
      <h3 style="margin-top:0">Caixa do período — R$ 798,20</h3>
      <div class="barrow"><span class="lab">De leads do P2</span><div class="bar"><i class="t" style="width:100%"></i></div><span class="val">R$ 528,40</span></div>
      <div class="barrow"><span class="lab">De leads do P1</span><div class="bar"><i class="g" style="width:51%"></i></div><span class="val">R$ 269,80</span></div>
      <p style="font-size:13.5px;color:var(--muted);margin-top:10px">19 compras carimbadas dentro do P2. Contra os R$ 897,03 gastos, o <b>caixa do período fecha em 0,89</b> — mais perto da realidade do negócio que o 0,59 da coorte, porque a base antiga continua produzindo. <b>Use a coorte para julgar mídia; use o caixa para planejar fluxo.</b></p>
    </div>
  </div>
  <div class="callout">👤 <b>Perfil que compra segue igual.</b> No P2: Sobrecarregado 4 compradores em 26 leads (15,4%), Evitativo 2 em 23, Impulsivo 1 em 14. <b>Perfeccionista (18 leads) e Indeciso (17) ainda não venderam nada</b> — o Indeciso confirma o padrão do P1 (5,0%, o pior), e o Perfeccionista provavelmente é maturação, já que no P1 ele fazia 14,3%. O Sobrecarregado segue sendo o perfil mais valioso do funil nos dois períodos.</div>
</section>

<section>
  <div class="eyebrow">§9 · Prestação de contas</div>
  <h2>O que os relatórios anteriores acertaram e o que erraram</h2>
  <div class="card" style="margin-top:12px">
    <div class="veredito"><span class="vmark vok">✓</span><p><b>“Escalar o AD 03 na CBO solo” (R01, P0).</b> Executado. Trouxe o maior volume de leads do período a CPL R$ 8,79 — mas a venda não acompanhou. <b>Meio-acerto:</b> a CBO era mesmo o formato certo, o criativo é que se esgotou.</p></div>
    <div class="veredito"><span class="vmark vok">✓</span><p><b>“Fazer variações do AD 03” (R01, P1).</b> Executado com duas variações. O <b>AD 11 virou o melhor anúncio do funil</b> (ROAS 1,72). Acerto cheio — e é hoje o ativo mais valioso da conta.</p></div>
    <div class="veredito"><span class="vmark vno">✕</span><p><b>“Roubar a abertura do AD 08” (R01, P1).</b> Executado no AD 12 e <b>falhou</b>: 0 vendas em 14 leads e 56,7% de conclusão. A régua de aprovação que propus teria aprovado esse anúncio — <b>ela estava incompleta</b>. Corrigida no §4.</p></div>
    <div class="veredito"><span class="vmark vno">✕</span><p><b>“Tela do nome é P0” (R02).</b> <b>Superestimado.</b> Com tráfego melhor o abandono caiu de 21,1% para 6,2% sem nenhuma mudança. Continua valendo remover, mas como P1.</p></div>
    <div class="veredito"><span class="vmark vok">✓</span><p><b>“A quarta-feira foi entrega do Meta, não a página” (R02).</b> <b>Confirmado.</b> No P2 a quarta virou o melhor dia do período (30,1%). Caso encerrado.</p></div>
    <div class="veredito"><span class="vmark vno">✕</span><p><b>“Priorizar dayparting de manhã” (R02, P2).</b> <b>Não se sustentou.</b> No P2 a noite (19h–23h) converte 32,4% contra 21,2% da manhã — o oposto. Com amostras desse tamanho, horário não é base para decisão. <b>Arquivar a recomendação.</b></p></div>
    <div class="veredito"><span class="vmark vno">✕</span><p><b>“O gradiente por posição é viés e invalida o ranking de perfis” (R02, P0).</b> <b>Exagerado.</b> A ordem continua fixa e mesmo assim o gradiente quase desapareceu no P2 (a 3ª posição empatou com a 1ª) — o que só é possível se as respostas carregarem sinal real do público. Embaralhar continua certo como higiene, mas <b>desce de P0 para P1</b>.</p></div>
    <div class="veredito"><span class="vmark vno">✕</span><p><b>“Diagnóstico frágil vende menos” (R02, hipótese).</b> <b>Testada pelo P2 e não replicou</b> — 6,5% contra 7,5%, praticamente empate, contra os 4,9× do P1. No acumulado sobra 2,7× com ~6% de chance de acaso. Sai da fila de prioridade.</p></div>
    <div class="veredito"><span class="vmark vok">✓</span><p><b>“P7 é a melhor pergunta, P5 é a pior” (R02).</b> <b>Confirmado nos dois períodos de forma independente.</b> A P7 segue a mais equilibrada (e é a de peso 2 — o desenho estava certo) e a P5 segue com um terço marcando a mesma frase.</p></div>
    <div class="veredito"><span class="vmark vok">✓</span><p><b>“Sobrecarregado é o perfil mais valioso, Indeciso o pior” (R01/R02).</b> <b>Confirmado e agora estatisticamente sólido</b> com 229 leads: 17,0% contra 2,7%, p ≈ 0,04.</p></div>
  </div>
</section>

<section>
  <div class="eyebrow">§10 · Plano de ação</div>
  <h2>O que fazer agora</h2>
  <div class="card plan" style="margin-top:12px">
    <div class="item"><span class="prio p0">P0</span><p><b>Realocar a verba do AD 03 para o AD 11.</b> O AD 03 está consumindo 37% do investimento com ROAS 0,27 enquanto o AD 11 faz 1,72 com um terço disso. Cortar o AD 03 pela metade e dobrar o AD 11 é a maior alavanca imediata do período. <b>Não desligar o AD 03 de uma vez</b> — ele ainda alimenta bem o topo (44% de start); reduzir e observar 3 dias.</p></div>
    <div class="item"><span class="prio p0">P0</span><p><b>Pausar o AD 12 e o AD 10.</b> O AD 12 falhou pelo motivo já entendido (gancho errado) e o AD 10 tem CPL de R$ 30,04 — 3× o resto. Juntos queimaram <b>R$ 192,06</b> sem uma venda. O AD 10 já está pausado; falta o AD 12.</p></div>
    <div class="item"><span class="prio p0">P0</span><p><b>Adotar a régua nova de criativo:</b> hook ≥ 25% <b>E conclusão das perguntas ≥ 75%</b> E CPL ≤ R$ 12. A métrica de conclusão é a que separa atenção de intenção — é ela que teria reprovado o AD 12 no dia 2 em vez do dia 5.</p></div>
    <div class="item"><span class="prio p1">P1</span><p><b>Próxima leva de criativos: variar a imagem, nunca o gancho.</b> O experimento do período mostrou que o gancho do AD 03 é o ativo. Fazer AD 13/14/15 como o AD 11 foi feito — mesma promessa e mesmo gancho, tela/edição/pessoa diferentes. É a rota validada para escapar da fadiga sem perder a qualidade do lead.</p></div>
    <div class="item"><span class="prio p1">P1</span><p><b>Não julgar campanha antes de 7 dias.</b> Este relatório existe porque a leitura ingênua diria que o período foi ruim. <b>Instituir a regra:</b> nenhuma decisão de corte antes de a coorte ter 7 dias, salvo CPL absurdo (como o AD 10). Vale colocar a idade média da coorte no painel.</p></div>
    <div class="item"><span class="prio p0">P0</span><p><b>Priorizar a fila do comercial por perfil.</b> É a única conclusão do relatório que passa no teste estatístico: <b>Sobrecarregado (17,0%) e Impulsivo (12,8%) primeiro; Indeciso (2,7%) por último</b> ou só em régua automática. Custo zero, efeito imediato no tempo do Kalebe — o Indeciso consumiu abordagem para 1 venda em 37 leads.</p></div>
    <div class="item"><span class="prio p1">P1</span><p><b>Escrever os próximos criativos para a dor do Sobrecarregado</b> (“nem sei por onde começar”, o excesso que paralisa). Ele lidera conversão nos dois períodos e é o perfil que mais cresceu no P2 (26 leads, o maior). Combina com a rota validada do §4: mesma promessa e mesmo gancho, imagem nova.</p></div>
    <div class="item"><span class="prio p1">P1</span><p><b>Embaralhar a ordem das opções do quiz</b> (pendente do R02, <b>rebaixado de P0</b>). O viés é menor do que estimei, mas embaralhar é a única forma de separar posição de preferência real — e há um motivo comercial: o Perfeccionista é o perfil mais diagnosticado (53 leads) e um dos que menos convertem (9,4%).</p></div>
    <div class="item"><span class="prio p1">P1</span><p><b>Reescrever a P5 e a opção morta da P6.</b> A P5 segue sendo a pergunta mais desequilibrada nos dois períodos (33,7% na mesma opção) e a <b>P6 · Impulsivo</b> (“Eu foco no agora. O futuro que espere.”) caiu para <b>4,1%</b> — virou a alternativa menos escolhida do funil. Ganho direto de precisão sem mexer em nenhuma tela.</p></div>
    <div class="item"><span class="prio p1">P1</span><p><b>Remover ou adiar a tela do nome</b> — agora como P1. Vale ~10 leads por período, não o que eu havia projetado.</p></div>
    <div class="item"><span class="prio p2">P2</span><p><b>Higiene de nomes.</b> A campanha <code>[CBO] [AD 03] — Cópia</code> foi renomeada para <code>[CBO] [AD 11]</code> no meio do voo e os leads ficaram partidos entre os dois nomes (14 + 3). O anúncio dentro da campanha <code>[AD 12]</code> chama-se <code>AD 11 [AD 03 + H 08]</code>. Isso já custou trabalho manual de reconciliação em dois relatórios. <b>Nome de campanha ativa não se muda; nome de anúncio tem que bater com a campanha.</b></p></div>
    <div class="item"><span class="prio p2">P2</span><p><b>Arquivar a recomendação de dayparting</b> e não voltar a ela sem volume muito maior.</p></div>
  </div>
</section>

<section class="foot">
  <p><b>Método e ressalvas.</b> Período 2 = 29/jul a 06/ago/2026 (corte exato onde os Relatórios 01 e 02 pararam), fuso de Brasília. Fontes: Meta Marketing API (gasto e métricas por campanha/conjunto/anúncio), tabela <code>sessions</code> (449 sessões, funil de 18 etapas) e CRM (compras atribuídas manualmente por lead — campanha e comercial somados). Leads de teste fora de tudo. <b>Duas leituras de venda, propositalmente separadas:</b> <i>coorte</i> (lead que entrou no período × o que ele comprou, usada para julgar mídia) e <i>caixa</i> (compras carimbadas dentro do período, incluindo leads antigos que amadureceram, usada para fluxo). Misturar as duas é o erro que infla ou desinfla o resultado. <b>Maturação</b> calculada sobre os 19 compradores do P1 pelo intervalo entre entrada do lead e primeira compra; a projeção do P2 aplica o fator de receita observado (1,81×) e assume comportamento equivalente — <b>é estimativa, e deve ser revisada quando a coorte completar 7 dias</b>. <b>Amostra pequena:</b> o P2 tem 7 compradores, então todo ROAS por anúncio se apoia em 0 a 3 vendas — as direções são úteis, os decimais não. CPL por anúncio recalculado por <code>utm_campaign + utm_content</code>, com reconciliação manual da campanha renomeada em voo. <b>Bloco do quiz (§6 e §7):</b> mesma metodologia do Relatório 02 — motor de pontuação reimplementado por fora e conferido contra o perfil salvo (98/98 no P2, 229/229 no acumulado); “diagnóstico frágil” = empate no topo <i>ou</i> cinco perfis diferentes marcados; o teste do perfil usa os dois períodos somados e é o único resultado do relatório que cruza o limiar clássico de significância (p ≈ 0,04 entre Sobrecarregado e Indeciso). O <b>viés de posição não pode ser medido de forma limpa</b> enquanto a ordem das opções for fixa — o que o P2 mostra é apenas que ele é menor do que o Relatório 02 estimou, não que inexista. Apurado em 06/ago/2026 · Brainfy × Kenji Hirota.</p>
</section>

</div>
</body>
</html>`;
