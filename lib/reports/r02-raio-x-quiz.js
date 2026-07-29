// Relatório 02 — Raio-X do Quiz (17/07 a 28/07/2026).
// Documento estático, servido por api/report.js SÓ para quem está logado no /admin.
// Fontes: tabela sessions (1.379 sessões, 18 telas), respostas+scores dos 129 leads reais e Meta API.
// Apurado em 28/jul/2026 (fim do dia), mesmo snapshot do Relatório 01 v2.
module.exports = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>Relatório 02 · Raio-X do Quiz · Kenji Hirota</title>
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
  .up{color:var(--good);font-weight:700}.down{color:var(--bad);font-weight:700}
  .dim{color:var(--muted)}
  .cellnote{font-size:11px;color:var(--muted);display:block}
  .opt{font-size:12.5px;color:var(--muted);font-style:italic}

  /* funil vertical do quiz */
  .fn{display:flex;flex-direction:column;gap:2px}
  .fnrow{display:grid;grid-template-columns:26px minmax(120px,1.1fr) 2fr 96px;gap:10px;align-items:center;
    padding:7px 8px;border-radius:9px;font-size:13.5px}
  .fnrow:hover{background:color-mix(in srgb, var(--chip) 50%, transparent)}
  .fnrow .ix{font-size:11px;color:var(--muted);font-weight:800;text-align:right;font-variant-numeric:tabular-nums}
  .fnrow .tl{font-weight:650;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .fnrow .qt{text-align:right;font-variant-numeric:tabular-nums;font-size:12.5px;color:var(--muted);white-space:nowrap}
  .fnbar{height:16px;background:var(--line);border-radius:5px;overflow:hidden;position:relative}
  .fnbar>i{display:block;height:100%;background:linear-gradient(90deg,var(--accent),color-mix(in srgb,var(--accent) 55%, var(--teal)));border-radius:0 4px 4px 0;min-width:2px}
  .fnrow.leak{background:color-mix(in srgb, var(--bad) 9%, transparent)}
  .fnrow.leak .tl{color:var(--bad)}
  .fnrow.leak .fnbar>i{background:var(--bad)}
  .fnrow.grp{padding-top:14px}
  .fnlabel{font-size:10.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);
    grid-column:1 / -1;padding:10px 0 2px}

  .bar{height:10px;background:var(--line);border-radius:6px;overflow:hidden;min-width:56px}
  .bar>i{display:block;height:100%;border-radius:0 4px 4px 0;background:var(--accent);min-width:2px}
  .bar>i.t{background:var(--teal)} .bar>i.g{background:var(--gold)} .bar>i.r{background:var(--bad)}
  .barrow{display:grid;grid-template-columns:minmax(110px,190px) 1fr 72px;gap:10px;align-items:center;padding:6px 0;font-size:13px}
  .barrow .lab{font-size:12.5px;font-weight:650;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .barrow .val{text-align:right;font-variant-numeric:tabular-nums;font-weight:700}
  .barrow:hover{background:color-mix(in srgb, var(--chip) 45%, transparent);border-radius:8px}
  .legend{display:flex;gap:16px;flex-wrap:wrap;font-size:12.5px;color:var(--muted);margin:8px 0 2px}
  .legend .sw{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:6px;vertical-align:baseline}

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

  .foot{margin-top:56px;padding-top:18px;border-top:1px solid var(--line);font-size:12.5px;color:var(--muted)}
  .foot p{max-width:none}
  @media (prefers-reduced-motion: no-preference){ .bar>i,.fnbar>i{transition:width .5s ease} }
  @media print{ body{background:#fff} .card,.tile,.tblwrap{break-inside:avoid} }
  @media(max-width:560px){ .fnrow{grid-template-columns:22px 1fr 84px} .fnrow .fnbar{display:none} }
</style>
</head>
<body>
<div class="wrap">

<header>
  <div class="eyebrow">Relatório 02 · CRO do funil</div>
  <h1>Raio-X do Quiz — as 18 telas, as 7 perguntas e o motor que decide o diagnóstico</h1>
  <p class="lede">Auditoria completa da página: onde cada uma das 1.379 sessões parou, quanto tempo levou, como as 129 pessoas responderam cada pergunta, se o motor de pontuação está fazendo o que deveria — e o que tudo isso tem a ver com o anúncio que trouxe o clique. Mesmo período e mesmo snapshot do Relatório 01.</p>
  <div class="meta-row">
    <span>Período <b>16–28 jul 2026</b></span>
    <span>Sessões <b>1.379</b></span>
    <span>Leads <b>129</b></span>
    <span>Respostas auditadas <b>903</b> (129 × 7)</span>
    <span>Fuso <b>Brasília</b></span>
  </div>
</header>

<section>
  <div class="grid g3">
    <div class="tile"><div class="n">10,6%</div><div class="l">Sessão → VSL</div><div class="s">146 das 1.379 chegam ao fim</div></div>
    <div class="tile"><div class="n">96%</div><div class="l">Da perda está em 3 telas</div><div class="s">intro, nome e WhatsApp — o resto do quiz quase não vaza</div></div>
    <div class="tile"><div class="n">80,7%</div><div class="l">Terminam as 7 perguntas</div><div class="s">quem chega na P1 vai até o fim — o quiz funciona</div></div>
    <div class="tile"><div class="n">5min00</div><div class="l">Mediana pra completar</div><div class="s">a intro promete “7 perguntas rápidas”</div></div>
    <div class="tile"><div class="n">15,5%</div><div class="l">Diagnósticos que empataram</div><div class="s">1 em cada 6,5 — decididos no desempate</div></div>
    <div class="tile"><div class="n">21,7%</div><div class="l">Leads com diagnóstico frágil</div><div class="s">convertem 3,6% contra 15,8% dos sólidos</div></div>
  </div>
</section>

<section>
  <div class="eyebrow">TL;DR</div>
  <h2>Sete achados sobre o quiz</h2>
  <div class="card" style="margin-top:12px">
    <div class="finding"><span class="tag">O QUIZ É BOM</span><p><b>O problema não está nas perguntas — está nas bordas.</b> Das 228 pessoas que chegam na Pergunta 1, <b>184 (80,7%) respondem as 7</b>. As sete perguntas juntas perdem 42 pessoas. A tela de início sozinha perde 1.085. Qualquer esforço gasto “melhorando o quiz” é esforço no lugar errado.</p></div>
    <div class="finding"><span class="tag">DIGITAR</span><p><b>A única tela do meio que exige digitação perde 16× mais que as de toque.</b> A tela do <b>nome</b> derruba <b>21,1%</b> de quem clicou INICIAR (62 pessoas). Logo depois, gênero e idade — que são um toque — perdem 1,3% e 0,4%. A outra tela de digitação, o WhatsApp, perde 15,4%. <b>Teclado é o segundo maior inimigo do funil.</b></p></div>
    <div class="finding"><span class="tag">MOTOR OK</span><p><b>O motor de pontuação está correto</b> — reimplementei a lógica e ela reproduz 129 de 129 diagnósticos. Mas ele é <b>frágil por desenho</b>: 15,5% dos diagnósticos empatam no topo e 38% são decididos por 1 ponto ou menos. Em 4 de cada 10 casos, <i>uma única resposta diferente</i> mudaria o perfil que a pessoa recebe.</p></div>
    <div class="finding"><span class="tag">VIÉS</span><p><b>A ordem das 5 opções é fixa em todas as 7 perguntas</b> — Perfeccionista sempre em 1º, Indeciso sempre em 4º. E as escolhas caem em gradiente conforme a posição: <b>26,1% → 22,3% → 19,4% → 15,7%</b>. É a assinatura clássica de viés de posição. Do jeito que está, <b>é impossível saber se o Perfeccionista é o perfil mais comum ou só o que aparece primeiro.</b></p></div>
    <div class="finding"><span class="tag">FRAGILIDADE</span><p><b>Diagnóstico frágil parece vender menos.</b> Os 28 leads cujo diagnóstico empatou (ou que marcaram os 5 perfis) converteram <b>3,6%</b>; os outros 101, <b>15,8%</b>. É coerente com o mecanismo — um perfil decidido “no muque” convence menos — mas com n=28 ainda há ~10% de chance de ser sorte. <b>Hipótese forte a testar, não fato provado.</b></p></div>
    <div class="finding"><span class="tag">QUARTA</span><p><b>Quarta-feira é um buraco de R$ 400.</b> Foi o dia de <b>maior volume</b> (245 sessões) e o de <b>pior conversão</b> (4,9% contra 15,0% dos outros dias). Todos os anúncios pagos desabaram juntos — o AD 06 caiu de 50,8% de start para 4,3% — <b>enquanto o tráfego orgânico ficou normal (40%)</b>. Não foi a página: foi o tráfego daquele dia.</p></div>
    <div class="finding"><span class="tag">TEMPO</span><p><b>O quiz leva 5 minutos, não “rapidinho”.</b> Mediana de 5min00 (metade do pessoal entre 3min26 e 7min14). Quem desiste na tela do WhatsApp já investiu <b>3min20</b> — é o lead mais caro que o funil perde, e ele desiste literalmente na última linha.</p></div>
  </div>
</section>

<section>
  <div class="eyebrow">§1 · A anatomia da perda</div>
  <h2>As 18 telas, uma por uma</h2>
  <p class="lede">Cada linha mostra quantas sessões <b>chegaram</b> naquela tela e quantas <b>pararam ali</b>. A barra é a proporção sobre o topo do funil (1.379 sessões).</p>
  <div class="card" style="margin-top:12px">
    <div class="fn">
      <div class="fnlabel">Entrada</div>
      <div class="fnrow leak"><span class="ix">1</span><span class="tl">Intro</span><span class="fnbar"><i style="width:100%"></i></span><span class="qt">1.379 · <b>−1.085</b></span></div>
      <div class="fnlabel">Cadastro (antes de qualquer pergunta)</div>
      <div class="fnrow leak"><span class="ix">2</span><span class="tl">Nome ⌨️</span><span class="fnbar"><i style="width:21.3%"></i></span><span class="qt">294 · <b>−62</b></span></div>
      <div class="fnrow"><span class="ix">3</span><span class="tl">Gênero</span><span class="fnbar"><i style="width:16.8%"></i></span><span class="qt">232 · −3</span></div>
      <div class="fnrow"><span class="ix">4</span><span class="tl">Idade</span><span class="fnbar"><i style="width:16.6%"></i></span><span class="qt">229 · −1</span></div>
      <div class="fnlabel">Bloco 1 de perguntas</div>
      <div class="fnrow"><span class="ix">5</span><span class="tl">Pergunta 1</span><span class="fnbar"><i style="width:16.5%"></i></span><span class="qt">228 · −5</span></div>
      <div class="fnrow"><span class="ix">6</span><span class="tl">Pergunta 2</span><span class="fnbar"><i style="width:16.2%"></i></span><span class="qt">223 · <b>−18</b></span></div>
      <div class="fnrow"><span class="ix">7</span><span class="tl">Pergunta 3</span><span class="fnbar"><i style="width:14.9%"></i></span><span class="qt">205 · −7</span></div>
      <div class="fnrow"><span class="ix">8</span><span class="tl">Teaser “não é preguiça”</span><span class="fnbar"><i style="width:14.4%"></i></span><span class="qt">198 · −2</span></div>
      <div class="fnlabel">Bloco 2 de perguntas</div>
      <div class="fnrow"><span class="ix">9</span><span class="tl">Pergunta 4</span><span class="fnbar"><i style="width:14.2%"></i></span><span class="qt">196 · −6</span></div>
      <div class="fnrow"><span class="ix">10</span><span class="tl">Pergunta 5</span><span class="fnbar"><i style="width:13.8%"></i></span><span class="qt">190 · −1</span></div>
      <div class="fnrow"><span class="ix">11</span><span class="tl">Pergunta 6</span><span class="fnbar"><i style="width:13.7%"></i></span><span class="qt">189 · −1</span></div>
      <div class="fnrow"><span class="ix">12</span><span class="tl">Pergunta 7 (peso 2)</span><span class="fnbar"><i style="width:13.6%"></i></span><span class="qt">188 · −4</span></div>
      <div class="fnrow"><span class="ix">13</span><span class="tl">Ciência (TCC)</span><span class="fnbar"><i style="width:13.3%"></i></span><span class="qt">184 · −2</span></div>
      <div class="fnlabel">Captura</div>
      <div class="fnrow leak"><span class="ix">14</span><span class="tl">WhatsApp ⌨️</span><span class="fnbar"><i style="width:13.2%"></i></span><span class="qt">182 · <b>−28</b></span></div>
      <div class="fnlabel">Entrega do resultado</div>
      <div class="fnrow"><span class="ix">15</span><span class="tl">Calculando</span><span class="fnbar"><i style="width:11.2%"></i></span><span class="qt">154 · −0</span></div>
      <div class="fnrow"><span class="ix">16</span><span class="tl">Revelação do perfil</span><span class="fnbar"><i style="width:11.2%"></i></span><span class="qt">154 · −3</span></div>
      <div class="fnrow"><span class="ix">17</span><span class="tl">Diagnóstico</span><span class="fnbar"><i style="width:10.9%"></i></span><span class="qt">151 · −5</span></div>
      <div class="fnrow"><span class="ix">18</span><span class="tl">VSL</span><span class="fnbar"><i style="width:10.6%"></i></span><span class="qt">146 ✓</span></div>
    </div>
  </div>
  <div class="callout">📐 <b>Onde a perda realmente mora.</b> Das 1.233 sessões que não chegaram na VSL: <b>1.085 (88,0%) morreram na intro</b>, <b>62 (5,0%) na tela do nome</b> e <b>28 (2,3%) no WhatsApp</b>. As <b>outras 15 telas juntas</b> respondem por 58 perdas — <b>4,7%</b>. É por isso que otimizar pergunta é desperdício de energia: o quiz já retém quem entra nele.</div>
</section>

<section>
  <div class="eyebrow">§2 · Os três gargalos</div>
  <h2>Intro, nome e WhatsApp — e o custo de pedir pra digitar</h2>

  <div class="qa">
    <p class="q">Gargalo 1 — a intro engole 78,7% de tudo</p>
    <span class="a-short">1.085 sessões · 88% de toda a perda do funil</span>
    <p>Já era o achado nº 1 do Relatório 01, e o raio-X confirma com mais detalhe: o start rate varia de <b>4,5% (cópias Advantage) a 47,4% (AD 03 na CBO solo)</b> — uma diferença de <b>10×</b> na mesma página. Como a página é a mesma para todos, <b>a variável é a congruência entre o anúncio e a tela</b>, não a tela em si.</p>
    <div class="callout bad" style="margin:12px 0">🔍 <b>Ponto cego de instrumentação:</b> o tracking só dispara quando a tela muda. Para quem nunca clica INICIAR, não existe segundo evento — então <b>não sabemos se a pessoa ficou 2 segundos ou 2 minutos na intro</b>. Sem isso não dá pra distinguir “o anúncio trouxe gente errada” de “a tela não convenceu quem leu”. Um ping de tempo-na-tela resolveria e custa poucas linhas.</p></div>
  </div>

  <div class="qa">
    <p class="q">Gargalo 2 — a tela do nome, o vazamento que ninguém olha</p>
    <span class="a-short">21,1% de quem clicou INICIAR desiste ali · mediana de 15 segundos</span>
    <p>A pessoa clicou “INICIAR TESTE”, estava disposta — e a primeira coisa que o funil faz é <b>pedir para ela digitar</b>. 62 desistem exatamente aí. O contraste com as duas telas seguintes é o dado mais limpo do relatório inteiro:</p>
    <div class="grid g3" style="margin-top:10px">
      <div class="tile"><div class="n down">21,1%</div><div class="l">Nome ⌨️ digitar</div><div class="s">62 de 294 desistem</div></div>
      <div class="tile"><div class="n up">1,3%</div><div class="l">Gênero 👆 tocar</div><div class="s">3 de 232 desistem</div></div>
      <div class="tile"><div class="n up">0,4%</div><div class="l">Idade 👆 tocar</div><div class="s">1 de 229 desiste</div></div>
    </div>
    <p style="margin-top:12px">Mesmo público, mesmo momento do funil, telas consecutivas: <b>a de digitar perde 16× mais que as de tocar</b>. E o nome nem é usado para qualificar — é enfeite de personalização (<code>%NOME%</code> nas telas seguintes). Ele está cobrando um pedágio caríssimo por um benefício cosmético, <b>e cobrando antes de entregar qualquer valor</b>.</p>
  </div>

  <div class="qa">
    <p class="q">Gargalo 3 — o WhatsApp, o lead mais caro que o funil perde</p>
    <span class="a-short">15,4% de abandono · a pessoa já investiu 3min20 quando desiste</span>
    <p>28 pessoas responderam as 7 perguntas, leram os dois teasers, chegaram até a última linha — e travaram na hora de dar o telefone. É o abandono mais doloroso do funil porque é o mais tardio: <b>todo o custo de mídia já foi pago e todo o esforço do usuário já foi feito.</b></p>
    <p>E ele não é uniforme: quem veio do <b>AD 03 passa em 89,1%</b> e do <b>AD 06 em 90,0%</b>, mas quem veio do <b>AD 01 passa em 68,2%</b> e do <b>AD 08 em 68,8%</b>. Ou seja, <b>o mesmo formulário converte 90% ou 68% dependendo do anúncio que trouxe a pessoa</b> — de novo, temperatura do tráfego, não desenho da tela.</p>
  </div>

  <div class="callout good">🎯 <b>O tamanho do prêmio.</b> Hoje o funil converte <b>11,2%</b> de sessão em lead (154 de 1.379). Corrigindo os três gargalos para metas conservadoras — start <b>30%</b> (contra 21,3%), abandono no nome <b>10%</b> (contra 21,1%) e no WhatsApp <b>8%</b> (contra 15,4%) — a taxa vai para <b>19,5%</b>. Com exatamente o mesmo tráfego, seriam <b>269 leads em vez de 154: +74%</b>. Nenhum real a mais de mídia.</div>
</section>

<section>
  <div class="eyebrow">§3 · As 7 perguntas</div>
  <h2>Quais discriminam, quais são enfeite e quais espantam</h2>
  <p class="lede">Duas leituras: <b>abandono</b> (quantos pararam naquela pergunta) e <b>poder discriminante</b> — o quanto as 5 opções repartem bem as escolhas. Uma pergunta em que todo mundo marca a mesma coisa não classifica ninguém.</p>
  <div class="tblwrap" style="margin-top:12px">
  <table>
    <thead><tr><th>Pergunta</th><th class="num">Viram</th><th class="num">Pararam</th><th class="num">Abandono</th><th class="num">Equilíbrio</th><th>Opção ímã</th><th>Opção morta</th><th class="num">Spread</th></tr></thead>
    <tbody>
      <tr><td class="adname">P1 · trabalho novo</td><td class="num">228</td><td class="num">5</td><td class="num">2,2%</td><td class="num">0,965</td><td>Perfeccionista 29,5%</td><td>Sobrecarregado 11,6%</td><td class="num">2,5×</td></tr>
      <tr class="alerta"><td class="adname">P2 · prazo batendo</td><td class="num">223</td><td class="num"><b>18</b></td><td class="num down"><b>8,1%</b></td><td class="num">0,906</td><td>Evitativo 34,9%</td><td>Perfeccionista 7,0%</td><td class="num">5,0×</td></tr>
      <tr><td class="adname">P3 · dois caminhos</td><td class="num">205</td><td class="num">7</td><td class="num">3,4%</td><td class="num">0,940</td><td>Perfeccionista 31,8%</td><td>Impulsivo 6,2%</td><td class="num">5,1×</td></tr>
      <tr><td class="adname">P4 · quando trava</td><td class="num">196</td><td class="num">6</td><td class="num">3,1%</td><td class="num up">0,974</td><td>Perfeccionista 28,7%</td><td>Impulsivo 11,6%</td><td class="num">2,5×</td></tr>
      <tr class="alerta"><td class="adname">P5 · o que sente depois</td><td class="num">190</td><td class="num">1</td><td class="num">0,5%</td><td class="num down"><b>0,892</b></td><td><b>Perfeccionista 41,1%</b></td><td>Indeciso 5,4%</td><td class="num down"><b>7,6×</b></td></tr>
      <tr><td class="adname">P6 · frase do momento</td><td class="num">189</td><td class="num">1</td><td class="num">0,5%</td><td class="num">0,959</td><td>Sobrecarregado 30,2%</td><td>Impulsivo 10,9%</td><td class="num">2,8×</td></tr>
      <tr class="champ"><td class="adname">P7 · na lata (peso 2)</td><td class="num">188</td><td class="num">4</td><td class="num">2,1%</td><td class="num up"><b>0,996</b></td><td>Perfeccionista 24,0%</td><td>Sobrecarregado 17,8%</td><td class="num up"><b>1,3×</b></td></tr>
    </tbody>
  </table>
  </div>
  <p style="font-size:12.5px;color:var(--muted);margin-top:8px">Equilíbrio = entropia normalizada das 5 opções (1,000 = as cinco escolhidas igualmente = informação máxima). Spread = quantas vezes a opção mais escolhida supera a menos escolhida.</p>

  <div class="grid g2" style="margin-top:16px">
    <div class="card">
      <h3 style="margin-top:0">🏆 A P7 é a melhor pergunta do quiz</h3>
      <p style="font-size:14px">Equilíbrio <b>0,996</b> — praticamente perfeito. As cinco opções recebem entre 17,8% e 24,0%. Ela separa as pessoas melhor que qualquer outra, e é justamente a que já tem <b>peso 2</b> e serve de desempate. <b>A decisão de design estava certa</b> — e o dado agora prova.</p>
      <p style="font-size:14px;margin-bottom:0">Por que ela funciona: é direta (“bem na lata, por que você trava?”), curta, e cada opção nomeia um mecanismo diferente sem frase de efeito.</p>
    </div>
    <div class="card">
      <h3 style="margin-top:0">⚠️ A P5 quase não classifica ninguém</h3>
      <p style="font-size:14px">Equilíbrio <b>0,892</b>, o pior. <b>41,1%</b> marcam a mesma opção: <span class="opt">“Fico me cobrando, pensando que poderia ter feito melhor.”</span> — uma frase que <i>qualquer</i> procrastinador assina, seja qual for o perfil. Enquanto isso a opção do Indeciso fica com <b>5,4%</b>.</p>
      <p style="font-size:14px;margin-bottom:0">Resultado prático: a P5 gasta uma tela do usuário e devolve pouca informação — <b>e ainda empurra 4 em cada 10 pessoas para o Perfeccionista</b>, inflando artificialmente esse perfil.</p>
    </div>
  </div>

  <div class="callout bad">💀 <b>Opções mortas (menos de 8% de escolha).</b> P5·Indeciso <span class="opt">“Fico martelando se deveria ter escolhido de outro jeito”</span> (5,4%) · P3·Impulsivo <span class="opt">“Escolho qualquer um rápido pra me livrar da dúvida, mas depois mudo de ideia”</span> (6,2%) · P2·Perfeccionista <span class="opt">“Prefiro entregar atrasado do que mandar algo que não esteja do meu jeito”</span> (7,0%). São opções que ocupam espaço e quase nunca são escolhidas — reescrevê-las é ganho direto de precisão do diagnóstico, sem mexer em nenhuma tela.</div>

  <div class="callout">⏱️ <b>Por que a P2 é a que mais espanta (8,1%).</b> Quem para nela já está há <b>64 segundos</b> na página. É a 2ª pergunta seguida sobre o mesmo tema (prazo/trabalho), com as opções mais longas do quiz. A hipótese mais provável é fadiga de leitura logo no começo — e ela é testável barato: encurtar as cinco opções da P2 e medir de novo.</div>
</section>

<section>
  <div class="eyebrow">§4 · O motor de diagnóstico</div>
  <h2>Auditoria: ele funciona, e é mais frágil do que parece</h2>
  <p class="lede">Reimplementei a lógica de pontuação por fora (7 respostas, peso 1 nas seis primeiras e 2 na sétima, desempate pela P7) e rodei contra os 129 leads.</p>

  <div class="grid g3" style="margin-top:12px">
    <div class="tile"><div class="n up">129/129</div><div class="l">Diagnósticos reproduzidos</div><div class="s">o motor é correto e determinístico</div></div>
    <div class="tile"><div class="n">20</div><div class="l">Empates no topo</div><div class="s">15,5% — 19 resolvidos pela P7</div></div>
    <div class="tile"><div class="n down">38%</div><div class="l">Decididos por ≤1 ponto</div><div class="s">49 de 129 diagnósticos</div></div>
  </div>

  <h3>Quão sólido é cada diagnóstico?</h3>
  <div class="card">
    <div class="legend"><span>Margem = distância entre o 1º e o 2º perfil (de 8 pontos possíveis)</span></div>
    <div class="barrow"><span class="lab">0 · empate</span><div class="bar"><i class="r" style="width:69%"></i></div><span class="val">20</span></div>
    <div class="barrow"><span class="lab">1 ponto</span><div class="bar"><i class="r" style="width:100%"></i></div><span class="val">29</span></div>
    <div class="barrow"><span class="lab">2–3 pontos</span><div class="bar"><i style="width:97%"></i></div><span class="val">45</span></div>
    <div class="barrow"><span class="lab">4+ pontos</span><div class="bar"><i class="t" style="width:76%"></i></div><span class="val">35</span></div>
    <p style="font-size:13.5px;color:var(--muted);margin-top:10px">Em <b>49 dos 129 casos (38%)</b>, trocar uma única resposta mudaria o perfil entregue. E em <b>27%</b> o perfil vencedor teve 3 ou menos dos 8 pontos — ou seja, menos de 40% de concordância interna. O funil, porém, entrega o resultado com a mesma confiança absoluta em todos os casos: <i>“O SEU PERFIL PROCRASTINADOR É O X”</i>.</p>
  </div>

  <h3>As pessoas não são de um perfil só</h3>
  <div class="card">
    <div class="barrow"><span class="lab">1 perfil (puro)</span><div class="bar"><i style="width:8%"></i></div><span class="val">4</span></div>
    <div class="barrow"><span class="lab">2 perfis</span><div class="bar"><i style="width:39%"></i></div><span class="val">19</span></div>
    <div class="barrow"><span class="lab">3 perfis</span><div class="bar"><i style="width:100%"></i></div><span class="val">49</span></div>
    <div class="barrow"><span class="lab">4 perfis</span><div class="bar"><i style="width:96%"></i></div><span class="val">47</span></div>
    <div class="barrow"><span class="lab">5 perfis (todos)</span><div class="bar"><i class="r" style="width:20%"></i></div><span class="val">10</span></div>
    <p style="font-size:13.5px;color:var(--muted);margin-top:10px"><b>44% marcam 4 ou 5 perfis diferentes</b> nas 7 perguntas; só 3% são “puros”. Cientificamente isso é o esperado — a própria base do projeto rejeita a ideia de tipos puros de procrastinador. Mas cria uma tensão real com a promessa do funil, que trata o perfil como identidade única.</p>
  </div>

  <div class="callout bad">🎲 <b>O viés que invalida a leitura do ranking de perfis.</b> A ordem das opções é <b>fixa nas 7 perguntas</b>: Perfeccionista sempre em 1º, Evitativo 2º, Sobrecarregado 3º, Indeciso 4º, Impulsivo 5º. E as escolhas caem exatamente conforme a posição — <b>26,1% · 22,3% · 19,4% · 15,7%</b> (com o repique de 16,5% no último, típico de efeito de recência). Esse gradiente é a assinatura clássica de viés de posição em questionários. <b>Enquanto a ordem não for embaralhada, não dá para afirmar que o Perfeccionista é o perfil mais comum do público</b> — ele pode ser apenas o primeiro da lista. A correção é uma linha de código e transforma o quiz num instrumento confiável.</div>

  <div class="callout">🔧 <b>Um detalhe fino do desempate.</b> Quando o topo empata e a P7 não está entre os empatados, o código devolve o primeiro perfil na ordem em que foram declarados — ou seja, o desempate vira alfabeto de código, não diagnóstico. Aconteceu <b>1 vez em 129</b> (o Evitativo levou do Sobrecarregado), então na prática o peso 2 da P7 está protegendo bem. Vale corrigir mesmo assim: com mais volume, isso escala.</div>
</section>

<section>
  <div class="eyebrow">§5 · Diagnóstico e venda</div>
  <h2>Diagnóstico frágil parece vender menos — e isso é testável</h2>
  <div class="grid g2" style="margin-top:12px">
    <div class="card">
      <h3 style="margin-top:0">Diagnóstico sólido</h3>
      <div class="tile" style="border:0;padding:0"><div class="n up">15,8%</div><div class="l">conversão em compra</div><div class="s">101 leads · 16 compradores · R$ 1.461,90</div></div>
    </div>
    <div class="card">
      <h3 style="margin-top:0">Diagnóstico frágil <span class="dim" style="font-weight:400;font-size:13px">(empate no topo ou marcou os 5 perfis)</span></h3>
      <div class="tile" style="border:0;padding:0"><div class="n down">3,6%</div><div class="l">conversão em compra</div><div class="s">28 leads · 1 comprador · R$ 69,80</div></div>
    </div>
  </div>
  <p style="margin-top:14px"><b>A diferença é de 4,4×</b> e o mecanismo faz sentido: um perfil decidido no desempate descreve a pessoa pela metade, a revelação não dá aquele “nossa, é exatamente eu”, e a VSL que vem depois fala de uma dor que não é bem a dela. <b>Mas honestidade estatística:</b> com 28 leads e 1 comprador, há cerca de <b>10% de chance de esse resultado ser sorte</b> — não passa no crivo formal. É uma hipótese de alto valor com custo de teste baixo, não um fato consolidado.</p>
  <p><b>Reforço independente:</b> olhando pela força do perfil vencedor, o padrão se repete — diagnóstico fraco (≤3 de 8 pontos) converte <b>8,6%</b>, médio (4–5) <b>14,9%</b> e forte (6–8) <b>14,8%</b>. E os 10 leads que marcaram os cinco perfis não geraram <b>nenhuma</b> venda. Dois cortes diferentes apontando na mesma direção aumentam a confiança, mesmo sem significância formal.</p>
  <div class="callout good">💡 <b>O que fazer com isso hoje:</b> quando a margem for ≤1, a tela de revelação pode dizer <i>“seu padrão dominante é X, com forte presença de Y”</i> — o diagnóstico fica mais verdadeiro, mais impressionante e passa a cobrir dois gatilhos na VSL em vez de um. É melhoria de produto <b>e</b> o teste da hipótese ao mesmo tempo.</div>
</section>

<section>
  <div class="eyebrow">§6 · Quem responde e quem compra</div>
  <h2>Perfil, vice-perfil e demografia</h2>
  <div class="grid g2" style="margin-top:12px">
    <div class="card">
      <h3 style="margin-top:0">Conversão por perfil diagnosticado</h3>
      <div class="barrow"><span class="lab">🌀 Sobrecarregado</span><div class="bar"><i style="width:100%"></i></div><span class="val">19,0%</span></div>
      <div class="barrow"><span class="lab">⚡ Impulsivo</span><div class="bar"><i style="width:84%"></i></div><span class="val">16,0%</span></div>
      <div class="barrow"><span class="lab">🎯 Perfeccionista</span><div class="bar"><i style="width:75%"></i></div><span class="val">14,3%</span></div>
      <div class="barrow"><span class="lab">🚪 Evitativo</span><div class="bar"><i style="width:56%"></i></div><span class="val">10,7%</span></div>
      <div class="barrow"><span class="lab">🧭 Indeciso</span><div class="bar"><i class="r" style="width:26%"></i></div><span class="val">5,0%</span></div>
    </div>
    <div class="card">
      <h3 style="margin-top:0">Conversão pelo <i>vice</i>-perfil (o 2º colocado)</h3>
      <div class="barrow"><span class="lab">🧭 Indeciso em 2º</span><div class="bar"><i class="t" style="width:100%"></i></div><span class="val">30,8%</span></div>
      <div class="barrow"><span class="lab">🌀 Sobrecarregado em 2º</span><div class="bar"><i class="t" style="width:46%"></i></div><span class="val">14,3%</span></div>
      <div class="barrow"><span class="lab">⚡ Impulsivo em 2º</span><div class="bar"><i class="t" style="width:36%"></i></div><span class="val">11,1%</span></div>
      <div class="barrow"><span class="lab">🚪 Evitativo em 2º</span><div class="bar"><i class="t" style="width:35%"></i></div><span class="val">10,7%</span></div>
      <div class="barrow"><span class="lab">🎯 Perfeccionista em 2º</span><div class="bar"><i class="t" style="width:31%"></i></div><span class="val">9,5%</span></div>
    </div>
  </div>
  <div class="callout">🔄 <b>A inversão do Indeciso.</b> Ter o Indeciso como perfil <b>principal</b> é o pior sinal comercial do funil (5,0%, o menor de todos). Ter o Indeciso em <b>segundo</b> é o melhor (30,8% e R$ 743,70 — 4 compradores em 13 leads). Faz sentido comportamental: quem é <i>só</i> indeciso não decide comprar; quem tem um padrão dominante <i>com um tempero</i> de indecisão é alguém que reconhece o problema e busca alguém que decida por ele. <b>São 13 leads — é um sinal, não uma lei.</b> Mas se sustentar, é um critério de priorização de fila para o comercial.</div>

  <div class="grid g3" style="margin-top:16px">
    <div class="card">
      <h3 style="margin-top:0;font-size:14px">Idade</h3>
      <div class="barrow"><span class="lab">55 ou mais</span><div class="bar"><i class="t" style="width:100%"></i></div><span class="val">17,6%</span></div>
      <div class="barrow"><span class="lab">35 a 44</span><div class="bar"><i class="t" style="width:91%"></i></div><span class="val">16,0%</span></div>
      <div class="barrow"><span class="lab">45 a 54</span><div class="bar"><i class="t" style="width:71%"></i></div><span class="val">12,5%</span></div>
      <div class="barrow"><span class="lab">25 a 34</span><div class="bar"><i class="t" style="width:45%"></i></div><span class="val">8,0%</span></div>
      <div class="barrow"><span class="lab">18 a 24</span><div class="bar"><i class="t" style="width:44%"></i></div><span class="val">7,7%</span></div>
    </div>
    <div class="card">
      <h3 style="margin-top:0;font-size:14px">Gênero</h3>
      <div class="barrow"><span class="lab">Feminino (66)</span><div class="bar"><i style="width:100%"></i></div><span class="val">15,2%</span></div>
      <div class="barrow"><span class="lab">Masculino (61)</span><div class="bar"><i style="width:76%"></i></div><span class="val">11,5%</span></div>
      <p style="font-size:13px;color:var(--muted);margin-top:10px">A base é quase 50/50, mas a receita não: <b>R$ 1.142,60 de mulheres contra R$ 389,10 de homens</b> — quase 3×. Elas compram mais e compram mais caro.</p>
    </div>
    <div class="card">
      <h3 style="margin-top:0;font-size:14px">Placement</h3>
      <div class="barrow"><span class="lab">IG Stories (12)</span><div class="bar"><i class="g" style="width:100%"></i></div><span class="val">25,0%</span></div>
      <div class="barrow"><span class="lab">FB Reels (9)</span><div class="bar"><i class="g" style="width:89%"></i></div><span class="val">22,2%</span></div>
      <div class="barrow"><span class="lab">IG Feed (32)</span><div class="bar"><i class="g" style="width:75%"></i></div><span class="val">18,8%</span></div>
      <div class="barrow"><span class="lab">IG Reels (53)</span><div class="bar"><i class="r" style="width:38%"></i></div><span class="val">9,4%</span></div>
      <p style="font-size:13px;color:var(--muted);margin-top:10px"><b>O Reels traz o maior volume de leads (53) e converte pela metade do Feed.</b> Vale testar separar o Reels em conjunto próprio para não deixá-lo canibalizar a verba dos placements que vendem.</p>
    </div>
  </div>
</section>

<section>
  <div class="eyebrow">§7 · Quiz × anúncio</div>
  <h2>O mesmo quiz rende coisas diferentes dependendo do anúncio</h2>
  <p class="lede">A página é idêntica para todo mundo. Então toda diferença abaixo é <b>qualidade do tráfego</b>, não da página. “Terminou as perguntas” = dos que clicaram INICIAR, quantos chegaram ao fim da P7.</p>
  <div class="tblwrap" style="margin-top:12px">
  <table>
    <thead><tr><th>Anúncio</th><th class="num">Sessões</th><th class="num">Start</th><th class="num">Terminou as perguntas</th><th class="num">Passou o WhatsApp</th><th class="num">Leads</th><th class="num">Sessão → lead</th></tr></thead>
    <tbody>
      <tr class="champ"><td class="adname">AD 03 🏆</td><td class="num">188</td><td class="num up">36,7%</td><td class="num">68,1%</td><td class="num up">89,1%</td><td class="num"><b>41</b></td><td class="num up">21,8%</td></tr>
      <tr class="champ"><td class="adname">AD 06</td><td class="num">134</td><td class="num up">33,6%</td><td class="num">66,7%</td><td class="num up">90,0%</td><td class="num">27</td><td class="num up">20,1%</td></tr>
      <tr><td class="adname">link_in_bio 🌱</td><td class="num">60</td><td class="num up">35,0%</td><td class="num up">76,2%</td><td class="num">81,3%</td><td class="num">13</td><td class="num up">21,7%</td></tr>
      <tr><td class="adname">AD 09</td><td class="num">51</td><td class="num">25,5%</td><td class="num up">76,9%</td><td class="num">80,0%</td><td class="num">8</td><td class="num">15,7%</td></tr>
      <tr><td class="adname">AD 08</td><td class="num">129</td><td class="num">24,0%</td><td class="num down">51,6%</td><td class="num down">68,8%</td><td class="num">11</td><td class="num">8,5%</td></tr>
      <tr><td class="adname">AD 05</td><td class="num">62</td><td class="num">21,0%</td><td class="num down">46,2%</td><td class="num">100%</td><td class="num">6</td><td class="num">9,7%</td></tr>
      <tr><td class="adname">AD 01</td><td class="num">247</td><td class="num down">13,0%</td><td class="num">68,8%</td><td class="num down">68,2%</td><td class="num">15</td><td class="num down">6,1%</td></tr>
      <tr><td class="adname">AD 02</td><td class="num">123</td><td class="num down">12,2%</td><td class="num down">53,3%</td><td class="num">100%</td><td class="num">8</td><td class="num down">6,5%</td></tr>
      <tr><td class="adname">AD 07</td><td class="num">48</td><td class="num down">12,5%</td><td class="num down">33,3%</td><td class="num">100%</td><td class="num">2</td><td class="num down">4,2%</td></tr>
      <tr><td class="adname">AD 04</td><td class="num">23</td><td class="num down">8,7%</td><td class="num">50,0%</td><td class="num">100%</td><td class="num">1</td><td class="num down">4,3%</td></tr>
      <tr class="alerta"><td class="adname">AD 02 · Cópia Adv.</td><td class="num">66</td><td class="num down">13,6%</td><td class="num down">33,3%</td><td class="num down">66,7%</td><td class="num">2</td><td class="num down">3,0%</td></tr>
      <tr class="alerta"><td class="adname">AD 01 · Cópia Adv.</td><td class="num">88</td><td class="num down">4,5%</td><td class="num down">25,0%</td><td class="num">100%</td><td class="num">1</td><td class="num down">1,1%</td></tr>
    </tbody>
  </table>
  </div>
  <div class="callout" style="margin-top:14px">🧠 <b>Três leituras que só aparecem aqui.</b><br>
  <b>1. O AD 08 é o retrato da “atenção sem intenção”.</b> Ele tem o melhor hook do funil (36%), start razoável (24%) — e depois <b>metade de quem começa não termina as perguntas</b> (51,6%) e um terço trava no WhatsApp. Ele prende o olho e não entrega intenção. O Relatório 01 já suspeitava; aqui está a prova de dentro da página.<br>
  <b>2. O orgânico é o melhor tráfego que existe.</b> O <code>link_in_bio</code> tem a <b>maior taxa de conclusão das perguntas (76,2%)</b> e converte sessão→lead igual ao AD 03 — de graça. Vale tratar o conteúdo do Kenji como canal, não como acessório.<br>
  <b>3. Cópia Advantage destrói o funil por dentro, não só na entrada.</b> Além do start de 4,5%, quem entra <b>não termina</b> (25%). O enhancement do Meta não só quebra a congruência da promessa: entrega gente que não tinha intenção nenhuma.</div>
</section>

<section>
  <div class="eyebrow">§8 · Tempo, hora e dia</div>
  <h2>Quando o quiz é respondido — e o buraco da quarta-feira</h2>

  <div class="grid g3" style="margin-top:12px">
    <div class="tile"><div class="n">5min00</div><div class="l">Mediana pra completar</div><div class="s">p25 3min26 · p75 7min14</div></div>
    <div class="tile"><div class="n">15s</div><div class="l">Até desistir no nome</div><div class="s">decisão rápida, atrito imediato</div></div>
    <div class="tile"><div class="n">3min20</div><div class="l">Investidos até largar no WhatsApp</div><div class="s">o abandono mais caro do funil</div></div>
  </div>
  <div class="callout" style="margin-top:14px">⏳ <b>Expectativa × realidade.</b> A intro diz <i>“Responda 7 perguntas rápidas”</i>. A mediana real é <b>5 minutos</b>, e um quarto do público leva mais de <b>7 minutos</b>. Não é necessariamente ruim — 5 minutos investidos é comprometimento, e quem chega ao fim converte bem. Mas a promessa de “rápido” pode estar atraindo quem quer rápido e frustrando na metade. Vale testar a intro com uma expectativa honesta (“leva uns 4 minutos”) — costuma <i>subir</i> a conclusão, porque quem entra já entrou disposto.</div>

  <h3>Por hora do dia (Brasília)</h3>
  <div class="card">
    <div class="legend"><span><span class="sw" style="background:var(--teal)"></span>% das sessões daquela hora que viraram lead</span></div>
    <div class="barrow"><span class="lab">Manhã · 7h–12h</span><div class="bar"><i class="t" style="width:100%"></i></div><span class="val up">18,8%</span></div>
    <div class="barrow"><span class="lab">Noite · 19h–23h</span><div class="bar"><i class="t" style="width:68%"></i></div><span class="val">12,7%</span></div>
    <div class="barrow"><span class="lab">Tarde · 13h–18h</span><div class="bar"><i class="t" style="width:57%"></i></div><span class="val down">10,7%</span></div>
    <div class="barrow"><span class="lab">Madrugada · 0h–6h</span><div class="bar"><i class="t" style="width:56%"></i></div><span class="val down">10,6%</span></div>
    <p style="font-size:13.5px;color:var(--muted);margin-top:10px"><b>A manhã converte 76% melhor que a tarde</b> — e os melhores horários isolados são 11h (23,1%), 9h e 22h (20,3%) e 12h (20,5%). A tarde (13h–18h) recebe <b>448 sessões</b>, o maior bloco de tráfego, e é o que menos rende. Se o volume permitir, vale testar dayparting priorizando 7h–12h e o pico das 22h.</p>
  </div>

  <h3>A anomalia da quarta-feira</h3>
  <div class="tblwrap">
  <table>
    <thead><tr><th>Dia</th><th class="num">Sessões</th><th class="num">Iniciaram</th><th class="num">Leads</th><th class="num">Sessão → lead</th></tr></thead>
    <tbody>
      <tr><td>Segunda</td><td class="num">202</td><td class="num">50</td><td class="num">36</td><td class="num up">17,8%</td></tr>
      <tr><td>Terça</td><td class="num">182</td><td class="num">51</td><td class="num">30</td><td class="num up">16,5%</td></tr>
      <tr><td>Domingo</td><td class="num">206</td><td class="num">48</td><td class="num">33</td><td class="num up">16,0%</td></tr>
      <tr><td>Quinta</td><td class="num">139</td><td class="num">30</td><td class="num">20</td><td class="num">14,4%</td></tr>
      <tr><td>Sexta</td><td class="num">204</td><td class="num">46</td><td class="num">29</td><td class="num">14,2%</td></tr>
      <tr><td>Sábado</td><td class="num">201</td><td class="num">41</td><td class="num">22</td><td class="num">10,9%</td></tr>
      <tr class="alerta"><td><b>Quarta</b></td><td class="num"><b>245</b></td><td class="num down">28</td><td class="num down">12</td><td class="num down"><b>4,9%</b></td></tr>
    </tbody>
  </table>
  </div>
  <p style="margin-top:12px">Quarta teve <b>o maior volume de tráfego do período e um terço da conversão dos outros dias</b>. A pergunta óbvia é: quebrou alguma coisa na página? <b>Não.</b> Olhando anúncio por anúncio naquele dia:</p>
  <div class="grid g2" style="margin-top:10px">
    <div class="card">
      <h3 style="margin-top:0;font-size:14px">Start rate na quarta × nos outros dias</h3>
      <div class="barrow"><span class="lab">AD 06</span><div class="bar"><i class="r" style="width:8%"></i></div><span class="val down">4,3%</span></div>
      <div class="barrow"><span class="lab"><span class="dim">AD 06 · outros dias</span></span><div class="bar"><i class="t" style="width:100%"></i></div><span class="val up">50,8%</span></div>
      <div class="barrow"><span class="lab">AD 03</span><div class="bar"><i class="r" style="width:12%"></i></div><span class="val down">5,0%</span></div>
      <div class="barrow"><span class="lab"><span class="dim">AD 03 · outros dias</span></span><div class="bar"><i class="t" style="width:80%"></i></div><span class="val up">40,5%</span></div>
      <div class="barrow"><span class="lab">AD 08</span><div class="bar"><i class="r" style="width:10%"></i></div><span class="val down">3,3%</span></div>
      <div class="barrow"><span class="lab"><span class="dim">AD 08 · outros dias</span></span><div class="bar"><i class="t" style="width:62%"></i></div><span class="val">31,5%</span></div>
    </div>
    <div class="card">
      <h3 style="margin-top:0;font-size:14px">E o orgânico?</h3>
      <div class="barrow"><span class="lab">link_in_bio · quarta</span><div class="bar"><i class="t" style="width:100%"></i></div><span class="val up">40,0%</span></div>
      <div class="barrow"><span class="lab"><span class="dim">link_in_bio · outros dias</span></span><div class="bar"><i class="t" style="width:78%"></i></div><span class="val up">31,3%</span></div>
      <p style="font-size:13.5px;color:var(--muted);margin-top:12px"><b>Aqui está a prova.</b> Se a página tivesse quebrado, o orgânico teria caído junto. Ele não caiu — <b>subiu</b>. Todo o tráfego <i>pago</i> despencou ao mesmo tempo enquanto o orgânico passava normal. O problema foi a <b>entrega do Meta naquele dia</b>, não o funil.</p>
    </div>
  </div>
  <div class="callout bad">💸 <b>O custo estimado.</b> Se a quarta tivesse convertido como a média dos outros dias (15,0%), teria gerado <b>37 leads em vez de 12</b> — <b>25 leads perdidos</b>, ou cerca de <b>R$ 400</b> ao CPL médio do período. Suspeitos, em ordem: um placement de baixa qualidade tendo dominado a entrega (Audience Network / “Others”), reinício de aprendizado após edição em massa nas campanhas, ou um pico de tráfego incentivado. <b>Ação:</b> abrir o Gerenciador nesse dia por placement e conferir. Se for placement, é exclusão permanente; se for aprendizado, é regra de “não editar campanha no meio do voo”.</div>
</section>

<section>
  <div class="eyebrow">§9 · Plano de ação</div>
  <h2>O que mexer no quiz — em ordem de impacto</h2>
  <div class="card plan" style="margin-top:12px">
    <div class="item"><span class="prio p0">P0</span><p><b>Matar ou adiar a tela do nome.</b> É a correção de maior retorno por esforço do funil inteiro: <b>21,1% de abandono</b> numa tela que só serve pra personalização cosmética. Duas opções — (a) removê-la e pedir o nome junto do WhatsApp, no fim, quando a pessoa já está comprometida; (b) mantê-la mas <b>depois</b> da primeira pergunta, pra entregar valor antes de cobrar pedágio. Teste A/B direto, ganho estimado de <b>+22 leads</b> no mesmo volume.</p></div>
    <div class="item"><span class="prio p0">P0</span><p><b>Embaralhar a ordem das opções</b> (uma linha de código, com a ordem fixada por sessão pra não confundir quem volta). Hoje o gradiente 26,1% → 15,7% por posição impede qualquer conclusão sobre qual perfil realmente predomina — o que contamina a leitura de perfil no CRM, a escolha de VSL e a priorização do comercial. <b>Sem isso, todo dado de perfil tem uma dúvida embutida.</b></p></div>
    <div class="item"><span class="prio p0">P0</span><p><b>Investigar a quarta-feira no Gerenciador</b> (placement por dia). É o único achado com dinheiro já perdido e risco de repetição semanal.</p></div>
    <div class="item"><span class="prio p1">P1</span><p><b>Perfil primário + secundário quando a margem for ≤1</b> (38% dos casos). Muda a revelação para “padrão dominante X, com forte presença de Y”, deixa o diagnóstico mais verdadeiro e mais impressionante, abre dois gatilhos para a VSL — <b>e testa a hipótese de que diagnóstico frágil vende menos</b>, de graça.</p></div>
    <div class="item"><span class="prio p1">P1</span><p><b>Reescrever a P5 e as três opções mortas.</b> A P5 é a pergunta mais fraca (41,1% marcam a mesma coisa) e é ela que infla o Perfeccionista. Trocar a opção-ímã por uma frase específica do perfil, e reescrever P5·Indeciso, P3·Impulsivo e P2·Perfeccionista, que quase ninguém escolhe. Ganho: diagnóstico mais preciso sem custo de tela.</p></div>
    <div class="item"><span class="prio p1">P1</span><p><b>Encurtar as opções da P2</b> — a pergunta que mais espanta (8,1%), com as opções mais longas, logo no começo. E <b>reforço de segurança na tela do WhatsApp</b> (“seu resultado chega em seguida · sem spam”), onde se perde o lead mais caro do funil.</p></div>
    <div class="item"><span class="prio p2">P2</span><p><b>Instrumentar tempo-na-tela na intro.</b> Hoje não sabemos se quem não clica fica 2 segundos ou 2 minutos — e essa é a métrica que separa “anúncio trouxe gente errada” de “a tela não convenceu”. Sem ela, o maior gargalo do funil é otimizado no escuro.</p></div>
    <div class="item"><span class="prio p2">P2</span><p><b>Testar dayparting</b> (7h–12h + 22h) e <b>separar o Instagram Reels</b> em conjunto próprio — ele traz o maior volume de leads e converte metade do Feed.</p></div>
    <div class="item"><span class="prio p2">P2</span><p><b>Expectativa honesta na intro.</b> Trocar “7 perguntas rápidas” por algo como “leva uns 4 minutos” e medir. Costuma subir a conclusão, porque filtra na entrada em vez de frustrar no meio.</p></div>
  </div>
</section>

<section class="foot">
  <p><b>Método e ressalvas.</b> Fontes: tabela <code>sessions</code> (1.379 sessões com o passo máximo atingido e os timestamps de início e último avanço), as <b>903 respostas</b> e os scores dos 129 leads reais do CRM, e a Meta Marketing API para a leitura por anúncio. Leads de teste fora de tudo. <b>Duração</b> é medida entre o primeiro e o último evento de tela — para quem parou na intro ela é sempre zero por construção (só existe um evento), então essas sessões ficaram fora de qualquer estatística de tempo. O <b>funil é forward-only</b>: só conta a partir do deploy que ligou o tracking, e 154 sessões passaram da captura contra 129 leads reais no CRM — a diferença são os leads de teste, que percorrem o mesmo caminho, e o tráfego anterior ao tracking. <b>Poder discriminante</b> é a entropia normalizada das cinco opções (1,000 = perfeitamente equilibrada). <b>Amostras pequenas estão sinalizadas no texto</b>: o corte de diagnóstico frágil (n=28, ~10% de chance de ser sorte), o vice-perfil Indeciso (n=13) e os placements de menor volume não são conclusões fechadas — são hipóteses priorizadas por mecanismo plausível e custo de teste baixo. O <b>viés de posição</b> é inferido do gradiente por posição com ordem fixa; só um teste com ordem embaralhada pode separá-lo da prevalência real. Apurado em 28/jul/2026, mesmo snapshot do Relatório 01 v2 · Brainfy × Kenji Hirota.</p>
</section>

</div>
</body>
</html>`;
