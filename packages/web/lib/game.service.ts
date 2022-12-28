import { ContentEntity } from './content.entity'
import { Context } from '../graphql/context'
import { GameTaskEntity } from './game.entity'
import { OpenAI } from './openai.service'
import { ValidatorService } from './validator.service';

export class GameTaskService {
  static async all(_root: any, args: any, ctx: Context) {
    const allTasks = await GameTaskEntity.all(ctx.prisma) || []
    const allCompleted = await ValidatorService.validateTasks(_root, args, ctx)
    const combined = allTasks.map((t) => {
      const completed = allCompleted?.find((c) => c.name === t.name)
      return {
        ...t,
        completed: completed?.completed || false,
      }
    })
    return combined
  }

  static async findByName(_root: any, args: any, ctx: Context) {
    const { name } = args
    return await GameTaskEntity.findByName(ctx.prisma, name)
  }

  static async create(_root: any, args: any, ctx: Context) {
    const { gameTask } = args
    return await GameTaskEntity.create(ctx.prisma, gameTask)
  }

  static async update(_root: any, args: any, ctx: Context) {
    const { gameTask } = args
    return await GameTaskEntity.update(ctx.prisma, gameTask)
  }

  static async upsertContentForTask(_root: any, args: any, ctx: Context) {
    const { gameTask } = args
    const { taskName, contentType, contentTitle, contentPrompt } = gameTask
    const html = await OpenAI.createCompletion(contentPrompt)
    const content = {
      prompt: contentPrompt,
      html,
      title: contentTitle,
      type: contentType,
    }
    await ctx.prisma.gameTask.update({
      where: {
        name: taskName,
      },
      data: {
        content: {
          upsert: {
            where: {
              type: contentType,
            },
            create: content,
            update: content,
          },
        },
      },
    })
    const newContent = await ContentEntity.findFirst(ctx.prisma, contentType)
    return newContent
  }
}
