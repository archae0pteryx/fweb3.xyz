import { extendType, objectType, nonNull, inputObjectType, list, stringArg } from 'nexus'
import { ContentService } from './content.service'

export const Content = objectType({
  name: 'Content',
  definition(t) {
    t.string('id')
    t.string('prompt')
    t.string('title')
    t.string('html')
    t.string('type')
    t.string('createdAt')
    t.string('updatedAt')
  },
})

export interface IContent {
  id?: string
  prompt?: string
  title?: string
  html?: string
  type: string
  createdAt?: string
  updatedAt?: string
}

export const ContentQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('requestContent', {
      type: 'Content',
      args: {
        type: stringArg(),
        types: list(stringArg()),
      },
      resolve: ContentService.requestConent,
    }),
      t.field('latestContent', {
        type: list('Content'),
        resolve: ContentService.latest,
      })
  },
})

export const ContentInputType = inputObjectType({
  name: 'ContentInputType',
  definition(t) {
    t.string('prompt')
    t.string('title')
    t.string('html')
    t.nonNull.string('type')
  },
})

export const ContentMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createContent', {
      type: 'Content',
      args: {
        data: nonNull('ContentInputType'),
      },
      resolve: ContentService.create,
    })
    // t.nonNull.field('updateContent', {
    //   type: 'Content',
    //   args: {
    //     id: nonNull(stringArg()),
    //     input: nonNull('ContentInputType'),
    //   },
    //   resolve: ContentService.update,
    // }),
    // t.nonNull.field('deleteContent', {
    //   type: 'Content',
    //   args: {
    //     id: nonNull(stringArg()),
    //   },
    //   resolve: ContentService.delete,
    // })
  },
})
