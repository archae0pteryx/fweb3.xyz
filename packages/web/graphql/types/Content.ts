import { extendType, objectType, nonNull, stringArg } from 'nexus'
import { OpenaiService } from '../../lib/openai.service'

export const Content = objectType({
  name: 'Content',
  definition(t) {
    t.string('id')
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
    t.field('requestContent', {
      type: 'Content',
      args: {
        type: nonNull(stringArg()),
      },
      resolve: OpenaiService.requestConent,
    }),
      t.nonNull.list.field('allContent', {
        type: 'Content',
        resolve: OpenaiService.all,
      })
  },
})
