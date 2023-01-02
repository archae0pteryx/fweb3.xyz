import { PrismaClient } from '@prisma/client'
import { handlePrismaError } from '../errors'

export class FeatureEntity {
  static async all(prisma: PrismaClient) {
    try {
      return await prisma.feature.findMany()
    } catch (err) {
      handlePrismaError(err, 'features.all')
    }
  }

  static async find(prisma: PrismaClient, flags: string | string[]) {
    try {
      if (Array.isArray(flags)) {
        return await prisma.feature.findMany({
          where: {
            flag: {
              in: flags
            }
          },
        })
      }
      return await prisma.feature.findFirst({
        where: {
          flag: flags,
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
