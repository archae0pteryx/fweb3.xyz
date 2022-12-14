import { extendType, objectType } from 'nexus'

export const Content = objectType({
  name: 'Content',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('text')
    t.string('propmt')
    t.string('type')
    t.string('createdAt')
    t.string('updatedAt')
  },
})

export const ContentQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('allContent', {
      type: 'Content',
      resolve: (_root, _args, ctx) => {
        return ctx.prisma.user.findMany()
      },
    }),
      t.field('mostRecentContent', {
        type: 'Content',
        resolve: (_root, _args, ctx) => {
          return ctx.prisma.user.findLast()
        },
      })
  },
})
