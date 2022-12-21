import prisma from './client'
import { ADMIN_USER, PLAYER_USER } from './mockUsers'
;(async () => {
  try {
    await prisma.user.upsert({
      where: { address: ADMIN_USER.address },
      update: {
        ...ADMIN_USER,
      },
      create: {
        ...ADMIN_USER,
      },
    })
    await prisma.user.upsert({
      where: { address: PLAYER_USER.address },
      update: {
        ...PLAYER_USER,
      },
      create: {
        ...PLAYER_USER,
      },
    })
    await prisma.content.upsert({
      where: { id: '63a34e1940034accf68d19b1' },
      update: {
        title: 'Test Content',
        html: '<h1>Test Content</h1>',
        type: 'TEST_CONTENT',
      },
      create: {
        title: 'Test Content',
        html: '<h1>Test Content</h1>',
        type: 'TEST_CONTENT',
      },
    })
    await prisma.feature.upsert({
      where: { flag: 'MAINTENANCE' },
      update: {
        flag: 'MAINTENANCE',
        value: 'true',
      },
      create: {
        flag: 'MAINTENANCE',
        value: 'true',
      },
    })
  } catch (err) {
    console.error(err)
  }
})()
