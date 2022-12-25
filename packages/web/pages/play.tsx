import { Box, Card, Typography, styled, Button, Skeleton } from '@mui/material'
import { useUser } from '../providers'
import { ConnectedLayout } from './ConnectedLayout'
import { TaskList } from '../components/Play/Tasks'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import { useRouter } from 'next/router'
import { useFeature, FEATURE_FLAGS } from '../providers/feature';
import { PlayerProgress } from '../components/Play/PlayerProgress';

const PaddedBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}))

function VerifyEmailInput() {
  const { createUser, loading, email: userEmail } = useUser()
  const showEmailInput = useFeature(FEATURE_FLAGS.USE_EMAIL)

  const [creatingUser, setCreatingUser] = useState(false)

  const [email, setEmail] = useState('')

  const handleSubmit = () => {
    setCreatingUser(true)
    createUser(email)
    setEmail('')
    setCreatingUser(false)
  }

  if (loading) {
    return <Skeleton variant="rounded" width='100%' height={100} />
  }

  if (userEmail || !showEmailInput) {
    return null
  }

  return (
    <PaddedBox>
      <TextField id="email" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button onClick={handleSubmit}>{creatingUser ? 'Loading...' : 'Verify'}</Button>
    </PaddedBox>
  )
}

function HowToPlayMessage() {
  const { isValidUser } = useUser()
  if (isValidUser) return null
  return (
    <PaddedBox marginTop={10}>
      <Typography variant="h5" marginBottom={5}>How to play</Typography>
      <Typography variant="body1">Complete 9 tasks to win a totally unique NFT.</Typography>
      <Typography variant="body1">
        The first of these tasks is to verify that you are not a bot. Enter your email below and click the verify link
        to get to the next step.
      </Typography>
    </PaddedBox>
  )
}

function ReconnectMessage() {
  const { loading } = useUser()
  if (loading) {
    return <Skeleton variant="rounded" width="100%" height={100} />
  }
  return (
    <Card>
      <Typography variant="body1" color="warning.main" margin={3}>
        If you already have a wallet you&apos;ve been playing with, you should connect it now. Otherwise, lets start a
        new game!
      </Typography>
    </Card>
  )
}

function NotConnectedButtons() {
  const { connectUser, loading } = useUser()
  const router = useRouter()

  if (loading) {
    return <Skeleton variant="rounded" width="100%" height={100} />
  }

  return (
    <Card
      sx={{
        position: 'absolute',
        bottom: '20%',
        width: '80%',
      }}
    >
      <Typography align="center" variant="caption">Please connect your wallet or go to install instructions</Typography>
      <Box display="flex" justifyContent="space-around" flexDirection="row" margin={4}>
        <Button size="small" variant="contained" onClick={() => connectUser()}>
          Connect
        </Button>
        <Button size="small" variant="contained" onClick={() => router.push('/onboard')}>
          Install
        </Button>
      </Box>
    </Card>
  )
}

function NewGame() {
  const { isConnected } = useUser()

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    }}>
      <ReconnectMessage />
      <HowToPlayMessage />
      {!isConnected ? <NotConnectedButtons /> : <VerifyEmailInput />}
    </Box>
  )
}

export default function PlayPage() {
  const { isValidUser } = useUser()
  return <ConnectedLayout>{isValidUser ? <PlayerProgress /> : <NewGame />}</ConnectedLayout>
}
