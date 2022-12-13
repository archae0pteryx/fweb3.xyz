import { Box } from '@mui/system'
import { DebugAppState } from './DebugAppState'
import { NetworkInfo } from './NetworkInfo'

const style = {
  position: 'fixed',
  width: '100%',
  height: '3em',
  bottom: 0,
  left: 0,
  color: 'white',
}

export function FooterBar() {
  return (
    <Box sx={style}>
      <DebugAppState />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <NetworkInfo />
      </Box>
    </Box>
  )
}
