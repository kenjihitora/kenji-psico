// Relatorio 04 - Performance do Periodo 3 (07 a 17/ago/2026).
// Continuacao direta do Relatorio 03, que fechou em 06/ago. Documento protegido por login.
// Fontes: Meta API (gasto/cliques/hook), tabela sessions (funil), CRM (coorte + caixa).
// CSS identico ao r03 (copiado na geracao para manter o padrao visual).
module.exports = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>Relatorio 04 - Performance do Periodo 3 - Kenji Hirota</title>
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
  <div class="eyebrow">Relatório 04 · Performance · Período 3</div>
  <h1>R$ 756 gastos, 63 leads, 2 vendas — e três mudanças ao mesmo tempo</h1>
  <p class="lede">Continuação direta do Relatório 03, que fechou em 06/ago. Cobre <b>07 a 17/ago</b> — só que a verba parou em <b>13/ago</b>, então são 7 dias de mídia e 4 de silêncio. É o primeiro período que roda inteiro com as <b>landing pages de oferta</b> no lugar da VSL, e o único que contém o <b>webinar</b>. Cobre os dois lados: mídia (§1–§6) e quiz (§7), mais uma seção de higiene de dados (§9) que virou a parte mais acionável deste relatório.</p>
  <div class="meta-row">
    <span>Período 3 <b>07 – 17/ago 2026</b></span>
    <span>Investimento <b>R$ 756,59</b></span>
    <span>Leads <b>63</b></span>
    <span>Vendas <b>2</b></span>
    <span>Fontes <b>Meta API · sessions · CRM</b></span>
  </div>
</header>

<section>
  <div class="grid g3">
    <div class="tile"><div class="n">R$ 756,59</div><div class="l">Investido</div><div class="s">7 campanhas, todas hoje pausadas</div></div>
    <div class="tile"><div class="n">63</div><div class="l">Leads</div><div class="s">de 445 sessões — 14,2%</div></div>
    <div class="tile"><div class="n">R$ 12,01</div><div class="l">CPL real</div><div class="s">+31% contra o P2 (R$ 9,15)</div></div>
    <div class="tile"><div class="n">2</div><div class="l">Vendas na coorte</div><div class="s">3,2% dos leads</div></div>
    <div class="tile"><div class="n">R$ 79,80</div><div class="l">Receita da coorte</div><div class="s">2 × R$ 39,90 — ROAS 0,11</div></div>
    <div class="tile"><div class="n">0</div><div class="l">Inscritos no webinar</div><div class="s">o evento não aconteceu</div></div>
  </div>
</section>

<section>
  <h2>1. O resumo, antes dos detalhes</h2>
  <div class="card">
    <div class="finding"><span class="tag">DINHEIRO</span><p><b>O período não devolveu o investimento, e desta vez a maturidade não explica.</b> No Relatório 03 eu mostrei que a queda aparente era ilusão de coorte jovem. Aqui a coorte tem <b>idade média de 7,7 dias</b> — mais madura que os 4,4 dias em que congelei o P1 — e mesmo aplicando o fator de maturação de 1,81× que o próprio R03 calculou, a receita projetada chega a <b>R$ 144</b> contra R$ 756 gastos. Não é questão de esperar.</p></div>
    <div class="finding"><span class="tag">CAUSA</span><p><b>Mas não dá pra dizer o que causou.</b> Duas coisas mudaram no mesmo dia 06/ago: o funil trocou a VSL pela landing page <i>e</i> o AD 11 entrou na terceira semana de veiculação. Queda de criativo e mudança de página são indistinguíveis nesta amostra. Qualquer conclusão do tipo "a landing não converte" ou "o AD 11 fadigou" seria chute — e §4 explica por quê.</p></div>
    <div class="finding"><span class="tag">PADRÃO</span><p><b>A armadilha do CPL barato se repetiu, agora três vezes.</b> Os AD 13, 14 e 15 são todos "AD 03 + gancho do AD 08" — a mesma fórmula que já tinha falhado como AD 12. O AD 13 entregou o <b>melhor CPL do projeto inteiro (R$ 2,67)</b> e zero vendas. É exatamente o comportamento que o R03 previu.</p></div>
    <div class="finding"><span class="tag">QUIZ</span><p><b>O quiz não é o problema.</b> A perda na intro caiu pra <b>66,7%</b> (era 79% no R01) e quem passa da intro converte em lead a <b>42,6%</b>. O funil está melhor do que já esteve. O gargalo é o que acontece <i>depois</i> do lead.</p></div>
    <div class="finding"><span class="tag">DADOS</span><p><b>Sete defeitos de instrumentação</b>, sendo que um deles esconde uma das duas vendas do período e outro apagou a coluna VSL do painel por 11 dias. §9 tem a lista com o conserto de cada um. <b>É a seção pra agir antes de religar verba.</b></p></div>
  </div>
