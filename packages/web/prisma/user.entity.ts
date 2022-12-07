import { Prisma, PrismaClient } from '@prisma/client'
import { DelegateArgs, DelegateReturnTypes, PrismaRepo } from './interfaces'

type UserDelegate = Prisma.UserDelegate<unknown>

export class Users extends PrismaRepo<UserDelegate, DelegateArgs<UserDelegate>, DelegateReturnTypes<UserDelegate>> {
  constructor() {
    super(
      new PrismaClient({
        log: ['query', 'info', 'warn'],
      }).user
    )
  }
  async find(address: string) {
    return this.findUnique({
      where: {
        address,
      },
    })
  }
  async disable(address: string) {
    return this.update({
      where: {
        address,
      },
      data: {
        disabled: true,
      },
    })
  }
  async verify(address: string) {
    return this.update({
      where: {
        address,
      },
      data: {
        verified: true,
      },
    })
  }
}
