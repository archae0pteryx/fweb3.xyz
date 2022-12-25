import { SubHeading } from '../components/common/Typography'
import { ConnectedLayout } from '../components/common/ConnectedLayout'
import { useUser } from '../providers'
import { LinearProgress } from '@mui/material'

export default function GamePage() {
  const { loading, isConnected } = useUser()
  if (isConnected && loading) {
    return <LinearProgress />
  }
  return (
    <ConnectedLayout>
      <SubHeading>Game</SubHeading>
    </ConnectedLayout>
  )
}
