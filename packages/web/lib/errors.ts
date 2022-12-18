import { GraphQLError } from "graphql"

const PRISMA_ERROR_CODES: { [key: string]: string } = {
  P2002: 'UNIQUE_CONSTRAINT',
  P1008: 'TIMEOUT',
  P1000: 'AUTHENTICATION',
  P1001: 'UNREACHABLE',
  MISSING_CREATE_INFO: 'MISSING_CREATE_INFO',
}

const USER_MESSAGE: { [key: string]: string } = {
  UNIQUE_CONSTRAINT: 'User already exists!',
  TIMEOUT: 'Database timeout',
  AUTHENTICATION: 'Database authentication error',
  UNREACHABLE: 'Database unreachable',
  UNKNOWN: 'Unknown database error',
  MISSING_CREATE_INFO: 'Missing info!',
}

export function handlePrismaError(err: any) {
  console.log('handler', err)
  const { code } = err
  const reason = PRISMA_ERROR_CODES[code] || ''
  const message = USER_MESSAGE[reason]
  console.error('Prisma error:', JSON.stringify(err))
  if (!message) {
    throw err
  }
  throw new GraphQLError(message, {
    extensions: {
      code,
    },
  })
}
