import { ContentEntity } from './content.entity'
import { Context } from '../graphql/context'
import { FeatureEntity } from './feature.entity'
import { GraphQLError } from 'graphql'
import { OpenAI } from './openai.service'

export interface IPromptParams {
  type: string
  title: string
  prompt: string
  cached: boolean
}

export class ContentService {
  static async all(_root: any, _args: any, ctx: Context) {
    try {
      const res = await ContentEntity.all(ctx.prisma)
      return res
    } catch (error) {
      console.error('Error fetching content:', error)
      throw error
    }
  }

  static async create(_root: any, args: any, ctx: Context) {
    try {
      const { type, title, prompt } = args
      const html = await OpenAI.createCompletion(prompt)
      const res = await ContentEntity.upsert(ctx.prisma, { type, title, prompt, html })
      return res
    } catch (error) {
      console.error('Error fetching content:', error)
      throw error
    }
  }

  static async findAllById(_root: any, args: any, ctx: Context) {
    try {
      const { ids } = args
      const res = await ContentEntity.findAllById(ctx.prisma, ids)
      return res
    } catch (error) {
      console.error('Error fetching content:', error)
      throw error
    }
  }

  static async findContent(_root: any, args: any, ctx: Context) {
    try {
      const { types } = args
      const promises = types.map(async (t: string) => await ContentEntity.findFirst(ctx.prisma, t))
      const res = await Promise.all(promises)
      return res
    } catch (error) {
      console.error('Error fetching content:', error)
      throw error
    }
  }

  static async requestConent(_root: any, args: any, ctx: Context) {
    try {
      const { prompts } = args
      
      const feature = await FeatureEntity.find(ctx.prisma, { flag: 'use_openai' })

      if (feature?.value === 'false') {
        console.log('OpenAI is disabled')
        const contentPromises = prompts.map(async (p: IPromptParams) => {
          return await ContentEntity.findFirst(ctx.prisma, p.type)
        })
        const contents = await Promise.all(contentPromises)
        return contents
      }

      console.log('OpenAI is enabled')
      const sorted: Record<string, IPromptParams[]> = {}

      const fetchedContent = await OpenAI.generateMultiplePrompts(prompts)

      for (const p of fetchedContent) {
        const { type } = p
        if (!sorted[type]) sorted[type] = []
        sorted[type].push(p)
      }

      const createPromises = Object.entries(sorted).map(async ([key, value]) => {
        const p = await ContentEntity.createMany(ctx.prisma, value)
        return p
      })

      await Promise.all(createPromises)

      const now = new Date()
      const time = new Date(now.getTime() - 2000)
      const returnPromises = Object.entries(sorted).map(async ([key, value]) => {
        const query = await ContentEntity.findLatestByDate(ctx.prisma, key, time)
        return query
      })

      const newRecords = await Promise.all(returnPromises)
      const res = newRecords.flat()
      return res
    } catch (error) {
      console.error('Error fetching content:', error)
      throw error
    }
  }

  static async fillContent(_root: any, _args: any, ctx: Context) {
    try {
      const contents = (await ContentEntity.all(ctx.prisma)) || []
      const output = []
      if (!contents.length) return

      for (const content of contents) {
        if (!content.prompt) continue

        const html = await OpenAI.createCompletion(content.prompt)
        const updated = await ctx.prisma.content.update({
          where: {
            id: content.id,
          },
          data: {
            html,
          },
        })
        output.push(updated)
      }
      console.log('tasks filled!')
      return output
    } catch (err: any) {
      console.error('Error filling task content', err.message)
      throw new GraphQLError(err.message)
    }
  }
}
