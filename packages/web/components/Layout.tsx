import { AppBar } from './AppBar'
import { useEffect, useState } from 'react'
import { VerifyEmailAlert } from './Alerts'
import Container from '@mui/system/Container'
import Head from 'next/head'
import { FooterBar } from './Footer/FooterBar'

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
          <VerifyEmailAlert />
          <Container>{children}</Container>
          <FooterBar />
        </>
      )}
    </>
  )
}
