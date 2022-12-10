import { Button, Typography } from '@mui/material'
import { useAccount } from 'wagmi'
import { Container } from '@mui/system'
import { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'

const UsersQuery = gql`
  query {
    user {
      id
      address
      gameAddress
    }
  }
`
export default function Page() {
  const { data, loading, error } = useQuery(UsersQuery)
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
      {error && <Typography>{error.message}</Typography>}
      {loading && <Typography>Loading...</Typography>}
      {<Typography>{JSON.stringify(data, null, 2)}</Typography>}
      {/* {data?.users.map((user: any) => (
        <Typography>{user.address}</Typography>
      ))} */}
      <Button onClick={() => {}}>Fetch</Button>
    </Container>
  )
}
