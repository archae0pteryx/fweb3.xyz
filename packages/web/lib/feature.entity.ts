import { PrismaClient } from '@prisma/client'
import { handlePrismaError } from './errors'

export class FeatureEntity {
  static async all(prisma: PrismaClient) {
    try {
      return await prisma.feature.findMany()
    } catch (err) {
      handlePrismaError(err, 'features.all')
    }
  }

  static async find(prisma: PrismaClient, { flag }: { flag: string }) {
    try {
      return await prisma.feature.findUnique({
        where: {
          flag,
        },
      })
    } catch (err) {
      handlePrismaError(err, 'features.find')
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
      handlePrismaError(err, 'features.upsert')
    }
  }
}
