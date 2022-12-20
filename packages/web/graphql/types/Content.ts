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

export const PromptInputType = inputObjectType({
  name: 'PromptInputType',
  definition(t) {
    t.string('prompt')
    t.string('type')
    t.boolean('cached')
  }
})

export const ContentMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('requestContent', {
      type: 'Content',
      args: {
        prompts: list(PromptInputType),
      },
      resolve: ContentService.requestConent,
    })
  }
})
