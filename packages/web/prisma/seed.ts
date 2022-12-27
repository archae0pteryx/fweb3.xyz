import prisma from './client'
import { ADMIN_USER, PLAYER_USER, XENU_USER, MOD_USER } from './mockUsers'

import { seedContent } from './content_seed'
import { seedFeature } from './feature_seed'
import { seedTask } from './task_seed'
;(async () => {
  try {
    await prisma.gameTask.deleteMany({})
    await prisma.content.deleteMany({})
    await prisma.feature.deleteMany({})
    await prisma.user.deleteMany({})

    console.log('deleted all data')

    await prisma.user.createMany({
      data: [{ ...PLAYER_USER }, { ...ADMIN_USER }, { ...XENU_USER }, { ...MOD_USER }],
    })

    await seedFeature()
    await seedTask()
    await seedContent()

    console.log('seeded all data')
  } catch (err) {
    console.error(err)
  }
})()
