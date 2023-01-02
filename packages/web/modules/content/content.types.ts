import { ContentService } from './content.service'
import { extendType, objectType, nonNull, list, stringArg } from 'nexus'

export const Content = objectType({
  name: 'Content',
  definition(t) {
    t.string('id')
    t.string('prompt')
    t.string('title')
    t.string('html')
    t.string('type')
    t.field('updatedAt', { type: nonNull('Date') })
    t.field('createdAt', { type: nonNull('Date') })
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

export interface IResponse {
  status: string
  message?: string
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
      t.nonNull.field('findContent', {
        type: 'Content',
        args: {
          type: nonNull(stringArg()),
        },
        resolve: ContentService.findByType,
      }),
      t.nonNull.field('allContent', {
        type: list('Content'),
        resolve: ContentService.latest,
      })
  },
})

export const ContentMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createContent', {
      type: 'Content',
      args: {
        prompt: nonNull(stringArg()),
        title: nonNull(stringArg()),
        type: nonNull(stringArg()),
      },
      resolve: ContentService.create,
    })
  },
})
