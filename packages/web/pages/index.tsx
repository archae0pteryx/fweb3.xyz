import { useRouter } from 'next/router'
import { Box, Typography } from '@mui/material'
import { TransitionGroup } from 'react-transition-group'
import Fade from '@mui/material/Fade'
import { useUser } from '../modules/user/useUser'
import { PinkBox } from '../components/shared/Boxes'
import { Heading } from '../components/shared/Typography'
import { Button, LinkButton } from '../components/shared/Buttons'

import { validateSessionCookie } from '../modules/auth'
import { NextPageContext } from 'next'
import Cookies from 'js-cookie'
import { useAccount } from 'wagmi'

const StartOrContinueButton = () => {
  const { address } = useAccount()
  const { user } = useUser(address)
  const router = useRouter()

  if (user) {
    return (
      <LinkButton to="/game">continue</LinkButton>
    )
  } else {
    return (
      <LinkButton to="/onboard">start</LinkButton>
    )
  }
}

export default function HomeView() {
  const { address } = useAccount()
  const { user } = useUser(address)

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <PinkBox sx={{
        padding: 5
      }}>
        <Heading align="center" marginBottom={3} color="secondary">
          fweb3
        </Heading>
        <Typography align="center" variant="h5" marginBottom={3}>
          the f@ck is web3?
        </Typography>
        <Fade in={true} timeout={2000}>
          <Box display="flex" gap={3} justifyContent="center" width="100%">
            <StartOrContinueButton />
            <LinkButton to="/about">about</LinkButton>
          </Box>
        </Fade>
      </PinkBox>
    </Box>
  )
}
