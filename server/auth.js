import crypto from 'crypto'

const base64url = (input) => Buffer.from(input).toString('base64url')
const secret = () => {
  const value = process.env.JWT_SECRET
  if (!value || value.length < 32) throw new Error('JWT_SECRET must be configured and at least 32 characters long.')
  return value
}

function signToken(payload) {
  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = base64url(JSON.stringify(payload))
  const data = `${header}.${body}`
  const sig = crypto.createHmac('sha256', secret()).update(data).digest('base64url')
  return `${data}.${sig}`
}

export function verifyToken(token) {
  try {
    const [header, body, signature] = String(token || '').split('.')
    if (!header || !body || !signature) return null
    const expected = crypto.createHmac('sha256', secret()).update(`${header}.${body}`).digest('base64url')
    const actualBuf = Buffer.from(signature)
    const expectedBuf = Buffer.from(expected)
    if (actualBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(actualBuf, expectedBuf)) return null
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'))
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}

export function issueAdminToken(username) {
  const now = Math.floor(Date.now() / 1000)
  return signToken({ sub: username, role: 'admin', iat: now, exp: now + 8 * 60 * 60 })
}

export function verifyAdminCredentials(username, password) {
  const expectedUser = process.env.ADMIN_USERNAME || 'admin'
  const expectedPassword = process.env.ADMIN_PASSWORD
  const actual = Buffer.from(password || '')
  const expected = Buffer.from(expectedPassword || '')
  return username === expectedUser && Boolean(expectedPassword) && actual.length === expected.length && crypto.timingSafeEqual(actual, expected)
}

export function requireJwtAdmin(req, res, next) {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  const payload = verifyToken(token)
  if (!payload || payload.role !== 'admin') {
    return res.status(401).json({ success: false, message: 'Authentication required.' })
  }
  req.admin = payload
  next()
}
