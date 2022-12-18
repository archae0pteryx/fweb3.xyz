import AWS from 'aws-sdk'
import jwt from 'jsonwebtoken'
import { createVerifyHtml } from './template'

export async function sendVerificationEmail(email: string) {
  const token = createJwtVerify(email)
  const res = await sendEmail(email, token)
  return res
}

export function createJwtVerify(email: string) {
  const secret = process.env.JWT_SECRET || ''
  if (!secret) {
    throw new Error('Error finding root jwt secret')
  }
  const token = jwt.sign({ email }, secret, { expiresIn: '10m' })
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

function buildVerifyEmailTemplate(token: string) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_API_URL}/verify?token=${token}`
  const html = createVerifyHtml(verifyUrl)
  return {
    subject: `Fweb3.xyz: Verify your email`,
    text: `Follow link to verify\n<${verifyUrl}`,
    html,
  }
}

export async function sendEmail(email: string, token: string) {
  const { subject, text, html } = buildVerifyEmailTemplate(token)
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
    Source: 'noreply@fweb3.xyz',
    ReplyToAddresses: ['noreply@fweb3.xyz'],
  }
  const sendPromise = _createSES().sendEmail(params).promise()
  await sendPromise
  return sendPromise
}
