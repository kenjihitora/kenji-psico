// Helpers compartilhados: banco (Neon Postgres) + autenticação simples por senha.
const crypto = require('crypto');
const { neon } = require('@neondatabase/serverless');

// Acha a string de conexão. A integração Neon da Vercel prefixa as vars com o nome
// do store (ex.: kenji_psico_DATABASE_URL), então procuramos qualquer *_DATABASE_URL / *_POSTGRES_URL.
function findConn() {
  const env = process.env;
  if (env.DATABASE_URL) return env.DATABASE_URL;
  if (env.POSTGRES_URL) return env.POSTGRES_URL;
  const k = Object.keys(env).find(x => /(^|_)DATABASE_URL$/.test(x))
         || Object.keys(env).find(x => /(^|_)POSTGRES_URL$/.test(x));
  return k ? env[k] : undefined;
}
const CONN = findConn();
const sql = CONN ? neon(CONN) : null;

let _init = null;
async function ensureTable() {
  if (!sql) throw new Error('Banco não configurado (DATABASE_URL ausente)');
  if (_init) return _init;
  _init = (async () => {
    await sql`CREATE TABLE IF NOT EXISTS leads (
      id serial PRIMARY KEY,
      created_at timestamptz NOT NULL DEFAULT now(),
      name text,
      whatsapp text,
      gender text,
      age text,
      profile text,
      scores jsonb,
      answers jsonb,
      utm jsonb,
      status text NOT NULL DEFAULT 'novo'
    )`;
    // garante a coluna 'name' em bancos criados antes desta versão
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS name text`;
    // tag 💼 Comercial: venda fechada pelo time comercial (fora do checkout) + valor fechado
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS comercial boolean NOT NULL DEFAULT false`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS sale_value numeric`;
    // 🛒 compras atribuídas ao lead (LTV): [{name, value, at}]
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS purchases jsonb NOT NULL DEFAULT '[]'::jsonb`;
    // sessões: progresso no funil (para o painel de analytics)
    await sql`CREATE TABLE IF NOT EXISTS sessions (
      session_id text PRIMARY KEY,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now(),
      max_step int NOT NULL DEFAULT 0,
      utm jsonb
    )`;
  })();
  return _init;
}

// ---------- auth (cookie assinado por HMAC) ----------
const SECRET = process.env.SESSION_SECRET || '';

function sign(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const mac = crypto.createHmac('sha256', SECRET).update(body).digest('base64url');
  return body + '.' + mac;
}
function verify(token) {
  if (!token || !SECRET) return null;
  const parts = String(token).split('.');
  if (parts.length !== 2) return null;
  const [body, mac] = parts;
  const expected = crypto.createHmac('sha256', SECRET).update(body).digest('base64url');
  const a = Buffer.from(mac), b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const p = JSON.parse(Buffer.from(body, 'base64url').toString());
    if (p.exp && Date.now() > p.exp) return null;
    return p;
  } catch { return null; }
}
function parseCookies(req) {
  const out = {};
  (req.headers.cookie || '').split(';').forEach(c => {
    const i = c.indexOf('=');
    if (i > 0) out[c.slice(0, i).trim()] = decodeURIComponent(c.slice(i + 1).trim());
  });
  return out;
}
function isAuthed(req) {
  if (!SECRET) return false;
  return !!verify(parseCookies(req).admin_session);
}
function passwordOk(input) {
  const pw = process.env.ADMIN_PASSWORD || '';
  if (!pw || !input) return false;
  const a = Buffer.from(String(input)), b = Buffer.from(pw);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
async function readBody(req) {
  if (req.body) {
    if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch { return {}; } }
    return req.body;
  }
  return await new Promise(resolve => {
    let d = ''; req.on('data', c => d += c);
    req.on('end', () => { try { resolve(JSON.parse(d || '{}')); } catch { resolve({}); } });
  });
}

module.exports = { sql, ensureTable, sign, verify, isAuthed, passwordOk, parseCookies, readBody, SECRET };
