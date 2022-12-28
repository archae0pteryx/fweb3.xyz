import { PrismaClient } from '@prisma/client'
import { Context } from '../graphql/context'
import { TASK_NAMES } from './constants'

export class ValidatorService {
  static async validateTasks(_root: any, args: any, ctx: Context) {
    const { address } = args
    const payload = [
      {
        name: TASK_NAMES.CONNECT_AND_VERIFY,
        completed: true,
      },
      {
        name: TASK_NAMES.CREATE_DEV_WALLET,
        completed: false,
      },
    ]
    // const allTasks = await ctx.prisma.gameTask.findMany()
    return payload
  }
}
