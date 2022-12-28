import { Box } from '@mui/material'
import { FooterBar } from '../Footer/FooterBar'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../../providers'

export function ConnectedLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const { isConnected, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <></>
  }

  if (!loading && !isConnected) {
    setTimeout(() => {
      router.push('/')
    }, 500)
    return <></>
  }

  return (
    <Box margin={2}>
      {children}
      <FooterBar />
    </Box>
  )
}
