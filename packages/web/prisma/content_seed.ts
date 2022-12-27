import prisma from './client'

export async function seedContent() {
  try {
    await prisma.content.createMany({
      data: [
        {
          title: 'What is a wallet?',
          prompt: 'Explain what a web3 wallet is.',
          html: '<h1>Seeded html</h1>',
          type: 'ONBOARD_QUESTION_1',
        },
        {
          title: 'Wallet install info',
          prompt: 'How do i install a metamask wallet in my browser?',
          html: '<h1>Seeded install html</h1>',

          type: 'ONBOARD_QUESTION_2',
        },
        {
          title: 'Security best practices',
          prompt: 'What are the best ways for me to secure my crypo wallet and assets?',
          html: '<h1>Seeded security html</h1>',
          type: 'ONBOARD_QUESTION_3',
        },
      ],
    })
    console.log('seeded content')
  } catch (err) {
    console.error(err)
  }
}
