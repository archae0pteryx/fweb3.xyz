import prisma from './client'

const user = {
  data: {
    address: 'foobarbaz',
  },
}

;(async () => {
  try {
    console.log('removing all users')
    await prisma.user.deleteMany()
    console.log('creating user')
    await prisma.user.create(user)
  } catch (err) {
    console.error(err)
  }
})()
