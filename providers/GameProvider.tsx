import { useState, useEffect, createContext, useContext, Context } from 'react'
import { DotKey, DOTS_MAP, IDotsMap } from '../components/Chest/dots'
import { IFweb3Contracts, loadFweb3Contracts } from '../interfaces'
// eslint-disable-next-line
import type { GameError, IGameTaskState } from '../interfaces/game'
import { IComponentProps } from '../components/component'
import { useEthers, useLoading } from '../providers'
import { Contract } from '@ethersproject/contracts'
import { useAccount } from './AccountProvider'
import { getCurrentGame } from './Game/tasks'
import { DEFAULT_GAME_STATE } from '../lib'
import { useRouter } from 'next/router'
import { logger } from '../lib'

interface IGameProviderState {
  setActiveDot: (dot: string) => void
  gameTaskState: IGameTaskState
  isFetchingGameData: boolean
  completedTasks: IDotsMap
  tokenContract: Contract | null
  gameContract: Contract | null
  hasWonGame: boolean
  activeDot: string
  trophyId: string
  trophyColor: string
  isVerified: boolean
  isJudge: boolean
  resetGameState: () => void
  isDotComplete: (dot: DotKey) => boolean
}

const defaultGameState: IGameProviderState = {
  gameTaskState: DEFAULT_GAME_STATE,
  setActiveDot: () => null,
  isFetchingGameData: false,
  tokenContract: null,
  gameContract: null,
  completedTasks: {},
  hasWonGame: false,
  activeDot: '0',
  trophyId: '',
  trophyColor: '',
  isVerified: false,
  isJudge: false,
  resetGameState: () => null,
  isDotComplete: () => false,
}

const GameContext: Context<IGameProviderState> = createContext(defaultGameState)

const calcTrophyColor = (trophyId: string): string => {
  if (!trophyId) return ''
  const trophyInt = parseInt(trophyId)
  if (trophyInt <= 333) {
    return 'gold'
  } else if (trophyInt <= 3333) {
    return 'silver'
  }
  return 'copper'
}

const GameProvider = ({ children }: IComponentProps): JSX.Element => {
  const { account, isConnected, web3Provider, isAllowedNetwork, isCypress } =
    useEthers()
  const [isFetchingGameData, setIsFetchingGameData] = useState<boolean>(false)
  const [tokenContract, setTokenContract] = useState<Contract | null>(null)
  const [completedTasks, setCompletedTasks] = useState<IDotsMap>(DOTS_MAP)
  const [gameContract, setGameContract] = useState<Contract | null>(null)
  const [hasWonGame, setHasWonGame] = useState<boolean>(false)
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const [trophyColor, setTrophyColor] = useState<string>('')
  const [activeDot, setActiveDot] = useState<string>('0')
  const [isJudge, setIsJudge] = useState<boolean>(false)
  const [trophyId, setTrophyId] = useState<string>('')
  const [gameTaskState, setGameTaskState] =
    useState<IGameTaskState>(DEFAULT_GAME_STATE)
  const { setIsLoading } = useLoading()
  const { queryAccount } = useAccount()

  const loadGameGameState = async (player: string): Promise<void> => {
    try {
      setIsLoading(true)
      const { tokenContract, gameContract }: IFweb3Contracts =
        loadFweb3Contracts(web3Provider)
      setTokenContract(tokenContract || null)
      setGameContract(gameContract || null)

      const { taskState, currentCompletedDots, activeDot } =
        await getCurrentGame(player, !!isCypress)

      setCompletedTasks(currentCompletedDots)
      setGameTaskState(taskState)
      setActiveDot(activeDot)

      setHasWonGame(!!taskState?.hasWonGame)
      setTrophyId(taskState?.trophyId?.toString() || '')

      const trophyColor = calcTrophyColor(taskState?.trophyId?.toString() || '')
      setTrophyColor(trophyColor)

      setIsFetchingGameData(false)
      setIsLoading(false)
      logger.log('[+] Game state loaded')
    } catch (err: GameError) {
      console.error(err)
      resetGameState()
      setIsLoading(false)
    }
  }

  const resetGameState = () => {
    setCompletedTasks(DOTS_MAP)
    setHasWonGame(false)
    setIsVerified(false)
    setTrophyColor('')
    setActiveDot('0')
    setIsJudge(false)
    setTrophyId('')
    setGameTaskState(DEFAULT_GAME_STATE)
    logger.log('[+] game reset')
  }

  const isDotComplete = (task: DotKey): boolean => {
    return (
      Object.entries(completedTasks).filter(([, v]) => {
        if (v.task === task && v.isCompleted) {
          return v
        }
      }).length !== 0
    )
  }

  const checkIsJudge = async (player: string): Promise<boolean> => {
    if (gameContract) {
      const isJudge = await gameContract?.isJudge(player)
      isJudge && logger.log(`[+] is judge]`)
      return isJudge
    }
    return false
  }

  const checkVerification = async (player: string) => {
    if (gameContract) {
      const isVerified = await gameContract?.hasBeenVerifiedToWin(player)
      return isVerified
    }
    return false
  }

  useEffect(() => {
    if (isConnected && isAllowedNetwork) {
      ;(async () => {
        try {
          // only check connected account for judge
          const isJudge = await checkIsJudge(account)
          setIsJudge(isJudge)
        } catch (err: GameError) {
          console.error(err)
        }
      })()
    }
  }, [isConnected, isAllowedNetwork]) // eslint-disable-line

  useEffect(() => {
    ;(async () => {
      if ((isConnected || !!queryAccount) && isAllowedNetwork) {
        await loadGameGameState(queryAccount?.toString() ?? account)
      }
    })()
  }, [isConnected, queryAccount]) // eslint-disable-line

  useEffect(() => {
    const shouldVerifyWin =
      isConnected &&
      !!gameContract &&
      hasWonGame &&
      parseInt(trophyId || '0') < 1

    if (shouldVerifyWin) {
      ;(async () => {
        setIsLoading(true)
        try {
          const isVerified = await checkVerification(account)
          setIsVerified(isVerified)
        } catch (err: GameError) {
          console.error(err)
          setIsLoading(false)
        }
      })()
    }
    // eslint-disable-next-line
  }, [web3Provider, gameContract, hasWonGame, trophyId, account])

  return (
    <GameContext.Provider
      value={{
        activeDot,
        setActiveDot,
        gameTaskState,
        trophyId,
        hasWonGame,
        isFetchingGameData,
        gameContract,
        tokenContract,
        completedTasks,
        trophyColor,
        isVerified,
        isJudge,
        resetGameState,
        isDotComplete,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

const useGame = () => useContext(GameContext)

export { GameProvider, useGame }
