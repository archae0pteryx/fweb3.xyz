import { handlePrismaError } from '../errors'
import { PrismaClient } from '@prisma/client'

export class GameTaskEntity {
  static async all(prisma: PrismaClient) {
    try {
      return await prisma.gameTask.findMany({
        include: {
          content: true,
        },
      })
    } catch (err) {
      handlePrismaError(err, 'game.all')
    }
  }

  static async findByName(prisma: PrismaClient, name: string) {
    try {
      return await prisma.gameTask.findFirst({
        where: {
          name,
        },
        include: {
          content: true,
        },
      })
    } catch (err) {
      handlePrismaError(err, 'game.findByName')
    }
  }

  static async create(prisma: PrismaClient, data: any) {
    try {
      return await prisma.gameTask.create({
        data,
        include: {
          content: true,
        },
      })
    } catch (err) {
      handlePrismaError(err, 'game.create')
    }
  }

  static async update(prisma: PrismaClient, data: any) {
    try {
      return await prisma.gameTask.update({
        where: {
          name: data.name,
        },
        data,
        include: {
          content: true,
        },
      })
    } catch (err) {
      handlePrismaError(err, 'game.update')
    }
  }
}