</section>

<section>
  <h2>2. Onde o dinheiro foi</h2>
  <p>Sete campanhas receberam verba, todas em CBO, todas pausadas hoje. A concentração é extrema: <b>81% do investimento foi para uma única campanha</b>.</p>
  <div class="tblwrap">
  <table>
    <thead><tr><th>Campanha</th><th class="num">Gasto</th><th class="num">Cliques</th><th class="num">CPC</th><th class="num">CTR</th><th class="num">Hook</th><th class="num">Leads (Meta)</th><th class="num">CPL</th></tr></thead>
    <tbody>
      <tr><td class="adname">[TESTE KLB] [ADS CAMP] [CBO]</td><td class="num">R$ 615,43</td><td class="num">167</td><td class="num">R$ 3,69</td><td class="num">1,53%</td><td class="num">13,4%</td><td class="num">41</td><td class="num">R$ 15,01</td></tr>
      <tr><td class="adname">[CBO] [AD 11]</td><td class="num">R$ 56,10</td><td class="num">22</td><td class="num">R$ 2,55</td><td class="num">1,42%</td><td class="num">31,7%</td><td class="num">0</td><td class="num dim">—</td></tr>
      <tr><td class="adname">[TESTE KLB] [ADS 11] [CBO 1-3-1]</td><td class="num">R$ 34,45</td><td class="num">7</td><td class="num">R$ 4,92</td><td class="num">0,97%</td><td class="num">23,0%</td><td class="num">0</td><td class="num dim">—</td></tr>
      <tr class="alerta"><td class="adname">[CBO] [AD 15]</td><td class="num">R$ 21,86</td><td class="num">6</td><td class="num">R$ 3,64</td><td class="num">1,08%</td><td class="num">18,2%</td><td class="num">1</td><td class="num">R$ 21,86</td></tr>
      <tr><td class="adname">[CBO] [AD 14]</td><td class="num">R$ 18,08</td><td class="num">7</td><td class="num">R$ 2,58</td><td class="num">1,78%</td><td class="num">29,4%</td><td class="num">3</td><td class="num">R$ 6,03</td></tr>
      <tr class="champ"><td class="adname">[CBO] [AD 13]</td><td class="num">R$ 10,67</td><td class="num">5</td><td class="num">R$ 2,13</td><td class="num">2,44%</td><td class="num">33,2%</td><td class="num">4</td><td class="num">R$ 2,67</td></tr>
      <tr><td class="adname">[CBO] [AD 03]</td><td class="num">R$ 0,00</td><td class="num">0</td><td class="num dim">—</td><td class="num dim">—</td><td class="num dim">—</td><td class="num">0</td><td class="num dim">—</td></tr>
      <tr class="total"><td>Total</td><td class="num">R$ 756,59</td><td class="num">214</td><td class="num">R$ 3,54</td><td class="num">1,45%</td><td class="num dim">—</td><td class="num">49</td><td class="num">R$ 15,44</td></tr>
    </tbody>
  </table>
  </div>
  <div class="callout"><b>Duas contagens de lead, e a diferença importa.</b> A Meta cruza 49 leads; o nosso CRM registrou 63 no mesmo período. Os <b>14 que faltam</b> não sumiram — são os leads que chegaram com UTM quebrada (ID numérico no lugar do nome, <code>{{ad.name}}</code> literal, <code>AD+05</code> com encoding errado). Ou seja: <b>o CPL que o painel mostra é 28% mais caro que o real</b>, porque divide o gasto por um denominador furado. O CPL verdadeiro é <b>R$ 12,01</b>. §9 detalha.</div>
</section>

