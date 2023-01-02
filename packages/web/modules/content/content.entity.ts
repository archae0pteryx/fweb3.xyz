import { PrismaClient } from '@prisma/client'
import { handleError } from '../errors'
import { IContent } from './content.types'

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
      return handleError(err, 'content.all', null)
    }
  }

  static async create(prisma: PrismaClient, data: IContent) {
    try {
      return await prisma.content.create({
        data,
      })
    } catch (err) {
      return handleError(err, 'content.create', null)
    }
  }

  static async findByType(prisma: PrismaClient, type: string) {
    try {
      return await prisma.content.findFirst({
        where: {
          type,
        },
      })
    } catch (err) {
      return handleError(err, 'content.findLatest', null)
    }
  }

  // static async findManyLatest(prisma: PrismaClient, types: string[]) {
  //   try {
  //     return await prisma.content.findMany({
  //       where: {
  //         type: {
  //           in: types,
  //         },
  //       },
  //       orderBy: {
  //         updatedAt: 'desc',
  //       },
  //       take: 1,
  //     })
  //   } catch (err) {
  //     return handleError(err, 'content.findLatest', null)
  //   }
  // }

  static async findAllByType(prisma: PrismaClient, types: string[]) {
    try {
      return await prisma.content.findMany({
        where: {
          type: {
            in: types,
          },
        },
      })
    } catch (err) {
      return handleError(err, 'content.findAllByType', null)
    }
  }

  // static async createMany(prisma: PrismaClient, data: Prisma.ContentCreateInput[]) {
  //   try {
  //     return await prisma.content.createMany({ data })
  //   } catch (err: any) {
  //     return handleError(err, 'content.createMany', null)
  //   }
  // }

  static async update(prisma: PrismaClient, data: IContent) {
    try {
      return await prisma.content.update({
        where: {
          type: data.type,
        },
        data,
      })
    } catch (err: any) {
      return handleError(err, 'content.update', null)
    }
  }

  // static async findLatestByDate(prisma: PrismaClient, type: string, time: Date) {
  //   try {
  //     return await prisma.content.findMany({
  //       where: {
  //         type,
  //         createdAt: {
  //           gte: time,
  //         },
  //       },
  //     })
  //   } catch (err: any) {
  //     return handleError(err, 'content.findLatestByDate', null)
  //   }
  // }
}
