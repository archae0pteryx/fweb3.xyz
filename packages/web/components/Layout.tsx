import { AlertBar } from './AlertBar'
import { FixedAppBar } from './AppBar/FixedBar'
import { FooterBar } from './Footer/FooterBar'
import { useEffect, useState } from 'react'
import Container from '@mui/system/Container'
import Head from 'next/head'
import { NewUserModal } from './NewUserModal'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <>
      <Head>
        <title>Fweb 3</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {mounted && (
        <>
          <FixedAppBar />
          <AlertBar />
          <NewUserModal />
          <Container>{children}</Container>
          <FooterBar />
        </>
      )}
    </>
  )
}
