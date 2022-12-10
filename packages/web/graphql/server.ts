import { ApolloServer } from 'apollo-server-micro'
import { PrismaClient } from '@prisma/client'
import prisma from '../prisma/client'
import { BasicLogger } from './plugins'
import { schema } from './schema'

export type Context = {
  prisma: PrismaClient
}

export async function createContext({ req, res }: any): Promise<Context> {
  return {
    prisma,
  }
}

export const apolloServer = new ApolloServer({
  schema,
  plugins: [BasicLogger],
  context: createContext,
})
