import prisma from './client'
import { ADMIN_USER, PLAYER_USER } from './mockUsers'

;(async () => {
  try {
    console.log('deleting all')
    await prisma.user.deleteMany()
    await prisma.content.deleteMany()
    console.log('seeding')
    await prisma.user.createMany({
      data: [ADMIN_USER, PLAYER_USER],
    })
  } catch (err) {
    console.error(err)
  }
})()
