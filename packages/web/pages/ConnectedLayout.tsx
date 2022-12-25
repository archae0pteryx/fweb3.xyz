import { Box, Button, Typography } from '@mui/material'
import { useAccount } from '../providers'
import { useUser } from '../providers/user'

const Navbar = () => {
  const { address, disconnectUser, connectUser } = useUser()
  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" marginY={3}>
      {address ? (
        <Button color="warning" variant="contained" onClick={disconnectUser}>
          disconnect
        </Button>
      ) : (
        <Button color="info" onClick={connectUser}>
          connect
        </Button>
      )}
    </Box>
  )
}

export function ConnectedLayout({ children }: { children: React.ReactNode }) {
  // const { loading, isConnected, address, isConnecting } = useUser()
  return (
    <Box margin={2}>
      <Navbar />
      {children}
    </Box>
  )
}
