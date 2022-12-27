import { FooterBar } from '../Footer/FooterBar'
import { MaintenanceView } from '../MaintenanceView'
import { Navbar } from '../Navbar/Navbar'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useToast, useFeature } from '../../providers'
import { VerifyEmailAlert } from '../shared/Alerts'
import Container from '@mui/system/Container'
import Head from 'next/head'

const HeadBlock = () => (
  <Head>
    <title>Fweb3</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <link key="favicon" rel="icon" type="image/svg+xml" sizes="any" href="favicon-pink.svg" />
  </Head>
)

export default function Layout({ children }: { children: React.ReactNode }) {
  const { triggerToast } = useToast()
  const isMaintenance = useFeature('use_maintenance')
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (mounted && isMaintenance) {
    return <MaintenanceView />
  }

  if (mounted && router.query.verified === 'true') {
    setTimeout(() => {
      triggerToast('Email verified')
      router.replace('/')
    }, 1000)
  }

  return (
    <>
      <HeadBlock />
      {mounted && (
        <>
          <Navbar />
          <VerifyEmailAlert />
          <Container>{children}</Container>
          <FooterBar />
        </>
      )}
    </>
  )
}
