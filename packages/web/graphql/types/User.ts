import { objectType, extendType, stringArg, nonNull } from 'nexus'
import { UsersService } from '../../lib/users.service'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id')
    t.nonNull.string('address')
    t.string('gameAddress')
    t.string('email')
    t.string('verified')
    t.string('disabled')
    t.string('discord')
    t.string('role')
    t.string('createdAt')
    t.string('updatedAt')
  },
})

export const UsersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('allUsers', {
      type: 'User',
      resolve: UsersService.all,
    }),
      t.field('findUser', {
        type: 'User',
        args: {
          address: nonNull(stringArg()),
        },
        resolve: UsersService.find,
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
        email: nonNull(stringArg()),
      },
      resolve: UsersService.create,
    })
  },
})
