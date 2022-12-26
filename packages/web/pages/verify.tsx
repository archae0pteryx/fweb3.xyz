import { Box, TextField, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { LoadingButton } from '../components/common/Buttons'
import { ConnectedLayout } from '../components/common/ConnectedLayout'
import { useToast, useUser } from '../providers'
import { SubHeading, BodyText } from '../components/common/Typography'
import { MailIcon } from '../components/common/MailIcon'
import { useRouter } from 'next/router'

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

export default function VerifyPage() {
  const { loading, createUser, emailSent, setEmailSent, isValidUser } = useUser()
  const { triggerToast } = useToast()
  const [emailError, setEmailError] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const router = useRouter()
  const theme = useTheme()

  const handleSubmit = () => {
    if (!email.match(EMAIL_REGEX)) {
      setEmailError('Invalid email')
      return
    }
    createUser(email)
    triggerToast('Email sent')
    setEmailSent(true)
    router.push('/')
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  if (isValidUser) {
    router.push('/game')
    return null
  }

  return (
    <ConnectedLayout>
      {emailSent ? (
        <Typography>Please check your email / spam folder</Typography>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <SubHeading>We need to verify you&apos;re not a bot.</SubHeading>
          <BodyText>Your email will not be saved</BodyText>
          <Box display="flex" alignItems="center" marginTop={theme.spacing(5)} gap={3} width="100%">
            <TextField
              error={!!emailError}
              helperText={emailError}
              fullWidth
              value={email}
              onKeyPress={handleKey}
              onChange={(e: any) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: <MailIcon />,
                sx: {
                  color: 'info.main',
                },
              }}
            />
            <LoadingButton loading={loading} onClick={handleSubmit}>
              Verify
            </LoadingButton>
          </Box>
        </Box>
      )}
    </ConnectedLayout>
  )
}
