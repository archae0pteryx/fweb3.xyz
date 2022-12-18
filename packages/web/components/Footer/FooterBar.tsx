import { AddressDisplay } from './AddressDisplay'
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
  justifyContent: 'flex-end',
}

export function FooterBar() {
  const router = useRouter()
  return (
    <>
      <Box sx={mainContainerStyle}>
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
