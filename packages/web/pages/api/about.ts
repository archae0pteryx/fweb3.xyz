// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'
import fs from 'fs'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const prompt = `Write a markdown formatted page describing the importance of onboarding people into the web3 space. Include bullet points explaining the benefits of the technology. Explain that you will learn how to properly connect a wallet and what an NFT is by playing this game.`

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // console.log(`API: ${BASE_PROMPT}${req.body.input}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    temperature: 0.9,
    max_tokens: 1024,
  })

  const basePromptOutput = baseCompletion.data.choices.pop()

  fs.writeFileSync('output', JSON.stringify(basePromptOutput.data.choices))

  res.status(200).json({ output: basePromptOutput })
}
