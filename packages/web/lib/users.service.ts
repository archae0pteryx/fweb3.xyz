import jwt from 'jsonwebtoken'
import { Context } from '../graphql/context'
import { UsersEntity } from './users.entity'
import { sendVerificationEmail } from './mailer'

export class UsersService {
  static async all(_parent: any, _args: any, _ctx: Context) {
    return await UsersEntity.findMany()
  }

  static async find(_parent: any, args: any, _ctx: Context) {
    return await UsersEntity.find(args.address)
  }

  static async create(_parent: any, args: any, _ctx: Context) {
    const createRes = await UsersEntity.create(args.address, args.email)
    const emailRes = await sendVerificationEmail(args.address, args.email)
    console.log({ emailRes })
    return createRes
  }

  static async update(_parent: any, args: any, _ctx: Context) {
    return await UsersEntity.update(args.address, args.data)
  }

  static async verifyEmail(address: string, token: string) {
    const user = await UsersEntity.find(address)
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
    return await UsersEntity.update(decodedAddress, { verified: true })
  }
}
