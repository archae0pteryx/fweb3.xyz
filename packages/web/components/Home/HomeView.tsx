import { ClosedChest } from '../common/ClosedChest'
import { HomeText } from './HomeText'
import { NewUserModal } from '../NewUserModal'

export default function HomeView() {
  return (
    <>
      <ClosedChest />
      <NewUserModal />
      <HomeText />
    </>
  )
}
