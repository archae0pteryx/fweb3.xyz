import { Context } from '../graphql/context'
import { UsersEntity } from './users.entity'
import { Prisma } from '@prisma/client'
import { sendVerificationEmail } from './mailer'
import jwt from 'jsonwebtoken'
import { handlePrismaError } from './errors'

export class UsersService {
  static async all(_parent: any, _args: any, ctx: Context) {
    return await UsersEntity.findMany(ctx.prisma)
  }

  static async find(_parent: any, args: { address: string }, ctx: Context) {
    const { address } = args
    return await UsersEntity.find(ctx.prisma, { address })
  }

  static async create(_parent: any, args: Prisma.UserCreateInput, ctx: Context) {
    try {
      const { address, email } = args
      if (!email) {
        throw new Error('MISSING_INFO')
      }
      const createRes = await UsersEntity.create(ctx.prisma, args)
      const sesMailResponse = await sendVerificationEmail(address || '', email)
      console.log('email sent: ', { sesMailResponse })
      return createRes
    } catch (err: any) {
      handlePrismaError(err)
    }
  }

  static async update(_parent: any, args: { data: Prisma.UserCreateInput }, ctx: Context) {
    return await UsersEntity.update(ctx.prisma, args.data)
  }

  static async verifyEmail({ prisma }: Context, { address, token }: { address: string; token: string }) {
    console.log('herer', process.env.EMAIL_ENABLED)
    if (process.env.EMAIL_ENABLED !== 'true') {
      console.log('Emailing disabled! Skipping email verification...')
      return await UsersEntity.update(prisma, { address, verified: true, role: 'PLAYER' })
    }

    console.log('Emailing enabled! Verifying email...')
    const user = await UsersEntity.find(prisma, { address })
    if (!user) {
      throw new Error('User mismatch')
    }

    if (user.verified) {
      throw new Error('Already verified')
    }

    if (user.disabled) {
      throw new Error('User disabled')
    }

    const { address: decodedAddress } = jwt.verify(token, process.env.JWT_SECRET || '') as any
    if (decodedAddress !== address) {
      throw new Error('Token mismatch')
    }

    return await UsersEntity.update(prisma, { address, verified: true, role: 'PLAYER' })
  }
}
