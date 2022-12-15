import Button from '@mui/material/Button'
import Link from 'next/link'
import { useUser } from '../../providers/user'

export function ProfileButton() {
  const { verified, role } = useUser()
  if (!verified || role !== 'PLAYER') {
    return null
  }
  return (
    <Link href="/profile">
      <Button color="secondary">Profile</Button>
    </Link>
  )
}
