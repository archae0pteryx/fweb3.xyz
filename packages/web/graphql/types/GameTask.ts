import { extendType, objectType, stringArg, nonNull, inputObjectType } from 'nexus'
import { GameTaskService } from '../../lib/game.service'

export const GameTask = objectType({
  name: 'GameTask',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('description')
    t.string('title')
    t.list.field('content', {
      type: 'Content',
    })
    t.string('createdAt')
    t.string('updatedAt')
  },
})

export const GameTaskQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('allGameTasks', {
      type: 'GameTask',
      resolve: GameTaskService.all,
    }),
    t.field('gameTask', {
      type: 'GameTask',
      args: {
        name: nonNull(stringArg()),
      },
      resolve: GameTaskService.findByName,
    })
  },
})


export const GameTaskInputType = inputObjectType({
  name: 'GameTaskInputType',
  definition(t) {
    t.string('taskName')
    t.string('taskTitle')
    t.string('taskDescription')
    t.string('contentPrompt')
    t.string('contentTitle')
    t.string('contentType')
  }
})

export const GameTaskMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createTask', {
      type: 'GameTask',
      args: {
        gameTask: nonNull(GameTaskInputType),
      },
      resolve: GameTaskService.create,
    }),
      t.nonNull.field('upsertContentForTask', {
        type: 'Content',
        args: {
          gameTask: nonNull(GameTaskInputType),
        },
        resolve: GameTaskService.upsertContentForTask,
      })
  },
})
