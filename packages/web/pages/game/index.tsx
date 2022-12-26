import { SubHeading } from '../../components/common/Typography'
import { ConnectedLayout } from '../../components/common/ConnectedLayout'
import { ProgressList } from '../../components/ProgressList'
import { PinkBox } from '../../components/common/Boxes'

export default function GamePage() {
  return (
    <ConnectedLayout>
      <PinkBox>
        <SubHeading align='center'>Current Progress</SubHeading>
        <ProgressList />
      </PinkBox>
    </ConnectedLayout>
  )
}
