import { Context } from '../graphql/context'
import { createUserToken } from './crypto'
import { FeatureEntity } from './feature.entity'
import { Prisma } from '@prisma/client'
import { sendVerificationEmail } from './mail.service'
import { USER_MESSAGE } from './errors'
import { UsersEntity } from './users.entity'
import jwt from 'jsonwebtoken'

export class UsersService {
  static async all(_parent: any, _args: any, ctx: Context) {
    return await UsersEntity.findMany(ctx.prisma)
  }

  static async find(_parent: any, args: { address: string }, ctx: Context) {
    const { address } = args
    const found = await UsersEntity.find(ctx.prisma, { address })
    return found
  }

  static async create(_parent: any, args: any, ctx: Context) {
    const { email, address } = args

    if (!email || !address) {
      throw new Error(USER_MESSAGE.MISSING_CREATE_INFO)
    }

    const [token, salt] = createUserToken(address)

    const feature = await FeatureEntity.find(ctx.prisma, { flag: 'send_email' })
    if (feature?.value === 'false') {
      console.debug('Emailing disabled. creating verified user...')
      const createRes = await UsersEntity.create(ctx.prisma, { ...args, verified: true, role: 'PLAYER', token, salt })
      return createRes
    }

    const createRes = await UsersEntity.create(ctx.prisma, { address, token, salt, role: 'PLAYER' })
    const emailRes = await sendVerificationEmail(ctx.prisma, address, email)
    console.debug({ emailRes })
    return createRes
  }

  static async update(_parent: any, args: { data: Prisma.UserCreateInput }, ctx: Context) {
    return await UsersEntity.update(ctx.prisma, args.data)
  }

  static async verifyEmail({ prisma }: Context, { address, token }: { address: string; token: string }) {
    const feature = await FeatureEntity.find(prisma, { flag: 'send_email' })
    if (feature?.value !== 'true') {
      console.debug('Emailing disabled! Skipping email verification...')
      return await UsersEntity.update(prisma, { address, verified: true, role: 'PLAYER' })
    }

    console.debug('Emailing enabled! Verifying email...')
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
