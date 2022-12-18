import { useAccount, useNetwork } from '../../providers'
import LinkIcon from '@mui/icons-material/Link'
import LinkOffIcon from '@mui/icons-material/LinkOff'
import Typography from '@mui/material/Typography'
import { useState, useMemo } from 'react'
import Box from '@mui/material/Box';

const ALLOWED_CHAINS: { [key: number]: string } = {
  80001: 'Mumbai [testnet]',
  137: 'Polygon',
  5: 'Goerli [testnet]',
  1: 'Ethereum',
}


export function NetworkInfo() {
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
  }, [netName])

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {isConnected ? (
        <LinkIcon
          color="success"
          sx={{
            padding: '0 0.2em',
          }}
        />
      ) : (
        <LinkOffIcon
          color="error"
          sx={{
            marginRight: '0.2em',
          }}
        />
      )}
      <Typography variant="caption">{displayText}</Typography>
    </Box>
  )
}
