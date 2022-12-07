import { useEffect, useState, createContext, useContext } from 'react';

import { usePrisma } from './prisma'
import { useAccount } from 'wagmi'

const UserContext = createContext(null)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null)
  const { address } = useAccount()
  const { usersDb } = usePrisma()

  useEffect(() => {
    if (usersDb && address) {
      ;(async () => {
        try {
          const user = await usersDb.find(address)
          setUser(user)
        } catch (e) {
          console.error(e)
        }
      })()
    }
  }, [usersDb, address])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
