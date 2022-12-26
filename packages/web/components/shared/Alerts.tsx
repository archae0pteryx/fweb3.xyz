import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material'
import { useUser } from '../../providers'

export function VerifyEmailAlert() {
  const { emailMessageId, isValidUser, resendVerifyEmail } = useUser()
  if (isValidUser) {
    return <></>
  }

  if (emailMessageId) {
    return (
      <Alert severity="warning">
        <Typography variant="caption">
          You need to verify your account before you can play. Check your email for a verification link.
        </Typography>
        <Button color='error' onClick={resendVerifyEmail}>resend</Button>
      </Alert>
    )
  }

  return <></>
}
