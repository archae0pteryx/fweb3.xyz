import { ContentEntity } from './content.entity'
import { Context } from '../../graphql/context'
import { GraphQLError } from 'graphql'
import { OpenAI } from '../openai/openai.service'
import { PrismaClient } from '@prisma/client'

export interface IPromptParams {
  type: string
  title: string
  prompt: string
  cached: boolean
}

const OPENAI_TIMEOUT = 1000 * 60 * 60

export class ContentService {
  static async latest(_root: any, _args: any, ctx: Context) {
    const res = await ContentEntity.allLatest(ctx.prisma)
    return res
  }

  static async create(_root: any, { type, prompt, title }: any, ctx: Context) {
    const html = await OpenAI.fetchFormattedCompletion(prompt)
    const res = await ContentEntity.create(ctx.prisma, { prompt, type, title, html })
    return res
  }

  static async requestConent(_root: any, args: any, ctx: Context) {
    const { types, type } = args

    if (type) {
      return await ContentService.requestOne(ctx, type)
    }

    return await ContentEntity.findMultipleTypes(ctx.prisma, types)
  }

  static async requestOne({ prisma, features }: Context, type: string) {
    console.log(`requesting: ${type}`)

    const found = await ContentEntity.findByType(prisma, type)
    if (!found || !found.prompt) {
      throw new GraphQLError('No content found for this type')
    }

    const featureEnabled = features?.['use_openai'] || false

    const { updatedAt } = found

    const updatedInt = updatedAt.getTime()
    const now = new Date().getTime()

    const shouldFetch = updatedInt + OPENAI_TIMEOUT > now

    if (shouldFetch && featureEnabled) {
      console.log('fetching from openai')
      return await ContentService.fetchCompletionAndUpdate(prisma, found)
    }
    console.log('using cached content')
    return found
  }

  static async findByType(_root: any, args: any, _ctx: Context) {
    const { type } = args
    return await ContentEntity.findByType(prisma, type)
  }

  static async fetchCompletionAndUpdate(prisma: PrismaClient, found: any) {
    if (!found.prompt) {
      throw new GraphQLError('No prompt found for this type')
    }
    const html = await OpenAI.fetchFormattedCompletion(found.prompt)
    const { id, ...updatedRecord } = found
    const record = await ContentEntity.update(prisma, { ...updatedRecord, html })
    return record
  }
}
