import { ProfileView } from '../components/ProfileView'
import { RoleGuard } from '../components/RoleGuard'

export default function ProfilePage() {
  return (
    <RoleGuard roles={['PLAYER']}>
      <ProfileView />
    </RoleGuard>
  )
}
