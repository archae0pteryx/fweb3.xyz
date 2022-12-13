import { AlertBar } from './AlertBar'
import { AppBar } from './AppBar'
import { FooterBar } from './Footer/FooterBar'
import { useEffect, useState } from 'react'
import Container from '@mui/system/Container'
import Head from 'next/head'

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
          <AppBar />
          <AlertBar />
          <Container>{children}</Container>
          <FooterBar />
        </>
      )}
    </>
  )
}
