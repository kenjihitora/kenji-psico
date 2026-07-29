// GET /api/reports — lista os relatórios disponíveis (só metadados). Protegido.
const { isAuthed } = require('../lib/util');
const { list } = require('../lib/reports');

module.exports = async (req, res) => {
  if (!isAuthed(req)) { res.status(401).json({ error: 'auth' }); return; }
  res.status(200).json({ reports: list() });
};
