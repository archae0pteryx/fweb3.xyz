import { useAccount, useError, useUser } from '../providers'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import WarningIcon from '@mui/icons-material/Warning'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Collapse, IconButton } from '@mui/material'

export function AlertBar() {
  return (
    <>
      <VerifyEmailAlert />
      <ErrorAlert />
    </>
  )
}

function ErrorAlert() {
  const { error, setError } = useError()
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={!!error}>
        <Alert
          severity="error"
          action={
            <IconButton color="error" size="small" onClick={() => setError('')}>
              <HighlightOffIcon />
            </IconButton>
          }
        >
          {error}
        </Alert>
      </Collapse>
    </Box>
  )
}

function VerifyEmailAlert() {
  const { verified, onboarding } = useUser()
  const { isConnected } = useAccount()

  const handleResend = () => {
    console.log('resending')
  }

  const shouldAlert = isConnected && !verified && !onboarding

  if (!shouldAlert) {
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
