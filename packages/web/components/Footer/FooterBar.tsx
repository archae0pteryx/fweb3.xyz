import { NetworkDisplay } from './NetworkDisplay'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material';

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
  justifyContent: 'center',
}

export function FooterBar() {
  const theme = useTheme()
  return (
    <>
      <Box sx={mainContainerStyle}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <NetworkDisplay />
        </Box>
      </Box>
    </>
  )
}
