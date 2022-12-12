import { Context } from '../graphql/context'
import { handlePrismaError, UsersEntity } from './users.entity'
import { sendVerificationEmail } from './mailer'
import jwt from 'jsonwebtoken'

export class UsersQueries {
  static all = `
    allUsers: [User!]!
  `
  static find = `
    findUser(address: String!): User
  `
}

export class UsersService {
  static async all(_parent: any, _args: any, _ctx: Context) {
    return await UsersEntity.findMany()
  }

  static async find(_parent: any, args: any, _ctx: Context) {
    return await UsersEntity.find(args.address)
  }

  static async create(_parent: any, args: any, _ctx: Context) {
    try {
      const createRes = await UsersEntity.create(args.address, args.email)
      const sesMailResponse = await sendVerificationEmail(args.address, args.email)
      console.log({ sesMailResponse })
      return createRes
    } catch (err: any) {
      handlePrismaError(err)
    }
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
