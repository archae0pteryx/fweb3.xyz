import { PrismaClient } from '@prisma/client'
import AWS from 'aws-sdk'
import { createVerifyHtml } from './template'
import { GraphQLError } from 'graphql'
import { API_ENDPOINT } from './constants'
import { signJwt } from './auth'

export async function sendVerificationEmail(prisma: PrismaClient, address: string, email: string) {
  try {
    const HOUR = 1000 * 60 * 60
    const anHourAgo = new Date(Date.now() - HOUR)

    const {
      token: userToken,
      disabled,
      emailSentAt = Date.now(),
    } = (await prisma.user.findUnique({ where: { address } })) || {}
    const allowed = !disabled && (emailSentAt === null || emailSentAt < anHourAgo)
    if (allowed && userToken) {
      const jwtToken = signJwt(userToken as string)
      const res = await sendEmail(address, email, jwtToken)
      return {
        emailMessageId: res.MessageId,
        emailSentAt: new Date(),
      }
    }
    throw new GraphQLError('Email verification is disabled or has been sent recently')
  } catch (err) {
    console.error(err)
    throw new GraphQLError('Error sending verification email')
  }
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
  const verifyUrl = `${API_ENDPOINT}/verify?token=${token}&address=${address}`
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
    Source: 'noreply@fweb3.xyz',
    ReplyToAddresses: ['noreply@fweb3.xyz'],
  }
  const sendPromise = _createSES().sendEmail(params).promise()
  await sendPromise
  return sendPromise
}
