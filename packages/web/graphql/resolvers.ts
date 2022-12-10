import { Context } from "./context"

export const resolvers = {
  Query: {
    users: (_parent: any, _args: any, ctx: Context ) => {
      return ctx.prisma.user.findMany()
    },
  },
}
