import { extendType, objectType, nonNull, stringArg, inputObjectType, list } from 'nexus'
import { ContentService } from '../../lib/content.service'

export const Content = objectType({
  name: 'Content',
  definition(t) {
    t.string('id')
    t.string('text')
    t.string('html')
    t.string('propmt')
    t.string('type')
    t.boolean('isDefault')
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
      resolve: ContentService.requestConent,
    })
  },
})

export const ContentInputType = inputObjectType({
  name: 'ContentInputType',
  definition(t) {
    t.nonNull.string('id')
    t.string('text')
    t.string('html')
    t.string('type')
    t.boolean('isDefault')
  },
})

export const ContentMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateContent', {
      type: 'User',
      args: {
        data: ContentInputType,
      },
      resolve: ContentService.update,
    })
  },
})
