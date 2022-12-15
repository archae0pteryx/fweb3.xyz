import { Configuration, OpenAIApi } from 'openai'
import { ContentEntity } from './content.entity'
import { Context } from '../graphql/context'
import { remark } from 'remark'
import html from 'remark-html'

const ABOUT_PROMPT = `Write a markdown formatted page describing the importance of onboarding people into the web3 space. Include bullet points explaining the benefits of the technology. Explain that you will learn how to properly connect a wallet and what an NFT is by playing this game.`

const GAME_TASKS = `Write a markdown formatted list of instructions for how to play the game. Include the following steps: 1. Create and connect a wallet 2. Get game tokens 3. Find your game token transaction on the block explorer and learn gas. Interact with a contract through the explorer. 4. Look up transactions on the explorer.`

const PROMPTS: { [key: string]: string } = {
  about: ABOUT_PROMPT,
  tasks: GAME_TASKS,
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
      const { type } = args
      const now = new Date()
      // const time = new Date(now.getTime() - 10 * 60 * 1000)
      const time = new Date(now.getDate() - 1)
      const hasDefault = await ContentEntity.findDefault(ctx.prisma, type)
      if (hasDefault) {
        console.log('using default content:', hasDefault.id)
        return hasDefault
      }
      const found = await ContentEntity.findLatestByDate(ctx.prisma, type, time)
      if (found) {
        console.log('using cached content:', found.id)
        return found
      }
      const prompt = PROMPTS[type]
      if (!prompt) {
        throw new Error(`No prompt for type: ${type}`)
      }
      console.log('generating new openai content:', type)
      const text = await _fetchOpenaiContent(prompt)
      const html = await _processMarkdown(text)
      return await ContentEntity.create(ctx.prisma, { type, text, html })
    } catch (error) {
      console.error('Error fetching content:', error)
      throw error
    }
  }

  static update(_root: any, args: any, ctx: Context) {
    const { data } = args
    return ContentEntity.update(ctx.prisma, data)
  }
}

async function _processMarkdown(text: string) {
  return (await remark().use(html).process(text)).toString()
}
