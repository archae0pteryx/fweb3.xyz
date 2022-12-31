import { Prisma, PrismaClient } from '@prisma/client'
import { handlePrismaError } from '../errors'

export class ContentEntity {
  static async allLatest(prisma: PrismaClient) {
    try {
      return await prisma.content.findMany({
        orderBy: {
          updatedAt: 'desc',
        },
        take: 1,
      })
    } catch (err) {
      handlePrismaError(err, 'content.all')
    }
  }

  static async createOrUpdate(prisma: PrismaClient, data: any) {
    try {
      const { type, ...rest } = data
      return await prisma.content.upsert({
        where: {
          type: data.type,
        },
        update: {
          ...rest,
        },
        create: {
          ...data,
        },
      })
    } catch (err) {
      handlePrismaError(err, 'content.create')
    }
  }

  static async findLatest(prisma: PrismaClient, types: string[]) {
    try {
      return await prisma.content.findMany({
        where: {
          type: {
            in: types,
          },
        },
        orderBy: {
          updatedAt: 'desc',
        },
        take: 1,
      })
    } catch (err) {
      handlePrismaError(err, 'content.findLatest')
    }
  }

  static async findByType(prisma: PrismaClient, types: string[]) {
    try {
      return await prisma.content.findMany({
        where: {
          type: {
            in: types,
          },
        },
      })
    } catch (err) {
      handlePrismaError(err, 'content.findAllByType')
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
