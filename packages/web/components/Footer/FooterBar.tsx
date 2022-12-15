import { AddressDisplay } from './AddressDisplay'
import { DebugButton } from './DebugButton'
import { FaDiscord } from 'react-icons/fa'
import { FaGithubAlt } from 'react-icons/fa'
import { IconButton } from '@mui/material'
import { NetworkInfo } from './NetworkInfo'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'

const mainContainerStyle = {
  position: 'fixed',
  width: '100%',
  height: '80px',
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
  return (
    <>
      <DebugButton />
      <Box sx={mainContainerStyle}>
        <Box
          sx={{
            padding: '0 1em',
          }}
        >
          <IconButton onClick={() => router.push('https://discord.gg/4TRUmNrw')}>
            <FaDiscord size={30} />
          </IconButton>
          <IconButton onClick={() => router.push('https://github.com/archae0pteryx/fweb3.xyz')}>
            <FaGithubAlt size={30} />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 1em',
          }}
        >
          <AddressDisplay />
          <NetworkInfo />
        </Box>
      </Box>
    </>
  )
}