<section>
  <h2>3. A comparação com o Período 2</h2>
  <div class="card">
    <div class="cmp cmphead"><span class="met">Métrica</span><span class="v">P2 · 29/07–06/08</span><span class="v">P3 · 07–17/08</span><span class="d">Δ</span></div>
    <div class="cmp"><span class="met">Investimento</span><span class="v old">R$ 897,03</span><span class="v">R$ 756,59</span><span class="d dim">−16%</span></div>
    <div class="cmp"><span class="met">Leads</span><span class="v old">98</span><span class="v">63</span><span class="d down">−36%</span></div>
    <div class="cmp"><span class="met">CPL</span><span class="v old">R$ 9,15</span><span class="v">R$ 12,01</span><span class="d down">+31%</span></div>
    <div class="cmp"><span class="met">Vendas na coorte</span><span class="v old">7</span><span class="v">2</span><span class="d down">−71%</span></div>
    <div class="cmp"><span class="met">Conversão lead→venda</span><span class="v old">7,1%</span><span class="v">3,2%</span><span class="d down">−55%</span></div>
    <div class="cmp"><span class="met">Idade média da coorte</span><span class="v old">4,4 dias</span><span class="v">7,7 dias</span><span class="d up">+75%</span></div>
  </div>
  <h3>Por que a defesa da maturidade não serve desta vez</h3>
  <p>No Relatório 03 a queda de 14,5% para 7,1% era artefato: a coorte do P2 tinha 4,4 dias e a mediana entre virar lead e comprar é de 4,3 dias — metade das compras ainda não tinha acontecido. Congelando o P1 na mesma idade, os dois empatavam.</p>
  <p>Aqui a lógica se inverte. <b>A coorte do P3 é quase o dobro mais velha</b> (7,7 dias) e mesmo assim converte a menos da metade. E o teto é fácil de calcular: aplicando o fator de maturação de <b>1,81×</b> que o próprio R03 mediu, a receita de R$ 79,80 projeta para <b>R$ 144,44</b>. Contra R$ 756,59 investidos, o ROAS maduro seria <b>0,19</b>. Não existe cenário de espera que salve este período.</p>
  <div class="callout bad"><b>Onde eu seguro a conclusão:</b> 2 vendas em 63 leads é uma amostra pequena demais para afirmar que a queda é estatisticamente real — a diferença entre 3,2% e 7,1% nesse tamanho cabe dentro do acaso. O que <b>não</b> cabe no acaso é o caixa: R$ 756,59 entraram, R$ 79,80 voltaram. A afirmação segura é <b>"não houve sinal de recuperação"</b>, não "a conversão despencou".</div>
</section>

<section>
  <h2>4. O problema de fundo: três mudanças, nenhum controle</h2>
  <p>Este é o achado mais importante do relatório, e ele não é sobre um número — é sobre o desenho do teste.</p>
  <div class="tblwrap">
  <table>
    <thead><tr><th>Data</th><th>Mudança</th><th>Efeito no período</th></tr></thead>
    <tbody>
      <tr><td class="adname">01/ago</td><td>Opções do quiz embaralhadas + tela do nome movida pra depois do WhatsApp</td><td>Vale para todo o P3</td></tr>
      <tr class="alerta"><td class="adname">06/ago</td><td><b>VSL trocada pelas landing pages</b> de oferta por perfil</td><td>Cobre 100% do P3</td></tr>
      <tr class="alerta"><td class="adname">06/ago em diante</td><td><b>AD 11 entra na 3ª semana</b> de veiculação (idade de criativo)</td><td>Cobre 100% do P3</td></tr>
      <tr><td class="adname">17/ago</td><td>Reversão para a VSL</td><td>Depois do período — afeta o próximo</td></tr>
    </tbody>
  </table>
  </div>
  <p>A troca de página e o envelhecimento do criativo campeão aconteceram <b>simultaneamente e cobrem o período inteiro</b>. Não há uma janela sequer em que um tenha variado sem o outro. Estatisticamente, os dois efeitos estão perfeitamente confundidos: qualquer atribuição de causa aqui é preferência pessoal disfarçada de análise.</p>
  <div class="callout"><b>A consequência prática é a recomendação P0 do §10:</b> ao religar verba, religar com <b>uma</b> variável mudando. A reversão de hoje (17/ago) recria exatamente a combinação que o R03 mediu funcionando — AD 11 + VSL, ROAS 1,72. Isso vira o controle. Se com o controle no ar o resultado voltar, a página era o problema; se não voltar, era o criativo. Hoje, sem esse passo, os dois relatórios seguintes vão discutir a mesma dúvida.</div>
</section>

