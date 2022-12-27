import { ConnectedLayout } from '../components/Layouts/ConnectedLayout'
import { ProgressList } from '../components/ProgressList'
import { SubHeading } from '../components/shared/Typography'
import { useGame } from '../providers'
import { ValidUserLayout } from '../components/Layouts/ValidUserLayout'

export default function GamePage() {
  const { gameTasksLoading } = useGame()
  return (
    <ConnectedLayout>
      <ValidUserLayout>
        <SubHeading align="center">Current Progress</SubHeading>
        {gameTasksLoading ? <h1>Loading...</h1> : <ProgressList />}
      </ValidUserLayout>
    </ConnectedLayout>
  )
}
