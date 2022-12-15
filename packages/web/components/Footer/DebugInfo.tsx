import { useUser, useNetwork, useMutation, useError, FIND_USER, useToast } from '../../providers'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { FormGroup, ToggleButton } from '@mui/material'
import { useState, useEffect } from 'react'
import { LoadingButton } from '../Buttons/LoadingButton'
import { UPDATE_USER, useAccount } from '../../providers'
import { FlexBox } from '../common/Boxes'

function DebugInput(props: any) {
  return <TextField size="small" margin="dense" {...props} />
}

function Toggle(props: any) {
  return <ToggleButton {...props}>{props.text}</ToggleButton>
}

export function DebugInfo() {
  const net = useNetwork()
  const { address } = useAccount()
  const { setError } = useError()
  const { displayName, role, email, verified, disabled, foundUser, error, handleUpdateUser, loading } = useUser()
  const [updateRole, setRole] = useState(role)
  const [updateEmail, setEmail] = useState(email)
  const [updateVerified, setVerified] = useState<boolean>(verified)
  const [updateDisabled, setDisabled] = useState<boolean>(disabled)
  const { triggerToast } = useToast()

  const handleUpdate = async () => {
    await handleUpdateUser({
      address: address,
      role: updateRole,
      email: updateEmail,
      verified: updateVerified,
      disabled: updateDisabled,
    })
    triggerToast('Updated')
  }

  useEffect(() => {
    if (error) {
      setError(error)
    }
  }, [error])
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '4em',
        left: '1em',
        padding: '1em',
        background: 'rgba(0,0,0,0.5)',
        borderRadius: '1em',
      }}
    >
      <FormGroup>
        <DebugInput label="displayName" value={displayName} disabled />
        <DebugInput label="email" value={updateEmail} onChange={(e: any) => setEmail(e.target.value)} />
        <DebugInput label="foundUser" value={foundUser} disabled />
        <DebugInput label="role" value={updateRole} onChange={(e: any) => setRole(e.target.value)} />
        <DebugInput label="net" value={net.chain?.name} disabled />
        <FlexBox sx={{ justifyContent: 'space-between', margin: '0.5rem 0', padding: 0 }}>
          <Toggle
            color="info"
            value="verified"
            text="verified"
            selected={updateVerified}
            onChange={() => setVerified(!updateVerified)}
          />
          <Toggle
            color="info"
            variant="contained"
            value="disabled"
            text="disabled"
            selected={updateDisabled}
            onChange={() => setDisabled(!updateDisabled)}
          />
        </FlexBox>
        <LoadingButton loading={loading} text="Update" color="warning" variant="outlined" onClick={handleUpdate} />
      </FormGroup>
    </Box>
  )
}