import prisma from './client'
import { TASK_NAMES } from '../lib/constants'

const TASKS = [
  {
    name: TASK_NAMES.CONNECT_AND_VERIFY,
    title: 'Connect and verify wallet',
    description: 'Prove you are not a bot and have a web3 wallet',
    content: {
      create: [
        {
          type: TASK_NAMES.CONNECT_AND_VERIFY,
          prompt: 'Describe in markdown format how to connect a web3 wallet to the browser',
        },
      ],
    },
  },
  {
    name: TASK_NAMES.CREATE_DEV_WALLET,
    title: 'Create an alternative web wallet',
    description: 'A wallet that is not your main wallet is important when exploring the web3 space',
    content: {
      create: [
        {
          type: TASK_NAMES.CREATE_DEV_WALLET,
          prompt: 'Describe in markdown formatting why and how to create an alt crypto wallet for safty with web3',
        },
      ],
    },
  },
]

export async function seedTask() {
  try {
    await prisma.gameTask.create({
      data: TASKS[0],
    })
    await prisma.gameTask.create({
      data: TASKS[1],
    })
    console.log('seeded game tasks')
  } catch (err) {
    console.error(err)
  }
}
