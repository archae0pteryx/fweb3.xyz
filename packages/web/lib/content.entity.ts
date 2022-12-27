import { Prisma, PrismaClient } from '@prisma/client'
import { handlePrismaError } from './errors'

export class ContentEntity {
  static async all(prisma: PrismaClient) {
    try {
      return await prisma.content.findMany()
    } catch (err) {
      handlePrismaError(err, 'content.all')
    }
  }

  static async findAllById(prisma: PrismaClient, ids: string[]) {
    try {
      return await prisma.content.findMany({
        where: {
          id: {
            in: ids,
          },
        },
      })
    } catch (err) {
      handlePrismaError(err, 'content.findAllById')
    }
  }

  static async createMany(prisma: PrismaClient, data: Prisma.ContentCreateInput[]) {
    try {
      return await prisma.content.createMany({ data })
    } catch (err: any) {
      handlePrismaError(err, 'content.createMany')
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
      handlePrismaError(err, 'content.update')
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
      handlePrismaError(err, 'content.findLatestByDate')
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
      handlePrismaError(err, 'content.findFirst')
    }
  }
}
