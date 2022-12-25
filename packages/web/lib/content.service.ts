import { OpenAI } from './openai.service'
import { ContentEntity } from './content.entity'
import { Context } from '../graphql/context'
import { FeatureEntity } from './feature.entity'

export interface IPromptParams {
  type: string
  title: string
  prompt: string
  cached: boolean
}

export class ContentService {
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

      const fetchedContent = await OpenAI.processPrompts(prompts)

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

}
