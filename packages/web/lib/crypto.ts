import CryptoJS from 'crypto-js'

export function createUserToken(address: string) {
  const b = Buffer.from(address, 'base64').toString()
  return pbkdf2(b)
}

export function pbkdf2(str: string) {
  const salt = CryptoJS.lib.WordArray.random(128 / 8).toString()
  return [CryptoJS.PBKDF2(str, salt, { keySize: 256 / 32 }).toString(), salt]
}