<section>
  <h2>5. A armadilha do CPL barato, pela quarta vez</h2>
  <p>Os AD 13, 14 e 15 carregam todos o mesmo sufixo no nome: <code>[AD 03 + H 08]</code> — a arte do AD 03 com o gancho do AD 08. É <b>a mesma fórmula do AD 12</b>, que o Relatório 03 registrou como fracasso (0 vendas, 56,7% de conclusão).</p>
  <div class="tblwrap">
  <table>
    <thead><tr><th>Anúncio</th><th class="num">Gasto</th><th class="num">Hook</th><th class="num">CPL</th><th class="num">Leads</th><th class="num">Vendas</th></tr></thead>
    <tbody>
      <tr class="champ"><td class="adname">AD 13 [AD 03 + H 08]</td><td class="num">R$ 10,67</td><td class="num">33,2%</td><td class="num">R$ 2,67</td><td class="num">5</td><td class="num">0</td></tr>
      <tr><td class="adname">AD 14 [AD 03 + H 08]</td><td class="num">R$ 18,08</td><td class="num">29,4%</td><td class="num">R$ 6,03</td><td class="num">3</td><td class="num">0</td></tr>
      <tr><td class="adname">AD 15 [AD 03 + H 08]</td><td class="num">R$ 21,86</td><td class="num">18,2%</td><td class="num">R$ 21,86</td><td class="num">1</td><td class="num">0</td></tr>
      <tr class="total"><td>Os três</td><td class="num">R$ 50,61</td><td class="num dim">—</td><td class="num">R$ 5,62</td><td class="num">9</td><td class="num">0</td></tr>
    </tbody>
  </table>
  </div>
  <p>O AD 13 entregou o <b>melhor CPL que este projeto já viu</b> — R$ 2,67, contra os R$ 8,50 do AD 11 no P2 — com hook de 33,2% e 75% de start rate. Nas métricas de topo, é o melhor anúncio da conta. E vendeu zero.</p>
  <div class="callout"><b>É a regra 4 do destilado, confirmada de novo:</b> clique barato não é lead que compra. O gancho do AD 08 atrai gente que consome conteúdo sobre procrastinação sem intenção de comprar nada — chega barato, responde o quiz, e para ali. Somando AD 12, 13, 14 e 15, essa fórmula já consumiu verba em quatro criativos distintos e produziu <b>zero vendas</b>.</p></div>
  <div class="callout bad"><b>Ressalva honesta de tamanho:</b> R$ 50,61 divididos em três anúncios é pouco para condenar qualquer um deles isoladamente. O que sustenta a conclusão não é o volume deste período — é a <b>repetição do padrão pela quarta vez</b>, agora com o AD 12 do relatório anterior no mesmo balde. O sinal está na consistência, não na amostra.</div>
</section>

<section>
  <h2>6. O AD 11 não repetiu — e aparece dividido em dois</h2>
  <p>O AD 11 foi coroado no Relatório 03 como o melhor anúncio que o funil já teve: ROAS front 1,72, CPL R$ 8,50, 87% de conclusão. Neste período ele trouxe <b>22 leads e nenhuma venda</b>.</p>
  <div class="card">
    <div class="barrow"><span class="lab">AD 06</span><span class="bar"><i style="width:100%"></i></span><span class="val">24 leads</span></div>
    <div class="barrow"><span class="lab">AD 11 (dois nomes)</span><span class="bar"><i style="width:92%"></i></span><span class="val">22 leads</span></div>
    <div class="barrow"><span class="lab">AD 13 [+H 08]</span><span class="bar"><i class="g" style="width:21%"></i></span><span class="val">5 leads</span></div>
    <div class="barrow"><span class="lab">IDs numéricos (UTM quebrada)</span><span class="bar"><i class="r" style="width:25%"></i></span><span class="val">6 leads</span></div>
    <div class="barrow"><span class="lab">AD 14 [+H 08]</span><span class="bar"><i class="g" style="width:13%"></i></span><span class="val">3 leads</span></div>
    <div class="barrow"><span class="lab">Sem UTM</span><span class="bar"><i class="r" style="width:17%"></i></span><span class="val">4 leads</span></div>
    <div class="barrow"><span class="lab">AD 03 · AD 05 · AD 15</span><span class="bar"><i style="width:13%"></i></span><span class="val">3 leads</span></div>
    <div class="legend"><span><span class="sw" style="background:var(--accent)"></span>criativo estabelecido</span><span><span class="sw" style="background:var(--gold)"></span>fórmula H 08</span><span><span class="sw" style="background:var(--bad)"></span>atribuição perdida</span></div>
  </div>
  <p>Repare que o AD 11 aparece <b>sob dois nomes</b> — <code>AD 11</code> (15 leads) e <code>AD 11 [AD 03 + Tela Div.]</code> (7 leads). É o mesmo criativo renomeado, e o painel os trata como anúncios diferentes. Sem somar na mão, ele parece ter metade do volume que teve. <b>É a terceira vez que uma renomeação quebra a atribuição neste projeto</b> (a primeira foi o <code>[CBO] [AD 03] — Cópia</code>, registrada no R03).</p>
  <p>Já o <b>AD 06</b> se comportou exatamente como o R03 descreveu: maior volume de leads (24) e uma das duas vendas do período — <b>fechada pelo comercial</b>, não no direto. Continua sendo o anúncio que enche a base e entrega ao time, não o que vende sozinho. <b>A outra venda saiu de um lead com UTM quebrada</b> (§9), então não se sabe qual criativo a trouxe.</p>
