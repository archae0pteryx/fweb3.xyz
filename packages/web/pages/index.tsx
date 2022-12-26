import { useRouter } from 'next/router'
import { Box, Typography } from '@mui/material'
import { TransitionGroup } from 'react-transition-group'
import Fade from '@mui/material/Fade'
import { useUser } from '../providers/user'
import { PinkBox } from '../components/shared/Boxes'
import { Heading, SubHeading } from '../components/shared/Typography'
import { Button } from '../components/shared/Buttons'
import { useToast } from '../providers/toast'

export default function HomeView() {
  const { triggerToast } = useToast()
  const { isValidUser, initialized, loading, onboarding } = useUser()
  const router = useRouter()
  const ready = initialized && !loading

  const handleSubmit = () => {
    if (onboarding) {
      router.push('/onboard')
    } else if (isValidUser) {
      router.push('/game')
    } else {
      router.push('/start')
    }
  }
  return (
    <Box display="flex" alignItems="center" justifyContent="center" marginTop={20}>
      {!ready ? (
        <Typography variant="h5">Loading...</Typography>
      ) : (
        <TransitionGroup>
          <Fade in={true} timeout={1000}>
            <Box>
              <PinkBox>
                <SubHeading>Learn web3. Win sh*t</SubHeading>
                <Heading sx={{ margin: 5 }}>fweb3</Heading>
                <Fade in={true} timeout={2000}>
                  <Box display="flex" justifyContent="space-around" width="100%">
                    <Button onClick={handleSubmit}>start</Button>
                    <Button onClick={() => router.push('/about')}>about</Button>
                  </Box>
                </Fade>
              </PinkBox>
              {isValidUser && (
                <Box marginTop={5}>
                  <Button variant="outlined" color="info" fullWidth onClick={() => router.push('/game')}>
                    continue
                  </Button>
                </Box>
              )}
            </Box>
          </Fade>
        </TransitionGroup>
      )}
    </Box>
  )
}
