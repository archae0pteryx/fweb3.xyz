import { Prisma, PrismaClient } from '@prisma/client'
import { handlePrismaError } from './errors'

export class UsersEntity {
  static async findMany(prisma: PrismaClient) {
    try {
      return await prisma.user.findMany()
    } catch (err: any) {
      handlePrismaError(err, 'users.findMany')
      return null
    }
  }

  static async find(prisma: PrismaClient, { address }: Prisma.UserWhereUniqueInput) {
    try {
      return await prisma.user.findUnique({
        where: {
          address: address || '',
        },
      })
    } catch (err) {
      handlePrismaError(err, 'users.find')
      return null
    }
  }

  static async upsert(prisma: PrismaClient, data: Prisma.UserCreateInput) {
    try {
      return await prisma.user.upsert({
        where: {
          address: data.address || '',
        },
        update: {
          ...data,
        },
        create: {
          ...data,
        },
      })
    } catch (err) {
      handlePrismaError(err, 'users.upsert')
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
      handlePrismaError(err, 'users.update')
      return null
    }
  }
}
