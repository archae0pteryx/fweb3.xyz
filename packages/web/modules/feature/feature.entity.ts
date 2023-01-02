import { PrismaClient } from '@prisma/client'
import { handleError } from '../errors'

export class FeatureEntity {
  static async all(prisma: PrismaClient) {
    try {
      return await prisma.feature.findMany()
    } catch (err) {
      handleError(err, 'features.all', null)
    }
  }

  static async find(prisma: PrismaClient, flag: string) {
    try {
      // if (Array.isArray(flags)) {
      //   return await prisma.feature.findMany({
      //     where: {
      //       flag: {
      //         in: flags
      //       }
      //     },
      //   })
      // }
      return await prisma.feature.findFirst({
        where: {
          flag,
        },
      })
    } catch (err) {
      return handleError(err, 'features.find', null)
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
      handleError(err, 'features.upsert', null)
    }
  }
}
