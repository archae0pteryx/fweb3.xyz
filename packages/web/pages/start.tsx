import { Box, Typography, useTheme } from '@mui/material'
import { useUser } from '../providers'
import { useRouter } from 'next/router'
import { BodyText, SubHeading, SmallText } from '../components/common/Typography'
import { Button } from '../components/common/Buttons'
import { BsCheckCircle } from 'react-icons/bs'

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
