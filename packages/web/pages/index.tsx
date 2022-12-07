import { Button, Typography } from '@mui/material'
import { useAccount } from 'wagmi'
import { Container } from '@mui/system'
import { useEffect, useState } from 'react';
import { usePrisma } from '../providers/prisma';

export default function Page() {
  const [mounted, setMounted] = useState(false)
  const { address } = useAccount()
  const { usersDb } = usePrisma()

  useEffect(() => {
    setMounted(true)
    if (usersDb) {
      const user = usersDb.find(address).then(console.log)
    }
  }, [usersDb])

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

