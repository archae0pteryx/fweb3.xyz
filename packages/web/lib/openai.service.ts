import { Configuration, OpenAIApi } from 'openai'
import { remark } from 'remark'
import html from 'remark-html'
import { GraphQLError } from 'graphql'
import { IPromptParams } from './content.service'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config)

export class OpenAI {
  static async processPrompts(prompts: IPromptParams[]) {
    const results = []
    for (const p of prompts) {
      const { data } = await OpenAI.createCompletion(p.prompt)
      const processedText = await OpenAI.createHtmlFromContent(data)
      const record = { ...p, html: processedText }
      results.push(record)
    }
    return results
  }

  static async createHtmlFromContent(data: any) {
    const text = data.choices.pop()?.text
    const processed = await remark().use(html).process(text)
    return processed.toString()
  }

  static async createCompletion(prompt: string) {
    try {
      const { status, data } = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        temperature: 0.7,
        max_tokens: 1024,
      })

      if (status !== 200) {
        throw new GraphQLError(`Open AI status: ${status}`)
      }
      return { status, data }
    } catch (err: any) {
      if (err.response) {
        console.error(err.response.status)
        console.error(err.response.data)
      } else {
        console.error(err.message)
      }
      throw new GraphQLError(err.message)
    }
  }
}

export async function fetchOpenAiContent(prompt: string[]): Promise<string> {
  try {
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
  } catch (err: any) {
    if (err.response) {
      console.error(err.response.status)
      console.error(err.response.data)
    } else {
      console.error(err.message)
    }
    throw new GraphQLError(err.message)
  }
}
