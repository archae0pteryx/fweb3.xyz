import { Box, Typography } from '@mui/material'
import { useUser } from '../modules/user/useUser'
import { PinkBox } from '../components/shared/Boxes'
import { Heading } from '../components/shared/Typography'
import { Button, LinkButton } from '../components/shared/Buttons'
import { useAccount } from 'wagmi'
import { HeadBlock } from '../components/shared/HeadBlock'
import { useState, useEffect } from 'react'

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
    return <Button color="error">Install metamask</Button>
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
