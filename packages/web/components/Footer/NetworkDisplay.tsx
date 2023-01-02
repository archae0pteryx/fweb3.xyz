import { Typography, Box } from '@mui/material'
import { useState, useMemo } from 'react'
import { useAccount, useNetwork } from 'wagmi'

const ALLOWED_CHAINS: { [key: number]: string } = {
  80001: 'Mumbai [testnet]',
  137: 'Polygon',
  5: 'Goerli [testnet]',
  1: 'Ethereum',
}

export function NetworkDisplay() {
  const { isConnected } = useAccount()
  const [displayText, setDisplayText] = useState<string>('')
  const { chain } = useNetwork()
  const netName = chain?.name || 'Unknown'
  const allowedInfo = ALLOWED_CHAINS[chain?.id || 0]
  const connectedText = isConnected ? netName : 'Disconnected'

  useMemo(() => {
    if (!allowedInfo && isConnected) {
      setDisplayText(`Unsupported network: ${netName}`)
    } else {
      setDisplayText(connectedText)
    }
  }, [netName, isConnected, allowedInfo, connectedText])

  return (
    <Box>
      <Typography variant="caption">{displayText}</Typography>
    </Box>
  )
}
