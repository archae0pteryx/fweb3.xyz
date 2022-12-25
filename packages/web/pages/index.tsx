import { useRouter } from 'next/router'
import { Box, Typography } from '@mui/material'
import { TransitionGroup } from 'react-transition-group'
import Fade from '@mui/material/Fade'
import { useUser } from '../providers/user'
import { useFeature } from '../providers/feature'
import { PinkBox } from '../components/common/PinkBox'
import { Heading, SubHeading } from '../components/common/Typography'
import { Button } from '../components/common/Buttons'

const renderInProdMessage = () => (
  <Typography variant="body2" color="warning.main">
    Disabled for maintenance
  </Typography>
)

export default function HomeView() {
  const isMaintenance = useFeature('maintenance')
  const { isConnected, initialized, loading } = useUser()
  const router = useRouter()

  const ready = initialized && !loading
  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
      {!ready ? (
        <Typography variant="h5">Loading...</Typography>
      ) : (
        <TransitionGroup>
          <Fade in={true} timeout={1000}>
            <PinkBox>
              <SubHeading>Learn web3. Win prizes</SubHeading>
              <Heading sx={{ margin: 5 }}>fweb3</Heading>
              <Fade in={true} timeout={2000}>
                <Box display="flex" justifyContent="space-around" width="100%">
                  {isMaintenance ? (
                    renderInProdMessage()
                  ) : (
                    <>
                      <Button onClick={() => router.push('/play')}>Play</Button>
                      <Button onClick={() => router.push('/info')}>about</Button>
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
