import { Button as MuiButton, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import { useUser } from '../../modules/user/bakuser.provider'
import MuiLoadingButton from '@mui/lab/LoadingButton'

export function Button(props: React.ComponentProps<typeof MuiButton>) {
  return <MuiButton variant="contained" color="secondary" {...props} />
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
    <MuiButton variant="outlined" color="warning" onClick={handleDisconnect} {...props}>
      Disconnect
    </MuiButton>
  )
}

export function LinkButton(props: any) {
  const router = useRouter()
  return (
    <Button onClick={() => router.push(props.to)} {...props}>
      {props.children}
    </Button>
  )
}
