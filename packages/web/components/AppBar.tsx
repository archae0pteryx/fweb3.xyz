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
import Box from '@mui/material/Box'

function AddressDisplay() {
  const { address } = useAccount()
  const { userAddress, displayName } = useUser()
  const color = address === userAddress ? 'lightgreen' : 'grey'
  if (!address) return null
  return (
    <Typography color={color} variant="body2" marginRight={3}>
      {displayName}
    </Typography>
  )
}

function renderAppButtons() {
  const { loading } = useUser()
  return loading ? (
    <Skeleton width={200} height={50} animation="wave" />
  ) : (
    <Box
      sx={{
        display: {
          xs: 'none',
          sm: 'flex',
        },
        alignItems: 'center',
      }}
    >
      <AddressDisplay />
      <ButtonGroup>
        <ProfileButton />
        <ConnectButton />
        <DisconnectButton />
      </ButtonGroup>
    </Box>
  )
}

export function AppBar() {
  return (
    <MuiAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            component="div"
            sx={{
              margin: {
                xs: '0 auto',
                sm: '1em',
              },
              typography: {
                xs: 'h4',
                sm: 'h6',
              },
              flexGrow: 1,
              textAlign: {
                xs: 'center',
                sm: 'left',
              },
            }}
          >
            Fweb3
          </Typography>
          {renderAppButtons()}
        </Toolbar>
      </Container>
    </MuiAppBar>
  )
}
