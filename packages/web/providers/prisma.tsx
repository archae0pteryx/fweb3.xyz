import { createContext, useState, useEffect, useContext } from 'react'
import { Users } from '../prisma/user.entity'

interface IPrismaContext {
  usersDb: Users
}

const PrismaContext = createContext<IPrismaContext>({ usersDb: null })

export function PrismaProvider({ children }: { children: React.ReactNode }) {
  const [usersDb, setUsersDb] = useState<Users>(null)

  useEffect(() => {
    ;(async () => {
      try {
        if (!usersDb) {
          const newUsersDb = new Users()
          console.log(newUsersDb)
          setUsersDb(newUsersDb)
        }
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  return <PrismaContext.Provider value={{ usersDb }}>{children}</PrismaContext.Provider>
}

export const usePrisma = () => useContext(PrismaContext)
