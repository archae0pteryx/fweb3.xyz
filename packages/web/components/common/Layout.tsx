import { AlertBar } from '../AlertBar'
import { FooterBar } from '../Footer/FooterBar'
import { MaintenanceView } from '../MaintenanceView'
import { Navbar } from '../Navbar/Navbar'
import { useEffect, useState } from 'react'
import { useFeature } from '../../providers/feature'
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
  const isMaintenance = useFeature('use_maintenance')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (mounted && isMaintenance) {
    return <MaintenanceView />
  }

  return (
    <>
      <HeadBlock />
      {mounted && (
        <>
          <Navbar />
          <AlertBar />
          <Container>{children}</Container>
          <FooterBar />
        </>
      )}
    </>
  )
}
