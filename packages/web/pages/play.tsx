import { RoleGuard } from '../components/RoleGuard'
import { PlayView } from '../components/Play/PlayView'

export default function PlayPage() {
  return (
    <RoleGuard roles={['PLAYER']}>
      <PlayView />
    </RoleGuard>
  )
}
