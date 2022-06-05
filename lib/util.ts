import { ethers } from 'ethers'

export const fetcher = async (uri: string, config = {}): Promise<unknown> => {
  const res = await fetch(uri, config)
  return res.json()
}

export const prettyParseBalance = (
  value: string,
  decimals = 18,
  decimalsToDisplay = 0
): string => {
  return ethers.utils.commify(
    parseFloat(ethers.utils.formatUnits(value, decimals)).toFixed(
      decimalsToDisplay
    )
  )
}

export const balanceToInt = (
  value: string,
  decimals = 18,
  decimalsToDisplay = 0
): number =>
  parseInt(
    parseFloat(ethers.utils.formatUnits(value, decimals)).toFixed(
      decimalsToDisplay
    )
  )

export const sleep = (milliseconds = 0): void => {
  const date: number = Date.now()
  let currentDate = null
  do {
    currentDate = Date.now()
  } while (currentDate - date < milliseconds)
}
