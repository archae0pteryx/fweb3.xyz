import HomeView from '../components/HomeView'
import { useRouter } from 'next/router'
import { useToast } from '../providers'

export default function Page() {
  const { triggerToast } = useToast()
  const router = useRouter()
  if (router.query.verified === 'true') {
    triggerToast('Account Verified!')
    router.push('/', undefined, { shallow: true })
  }
  return <HomeView />
}

