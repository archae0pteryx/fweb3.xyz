import type { IGameTaskState } from '../types/game'

export const DEFAULT_GAME_STATE: IGameTaskState = {
  tokenBalance: '0',
  hasEnoughTokens: false, // 1
  hasUsedFaucet: false, // 2
  hasSentTokens: false, // 3
  hasMintedNFT: false, // 4
  hasBurnedTokens: false, // 5
  hasSwappedTokens: false, // 6
  hasVotedInPoll: false, // 7
  hasDeployedContract: false, // 8
  hasWonGame: false,
  isConnected: false,
  trophyId: '',
  maticBalance: '',
}

export const DEFAULT_WON_GAME_STATE: IGameTaskState = {
  tokenBalance: '0',
  hasEnoughTokens: true,
  hasUsedFaucet: true,
  hasSwappedTokens: true,
  hasVotedInPoll: true,
  hasDeployedContract: true,
  hasSentTokens: true,
  hasBurnedTokens: true,
  hasMintedNFT: true,
  trophyId: '0',
  maticBalance: '',
}

export const DEV_GAME_STATE: IGameTaskState = {
  tokenBalance: '300000000000000000000',
  hasEnoughTokens: false, // 1
  hasUsedFaucet: false, // 2
  hasSentTokens: false, // 3
  hasMintedNFT: false, // 4
  hasBurnedTokens: false, // 5
  hasSwappedTokens: false, // 6
  hasVotedInPoll: false, // 7
  hasDeployedContract: false, // 8
  hasWonGame: false,
  isConnected: false,
  trophyId: '',
  maticBalance: '100000000000000000',
}
