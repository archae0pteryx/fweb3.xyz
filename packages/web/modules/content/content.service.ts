import { ContentEntity } from './content.entity'
import { Context } from '../../graphql/context'
import { GraphQLError } from 'graphql'
import { OpenAI } from '../openai/openai.service'
import { IContent } from './content.types'
import { PROMPTS } from '../openai/prompts'

export interface IPromptParams {
  type: string
  title: string
  prompt: string
  cached: boolean
}

export class ContentService {
  static async latest(_root: any, _args: any, ctx: Context) {
    const res = await ContentEntity.allLatest(ctx.prisma)
    return res
  }

  static async create(_root: any, { data }: { data: IContent }, ctx: Context) {
    if (!data.type) throw new GraphQLError('Type is required')

    if (data.prompt) {
      const html = await OpenAI.fetchFormattedCompletion(data.prompt)
      const res = await ContentEntity.update(ctx.prisma, { ...data, html })
      return res
    }

    return await ContentEntity.update(ctx.prisma, data)
  }

  static async requestConent(_root: any, args: any, ctx: Context) {
    const { types, type } = args
    if (type) {
      return await ContentService.requestOne(ctx, type)
    }
    return await ContentEntity.findAllByType(ctx.prisma, types)
  }

  static async requestOne(ctx: Context, type: string) {
    console.log(`requesting: ${type}`)
    const foundPrompt = PROMPTS[type] || null
    if (!foundPrompt) throw new GraphQLError(`Prompt not found for type: ${type}`)

    const featureEnabled = ctx.features['use_openai']

    if (featureEnabled) {
      const html = await OpenAI.fetchFormattedCompletion(foundPrompt.prompt)
      const record = await ContentEntity.update(ctx.prisma, { ...foundPrompt, type, html })
      return record
    }

    const latestContent = await ContentEntity.findByType(ctx.prisma, type)
    return latestContent
  }

  // static async fillContent(_root: any, _args: any, ctx: Context) {
  //   const contents = (await ContentEntity.allLatest(ctx.prisma)) || []
  //   const output = []
  //   if (!contents.length) return

  //   for (const content of contents) {
  //     if (!content.prompt) continue

  //     const html = await OpenAI.fetchFormattedCompletion(content.prompt)
  //     const updated = await ctx.prisma.content.update({
  //       where: {
  //         id: content.id,
  //       },
  //       data: {
  //         html,
  //       },
  //     })
  //     output.push(updated)
  //   }
  //   console.log('tasks filled!')
  //   return output
  // }
}
