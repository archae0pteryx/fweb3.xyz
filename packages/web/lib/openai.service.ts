import { Configuration, OpenAIApi } from 'openai'
import { GraphQLError } from 'graphql'
import { IPromptParams } from './content.service'
import { remark } from 'remark'
import html from 'remark-html'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config)

export class OpenAI {
  static async generateMultiplePrompts(prompts: IPromptParams[]) {
    const results = []
    for (const p of prompts) {
      const processedText = await OpenAI.createCompletion(p.prompt)
      const record = { ...p, html: processedText }
      results.push(record)
    }
    return results
  }

  static async createCompletion(prompt: string) {
    try {
      const res = await OpenAI.fetchCompletion(prompt)
      const { data } = res
      const processedText = await OpenAI.dataToHtml(data)
      return processedText
    } catch (err: any) {
      throw new GraphQLError(err.message)
    }
  }

  static async dataToHtml(data: any) {
    const text = data.choices.pop()?.text
    const processed = await remark().use(html).process(text)
    return processed.toString()
  }

  static async fetchCompletion(prompt: string) {
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
