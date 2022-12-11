export class UsersEntity {
  static async findMany() {
    return await prisma.user.findMany()
  }
  static async find(address: string) {
    return await prisma.user.findUnique({
      where: {
        address,
      },
    })
  }

  static async create(address: string, email: string) {
    return await prisma.user.create({
      data: {
        address,
        email,
      },
    })
  }

  static async update(address: string, data: any) {
    return await prisma.user.update({
      where: {
        address,
      },
      data,
    })
  }
}
