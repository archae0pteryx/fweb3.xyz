import prisma from './db'

const user = {
  data: {
    address: 'foobarbaz',
  },
}

;(async () => {
  try {
    await prisma.user.deleteMany()
    await prisma.user.create(user)
  } catch (err) {
    console.error(err)
  }
})()
