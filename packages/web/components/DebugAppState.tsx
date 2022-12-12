import { useAccount, useUser, useNetwork } from '../providers'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export function DebugAppState() {
  const { address } = useAccount()
  const net = useNetwork()
  const { userAddress, onboarding, showOnboardModal, loading, error, role, email, verified, discord, disabled } =
    useUser()
  const DEBUG_DATA = {
    wagmi: {
      address: address?.substring(0, 5),
      chain: net?.chain?.id,
      net: net.chain?.name,
    },
    graphql: {
      loading,
      error,
      userAddress: userAddress?.substring(0, 5),
      onboarding,
      showOnboardModal,
      role,
      email,
      discord,
      verified,
      disabled,
    },
  }
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 2,
        margin: 2,
        borderRadius: 2,
        color: 'grey',
        background: 'rgba(0,0,0,0.2)',
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
        }}
      >
        {JSON.stringify(DEBUG_DATA)}
      </Typography>
    </Box>
  )
}
