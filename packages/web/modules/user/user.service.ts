import { Context } from '../../graphql/context'
import { createUserToken, validateSessionCookie } from '../auth'
import { FeatureEntity } from '../feature/feature.entity'
import { sendVerificationEmail } from '../mail/mail.service'
import { USER_MESSAGE } from '../errors'
import { UsersEntity } from './user.entity'
import { verifyJwt } from '../auth'

export class UsersService {
  static async all(_parent: any, _args: any, ctx: Context) {
    return await UsersEntity.findMany(ctx.prisma)
  }

  static async find(_parent: any, args: { address: string }, ctx: Context) {
    const { address } = args
    console.log('FIND_USER CALLED')
    const found = await UsersEntity.find(ctx.prisma, { address })
    return found
  }

  static async create(_parent: any, args: any, ctx: Context) {
    const { email, address } = args

    if (!email || !address) {
      throw new Error(USER_MESSAGE.MISSING_CREATE_INFO)
    }

    const [token, salt] = createUserToken(address)
    const feature = await FeatureEntity.find(ctx.prisma, 'use_email')

    if (!feature?.value) {
      console.log('Emailing disabled. creating verified user...')
      const createRes = await UsersEntity.upsert(ctx.prisma, { address, verified: true, role: 'PLAYER', token, salt })
      return createRes
    }

    await UsersEntity.upsert(ctx.prisma, {
      address,
      token,
      salt,
      role: 'PLAYER',
    })

    const emailRes = await sendVerificationEmail(ctx.prisma, address, email)
    const updateRes = await UsersEntity.update(ctx.prisma, { address, ...emailRes })
    return updateRes
  }

  static async update(_parent: any, args: any, ctx: Context) {
    const { email, ...rest } = args.data
    return await UsersEntity.update(ctx.prisma, rest)
  }

  static async verifyEmail({ prisma }: Context, { address, token }: { address: string; token: string }) {
    const feature = await FeatureEntity.find(prisma, 'use_email')
    if (feature?.value) {
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
    const userToken = user.token
    const d = verifyJwt(token) as any

    if (userToken !== d.secret) {
      throw new Error('Token mismatch')
    }

    return await UsersEntity.update(prisma, { address, verified: true })
  }
}