</section>

<section>
  <h2>7. O quiz — e a boa notícia do relatório</h2>
  <p>445 sessões no período. A distribuição de abandono mostra o funil mais saudável já medido neste projeto.</p>
  <div class="card">
    <div class="barrow"><span class="lab">Abriu e saiu na intro</span><span class="bar"><i class="r" style="width:100%"></i></span><span class="val">297</span></div>
    <div class="barrow"><span class="lab">Passou da intro</span><span class="bar"><i style="width:50%"></i></span><span class="val">148</span></div>
    <div class="barrow"><span class="lab">Chegou no WhatsApp</span><span class="bar"><i style="width:31%"></i></span><span class="val">93</span></div>
    <div class="barrow"><span class="lab">Virou lead</span><span class="bar"><i class="t" style="width:21%"></i></span><span class="val">63</span></div>
    <div class="barrow"><span class="lab">Chegou na página de oferta</span><span class="bar"><i class="t" style="width:21%"></i></span><span class="val">63</span></div>
  </div>
  <div class="grid g3" style="margin-top:14px">
    <div class="tile"><div class="n">66,7%</div><div class="l">Perda na intro</div><div class="s">era 79% no Relatório 01</div></div>
    <div class="tile"><div class="n">42,6%</div><div class="l">Passou da intro → lead</div><div class="s">de 148 para 63</div></div>
    <div class="tile"><div class="n">72,5%</div><div class="l">Retenção nas 7 perguntas</div><div class="s">era 80,7% no R02</div></div>
    <div class="tile"><div class="n">4min31</div><div class="l">Mediana até a oferta</div><div class="s">p90: 10min56</div></div>
  </div>
  <p><b>A intro melhorou muito.</b> A maior sangria histórica do funil — 79% de perda na primeira tela — caiu para 66,7%. Não dá pra creditar a uma mudança específica com certeza (a tela não foi alterada; o que mudou foi o tráfego e a ordem das telas seguintes), mas o número é bom e consistente ao longo dos 7 dias.</p>
  <p><b>A tela do WhatsApp continua sendo o pedágio.</b> Dos 93 que chegam nela, 26 param ali — 28% de perda em uma única tela, a maior do funil depois da intro. É coerente com tudo que os relatórios anteriores mostraram: pedir dado custa caro, e este é o único dado que pedimos.</p>
  <div class="callout good"><b>A leitura que muda uma decisão:</b> de cada 100 pessoas que passam da intro, 43 viram lead. Esse número nunca esteve tão alto. <b>O quiz está fazendo o trabalho dele.</b> O problema deste período mora depois — entre o lead e a compra —, e é exatamente onde a mudança de página e a idade do criativo estão confundidas (§4).</div>
  <h3>Horário e dia</h3>
  <p>Os picos de sessão foram 10h (45), 12h (44) e 22h (35); os de lead, 10h e 18h (7 cada). Mantenho o que o R03 concluiu: <b>com este volume, horário não sustenta decisão de mídia</b>. Segue arquivado.</p>
</section>

