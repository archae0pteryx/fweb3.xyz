import { objectType, extendType, stringArg, nonNull } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id')
    t.string('address')
    t.string('gameAddress')
    t.string('createdAt')
    t.string('updatedAt')
    t.string('verified')
    t.string('enabled')
    t.string('role')
  },
})


export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('allUsers', {
      type: 'User',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.user.findMany()
      },
    }),
    t.nonNull.field('findUser', {
      type: 'User',
      args: {
        address: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.user.findUnique({
          where: { address: args.address },
        })
      }
    })
  },
})


export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createUser', {
      type: 'User',
      args: {
        address: nonNull(stringArg()),
      },

      resolve(_root, args, ctx) {
        return ctx.prisma.user.create({
          data: {
            address: args.address,
          },
        })
      },
    }),
    t.nonNull.field('updateUser', {
      type: 'User',
      args: {
        address: nonNull(stringArg()),
        gameAddress: stringArg(),
      },

      resolve(_root, args, ctx) {
        return ctx.prisma.user.update({
          where: { address: args.address },
          data: {
            gameAddress: args.gameAddress,
          },
        })
      }
    })
  },
})
