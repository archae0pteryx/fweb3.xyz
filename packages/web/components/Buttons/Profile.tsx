import { useAccount } from '../../providers'
import Button from '@mui/material/Button'
import Link from 'next/link'

export function ProfileButton() {
  const { isConnected } = useAccount()
  if (!isConnected) {
    return null
  }
  return (
    <Link href="/profile">
      <Button color="secondary">Profile</Button>
    </Link>
  )
}
