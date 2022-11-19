import { PrismaClient, Role, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const SEED_USERS: Prisma.UserCreateInput[] = [
  {
    account: 'polygon:0xb15A3D29eFe51baaC8d3cd2f4F747B843FeAdA7d',
    role: Role.ROOT,
  },
]

;(async () => {
  try {
    const promises = SEED_USERS.map((user) =>
      prisma.user.create({ data: user })
    )
    return Promise.all(promises)
  } catch (err) {
    console.error(err.message)
    return null
  }
})()
