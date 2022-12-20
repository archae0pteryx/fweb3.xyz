import { Box, Button } from '@mui/material'
import { useRouter } from 'next/router'

export function Navigation() {
  const router = useRouter()
  if (router.pathname === '/') return null
  return (
    <Box margin={2}>
      <Button variant='outlined' onClick={() => router.push('/')} sx={{
        fontSize: '0.5em'
      }}>Home</Button>
    </Box>
  )
}
