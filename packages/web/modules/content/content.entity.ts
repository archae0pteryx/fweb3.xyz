import { handleError } from '../errors'
import { IContent } from './content.types'
import { PrismaClient } from '@prisma/client'

export class ContentEntity {
  static async allLatest(prisma: PrismaClient) {
    try {
      return await prisma.content.findMany({})
    } catch (err) {
      handleError(err, 'content.all')
    }
  }

  static async create(prisma: PrismaClient, data: IContent) {
    try {
      return await prisma.content.create({
        data,
      })
    } catch (err) {
      handleError(err, 'content.create')
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
      handleError(err, 'content.findLatest')
    }
  }

  static async findMultipleTypes(prisma: PrismaClient, types: string[]) {
    try {
      return await prisma.content.findMany({
        where: {
          type: {
            in: types,
          },
        },
      })
    } catch (err) {
      handleError(err, 'content.findAllByType')
    }
  }

  static async update(prisma: PrismaClient, data: IContent) {
    try {
      return await prisma.content.update({
        where: {
          type: data.type,
        },
        data,
      })
    } catch (err: any) {
      handleError(err, 'content.update')
    }
  }
}
