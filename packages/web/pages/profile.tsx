import { ProfileView } from '../components/ProfileView'
import { useUser } from '../providers'
import Container from '@mui/material/Container'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import { RoleGuard } from '../components/RoleGuard'

export default function ProfilePage() {
  return (
    <RoleGuard roles={['PLAYER']}>
      <ProfileView />
    </RoleGuard>
  )
}
