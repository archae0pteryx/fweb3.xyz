import { Box, LinearProgress } from '@mui/material'
import { FooterBar } from '../Footer/FooterBar'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../../providers'

export function ConnectedLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const { isConnected, onboarding, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <></>
  }

  if (loading) {
    return (
      <Box height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <LinearProgress />
      </Box>
    )
  }

  if (onboarding) {
    router.push('/onboard')
    return <></>
  }

  if (!isConnected) {
    router.push('/')
    return <></>
  }

  return (
    <Box margin={2}>
      {children}
      <FooterBar />
    </Box>
  )
}
