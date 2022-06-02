import type { IComponentProps } from '../../components/component'
import { createContext, useEffect, useState } from 'react'
import { createAlchemyProvider } from '../../interfaces'
// eslint-disable-next-line
import type { GameError } from '../../types/game'
import { useEthers } from '../Ethers/useEthers'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { logger } from '../../lib'

interface IAccountContext {
  ensName: string
  displayName: string
  queryDisplayName: string
  queryAccount: string
  isQueryLoad: boolean
  account: string
}

const defaultConnectionContext: IAccountContext = {
  ensName: '',
  displayName: '',
  queryDisplayName: '',
  queryAccount: '',
  isQueryLoad: false,
  account: '',
}

const AccountContext = createContext<IAccountContext>(defaultConnectionContext)

const USE_LIVE_ENS = process.env.NEXT_PUBLIC_USE_ENS

const AccountProvider = ({ children }: IComponentProps) => {
  const [queryDisplayName, setQueryDisplayName] = useState<string>('')
  const [isQueryLoad, setIsQueryLoad] = useState<boolean>(false)
  const [queryAccount, setQueryAccount] = useState<string>('')
  const [displayName, setDisplayName] = useState<string>('')
  const [ensName, setEnsName] = useState<string>('')
  const { account, isCypress } = useEthers()
  const { query } = useRouter()

  const fetchEnsName = async (): Promise<string> => {
    if (USE_LIVE_ENS && !isCypress) {
      const provider = await createAlchemyProvider('homestead')
      const ensName = (await provider.lookupAddress(account)) || ''
      ensName && logger.log(`[+] found ens: ${ensName}`)
      return ensName
    }
    logger.log('[-] skipping ens')
    return ''
  }

  useEffect(() => {
    ;(async () => {
      try {
        const queryAccount = query?.account?.toString()
        if (queryAccount) {
          setIsQueryLoad(true)
          setQueryAccount(queryAccount)
          setQueryDisplayName(`${queryAccount?.substring(0, 6)}...`)
        } else {
          const ensName = await fetchEnsName()
          const displayName = ensName ?? `${account.substring(0, 6)}...`
          setDisplayName(displayName)
          setEnsName(ensName)
        }
      } catch (err: GameError) {
        console.error(err.message)
        toast.error('Error loading account')
      }
    })()
  }, [query.account, account]) // eslint-disable-line

  return (
    <AccountContext.Provider
      value={{
        ensName,
        displayName,
        queryDisplayName,
        queryAccount,
        isQueryLoad,
        account,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

export { AccountContext, AccountProvider }