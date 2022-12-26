import { SubHeading } from '../components/shared/Typography'
import { ConnectedLayout } from '../components/Layouts/ConnectedLayout'
import { ProgressList } from '../components/ProgressList'
import { ValidUserLayout } from '../components/Layouts/ValidUserLayout'

export default function GamePage() {
  return (
    <ConnectedLayout>
      <ValidUserLayout>
        <SubHeading align="center">Current Progress</SubHeading>
        <ProgressList />
      </ValidUserLayout>
    </ConnectedLayout>
  )
}
