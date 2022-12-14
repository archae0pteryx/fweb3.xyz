import { FlexBox } from '../common/Boxes'
import { useAccount, useError, useNetwork } from '../../providers'
import LinkIcon from '@mui/icons-material/Link'
import LinkOffIcon from '@mui/icons-material/LinkOff'
import Typography from '@mui/material/Typography'
import { useState, useMemo } from 'react'

const ALLOWED_CHAINS: { [key: number]: string } = {
  80001: 'Mumbai [testnet]',
  137: 'Polygon',
  5: 'Goerli [testnet]',
  1: 'Ethereum',
}

const iconStyle = {
  marginRight: '0.4em',
}

export function NetworkInfo() {
  const { isConnected } = useAccount()
  const [displayText, setDisplayText] = useState<string>('')
  const { setError } = useError()
  const { chain } = useNetwork()
  const netName = chain?.name || 'Unknown'
  const allowedInfo = ALLOWED_CHAINS[chain?.id || 0]
  const connectedText = isConnected ? netName : 'Disconnected'

  useMemo(() => {
    if (!allowedInfo && isConnected) {
      setDisplayText(`Unsupported network: ${netName}`)
      setError(`${netName} Is not a supported network`)
    } else {
      setError('')
      setDisplayText(connectedText)
    }
  }, [netName])

  return (
    <FlexBox
      sx={{
        justifyContent: 'space-between',
      }}
    >
      {isConnected ? <LinkIcon color="success" sx={iconStyle} /> : <LinkOffIcon color="error" sx={iconStyle} />}
      <Typography variant="caption">{displayText}</Typography>
    </FlexBox>
  )
}
