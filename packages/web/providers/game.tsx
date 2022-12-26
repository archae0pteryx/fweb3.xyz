import { createContext, useContext, useState } from 'react'

interface ITaskContext {
  tasks: Task[]
}

const GameContext = createContext<ITaskContext>({
  tasks: [],
})

export type Task = {
  idx: number
  name: string
  completed: boolean
  path: string
  validators?: Task[]
}

export const TASK_ITEMS: Task[] = [
  {
    idx: 0,
    name: 'Connect wallet and verify wallet',
    completed: true,
    path: '/onboarding',
  },
  {
    idx: 1,
    name: 'Create an insulated wallet',
    completed: false,
    path: '/game/create-dev-wallet',
  },
]

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(TASK_ITEMS)

  return (
    <GameContext.Provider
      value={{
        tasks,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => useContext(GameContext)
