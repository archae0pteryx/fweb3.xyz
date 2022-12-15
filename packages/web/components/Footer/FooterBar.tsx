import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useAccount } from '../../providers'
import { DebugButton } from './DebugButton'
import { NetworkInfo } from './NetworkInfo'
import { FaDiscord } from 'react-icons/fa'
import { FaGithubAlt } from 'react-icons/fa'
import { useRouter } from 'next/router'
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
  const router = useRouter()
  const { isConnected } = useAccount()
  console.log('isConnected', isConnected)
  return (
    <Box sx={mainContainerStyle}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '4em',
          marginLeft: '1em',
        }}
      >
        <IconButton onClick={() => router.push('https://discord.gg/4TRUmNrw')}>
          <FaDiscord size={30} />
        </IconButton>
        <IconButton onClick={() => router.push('https://github.com/archae0pteryx/fweb3.xyz')}>
          <FaGithubAlt size={30} />
        </IconButton>
      </Box>
      {isConnected && (
        <>
          <DebugButton />
          <NetworkInfo />
        </>
      )}
    </Box>
  )
}
