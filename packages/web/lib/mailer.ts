import AWS from 'aws-sdk'
import jwt from 'jsonwebtoken'
import { createVerifyHtml } from './template';

export async function sendVerificationEmail(address: string, email: string) {
  const token = createJwtVerify(address)
  const res = await sendEmail(address, email, token)
  return res
}

export function createJwtVerify(address: string) {
  const secret = process.env.JWT_SECRET || ''
  if (!secret) {
    throw new Error('Error finding root jwt secret')
  }
  const token = jwt.sign({ address }, secret, { expiresIn: '10m' })
  return token
}

function _createSES() {
  AWS.config.update({ region: 'us-west-2' })
  AWS.config.credentials = new AWS.Credentials({
    accessKeyId: process.env.FWEB3_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.FWEB3_AWS_SECRET_ACCESS_KEY || '',
  })
  return new AWS.SES({ apiVersion: '2010-12-01' })
}

function buildVerifyEmailTemplate(address: string, token: string) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_API_URL}/verify?token=${token}&address=${address}`
  const html = createVerifyHtml(verifyUrl)
  return {
    subject: `Fweb3.xyz: Verify your email`,
    text: `Follow link to verify\n<${verifyUrl}`,
    html,
  }
}

export async function sendEmail(address: string, email: string, token: string) {
  const { subject, text, html } = buildVerifyEmailTemplate(address, token)
  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: html,
        },
        Text: {
          Charset: 'UTF-8',
          Data: text,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
    Source: process.env.SES_FROM_EMAIL || '',
    ReplyToAddresses: [process.env.SES_FROM_EMAIL || ''],
  }
  const sendPromise = _createSES().sendEmail(params).promise()
  await sendPromise
  return sendPromise
}
