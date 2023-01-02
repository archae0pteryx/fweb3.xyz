import prisma from './client'

const CONTENT = [
  {
    title: 'What is a wallet?',
    prompt: 'Explain what a web3 wallet is.',
    type: 'ONBOARD_QUESTION_1',
  },
  {
    title: 'Wallet install info',
    prompt: 'How do i install a metamask wallet in my browser?',
    type: 'ONBOARD_QUESTION_2',
  },
  {
    title: 'Security best practices',
    prompt: 'What are the best ways for me to secure my crypo wallet and assets?',
    type: 'ONBOARD_QUESTION_3',
  },
  {
    prompt:
      'Explain the importance of the web3 movement using markdown syntax. Use important bullet points and links to learn more along the way.',
    type: 'ABOUT_PAGE',
    title: 'Fweb3? What is this about?',
  },
]

export async function seedContent() {
  try {
    // const promises = CONTENT.map(async (c) => {
    //   const html = await OpenAI.createCompletion(c.prompt)
    //   return await prisma.content.create({
    //     data: {
    //       ...c,
    //       html,
    //     },
    //   })
    // })

    await prisma.content.createMany({
      data: CONTENT,
    })
    console.log('seeded content')
  } catch (err) {
    console.error(err)
  }
}
