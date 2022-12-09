import SchemaBuilder from '@pothos/core'
import { PrismaClient } from '@prisma/client'
import PrismaPlugin from '@pothos/plugin-prisma'

import type PrismaTypes from '@pothos/plugin-prisma/generated'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'],
})

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
    // exposeDescriptions: false,
    // filterConnectionTotalCount: true,
  },
})

builder.prismaObject('User', {
  name: 'User',
  fields: (t) => ({
    id: t.exposeID('id'),
    address: t.exposeString('address'),
    gameAddress: t.exposeString('gameAddress'),
  }),
})

builder.queryType({
  fields: (t) => ({
    users: t.prismaField({
      type: ['User'],
      resolve: async (query, root, args, ctx, info) =>
        prisma.user.findMany(),
    }),
  }),
})

export { builder }