<section>
  <h2>8. O webinar: zero inscritos, e o evento não aconteceu</h2>
  <p>A página <code>/webinar</code> subiu em 11/ago às 22h09 anunciando a aula de 15/ago às 14h. Ela captou <b>zero inscrições</b> — e <b>o webinar acabou não acontecendo</b>.</p>
  <div class="callout bad"><b>As duas coisas são a mesma história, não duas.</b> Nenhuma campanha apontou para a página, os dois anúncios escritos para divulgá-la nunca foram gravados, e a verba do funil já estava parada desde 13/ago. Sem divulgação e sem inscrito, o evento perdeu a razão de existir. <b>O custo real disso não foi dinheiro — foi a página, os dois roteiros e o tempo de produção que não viraram nada.</b></div>
  <h3>Por que eu investiguei antes de escrever "zero"</h3>
  <p>Zero inscritos é o tipo de número que pode ser bug meu — um formulário quebrado produz exatamente a mesma leitura que ausência de público. Descartei essa hipótese antes de concluir:</p>
  <div class="card">
    <div class="veredito"><span class="vmark vok">✓</span><p><b>Não é bug de gravação.</b> O <code>api/lead.js</code> grava o objeto <code>utm</code> inteiro, sem filtrar chaves, e o formulário do webinar envia <code>evento: webinar-procrastination-puzzle</code>. Se alguém tivesse enviado, o campo estaria lá. <b>Nenhum dos 354 leads da base tem chave de evento.</b></p></div>
    <div class="veredito"><span class="vmark vok">✓</span><p><b>Não é bug de página.</b> Carreguei a <code>/webinar</code> em produção: formulário presente com os dois campos, nenhum erro de console, pixel carregado. A estrutura está íntegra.</p></div>
    <div class="veredito"><span class="vmark vok">✓</span><p><b>Não é o endpoint.</b> O mesmo <code>/api/lead</code> recebeu 63 leads do quiz no período. Está funcionando.</p></div>
    <div class="veredito"><span class="vmark vno">✗</span><p><b>É ausência de tráfego.</b> Nenhuma campanha apontou para <code>/webinar</code>, e os dois anúncios escritos para divulgá-lo nunca foram gravados. O último lead da base inteira é de <b>13/ago às 20h03</b> — dois dias antes do evento, o funil já estava em silêncio total.</p></div>
  </div>
  <div class="callout"><b>Ressalva:</b> não submeti um cadastro de teste em produção, então a verificação é estrutural, não ponta a ponta. Dado que o endpoint está comprovadamente recebendo dados e a página não tem erro, a probabilidade de bug é baixa — mas se a página for reaproveitada, vale um envio de teste (e depois marcar o lead como 🧪) antes de mandar tráfego.</div>
  <h3>O que fazer com a página</h3>
  <p><b>Ela segue no ar</b>, captando inscrição para uma aula que nunca houve, com o contador travado em "A aula está começando". Como não houve transmissão, <b>não existe gravação</b> — então a hipótese de transformá-la em página de replay está descartada. Sobram dois caminhos: <b>trocar a data</b> no <code>QUANDO</code> do <code>webinar.html</code> e reaproveitar tudo para um evento novo, ou <b>tirar o rewrite</b> do <code>vercel.json</code> e recolher a página até haver data definida.</p>
  <div class="callout good"><b>O ativo não se perdeu.</b> A página está pronta, é mobile-first, tem a identidade do livro e os dois roteiros de anúncio estão escritos. Para um próximo webinar, o trabalho que sobra é trocar a data e gravar — e, desta vez, <b>colocar verba apontando para ela</b>, que é exatamente o que faltou.</div>
</section>

