export class PrismaEntity {
  static async create(data: any) {
    try {
      await prisma.$connect()
      const response = await prisma[this.name].create({ data })
      return response
    } catch (err) {
      console.error(err)
    }
  }
}
