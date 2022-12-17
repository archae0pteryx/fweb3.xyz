// import HomeView from '../components/Home/HomeView'
// import { useRouter } from 'next/router'
// import { useToast } from '../providers'

export default function HomePage() {
  // const { triggerToast } = useToast()
  // const router = useRouter()
  // if (router.query.verified === 'true') {
  //   triggerToast('Account Verified!')
  //   router.push('/', undefined, { shallow: true })
  // }
  // return <HomeView />
  return <button onClick={() => console.log('check')}>Check</button>
}

