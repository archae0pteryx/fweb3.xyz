import { GraphQLError } from 'graphql'

const PRISMA_ERROR_CODES: { [key: string]: string } = {
  P2002: 'UNIQUE_CONSTRAINT',
  P1008: 'TIMEOUT',
  P1000: 'AUTHENTICATION',
  P1001: 'UNREACHABLE',
  MISSING_CREATE_INFO: 'MISSING_CREATE_INFO',
}

export const USER_MESSAGE: { [key: string]: string } = {
  UNIQUE_CONSTRAINT: 'User already exists!',
  TIMEOUT: 'Database timeout',
  AUTHENTICATION: 'Database authentication error',
  UNREACHABLE: 'Database unreachable',
  UNKNOWN: 'Unknown database error',
  MISSING_CREATE_INFO: 'Missing info!',
}

// export function handlePrismaError(err: any, where = 'generic', ret = null) {
//   console.error(`prisma error [${where}]`, err.message)
//   // const { code } = err
//   // if (err.message.includes('Expected Iterable')) {
//   //   throw new GraphQLError('Expected Iterable', {
//   //     extensions: {
//   //       code: 'POTENTIALLY_NO_RECORDS',
//   //     },
//   //   })
//   // }
//   // const reason = PRISMA_ERROR_CODES[code] || ''
//   // const message = USER_MESSAGE[reason] || err.message || USER_MESSAGE.UNKNOWN
//   // if (!message) {
//   //   throw err
//   // }
//   // throw new GraphQLError(message, {
//   //   extensions: {
//   //     code,
//   //   },
//   // })
//   return ret
// }

export function handleError(err: any, where?: string) {
  console.log(`error [${where}]`, err.message)
  throw err
}
