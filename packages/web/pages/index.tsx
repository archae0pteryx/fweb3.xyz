import { useRouter } from 'next/router'
import { Box, Typography } from '@mui/material'
import { TransitionGroup } from 'react-transition-group'
import Fade from '@mui/material/Fade'
import { useUser } from '../providers/user'
import { PinkBox } from '../components/shared/Boxes'
import { Heading } from '../components/shared/Typography'
import { Button } from '../components/shared/Buttons'

import { validateSessionCookie } from '../lib/auth'
import { NextPageContext } from 'next'

export default function HomeView(props: any) {
  const { isValidUser, initialized, loading, onboarding } = useUser()
  const router = useRouter()
  const ready = initialized && !loading
  console.log(props.isValidCookie)
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
                  <Heading marginBottom={3} color="secondary">
                    fweb3
                  </Heading>
                  <Typography align="center" variant="h5" marginBottom={3}>
                    the f@ck is web3?
                  </Typography>
                  <Typography color="warning.main" align="center" variant="h6" marginBottom={3}>
                    A journey down the rabbit hole
                  </Typography>
                  <Fade in={true} timeout={2000}>
                    <Box display="flex" gap={3} justifyContent="center" width="100%">
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


export const getStaticProps = (req: NextPageContext) => {
  const v = validateSessionCookie(req)
  return {
    props: {
      isValidCookie: v,
    },
  }
}
