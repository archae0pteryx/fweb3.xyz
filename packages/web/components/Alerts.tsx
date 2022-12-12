import { AlertTitle, Button } from '@mui/material'
import { useAccount } from 'wagmi'
import { useUser } from '../providers/user'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import WarningIcon from '@mui/icons-material/Warning'

export function ErrorAlert({ error }: { error: string | undefined }) {
  if (!error) return null
  return (
    <Box sx={{ flex: 1 }} margin={2}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    </Box>
  )
}

export function VerifyEmailAlert() {
  const { verified, loading, userAddress } = useUser()
  const { isConnected } = useAccount()

  const handleResend = () => {
    console.log('resending')
  }

  if (!userAddress || loading || !isConnected || verified) {
    return null
  }

  return (
    <Box sx={{ flex: 1 }} margin={2}>
      <Alert
        icon={<WarningIcon fontSize="small" />}
        variant="outlined"
        severity="error"
        action={
          <Button color="error" size="small" onClick={handleResend}>
            resend
          </Button>
        }
      >
        Please verify your email address
      </Alert>
    </Box>
  )
}
