import { extendType, objectType, nonNull, inputObjectType, list, stringArg } from 'nexus'
import { ContentService } from '../../lib/content.service'

export const Content = objectType({
  name: 'Content',
  definition(t) {
    t.string('id')
    t.string('prompt')
    t.string('title')
    t.string('html')
    t.string('type')
    t.boolean('cached')
    t.string('createdAt')
    t.string('updatedAt')
  },
})

export const PromptInputType = inputObjectType({
  name: 'PromptInputType',
  definition(t) {
    t.string('title')
    t.string('prompt')
    t.string('type')
  },
})

export const ContentQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('findContent', {
      type: list('Content'),
      args: {
        types: nonNull(list(stringArg())),
      },
      resolve: ContentService.findContent,
    })
  },
})

export const ContentMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('requestContent', {
      type: list('Content'),
      args: {
        prompts: nonNull(list(PromptInputType)),
      },
      resolve: ContentService.requestConent,
    })
  },
})