<section>
  <h2>9. Higiene de dados: 7 defeitos encontrados</h2>
  <p>Esta seção rende mais que qualquer otimização de criativo no curto prazo, porque três destes defeitos <b>alteram números que você usa para decidir</b>.</p>
  <div class="tblwrap">
  <table>
    <thead><tr><th>#</th><th>Defeito</th><th>Impacto medido</th><th>Conserto</th></tr></thead>
    <tbody>
      <tr class="alerta"><td>1</td><td><b>Venda sem valor no CRM</b> — 1 lead marcado "vendido" sem produto atribuído</td><td><b>Escondia metade da receita do período</b>: R$ 39,90 de R$ 79,80. O painel mostrava só uma das duas vendas</td><td>Abrir o card e lançar R$ 39,90</td></tr>
      <tr class="alerta"><td>2</td><td><b>IDs numéricos no lugar do nome</b> (<code>52528715659371</code> e outros 4)</td><td>6 leads sem criativo — <b>e uma das 2 vendas do período está aqui</b></td><td>Corrigir o campo de URL do anúncio</td></tr>
      <tr class="alerta"><td>3</td><td><code>{{ad.name}}</code> <b>literal</b> — a macro não foi interpretada</td><td>1 lead órfão. É reincidência: já custou uma venda de R$ 346,90</td><td>Conferir o template antes de ativar</td></tr>
      <tr><td>4</td><td><b>AD 11 sob dois nomes</b> após renomeação</td><td>22 leads divididos em 15 + 7; parece metade do que é</td><td>Não renomear anúncio ativo; somar na mão o histórico</td></tr>
      <tr><td>5</td><td><code>AD+05</code> <b>vs</b> <code>AD 05</code> — encoding de espaço</td><td>Um criativo virou dois na leitura por dia</td><td>Normalizar o nome ao gravar a UTM</td></tr>
      <tr><td>6</td><td><b>Coluna VSL zerada</b> — mede <code>max_step &gt;= 17</code>, que não existiu entre 06 e 17/ago</td><td>11 dias marcando 0 sem queda real</td><td>✅ Resolvido pela reversão de 17/ago</td></tr>
      <tr><td>7</td><td><code>tempoCompleto</code> <b>vazio</b> — mesma causa do #6</td><td>Sem mediana de conclusão no período</td><td>Volta sozinho com o funil de 18 telas</td></tr>
    </tbody>
  </table>
  </div>
  <div class="callout"><b>O somatório dos defeitos 2, 3 e 5:</b> 8 dos 63 leads do período (13%) não têm criativo identificável, e <b>uma das duas únicas vendas está entre eles</b>. Numa amostra deste tamanho, perder uma venda de vista é perder metade da evidência.</div>
</section>

<section>
  <h2>10. Colisão de nomes: os anúncios do webinar precisam ser renumerados</h2>
  <div class="callout bad"><p>Os dois roteiros escritos em 11/ago para divulgar o webinar foram batizados de <b>AD 13</b> e <b>AD 14</b>, seguindo a sequência conhecida na época. Só que, no mesmo intervalo, <b>três criativos de quiz já ocuparam os nomes AD 13, AD 14 e AD 15</b> na conta.</p>
  <p style="margin-top:8px">Se os anúncios do webinar forem ao ar com esses nomes, os leads dos dois funis vão cair no mesmo <code>utm_content</code> e a atribuição fica irrecuperável — o painel cruza por nome. <b>Batizar como AD 16 e AD 17</b> antes de subir qualquer coisa.</p></div>
</section>

<section>
  <h2>11. O plano</h2>
  <div class="card plan">
    <div class="item"><span class="prio p0">P0</span><p><b>Não religar verba no escuro.</b> Religar com <b>AD 11 + VSL</b>, que é a combinação medida em ROAS 1,72 no R03 e é exatamente o que a reversão de hoje recriou. Esse é o controle. Só depois que ele estabilizar é que entra variável nova — uma por vez (§4).</p></div>
    <div class="item"><span class="prio p0">P0</span><p><b>Corrigir os UTMs antes do religamento.</b> Defeitos 2, 3 e 5 do §9. Sem isso, o próximo relatório perde 13% da amostra de novo — e a amostra já está pequena.</p></div>
    <div class="item"><span class="prio p0">P0</span><p><b>Lançar os R$ 39,90 da venda órfã no CRM</b> (defeito 1). Enquanto não for lançado, o painel mostra metade da receita do período — e foi preciso o Luiz corrigir na mão para este relatório fechar certo.</p></div>
    <div class="item"><span class="prio p1">P1</span><p><b>Aposentar a fórmula "AD 03 + H 08".</b> Quatro criativos (AD 12, 13, 14, 15), zero vendas. O CPL baixo do AD 13 é isca, não sinal.</p></div>
    <div class="item"><span class="prio p1">P1</span><p><b>Decidir o destino da /webinar</b> — reaproveitar com data nova ou sair do ar. Replay está descartado: sem transmissão, não há gravação. Hoje a página promete uma aula que nunca houve.</p></div>
    <div class="item"><span class="prio p1">P1</span><p><b>Renomear os anúncios do webinar para AD 16 e AD 17</b> antes de gravar (§10).</p></div>
    <div class="item"><span class="prio p2">P2</span><p><b>Resolver a divergência de preço</b> das landing pages (anunciam R$ 47,90, apontam para o checkout de R$ 49,90). Elas estão fora do funil desde hoje, então o risco caiu — mas os links seguem no ar.</p></div>
    <div class="item"><span class="prio p2">P2</span><p><b>Instrumentar o InitiateCheckout na VSL.</b> Com a volta do vídeo, o CTA passa a viver dentro do player do Vturb e o evento não dispara — a coluna Custo/IC do painel vai ficar vazia.</p></div>
  </div>
