import Button from '@mui/material/Button'
import Link from 'next/link'
import { useUser } from '../../providers/user'

export function PlayButton() {
  const { verified, role } = useUser()
  if (!verified || role !== 'PLAYER') {
    return null
  }
  return (
    <Link href="/play">
      <Button>Play</Button>
    </Link>
  )
}
