import { handleError } from '../errors'
import { PrismaClient } from '@prisma/client'

export class FeatureEntity {
  static async all(prisma: PrismaClient) {
    try {
      return await prisma.feature.findMany()
    } catch (err) {
      handleError(err, 'features.all')
    }
  }

  static async find(prisma: PrismaClient, flag: string) {
    try {
      return await prisma.feature.findFirst({
        where: {
          flag,
        },
      })
    } catch (err) {
      handleError(err, 'features.find')
    }
  }

  static async upsert(prisma: PrismaClient, { flag, value }: { flag: string; value: boolean }) {
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
      handleError(err, 'features.upsert')
    }
  }
}
