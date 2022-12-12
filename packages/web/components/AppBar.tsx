import { ButtonGroup } from '@mui/material'
import { ConnectButton } from './Buttons/Connect'
import { Container } from '@mui/system'
import { DisconnectButton } from './Buttons/Disconnect'
import { ProfileButton } from './Buttons/Profile'
import { useAccount } from 'wagmi'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export function AppBar() {
  const { address } = useAccount()
  const smallAccountAddr = address && address?.slice(0, 6) + '...' + address?.slice(-4)
  return (
    <MuiAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fweb3
          </Typography>
          <Typography variant="body1" component="div" marginRight={3}>
            {smallAccountAddr}
          </Typography>
          <ButtonGroup>
            <ProfileButton />
            <ConnectButton />
            <DisconnectButton />
          </ButtonGroup>
        </Toolbar>
      </Container>
    </MuiAppBar>
  )
}
