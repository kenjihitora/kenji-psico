// GET /api/health — diagnóstico temporário do banco (não expõe segredos, só nomes/erros).
const { sql } = require('../lib/util');

module.exports = async (req, res) => {
  const hasDbUrl = !!(process.env.DATABASE_URL || process.env.POSTGRES_URL);
  // nomes (não valores) de variáveis relacionadas a banco, pra detectar mismatch de nome
  const dbEnvKeys = Object.keys(process.env).filter(k => /DATABASE|POSTGRES|NEON|^PG/i.test(k)).sort();
  let dbOk = false, dbError = null;
  try {
    if (!sql) throw new Error('cliente sql não inicializado (DATABASE_URL/POSTGRES_URL ausente)');
    await sql`SELECT 1 AS ok`;
    dbOk = true;
  } catch (e) {
    dbError = String(e && e.message ? e.message : e);
  }
  res.status(200).json({ hasDbUrl, dbEnvKeys, dbOk, dbError });
};
