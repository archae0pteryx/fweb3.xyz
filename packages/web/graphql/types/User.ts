import { objectType, extendType, stringArg, nonNull, inputObjectType } from 'nexus'
import { UsersService } from '../../lib/users.service'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id')
    t.string('address')
    t.string('emailMessageId')
    t.string('emailSentAt')
    t.string('token')
    t.string('salt')
    t.boolean('verified')
    t.boolean('disabled')
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

export const UserInputType = inputObjectType({
  name: 'UserInputType',
  definition(t) {
    t.string('address')
    t.string('emailMessageId')
    t.string('emailSentAt')
    t.string('token')
    t.string('salt')
    t.string('discord')
    t.string('role')
    t.boolean('verified')
    t.boolean('disabled')
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
    }),
      t.field('updateUser', {
        type: 'User',
        args: {
          data: UserInputType,
        },
        resolve: UsersService.update,
      })
  },
})
