import { Prisma, PrismaClient } from '@prisma/client'
import { handlePrismaError } from './errors'

export class UsersEntity {
  static async findMany(prisma: PrismaClient) {
    try {
      return await prisma.user.findMany()
    } catch (err: any) {
      handlePrismaError(err)
    }
  }

  static async find(prisma: PrismaClient, data: Prisma.UserWhereUniqueInput) {
    try {
      return await prisma.user.findUnique({
        where: {
          address: data.address,
        },
      })
    } catch (err) {
      handlePrismaError(err)
    }
  }

  static async create(prisma: PrismaClient, data: Prisma.UserCreateInput) {
    try {
      return await prisma.user.create({
        data,
      })
    } catch (err) {
      handlePrismaError(err)
    }
  }

  static async update(prisma: PrismaClient, data: Prisma.UserUpdateInput) {
    try {
      const { address, ...rest } = data
      return await prisma.user.update({
        where: {
          address: address?.toString(),
        },
        data: {
          ...rest,
        },
      })
    } catch (err) {
      handlePrismaError(err)
    }
  }
}
