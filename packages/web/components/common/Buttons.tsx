import { Button as MuiButton, useTheme } from '@mui/material'
import MuiLoadingButton from '@mui/lab/LoadingButton'
import { useUser } from '../../providers'

export function Button(props: React.ComponentProps<typeof MuiButton>) {
  const theme = useTheme()
  return (
    <MuiButton
      variant="contained"
      color="secondary"
      sx={{
        fontSize: theme.spacing(2),
        padding: theme.spacing(1),
        minWidth: theme.spacing(20),
      }}
      {...props}
    />
  )
}

export function LoadingButton(props: any) {
  const theme = useTheme()
  return (
    <MuiLoadingButton
      variant="contained"
      color="secondary"
      sx={{
        fontSize: theme.spacing(2),
        padding: theme.spacing(1),
        minWidth: theme.spacing(20),
      }}
      {...props}
    />
  )
}

export function DisconnectButton(props: any) {
  const { disconnectUser } = useUser()
  const handleDisconnect = async () => {
    await disconnectUser()
  }
  return (
    <MuiButton variant="contained" color="warning" size="small" onClick={handleDisconnect} {...props}>
      Disconnect
    </MuiButton>
  )
}
