import { useUser, useNetwork, useToast } from '../../providers'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { FormGroup, Skeleton, ToggleButton } from '@mui/material'
import { useState } from 'react'
import { LoadingButton } from '../common/LoadingButton'
import { FlexBox } from '../common/Boxes'

function DebugInput(props: any) {
  return <TextField size="small" margin="dense" {...props} />
}

function Toggle(props: any) {
  return <ToggleButton {...props}>{props.text}</ToggleButton>
}

export function DebugInfo() {
  const net = useNetwork()
  const { address, displayName, role, email, verified, disabled, updateUser, loading } = useUser()
  const [updateRole, setRole] = useState(role || '')
  const [updateEmail, setEmail] = useState(email || '')
  const [updateVerified, setVerified] = useState<boolean>(verified)
  const [updateDisabled, setDisabled] = useState<boolean>(disabled)
  const { triggerToast } = useToast()

  const handleUpdate = async () => {
    await updateUser({
      address: address,
      role: updateRole,
      email: updateEmail,
      verified: updateVerified,
      disabled: updateDisabled,
    })
    triggerToast('Updated')
  }
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '135px',
        left: '5px',
        padding: '1em',
        background: 'rgba(0,0,0,0.5)',
        borderRadius: '1em',
      }}
    >
      {email && address ? (
        <FormGroup>
          <DebugInput label="displayName" value={displayName} disabled />
          <DebugInput label="email" value={updateEmail} onChange={(e: any) => setEmail(e.target.value)} />
          <DebugInput label="foundUser" value={address} disabled />
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
      ) : (
        <Skeleton variant="rectangular" width={300} height={200}>No user</Skeleton>
      )}
    </Box>
  )
}
