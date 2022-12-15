import Container from '@mui/system/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'
import { useUser } from '../providers'

export function ProfileView() {
  const { verified, role } = useUser()
  if (!verified) {
    return (
      <Container>
        <Box paddingTop={4}>
          <Typography variant="h5">Profile</Typography>
          <Typography>Please verify your account</Typography>
        </Box>
      </Container>
    )
  }

  return (
    <Container>
      <Box paddingTop={4}>
        <Typography variant="h5">Profile</Typography>
      </Box>
    </Container>
  )
}
