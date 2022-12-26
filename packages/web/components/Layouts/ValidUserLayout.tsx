import { Box, Typography } from '@mui/material'
import { useUser } from '../../providers'
import { useRouter } from 'next/router'

export function ValidUserLayout({ children }: { children: React.ReactNode }) {
  const { isValidUser, disabled } = useUser()
  const router = useRouter()

  if (disabled) {
    return (
      <Box margin={5}>
        <Typography variant="h2">Your account has been disabled.</Typography>
      </Box>
    )
  }

  if (!isValidUser) {
    router.push('/verify')
    return <></>
  }

  return <Box>{children}</Box>
}
