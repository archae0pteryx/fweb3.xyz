import { EmailInput } from './EmailInput'
import { LoadingButton } from './common/LoadingButton'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { useUser, useToast, CREATE_USER, FIND_USER, useAccount } from '../providers'
import Box from '@mui/material/Box'
import Clear from '@mui/icons-material/Clear'
import Fade from '@mui/material/Fade'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { ADMIN_USER } from '../prisma/mockUsers'

const modalBoxStyle = {
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
  const { address } = useAccount()
  const { onboarding, showOnboardModal, setShowOnboardModal } = useUser()
  const [email, setEmail] = useState<string>(ADMIN_USER.email)
  const [formError, setFormError] = useState<string>('')

  const { triggerToast } = useToast()

  const [createUser, { loading, error: mutationError }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: FIND_USER, variables: { address } }, 'FIND_USER'],
  })

  const handleClose = () => {
    setShowOnboardModal(false)
  }

  const handleCreateAccount = async () => {
    try {
      if (process.env.DEBUG_ENABLED === 'true') {
        await createUser({ variables: { address, email } })
        return
      }
      setFormError('')
      if (!email?.includes('@')) {
        setFormError('Invalid Email')
        triggerToast('Invalid Email', { severity: 'error', hideIn: 2000 })
        return
      }

      await createUser({ variables: { address, email } })
      setEmail('')
      triggerToast('Account Created!')
    } catch (err: any) {
      triggerToast(err.message, { severity: 'error', hideIn: 2000 })
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateAccount()
    }
  }

  if (!onboarding) return null

  const errorForInput = formError || mutationError?.message
  return (
    <div>
      <Modal disablePortal open={showOnboardModal} onClose={() => setShowOnboardModal(false)} closeAfterTransition>
        <Fade in={showOnboardModal}>
          <Box sx={modalBoxStyle}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton
                color="error"
                sx={{ position: 'absolute', right: 0, top: 0 }}
                onClick={() => setShowOnboardModal(false)}
              >
                <Clear />
              </IconButton>
            </Box>
            <Typography variant="h5" align="center" marginBottom={3}>
              Looks like you're new here!
            </Typography>
            <Typography variant="body2" marginBottom={3} color="yellow" align="center">
              Please create and verify your account or reconnect with your game wallet.
            </Typography>
            <EmailInput
              value={email}
              error={!!errorForInput}
              onChange={(e) => setEmail(e.target.value)}
              helperText={mutationError?.message || ' '}
              onKeyDown={handleKey}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                marginBottom: 1,
              }}
            >
              <Button color="secondary" variant="outlined" onClick={handleClose}>
                Maybe Later
              </Button>
              <LoadingButton text="create" loading={loading} onClick={handleCreateAccount} />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
