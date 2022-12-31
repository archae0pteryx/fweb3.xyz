import { ContentEntity } from './content.entity'
import { Context } from '../../graphql/context'
import { FeatureEntity } from '../feature/feature.entity'
import { GraphQLError } from 'graphql'
import { OpenAI } from '../openai/openai.service'
import { IContent } from './content.types'

export interface IPromptParams {
  type: string
  title: string
  prompt: string
  cached: boolean
}

export class ContentService {
  static async latest(_root: any, _args: any, ctx: Context) {
    try {
      const res = await ContentEntity.allLatest(ctx.prisma)
      return res
    } catch (error) {
      console.error('Error fetching content:', error)
      throw error
    }
  }

  static async create(_root: any, { data }: { data: IContent }, ctx: Context) {
    if (!data.type) throw new GraphQLError('Type is required')

    if (data.prompt) {
      const html = await OpenAI.createCompletion(data.prompt)
      const res = await ContentEntity.createOrUpdate(ctx.prisma, { ...data, html })
      return res
    }

    return await ContentEntity.createOrUpdate(ctx.prisma, data)
  }

  // static async findContent(_root: any, args: any, ctx: Context) {
  //   try {
  //     const { types } = args
  //     const promises = types.map(async (t: string) => await ContentEntity.findFirst(ctx.prisma, t))
  //     const res = await Promise.all(promises)
  //     return res
  //   } catch (error) {
  //     console.error('Error fetching content:', error)
  //     throw error
  //   }
  // }

  static async requestConent(_root: any, args: any, ctx: Context) {
    try {
      console.log('REQUEST CONTENT CALLED')
      const { types } = args
      const feature = await FeatureEntity.find(ctx.prisma, { flag: 'use_openai' })
      const newestContent = await ContentEntity.findLatest(ctx.prisma, types)
      console.log({ newestContent })
      return newestContent
      // if (feature?.value === 'false') {
      //   console.log('OpenAI is disabled')
      //   const contents = await ContentEntity.findByType(ctx.prisma, types)
      //   return contents
      // }

      // console.log('OpenAI is enabled')
      // const sorted: Record<string, IPromptParams[]> = {}

      // const fetchedContent = await OpenAI.generateMultiplePrompts(prompts)

      // for (const p of fetchedContent) {
      //   const { type } = p
      //   if (!sorted[type]) sorted[type] = []
      //   sorted[type].push(p)
      // }

      // const createPromises = Object.entries(sorted).map(async ([key, value]) => {
      //   const p = await ContentEntity.createMany(ctx.prisma, value)
      //   return p
      // })

      // await Promise.all(createPromises)

      // const now = new Date()
      // const time = new Date(now.getTime() - 2000)
      // const returnPromises = Object.entries(sorted).map(async ([key, value]) => {
      //   const query = await ContentEntity.findLatestByDate(ctx.prisma, key, time)
      //   return query
      // })

      // const newRecords = await Promise.all(returnPromises)
      // const res = newRecords.flat()
      // return res
      // return [
      //   {
      //     id: '1',
      //     type: 'welcome',
      //     title: 'Welcome',
      //     prompt: 'Welcome to the site',
      //     html: 'Welcome to the site',
      //   }
      // ]
    } catch (error) {
      console.error('Error fetching content:', error)
      throw error
    }
  }

  static async fillContent(_root: any, _args: any, ctx: Context) {
    try {
      const contents = (await ContentEntity.allLatest(ctx.prisma)) || []
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
