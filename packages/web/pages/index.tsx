import { Button, Typography } from '@mui/material'
import { useAccount } from 'wagmi'
import { Container } from '@mui/system'
import { useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { CreateUserModal } from '../components/CreateUserModal'

const CreateUserMutation = gql`
  mutation Mutation($address: String!, $email: String!) {
    createUser(address: $address, email: $email) {
      address
    }
  }
`

export default function Page() {
  const [createUser, { data, loading, error }] = useMutation(CreateUserMutation)
  const [email, setEmail] = useState('aarchaeopteryxx@gmail.com')
  const [mounted, setMounted] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const { address } = useAccount()

  const handleCreate = async () => {
    if (address) {
      await createUser({ variables: { address, email } })
    }
  }
  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <></>
  }
  return (
    <Container sx={{ pt: 2 }}>
      <Typography>Address: {address}</Typography>
      {error && <pre>{error.message}</pre>}
      {loading && <Typography>Loading...</Typography>}
      {<Typography>{JSON.stringify(data, null, 2)}</Typography>}
      <Button onClick={toggleModal}>Create</Button>
      <CreateUserModal modalOpen={modalOpen} toggleModal={toggleModal} onSubmit={handleCreate} />
    </Container>
  )
}
