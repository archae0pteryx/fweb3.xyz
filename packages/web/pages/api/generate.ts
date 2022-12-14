// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'
import prisma from '../../prisma/client'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const ABOUT_PROMPT = `Write a markdown formatted page describing the importance of onboarding people into the web3 space. Include bullet points explaining the benefits of the technology. Explain that you will learn how to properly connect a wallet and what an NFT is by playing this game.`

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { status, data } = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: ABOUT_PROMPT,
      temperature: 0.9,
      max_tokens: 1024,
    })

    if (status !== 200) {
      res.status(500).json({ error: `Open AI status: ${status}` })
      return
    }

    const output = data.choices.pop()
    await prisma.content.create({
      data: {
        name: 'About',
        text: output?.text,
        prompt: ABOUT_PROMPT,
        type: 'about',
      }
    })
    res.status(200).json({ output })
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.status)
      console.log(error.response.data)
    } else {
      console.log(error.message)
    }
    res.status(500).json({ error: 'Open AI threw an error' })
  }
}
