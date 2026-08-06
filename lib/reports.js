// Catálogo dos relatórios do painel (/admin → aba Relatórios).
// O HTML de cada um mora em lib/reports/*.js e só é servido a quem está logado (api/report.js).
// Pra adicionar um relatório novo: cria o módulo com o HTML e acrescenta uma entrada aqui (mais recente primeiro).
const REPORTS = [
  {
    id: '03',
    title: 'Performance do Período 2 — o que os R$ 897 compraram',
    desc: 'Performance 29/07 a 06/08',
    date: '2026-08-06',
    tags: ['R$ 897 investidos', '98 leads', 'CPL R$ 9,15', '3 criativos novos'],
    highlight: 'A "queda" de conversão é ilusão de maturidade — medido na mesma idade, o P2 empata com o P1. O AD 11 (variação do AD 03) assumiu com ROAS 1,72 e o AD 03 fadigou para 0,27.',
    html: require('./reports/r03-performance-p2'),
  },
  {
    id: '02',
    title: 'Raio-X do Quiz — telas, perguntas e o motor do diagnóstico',
    desc: 'Auditoria do quiz 17/07 a 28/07',
    date: '2026-07-28',
    tags: ['1.379 sessões', '18 telas', '903 respostas auditadas', '129 leads'],
    highlight: '96% da perda está em 3 telas (intro, nome e WhatsApp) — o quiz em si retém 80,7%. E a ordem fixa das opções cria viés de posição no diagnóstico.',
    html: require('./reports/r02-raio-x-quiz'),
  },
  {
    id: '01',
    title: 'Análise de criativos e vazamentos do funil',
    desc: 'Teste de criativos 17/07 a 28/07',
    date: '2026-07-28',
    tags: ['9 criativos', 'R$ 2.081 investidos', '129 leads', '17 vendas'],
    highlight: 'AD 03 é o criativo validado: 7 das 17 vendas e ROAS front 1,07 — já se paga sozinho. E o maior vazamento do funil é a tela de início, com 79% de perda.',
    html: require('./reports/r01-teste-criativos'),
  },
];

// metadados (sem o HTML) para a listagem
function list() {
  return REPORTS.map(({ html, ...meta }) => meta);
}
function find(id) {
  return REPORTS.find(r => r.id === String(id)) || null;
}

module.exports = { list, find };
