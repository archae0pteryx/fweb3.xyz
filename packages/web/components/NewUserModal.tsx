import { Clear } from '@mui/icons-material'
import { EmailInput } from './EmailInput'
import { ErrorAlert } from './Alerts'
import { IconButton } from '@mui/material'
import { LoadingButton } from './Buttons/LoadingButton'
import { useAccount } from 'wagmi'
import { useMutation, gql } from '@apollo/client'
import { useState } from 'react'
import { useToast } from '../providers/toast'
import { useUser } from '../providers/user'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

const CreateUserMutation = gql`
  mutation CreateUser($address: String!, $email: String!) {
    createUser(address: $address, email: $email) {
      email
      address
    }
  }
`
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
}

export function NewUserModal() {
  const [createUser, { loading, error }] = useMutation(CreateUserMutation)
  const [open, setOpen] = useState(true)
  const [email, setEmail] = useState('aarchaeopteryxx@gmail.com')
  const [validEmail, setValidEmail] = useState(true)
  const { address } = useAccount()
  const { userAddress, refresh } = useUser()
  const { triggerToast } = useToast()

  const handleCloseNewUser = () => {
    setValidEmail(true)
    setEmail('')
    setOpen(false)
  }

  const handleCreateAccount = async () => {
    if (!email.includes('@')) {
      setValidEmail(false)
      triggerToast('Invalid Email', { severity: 'error', hideIn: 1000 })
      return
    }
    await createUser({ variables: { address, email } })
    refresh()
    setValidEmail(true)
    setEmail('')
    setOpen(false)
    triggerToast('Account Created. Please verify your email')
  }

  if (userAddress) return null

  return (
    <div>
      <ErrorAlert error={error?.message} />
      <Modal open={open} onClose={() => setOpen(false)} closeAfterTransition>
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton color="error" sx={{ padding: 2 }} onClick={handleCloseNewUser}>
                <Clear />
              </IconButton>
            </Box>
            <Typography variant="h4" align="center">
              Looks like you're new here!
            </Typography>
            <Typography variant="body1" marginTop={3} marginBottom={3}>
              Please create and verify your account or reconnect with your game wallet.
            </Typography>
            <EmailInput value={email} setValue={setEmail} validValue={validEmail} />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <Button color="warning" variant="outlined" onClick={() => setOpen(false)}>
                Disconnect
              </Button>
              <LoadingButton text="create" loading={loading} onClick={handleCreateAccount} />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
