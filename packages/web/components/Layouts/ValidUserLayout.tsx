import { Box, Typography } from '@mui/material'
import { useUser } from '../../providers'
import { useRouter } from 'next/router'
import { validateSessionCookie } from '../../lib/auth'
import { NextPageContext } from 'next'

export default function ValidUserLayout(props: any) {
  const { isValidUser, disabled } = useUser()
  const router = useRouter()
  console.log(props)
  if (disabled) {
    return (
      <Box margin={5}>
        <Typography variant="h2">Your account has been disabled.</Typography>
      </Box>
    )
  }

  // if (!isValidUser) {
  //   router.push('/')
  //   return <></>
  // }

  return <Box>{props.children}</Box>
}
