import { ConnectButton } from './Buttons/Connect'
import { DisconnectButton } from './Buttons/Disconnect'
import { ProfileButton } from './Buttons/Profile'
import { useUser, useAccount } from '../providers'
import ButtonGroup from '@mui/material/ButtonGroup'
import Container from '@mui/system/Container'
import MuiAppBar from '@mui/material/AppBar'
import Skeleton from '@mui/material/Skeleton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

function AddressDisplay({ short = true }: { short?: boolean }) {
  const { address } = useAccount()
  const { userAddress } = useUser()
  const display = short ? address?.slice(0, 6) + '...' + address?.slice(-4) : address
  const color = address === userAddress ? 'lightgreen' : 'grey'
  if (!address) return null
  return (
    <Typography color={color} variant="body2" marginRight={3}>
      {display}
    </Typography>
  )
}

function renderAppButtons() {
  const { loading } = useUser()
  return loading ? (
    <Skeleton width={200} height={50} animation="wave" />
  ) : (
    <>
      <AddressDisplay />
      <ButtonGroup>
        <ProfileButton />
        <ConnectButton />
        <DisconnectButton />
      </ButtonGroup>
    </>
  )
}

export function AppBar() {
  return (
    <MuiAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fweb3
          </Typography>
          {renderAppButtons()}
        </Toolbar>
      </Container>
    </MuiAppBar>
  )
}
