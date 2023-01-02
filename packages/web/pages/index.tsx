import { Box, Typography } from '@mui/material'
import { HeadBlock } from '../components/shared/HeadBlock'
import { Heading } from '../components/shared/Typography'
import { LinkButton } from '../components/shared/Buttons'
import { PinkBox } from '../components/shared/Boxes'
import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react'
import { useUser } from '../modules/user/useUser'

const ActionButtons = () => {
  const [onboarding, setOnboarding] = useState(false)
  const { address } = useAccount()
  const { user } = useUser(address)

  useEffect(() => {
    if (window && !window.ethereum) {
      setOnboarding(true)
    }
  }, [])

  if (onboarding) {
    return (
      <LinkButton color="error" to="/instructions">
        Setup instructions
      </LinkButton>
    )
  }

  if (user.address) {
    return <LinkButton to="/tasks">Continue</LinkButton>
  }

  return <LinkButton to="/play">Play</LinkButton>
}

export default function HomeView() {
  return (
    <>
      <HeadBlock />
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: -1,
        }}
      >
        <PinkBox
          sx={{
            padding: 5,
          }}
        >
          <Heading align="center" marginBottom={3} color="secondary">
            fweb3
          </Heading>
          <Typography align="center" variant="h5" marginBottom={3}>
            the f@ck is web3?
          </Typography>
          <Box display="flex" gap={3} justifyContent="center" width="100%">
            <ActionButtons />
            <LinkButton to="/about">about</LinkButton>
          </Box>
        </PinkBox>
      </Box>
    </>
  )
}
