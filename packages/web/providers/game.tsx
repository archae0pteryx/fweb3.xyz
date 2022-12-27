import { useQuery, gql } from '@apollo/client'
import { createContext, useContext } from 'react'

interface ITaskContext {
  tasks: Task[]
  gameTasksLoading: boolean
  gameTasksError: string
}

const GameContext = createContext<ITaskContext>({
  tasks: [],
  gameTasksLoading: false,
  gameTasksError: '',
})

export type Task = {
  id: string
  title: string
  name: string
  description: string
  completed?: boolean
  content: {
    title: string
    type: string
    html: string
  }[]
}

export const ALL_TASKS = gql`
  query Query {
    allGameTasks {
      content {
        title
        type
        html
      }
      id
      name
      description
      title
    }
  }
`

export function GameProvider({ children }: { children: React.ReactNode }) {
  const { loading: gameTasksLoading, data, error } = useQuery(ALL_TASKS)
  return (
    <GameContext.Provider
      value={{
        tasks: data?.allGameTasks || [],
        gameTasksLoading,
        gameTasksError: error?.message || '',
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => useContext(GameContext)
