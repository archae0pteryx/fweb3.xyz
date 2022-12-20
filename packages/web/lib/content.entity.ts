import { Prisma, PrismaClient } from '@prisma/client'
import { handlePrismaError } from './errors'

export class ContentEntity {
  static async createMany(prisma: PrismaClient, data: Prisma.ContentCreateInput[]) {
    try {
      return await prisma.content.createMany({ data })
    } catch (err: any) {
      console.error('Error creating content:', err.message)
      handlePrismaError(err)
    }
  }

  static async update(prisma: PrismaClient, data: Prisma.ContentCreateInput) {
    try {
      return await prisma.content.update({
        where: {
          id: data.id,
        },
        data,
      })
    } catch (err: any) {
      console.error('Error updating content:', err.message)
      handlePrismaError(err)
    }
  }

  static async findLatestByDate(prisma: PrismaClient, type: string, time: Date) {
    try {
      return await prisma.content.findMany({
        where: {
          type,
          createdAt: {
            gte: time,
          },
        },
      })
    } catch (err: any) {
      console.error('Error finding latest content:', time, err.message)
      handlePrismaError(err)
    }
  }

  static async findMany(prisma: PrismaClient, type: string) {
    try {
      return await prisma.content.findMany({
        where: {
          type,
        },
      })
    } catch (err: any) {
      console.error('Error finding content:', err.message)
      handlePrismaError(err)
    }
  }

  static async findFirst(prisma: PrismaClient, type: string) {
    try {
      return await prisma.content.findFirst({
        where: {
          type,
        },
      })
    } catch (err: any) {
      console.error('Error finding default content:', err.message)
      handlePrismaError(err)
    }
  }
}
