import { objectType } from 'nexus'

export const FeatureFlag = objectType({
  name: 'User',
  definition(t) {
    t.string('id')
    t.string('flag')
    t.string('value')
    t.string('createdAt')
    t.string('updatedAt')
  },
})

// export const UsersQuery = extendType({
//   type: 'Query',
//   definition(t) {
//     t.nonNull.list.field('allUsers', {
//       type: 'User',
//       resolve: UsersService.all,
//     }),
//       t.field('findUser', {
//         type: 'User',
//         args: {
//           address: nonNull(stringArg()),
//         },
//         resolve: UsersService.find,
//       })
//   },
// })

// export const UserInputType = inputObjectType({
//   name: 'UserInputType',
//   definition(t) {
//     t.string('address')
//     t.string('email')
//     t.string('discord')
//     t.string('role')
//     t.boolean('verified')
//     t.boolean('disabled')
//   },
// })

// export const UserMutation = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.nonNull.field('createUser', {
//       type: 'User',
//       args: {
//         address: stringArg(),
//         email: nonNull(stringArg()),
//       },
//       resolve: UsersService.create,
//     }),
//       t.field('updateUser', {
//         type: 'User',
//         args: {
//           data: UserInputType,
//         },
//         resolve: UsersService.update,
//       })
//   },
// })
