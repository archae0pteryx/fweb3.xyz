// import { FooterBar } from '../Footer/FooterBar'
// import { MaintenanceView } from '../MaintenanceView'
// import { Navbar } from '../Navbar/Navbar'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// import { useToast, useFeature } from '../../providers'
// import { VerifyEmailAlert } from '../shared/Alerts'
import Container from '@mui/system/Container'
import { Navbar } from '../Navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  // const { triggerToast } = useToast()
  // const isMaintenance = useFeature('use_maintenance')
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  useEffect(() => {
    setMounted(true)
  }, [])
  const [onboarding, setOnboarding] = useState(false)

  useEffect(() => {
    if (window && !window.ethereum) {
      setOnboarding(true)
    }
  }, [])
  // if (mounted && isMaintenance) {
  //   return <MaintenanceView />
  // }


  return (
    <>
      {mounted && (
        <>
          {children}
        </>
      )}
    </>
  )
}
