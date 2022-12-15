import { Box } from '@mui/material'
import { ConnectButton } from '../Buttons/Connect'
import { ClosedChest } from '../common/ClosedChest'

export default function HomeView() {
  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: -1,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ClosedChest />
      <ConnectButton />
    </Box>
  )
}
