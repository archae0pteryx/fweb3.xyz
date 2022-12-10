import { objectType, extendType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id')
    t.string('address')
    t.string('gameAddress')
  },
})


export const UsersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('user', {
      type: 'User',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.user.findMany()
      },
    })
  },
})
