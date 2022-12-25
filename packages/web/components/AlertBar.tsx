import { useAccount, useUser } from '../providers'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import WarningIcon from '@mui/icons-material/Warning'
import { Collapse } from '@mui/material'

export function AlertBar() {
  return (
    <>
      <VerifyEmailAlert />
      <ErrorAlert />
    </>
  )
}

function ErrorAlert() {
  const { error } = useUser()
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={!!error}>
        <Alert severity="error">{error}</Alert>
      </Collapse>
    </Box>
  )
}

function VerifyEmailAlert() {
  const { verified, onboarding, address, isConnected, email } = useUser()

  const handleResend = () => {
    console.log('resending')
  }

  const shouldAlert = isConnected && !verified && !onboarding && email

  if (!shouldAlert || !address) {
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
