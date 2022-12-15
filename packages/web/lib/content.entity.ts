import { Prisma, PrismaClient } from '@prisma/client'

export class ContentEntity {
  static async all(prisma: PrismaClient) {
    return await prisma.content.findMany()
  }

  static async create(prisma: PrismaClient, data: Prisma.ContentCreateInput) {
    try {
      return await prisma.content.create({ data })
    } catch (error: any) {
      console.error('Error creating content:', error.message)
      return null
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
    } catch (error: any) {
      console.error('Error updating content:', error.message)
      return null
    }
  }

  static async findLatestByDate(prisma: PrismaClient, type: string, time: Date) {
    try {
      return await prisma.content.findFirst({
        where: {
          type,
          createdAt: {
            gte: time,
          },
        },
      })
    } catch (error: any) {
      console.error('Error finding latest content:', time, error.message)
      return null
    }
  }

  static async find(prisma: PrismaClient, id: string) {
    try {
      return await prisma.content.findUnique({
        where: {
          id,
        },
      })
    } catch (error: any) {
      console.error('Error finding content:', error.message)
      return null
    }
  }

  static async findDefault(prisma: PrismaClient, type: string) {
    try {
      return await prisma.content.findFirst({
        where: {
          type,
          isDefault: true,
        },
      })
    } catch (error: any) {
      console.error('Error finding default content:', error.message)
      return null
    }
  }
}
