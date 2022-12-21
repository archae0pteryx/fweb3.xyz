import { PrismaClient } from '@prisma/client'
import { handlePrismaError } from './errors'

export class FeatureEntity {
  static async all(prisma: PrismaClient) {
    try {
      return await prisma.feature.findMany()
    } catch (err) {
      handlePrismaError(err)
    }
  }

  static async upsert(prisma: PrismaClient, { flag, value }: { flag: string; value: string }) {
    try {
      return await prisma.feature.upsert({
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
    } catch (err) {
      handlePrismaError(err)
    }
  }
}
