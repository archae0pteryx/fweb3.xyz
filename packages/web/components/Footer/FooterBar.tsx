import Box from '@mui/material/Box'
import { useAccount } from '../../providers'
import { DebugButton } from './DebugButton'
import { NetworkInfo } from './NetworkInfo'

const mainContainerStyle = {
  position: 'fixed',
  width: '100%',
  height: '4em',
  bottom: 0,
  left: 0,
  color: 'white',
  background: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

export function FooterBar() {
  const { isConnected } = useAccount()
  if (!isConnected) return null
  return (
    <Box sx={mainContainerStyle}>
      <DebugButton />
      <NetworkInfo />
    </Box>
  )
}
