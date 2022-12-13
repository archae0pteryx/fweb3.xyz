import { useAccount, useUser } from '../providers'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import WarningIcon from '@mui/icons-material/Warning'

export function ErrorAlert({ error }: { error: string | undefined }) {
  if (!error) return null
  return (
    <Box sx={{ flex: 1 }} margin={2}>
      <Alert severity="error">{error}</Alert>
    </Box>
  )
}

export function VerifyEmailAlert() {
  const { verified, foundUser } = useUser()
  const { isConnected } = useAccount()

  const handleResend = () => {
    console.log('resending')
  }

  const hideVerifyAlertConditions = verified || !isConnected || (isConnected && !foundUser)

  if (hideVerifyAlertConditions) {
    return null
  }

  return (
    <Box sx={{ flex: 1 }} margin={2}>
      <Alert
        icon={<WarningIcon fontSize="small" />}
        variant="outlined"
        severity="error"
        action={
          <Button disabled color="error" size="small" onClick={handleResend}>
            resend
          </Button>
        }
      >
        Please verify your email address
      </Alert>
    </Box>
  )
}
