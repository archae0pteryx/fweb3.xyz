import { Configuration, OpenAIApi } from 'openai'
import { GraphQLError } from 'graphql'
import { IPromptParams } from '../content/content.service'
import { remark } from 'remark'
import html from 'remark-html'
import { handleError } from '../errors'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config)

export class OpenAI {
  static async generateMultiplePrompts(prompts: IPromptParams[]) {
    const results = []
    for (const p of prompts) {
      const processedText = await OpenAI.fetchFormattedCompletion(p.prompt)
      const record = { ...p, html: processedText }
      results.push(record)
    }
    return results
  }

  static async fetchFormattedCompletion(prompt: string) {
    const { data } = await OpenAI.fetchCompletion(prompt)
    const processedText = await OpenAI.dataToHtml(data)
    return processedText
  }

  static async dataToHtml(data: any) {
    const text = data.choices.pop()?.text
    const processed = await remark().use(html).process(text)
    return processed.toString()
  }

  static async fetchCompletion(prompt: string) {
    try {
      console.log('fetching completion...')
      const { status, data } = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        temperature: 0.7,
        max_tokens: 512,
      })

      if (status !== 200) {
        throw new GraphQLError(`Open AI status: ${status}`)
      }
      console.log(`fetched: [${status}]`)
      return { status, data }
    } catch (err: any) {
      return handleError(err, 'fetchCompletion', {
        status: 500,
        data: null,
      })
    }
  }
}
