import { Configuration, OpenAIApi } from 'openai'
import { Context } from '../graphql/context'

const ABOUT_PROMPT = `Write a markdown formatted page describing the importance of onboarding people into the web3 space. Include bullet points explaining the benefits of the technology. Explain that you will learn how to properly connect a wallet and what an NFT is by playing this game.`

const PROMPTS: { [key: string]: string } = {
  about: ABOUT_PROMPT,
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

export class OpenaiService {
  static async all(_root: any, _args: any, ctx: Context) {
    return ctx.prisma.content.findMany()
  }

  static async requestConent(_root: any, args: any, ctx: Context) {
    const { type } = args
    const output = await _fetchOpenaiContent(ABOUT_PROMPT)
    const content = await ctx.prisma.content.create({
      data: {
        text: output,
        prompt: PROMPTS[type],
        type,
      },
    })
    return content
  }
}
