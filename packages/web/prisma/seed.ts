import prisma from './client'

const user = {
  data: {
    address: '0x65eaFA1FBA16E3D85Ea9e663794e4F6e123C4B8A',
    role: 'ADMIN',
  },
}

;(async () => {
  try {
    console.log('Seeding')
    await prisma.user.create(user)
  } catch (err) {
    console.error(err)
  }
})()
