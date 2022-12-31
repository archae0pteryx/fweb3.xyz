import { PrismaClient } from '@prisma/client'
import { Context } from '../../graphql/context'
import { GAME_TASKS } from '../constants'

export class ValidatorService {
  static async validateTasks(_root: any, args: any, ctx: Context) {
    const { address } = args
    const payload = [
      {
        name: GAME_TASKS.CONNECT_AND_VERIFY,
        completed: true,
      },
      {
        name: GAME_TASKS.CREATE_DEV_WALLET,
        completed: false,
      },
    ]
    // const allTasks = await ctx.prisma.gameTask.findMany()
    return payload
  }
}
