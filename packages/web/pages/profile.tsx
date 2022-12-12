import { ProfileView } from '../components/ProfileView'
import { useUser } from '../providers'
import Container from '@mui/material/Container'
import Link from 'next/link'
import Typography from '@mui/material/Typography'

export default function ProfilePage() {
  const { userAddress } = useUser()
  if (!userAddress) {
    return (
      <Container>
        <Typography variant="h5">Profile</Typography>
        <Typography>Please connect your account</Typography>
        <Link href="/">
          <Typography>Back</Typography>
        </Link>
      </Container>
    )
  }
  return <ProfileView />
}
