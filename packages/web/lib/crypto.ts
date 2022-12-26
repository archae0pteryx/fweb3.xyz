import CryptoJS from 'crypto-js'

export function createUserToken(address: string) {
  const b = Buffer.from(address, 'base64').toString()
  return pbkdf2(b)
}

export function validateToken(address: string, token: string, salt = process.env.NEXT_PUBLIC_PBKDF2_SALT) {
  const b = Buffer.from(address, 'base64').toString()
  return pbkdf2(b, salt)[0] === token
}

export function pbkdf2(str: string, salt?: string) {
  const saltToUse = process.env.NEXT_PUBLIC_PBKDF2_SALT || CryptoJS.lib.WordArray.random(128 / 8).toString()
  return [CryptoJS.PBKDF2(str, saltToUse, { keySize: 256 / 32 }).toString(), salt]
}
