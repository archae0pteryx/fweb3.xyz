import { Configuration, OpenAIApi } from 'openai'
import { ContentEntity } from './content.entity'
import { Context } from '../graphql/context';
import { remark } from 'remark'
import html from 'remark-html'
import { PrismaClient } from '@prisma/client'

interface IPromptParams {
  prompt: string
  type: string
  cached: boolean
}

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config)

async function _fetchOpenaiContent(prompt: string) {
  const { status, data } = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    temperature: 0.7,
    max_tokens: 1024,
  })

  if (status !== 200) {
    throw new Error(`Open AI status: ${status}`)
  }

  const text = data.choices.pop()?.text
  if (!text) {
    console.log('no_text:', JSON.stringify(data, null, 2))
    throw new Error('Open AI did not return any text')
  }

  return text
}

export class ContentService {
  static all(_root: any, _args: any, ctx: Context) {
    return ContentEntity.all(ctx.prisma)
  }

  static async requestConent(_root: any, args: any, ctx: Context) {
    try {
      const { prompts } = args
      const content = await Promise.all(
        prompts.map((promptParams: IPromptParams) => ContentService.getContent(ctx, promptParams))
      )

      // const prompt = PROMPTS[type]
      // if (!prompt) {
      //   throw new Error(`No prompt for type: ${type}`)
      // }
      // console.log('generating new openai content:', type)
      // const text = await _fetchOpenaiContent(prompt)
      // const html = await _processMarkdown(text)
      // return await ContentEntity.create(ctx.prisma, { type, text, html })
    } catch (error) {
      console.error('Error fetching content:', error)
      throw error
    }
  }

  static async getContent(ctx: Context, { type, prompt, cached = false }: IPromptParams) {
    const now = new Date()
    // const time = new Date(now.getTime() - 10 * 60 * 1000)
    const time = new Date(now.getDate() - 1)
    
    if (cached) {
      const foundCached = await ContentEntity.findCached(prisma, type)
      console.log('using cached content:', foundCached?.id)
      return foundCached || { type, prompt, html: '' }
    }

    // const found = await ContentEntity.findLatestByDate(ctx.prisma, type, time)
    // if (found) {
    //   console.log('using cached content:', found.id)
    //   return found
    // }
    const text = await _fetchOpenaiContent(prompt)
    const html = await _processMarkdown(text)
    return { type, prompt, html }
  }

  static update(_root: any, args: any, ctx: Context) {
    const { data } = args
    return ContentEntity.update(ctx.prisma, data)
  }
}

async function _processMarkdown(text: string) {
  return (await remark().use(html).process(text)).toString()
}
