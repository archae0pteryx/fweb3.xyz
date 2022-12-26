import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../../providers'

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const { isAdmin } = useUser()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <></>
  }

  if (!isAdmin) {
    router.push('/unauthorized')
    return <></>
  }

  return (
    <Box margin={2}>
      {children}
    </Box>
  )
}
