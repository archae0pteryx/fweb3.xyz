import { Button, Typography } from '@mui/material'
import { useAccount } from 'wagmi'
import { Container } from '@mui/system'
import { useEffect, useState } from 'react'

export default function Page() {
  const [mounted, setMounted] = useState(false)
  const { address } = useAccount()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <></>
  }
  return (
    <Container sx={{ pt: 2 }}>
      <Typography>{address}</Typography>
      <Button onClick={() => {}}>Fetch</Button>
    </Container>
  )
}
