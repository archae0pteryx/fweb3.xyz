import { useRouter } from 'next/router'
import { Box, Typography } from '@mui/material'
import { TransitionGroup } from 'react-transition-group'
import Fade from '@mui/material/Fade'
import { useUser } from '../providers/user'
import { useFeature } from '../providers/feature'
import { PinkBox } from '../components/common/PinkBox'
import { Heading, SubHeading } from '../components/common/Typography'
import { Button } from '../components/common/Buttons'
import { useToast } from '../providers/alert';

const renderMaintenanceMessage = () => (
  <Typography variant="body2" color="warning.main">
    Disabled for maintenance
  </Typography>
)

export default function HomeView() {
  const isMaintenance = useFeature('maintenance')
  const { triggerToast } = useToast()
  const { isConnected, initialized, loading, onboarding } = useUser()
  const router = useRouter()

  if (router.query.verified === 'true') {
    triggerToast('Email verified')
  }

  const handleSubmit = () => {
    if (onboarding) {
      router.push('/onboard')
    } else if (isConnected) {
      router.push('/game')
    } else {
      router.push('/start')
    }
  }

  const ready = initialized && !loading
  return (
    <Box display="flex" alignItems="center" justifyContent="center" marginTop={20}>
      {!ready ? (
        <Typography variant="h5">Loading...</Typography>
      ) : (
        <TransitionGroup>
          <Fade in={true} timeout={1000}>
            <PinkBox>
              <SubHeading>Learn web3. Win sh*t</SubHeading>
              <Heading sx={{ margin: 5 }}>fweb3</Heading>
              <Fade in={true} timeout={2000}>
                <Box display="flex" justifyContent="space-around" width="100%">
                  {isMaintenance ? (
                    renderMaintenanceMessage()
                  ) : (
                    <>
                      <Button onClick={handleSubmit}>{isConnected ? 'game' : 'start'}</Button>
                      <Button onClick={() => router.push('/about')}>about</Button>
                    </>
                  )}
                </Box>
              </Fade>
            </PinkBox>
          </Fade>
        </TransitionGroup>
      )}
    </Box>
  )
}
