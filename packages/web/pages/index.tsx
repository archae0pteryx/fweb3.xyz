import HomeView from '../components/Home/HomeView'
import { useRouter } from 'next/router'
import { useToast } from '../providers'

export default function HomePage() {
  const { triggerToast } = useToast()
  const router = useRouter()
  if (router.query.verified === 'true') {
    triggerToast('Account Verified!')
    router.push('/', undefined, { shallow: true })
  }
  return <HomeView />
}

