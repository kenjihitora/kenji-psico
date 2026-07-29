// Catálogo dos relatórios do painel (/admin → aba Relatórios).
// O HTML de cada um mora em lib/reports/*.js e só é servido a quem está logado (api/report.js).
// Pra adicionar um relatório novo: cria o módulo com o HTML e acrescenta uma entrada aqui (mais recente primeiro).
const REPORTS = [
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
