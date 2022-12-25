import { Box, Card, Typography, styled, Skeleton, List, ListItem, useTheme, SvgIcon } from '@mui/material'
import { useUser } from '../providers'
import { ConnectedLayout } from '../components/common/ConnectedLayout'
import { TaskList } from '../components/Play/Tasks'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import { useRouter } from 'next/router'
import { useFeature, FEATURE_FLAGS } from '../providers/feature'
import { PlayerProgress } from '../components/Play/PlayerProgress'
import Container from '@mui/system/Container'
import { BodyText, Heading, SubHeading, SmallText } from '../components/common/Typography'
import { Button } from '../components/common/Buttons'
import { BsCheckCircle } from 'react-icons/bs'
// const PaddedBox = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(2),
// }))

// function VerifyEmailInput() {
//   const { createUser, loading, email: userEmail } = useUser()
//   const showEmailInput = useFeature(FEATURE_FLAGS.USE_EMAIL)

//   const [creatingUser, setCreatingUser] = useState(false)

//   const [email, setEmail] = useState('')

//   const handleSubmit = () => {
//     setCreatingUser(true)
//     createUser(email)
//     setEmail('')
//     setCreatingUser(false)
//   }

//   if (loading) {
//     return <Skeleton variant="rounded" width='100%' height={100} />
//   }

//   if (userEmail || !showEmailInput) {
//     return null
//   }

//   return (
//     <PaddedBox>
//       <TextField id="email" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <Button onClick={handleSubmit}>{creatingUser ? 'Loading...' : 'Verify'}</Button>
//     </PaddedBox>
//   )
// }

// function HowToPlayMessage() {
//   const { isValidUser } = useUser()
//   if (isValidUser) return null
//   return (
//     <PaddedBox marginTop={10}>
//       <Typography variant="h5" marginBottom={5}>How to play</Typography>
//       <Typography variant="body1">Complete 9 tasks to win a totally unique NFT.</Typography>
//       <Typography variant="body1">
//         The first of these tasks is to verify that you are not a bot. Enter your email below and click the verify link
//         to get to the next step.
//       </Typography>
//     </PaddedBox>
//   )
// }

// function ReconnectMessage() {
//   const { loading } = useUser()
//   if (loading) {
//     return <Skeleton variant="rounded" width="100%" height={100} />
//   }
//   return (
//     <Card>
//       <Typography variant="body1" color="warning.main" margin={3}>
//         If you already have a wallet you&apos;ve been playing with, you should connect it now. Otherwise, lets start a
//         new game!
//       </Typography>
//     </Card>
//   )
// }

// function NotConnectedButtons() {
//   const { connectUser, loading } = useUser()
//   const router = useRouter()

//   if (loading) {
//     return <Skeleton variant="rounded" width="100%" height={100} />
//   }

//   return (
//     <Card
//       sx={{
//         position: 'absolute',
//         bottom: '20%',
//         width: '80%',
//       }}
//     >
//       <Typography align="center" variant="caption">Please connect your wallet or go to install instructions</Typography>
//       <Box display="flex" justifyContent="space-around" flexDirection="row" margin={4}>
//         <Button size="small" variant="contained" onClick={() => connectUser()}>
//           Connect
//         </Button>
//         <Button size="small" variant="contained" onClick={() => router.push('/onboard')}>
//           Install
//         </Button>
//       </Box>
//     </Card>
//   )
// }

// function NewGame() {
//   const { isConnected } = useUser()

//   return (
//     <Box sx={{
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: '100%',
//     }}>
//       <ReconnectMessage />
//       <HowToPlayMessage />
//       {!isConnected ? <NotConnectedButtons /> : <VerifyEmailInput />}
//     </Box>
//   )
// }

function RuleItemBox({ children, checked = false }: { children: React.ReactNode; checked?: boolean }) {
  const theme = useTheme()
  return (
    <Box display="flex" justifyContent="flex-start" alignItems="center">
      {checked ? (
        <Typography
          variant="h4"
          sx={{
            marginRight: theme.spacing(2),
            color: theme.palette.success.main,
          }}
        >
          <BsCheckCircle />
        </Typography>
      ) : (
        <Box sx={{ width: 40 }}></Box>
      )}
      {children}
    </Box>
  )
}

export default function StartPage() {
  const { isConnected, connectUser, isValidUser, onboarding } = useUser()
  const router = useRouter()
  const theme = useTheme()

  const handleStartGame = async () => {
    if (!isConnected) {
      await connectUser()
    }

    if (onboarding) {
      router.push('/onboard')
      return
    }

    if (!isValidUser) {
      router.push('/verify')
      return
    }
    router.push('/game')
    return
  }

  return (
    <Box>
      <Box
        sx={{
          margin: theme.spacing(3),
        }}
      >
        <SubHeading
          sx={{
            marginBottom: theme.spacing(5),
          }}
        >
          Complete web3 tasks, earn unique NFT&apos;s
        </SubHeading>
        <BodyText color="info.main">No coding is required. But you will be exposed to some.</BodyText>
      </Box>
      <Box
        sx={{
          marginX: theme.spacing(3),
          marginY: theme.spacing(3),
        }}
      >
        <BodyText>How to play</BodyText>
        <RuleItemBox checked={isConnected}>
          <SmallText>{onboarding ? 'Install a browser wallet' : 'Connect your wallet'}</SmallText>
        </RuleItemBox>
        <RuleItemBox checked={isValidUser}>
          <SmallText>Verify you&apos;re not a bot</SmallText>
        </RuleItemBox>
        <RuleItemBox>
          <SmallText>Start completing challenges</SmallText>
        </RuleItemBox>
        <Box display="flex" marginY={5} justifyContent="center">
          {onboarding ? <Button>Install wallet</Button> : <Button onClick={() => handleStartGame()}>Lets go</Button>}
        </Box>
      </Box>
    </Box>
  )
}
