import { useAccount, useUser, useNetwork } from '../../providers'
import Box from '@mui/material/Box'

export function DebugInfo() {
  const { address } = useAccount()
  const net = useNetwork()
  const { userAddress, role, email, verified, discord, disabled, foundUser } = useUser()
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '4em',
        left: '1em',
        padding: '1em',
        background: 'rgba(0,0,0,0.5)',
        borderRadius: '1em',
      }}
    >
      <pre>
        {JSON.stringify(
          {
            wagmi: {
              address: address?.substring(0, 5),
              chain: net?.chain?.id,
              net: net.chain?.name,
            },
            graphql: {
              foundUser,
              userAddress: userAddress?.substring(0, 5),
              role,
              email,
              discord,
              verified,
              disabled,
            },
          },
          null,
          2
        )}
      </pre>
    </Box>
  )
}
