import { Box, Typography } from '@mui/material'
import { useUser } from '../../providers'
import { useRouter } from 'next/router'

export function ValidUserLayout(props: any) {
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
    router.push('/')
    return <></>
  }

  return <Box>{props.children}</Box>
}
