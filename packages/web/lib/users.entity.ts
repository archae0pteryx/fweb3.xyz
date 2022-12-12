import { GraphQLError } from 'graphql'

const PRISMA_ERROR_CODES: { [key: string]: string } = {
  P2002: 'UNIQUE_CONSTRAINT',
  P1008: 'TIMEOUT',
  P1000: 'AUTHENTICATION',
  P1001: 'UNREACHABLE',
}

const USER_MESSAGE: { [key: string]: string } = {
  UNIQUE_CONSTRAINT: 'User already exists!',
  TIMEOUT: 'Database timeout',
  AUTHENTICATION: 'Database authentication error',
  UNREACHABLE: 'Database unreachable',
  UNKNOWN: 'Unknown database error',
}

export function handlePrismaError(err: any) {
  const { code } = err
  const reason = PRISMA_ERROR_CODES[code] || 'UNKNOWN'
  const message = USER_MESSAGE[reason]
  console.error('Prisma error:', JSON.stringify(err))
  throw new GraphQLError(message, {
    extensions: {
      code,
    },
  })
}

export class UsersEntity {
  static async findMany() {
    return await prisma.user.findMany()
  }
  static async find(address: string) {
    return await prisma.user.findUnique({
      where: {
        address,
      },
    })
  }

  static async create(address: string, email: string) {
    return await prisma.user.create({
      data: {
        address,
        email,
      },
    })
  }

  static async update(address: string, data: any) {
    return await prisma.user.update({
      where: {
        address,
      },
      data,
    })
  }
}
