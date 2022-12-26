import { SubHeading } from '../../components/shared/Typography'
import { ConnectedLayout } from '../../components/Layouts/ConnectedLayout'
import { ProgressList } from '../../components/ProgressList'
import { PinkBox } from '../../components/shared/Boxes'
import { ValidUserLayout } from '../../components/Layouts/ValidUserLayout'

export default function GamePage() {
  return (
    <ConnectedLayout>
      <ValidUserLayout>
        <PinkBox>
          <SubHeading align="center">Current Progress</SubHeading>
          <ProgressList />
        </PinkBox>
      </ValidUserLayout>
    </ConnectedLayout>
  )
}
