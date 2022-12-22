import { useRouter } from 'next/router'
import { Box, Typography, Button, Card } from '@mui/material'
import { TransitionGroup } from 'react-transition-group'
import Fade from '@mui/material/Fade'
import { useUser } from '../providers/user'
import { useFeature } from '../providers/feature'

const renderInProdMessage = () => (
  <Typography variant="body2" color="warning.main">
    Disabled for maintenance
  </Typography>
)

export default function HomeView() {
  const isMaintenance = useFeature('maintenance')
  const { connectUser, initialized, loading } = useUser()
  const router = useRouter()

  const ready = initialized && !loading
  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
      {!ready ? (
        <Typography variant="h5">Loading...</Typography>
      ) : (
        <TransitionGroup>
          <Fade in={true} timeout={1000}>
            <Card
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                gap: 3,
                padding: 5,
              }}
            >
              <Typography variant="body2">Learn the basics of web3</Typography>
              <Typography variant="h4">fweb3</Typography>
              <Fade in={true} timeout={2000}>
                <Box display="flex" justifyContent="space-around" width="100%">
                  {isMaintenance ? (
                    renderInProdMessage()
                  ) : (
                    <>
                      <Button color="info" onClick={connectUser}>
                        play
                      </Button>
                      <Button color="info" onClick={() => router.push('/info')}>
                        about
                      </Button>
                    </>
                  )}
                </Box>
              </Fade>
            </Card>
          </Fade>
        </TransitionGroup>
      )}
    </Box>
  )
}