</section>

<section>
  <h2>12. Veredito sobre o que eu afirmei antes</h2>
  <div class="card">
    <div class="veredito"><span class="vmark vok">✓</span><p><b>"Clique barato não é lead que compra" (R03).</b> <b>Confirmado com força.</b> O AD 13 bateu o melhor CPL do projeto e vendeu zero.</p></div>
    <div class="veredito"><span class="vmark vok">✓</span><p><b>"Varie a imagem, nunca o gancho" (R03).</b> <b>Confirmado.</b> Os três criativos que trocaram o gancho repetiram o fracasso do AD 12.</p></div>
    <div class="veredito"><span class="vmark vok">✓</span><p><b>"O AD 06 enche a base mas não vende sozinho" (R03).</b> <b>Confirmado.</b> 24 leads, e a única venda saiu pelo comercial.</p></div>
    <div class="veredito"><span class="vmark vno">✗</span><p><b>"As landing pages nunca foram medidas" (dito por mim hoje, antes deste levantamento).</b> <b>Errado.</b> Elas receberam 63 sessões e o período inteiro rodou sobre elas. O que não existe é <i>comparação limpa</i> contra a VSL — que é coisa diferente, e é o assunto do §4.</p></div>
    <div class="veredito"><span class="vmark vno">✗</span><p><b>"O quiz não roda desde 11/ago" (dito por mim hoje).</b> <b>Errado.</b> Rodou até 13/ago às 20h03.</p></div>
    <div class="veredito"><span class="vmark vno">✗</span><p><b>"O webinar aconteceu em 15/ago" (dito por mim hoje, deduzido da data no código).</b> <b>Errado — o evento não ocorreu.</b> Eu inferi a realização a partir do contador zerado na página, que só prova que a <i>data</i> passou. Corrigido pelo Luiz.</p></div>
    <div class="veredito"><span class="vmark vno">✗</span><p><b>"1 venda, R$ 39,90 de receita" (primeira versão deste relatório).</b> <b>Errado.</b> Foram <b>2 vendas de R$ 39,90</b> — R$ 79,80. A segunda estava no CRM sem valor atribuído (defeito 1 do §9), então o painel não a mostrava. Todos os números deste relatório já refletem a correção.</p></div>
    <div class="veredito"><span class="vmark vwait">?</span><p><b>"O AD 11 é o melhor anúncio que o funil já teve" (R03).</b> <b>Em suspenso.</b> 22 leads e nenhuma venda aqui, mas com a página trocada por baixo dele não dá pra saber se o criativo caiu ou o destino mudou. O religamento do §11 responde.</p></div>
  </div>
</section>

<div class="foot">
  <p><b>Metodologia.</b> Período 07/08 a 17/08/2026, fuso de Brasília. Gasto, cliques, CPC, CTR e hook vêm da Meta Marketing API por campanha. Sessões e etapas vêm da tabela <code>sessions</code>. Leads, status, tag comercial e compras vêm do CRM. Leads marcados 🧪 Teste (4 no período) estão fora de todas as contagens. "Coorte" = lead que entrou no período, casado com o que ele comprou em qualquer data. "Caixa" = compra carimbada no período, independente de quando o lead entrou. As duas leituras aparecem separadas porque misturá-las infla ou desinfla o resultado.</p>
  <p><b>Limites conhecidos.</b> Duas vendas é amostra pequena: as conclusões sobre conversão são direcionais, não estatísticas — e estão marcadas como tal no texto. O cruzamento da Meta com o nosso funil é feito por nome de anúncio, o que duplica leads quando o mesmo criativo roda em duas campanhas e perde leads quando a UTM chega quebrada; os números de lead deste relatório vêm do CRM, não da Meta, justamente por isso. O pixel não dispara <code>Purchase</code>, então as colunas de venda e ROAS da aba Campanhas continuam vazias por desenho, e toda a receita aqui vem do CRM.</p>
  <p>Relatório 04 · gerado em 17/ago/2026 · documento interno, protegido por login.</p>
</div>

</div>

</body>
</html>`;
