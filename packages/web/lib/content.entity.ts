import { Prisma, PrismaClient } from '@prisma/client'

export class ContentEntity {
  static all(prisma: PrismaClient) {
    return prisma.content.findMany()
  }

  static create(prisma: PrismaClient, data: Prisma.ContentCreateInput) {
    return prisma.content.create({ data })
  }

  static update(prisma: PrismaClient, data: Prisma.ContentCreateInput) {
    return prisma.content.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  static findLatestByDate(prisma: PrismaClient, type: string, time: Date) {
    return prisma.content.findFirst({
      where: {
        type,
        createdAt: {
          gte: time,
        },
      },
    })
  }

  static find(prisma: PrismaClient, id: string) {
    return prisma.content.findUnique({
      where: {
        id,
      },
    })
  }

  static findDefault(prisma: PrismaClient, type: string) {
    return prisma.content.findFirst({
      where: {
        type,
        isDefault: true,
      },
    })
  }
}
