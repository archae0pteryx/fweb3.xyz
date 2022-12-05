import { Button, Typography } from '@mui/material'
import { useAccount } from 'wagmi'
import { Container } from '@mui/system'
import { useEffect, useState } from 'react';
import { prisma } from '../prisma/db'

export default function Page() {
  const [mounted, setMounted] = useState(false)
  const { address } = useAccount()

  useEffect(() => {
    setMounted(true)
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: 'fobarbas' }),
      })
      const data = await res.json()
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }
  if (!mounted) {
    return <></>
  }
  return (
    <Container sx={{ pt: 2 }}>
      <Typography>{address}</Typography>
      <Button onClick={fetchData}>Fetch</Button>
    </Container>
  )
}

export const getServerSideProps = async ({ req }) => {
  // const token = req.headers.AUTHORIZATION
  // const userId = await getUserId(token)
  const currentUser = await prisma.user.find({
    where: {
      address: { id: userId },
    },
  })
  return { props: { currentUser } }
}
