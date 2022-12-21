import { PrismaClient } from '@prisma/client'

export class FeatureEntity {
  static async all(prisma: PrismaClient) {
    return await prisma.featureFlag.findMany()
  }

  static async upsert(prisma: PrismaClient, args: { flag: string; value: string }) {
    const { flag, value } = args
    return await prisma.featureFlag.upsert({
      where: {
        flag,
      },
      create: {
        flag,
        value,
      },
      update: {
        flag,
        value,
      },
    })
  }
}
