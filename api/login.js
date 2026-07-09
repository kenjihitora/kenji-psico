// POST /api/login — valida a senha do admin e devolve um cookie de sessão assinado.
const { sign, passwordOk, readBody, SECRET } = require('../lib/util');

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ error: 'method' }); return; }
  if (!SECRET || !process.env.ADMIN_PASSWORD) {
    res.status(500).json({ error: 'Configure ADMIN_PASSWORD e SESSION_SECRET nas variáveis de ambiente da Vercel.' });
    return;
  }
  const b = await readBody(req);
  if (!passwordOk(b.password)) { res.status(401).json({ error: 'Senha incorreta.' }); return; }
  const token = sign({ exp: Date.now() + 1000 * 60 * 60 * 24 * 7 }); // 7 dias
  res.setHeader('Set-Cookie', `admin_session=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${60 * 60 * 24 * 7}`);
  res.status(200).json({ ok: true });
};
