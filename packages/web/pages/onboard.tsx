import { Box, Typography, SvgIcon, Button } from '@mui/material'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { useUser } from '../providers'

export default function OnboardingPage() {
  const { handleNewUser } = useUser()
  const [emailError, setEmailError] = useState('')
  const [email, setEmail] = useState('aarchaeopteryxx@gmail.com')

  const handleSubmit = async () => {
    try {
      setEmailError('')
      if (!email?.includes('@')) {
        setEmailError('Invalid Email')
        return
      }

      await handleNewUser(email)
      setEmail('')
    } catch (err: any) {
      setEmailError(err.message)
    }
  }

  const handleKey = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      await handleSubmit()
    }
  }
  return (
    <Box margin={8}>
      <Typography color="warning.main" variant="h5" marginBottom={3}>
        Welcome!
      </Typography>
      <Typography variant="body2">Looks like you&apos;re brand new.</Typography>
      <Typography variant="body2">We&apos;re gonna need to verify you. Cause... well..</Typography>
      <Typography variant="h6" color="error.main" marginTop={2}>
        Bots.
      </Typography>
      <Box display="flex" alignItems="center" flexDirection="column">
        <TextField
          fullWidth
          variant="outlined"
          color="secondary"
          label="Email Address"
          error={!!emailError}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText={emailError}
          InputProps={{
            startAdornment: <MailIcon />,
            sx: {
              color: 'info.main',
            },
          }}
          sx={{
            marginTop: 4,
          }}
          onKeyPress={handleKey}
        />
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          sx={{
            marginTop: 4,
          }}
        >
          Verify
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" marginTop={5}>
        <Typography variant="caption" color="warning.main">
          We&apos;ll send you a verification email. You click. We good.
        </Typography>
      </Box>
    </Box>
  )
}

function MailIcon() {
  return (
    <SvgIcon
      sx={{
        transform: 'translate(-6px, 5px)',
      }}
    >
      <svg width="32" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#pixel_mail)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.55528 2.15127C2.51152 2.20731 2.51152 28.3005 2.55528 28.3565C2.60224 28.4166 28.8333 28.412 28.8803 28.3518C28.9437 28.2707 28.9277 2.21765 28.8642 2.15834C28.7977 2.09596 2.60384 2.08899 2.55528 2.15127ZM22.9859 5.88938L23.0498 5.92052L23.0563 7.77016L23.0627 9.61969L24.4854 9.62799C25.4855 9.63383 25.9181 9.64684 25.9417 9.67194C26.0047 9.73893 25.99 24.573 25.9269 24.6164C25.8431 24.6737 5.57264 24.6615 5.51128 24.604C5.45272 24.5492 5.41992 9.76915 5.47816 9.67931C5.50136 9.64346 5.76184 9.63578 6.9408 9.63578H8.37528L8.376 11.4524C8.37664 12.83 8.38416 13.2814 8.40728 13.3199C8.4472 13.3866 9.53592 13.4229 10.5753 13.3922L11.2946 13.371L11.3037 12.7439C11.3086 12.3989 11.3071 11.562 11.3002 10.8842L11.2878 9.65176L9.83776 9.63578L8.38776 9.61969L8.38128 7.79782C8.37536 6.13667 8.37848 5.97082 8.4164 5.91714C8.46408 5.84963 22.848 5.82228 22.9859 5.88938ZM20.1332 9.67573C20.1222 9.69775 20.1124 10.5152 20.1114 11.4925C20.1103 12.4697 20.1074 13.2943 20.1049 13.3251C20.1006 13.3777 20.0148 13.3814 18.719 13.3849C17.9593 13.387 17.304 13.398 17.2627 13.4092L17.1878 13.4298V15.2862V17.1426L18.6127 17.1503C19.4829 17.1549 20.0523 17.1461 20.0752 17.1275C20.1077 17.101 20.1131 16.8551 20.1159 15.2696C20.1178 14.2645 20.1262 13.4333 20.1346 13.4224C20.1432 13.4116 20.7886 13.4009 21.569 13.3988C22.3493 13.3966 23.0018 13.3838 23.019 13.3702C23.0434 13.3508 23.0502 12.9398 23.0502 11.4905V9.63578H21.6017C20.4702 9.63578 20.1488 9.64448 20.1332 9.67573ZM11.3941 13.4041C11.2955 13.4232 11.2975 13.3799 11.3055 15.3124C11.3125 17.0074 11.3144 17.0693 11.3613 17.1132C11.4018 17.1511 11.6411 17.1586 12.8154 17.1586H14.2209L14.2389 17.2946C14.2488 17.3695 14.2532 17.8341 14.2487 18.327C14.233 20.0323 14.2454 20.7972 14.2895 20.8537C14.357 20.9402 17.113 20.929 17.1494 20.8421C17.1663 20.8015 17.1752 20.1564 17.1753 18.9694V17.1586H15.7127H14.2502V15.3202C14.2502 13.6915 14.2458 13.476 14.211 13.4315C14.1736 13.3836 11.6272 13.3588 11.3941 13.4041Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="pixel_mail">
            <rect width="32" height="32" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  )
}
