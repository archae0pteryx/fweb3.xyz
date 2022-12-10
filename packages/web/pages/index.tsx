import { Button, Typography } from '@mui/material'
import { useAccount } from 'wagmi'
import { Container } from '@mui/system'
import { useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const CreateUserMutation = gql`
  mutation Mutation($address: String!) {
    createUser(address: $address) {
      address
    }
  }
`

export default function Page() {
  const [createUser, { data, loading, error }] = useMutation(CreateUserMutation)
  const [mounted, setMounted] = useState(false)
  const { address } = useAccount()

  const handleCreate = async () => {
    if (address) {
      console.log('creating', address)
      await createUser({ variables: { address } })
    }
  }

  useEffect(() => {
  }, [address])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <></>
  }
  return (
    <Container sx={{ pt: 2 }}>
      {error && <pre>{error.message}</pre>}
      {loading && <Typography>Loading...</Typography>}
      {<Typography>{JSON.stringify(data, null, 2)}</Typography>}
      <Button onClick={handleCreate}>Fetch</Button>
    </Container>
  )
}
