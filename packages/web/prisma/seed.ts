import prisma from './client'


;(async () => {
  try {
    console.log('deleting')
    await prisma.user.deleteMany()
  } catch (err) {
    console.error(err)
  }
})()
