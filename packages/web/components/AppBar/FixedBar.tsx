import { DisconnectButton } from './Disconnect'
import { PlayButton } from './PlayButton'
import { useUser, useAccount } from '../../providers'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import { InfoButton } from './InfoButton'

export function FixedAppBar() {
  const { loading } = useUser()
  return (
    <Box
      sx={{
        position: 'fixed',
        width: '100%',
        height: '4em',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1em',
        alignItems: 'center',
        padding: '1em',
        background: 'rgba(0,0,0,0.5)',
      }}
    >
      {loading ? (
        <Skeleton width={200} height={50} animation="wave" />
      ) : (
        <>
          <PlayButton />
          <DisconnectButton />
          <InfoButton />
        </>
      )}
    </Box>
  )
}
