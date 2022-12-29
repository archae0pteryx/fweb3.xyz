import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'

const JWT_SECRET = process.env.JWT_SECRET || ''

const COOKIE_NAME = '__fweb3'
const COOKIE_VALUE = 'monster'

export function createSessionCookie() {
  const token = signJwt(COOKIE_VALUE, '7days')
  Cookies.set(COOKIE_NAME, token, { expires: 7 })
}

export function signJwt(incoming: string, expiresIn = '10m') {
  if (!JWT_SECRET) {
    throw new Error('jwt secret error')
  }
  const token = jwt.sign({ secret: incoming }, JWT_SECRET, { expiresIn })
  return token
}

export function verifyJwt(token: string) {
  const jwtSecret = process.env.JWT_SECRET || ''
  return jwt.verify(token, jwtSecret)
}

export function validateSessionCookie(cookie: string) {
  try {
    const d = verifyJwt(cookie) as any
    const b = d.secret
    return COOKIE_VALUE === b
  } catch (err: any) {
    console.log(err.message)
    return false
  }
}

export function createUserToken(address: string) {
  const b = Buffer.from(address, 'base64').toString()
  return pbkdf2(b)
}

export function validateToken(address: string, token: string, salt: string) {
  const b = Buffer.from(address, 'base64').toString()
  return pbkdf2(b, salt)[0] === token
}

export function pbkdf2(str: string, salt?: string) {
  const saltToUse = salt || CryptoJS.lib.WordArray.random(128 / 8).toString()
  return [CryptoJS.PBKDF2(str, saltToUse, { keySize: 256 / 32 }).toString(), saltToUse]
}

export function invalidateSession() {
  Cookies.remove(COOKIE_NAME)
}
