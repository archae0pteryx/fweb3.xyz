import { Box, Button, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { useUser } from '../providers'
import { useRouter } from 'next/router'

const NotConnectedText = () => (
  <>
    <Typography variant="h4">You are not connected</Typography>
    <Typography variant="h5">Please connect a verified account</Typography>
  </>
)

const NotVerifiedText = () => (
  <>
    <Typography variant="h4">You are not verified</Typography>
    <Typography variant="h5">Check your email for the validation link</Typography>
  </>
)

const UnauthorizedText = () => (
  <>
    <Typography variant="h4">You are not authorized</Typography>
    <Typography variant="h5">You need to be a verified player to access this page</Typography>
  </>
)

const MessageContainer = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
      <Button onClick={() => router.push('/')} variant='outlined' color='warning' size="large" sx={{
        marginTop: '3em'
      }}>Back</Button>
    </Box>
  )
}


export function RoleGuard({ children, roles }: { children: ReactNode; roles: string[] }) {
  const { role, verified, userAddress } = useUser()

  if (!userAddress) {
    return <MessageContainer><NotConnectedText /></MessageContainer>
  }

  if (!verified) {
    return <MessageContainer><NotVerifiedText /></MessageContainer>
  }

  if (!roles.includes(role)) {
    return <MessageContainer><UnauthorizedText /></MessageContainer>
  }

  return <>{children}</>
}
