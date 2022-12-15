import { DisconnectButton } from './Buttons/Disconnect'
import { ProfileButton } from './Buttons/Profile'
import { useUser, useAccount } from '../providers'
import ButtonGroup from '@mui/material/ButtonGroup'
import MuiAppBar from '@mui/material/AppBar'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { InfoButton } from './Buttons/InfoButton'

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

export function AppBar() {
  const { loading } = useUser()
  return (
    <Box
      sx={{
        position: 'fixed',
        width: '100%',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '1em',
        background: 'rgba(0,0,0,0.5)',
      }}
    >
      {loading ? (
        <Skeleton width={200} height={50} animation="wave" />
      ) : (
        <>
          <AddressDisplay />
          <ButtonGroup>
            <ProfileButton />
            <DisconnectButton />
            <InfoButton />
          </ButtonGroup>
        </>
      )}
    </Box>
  )
}
