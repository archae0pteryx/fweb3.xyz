import { useEffect, useState } from 'react'
import Container from '@mui/system/Container'
import Head from 'next/head'
import { AlertBar } from './AlertBar';
import { DebugButton } from './Footer/DebugButton';
import { FooterBar } from './Footer/FooterBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <>
      <Head>
        <title>Fweb3</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link key="favicon" rel="icon" type="image/svg+xml" sizes="any" href="favicon-pink.svg" />
      </Head>
      {mounted && (
        <>
          <AlertBar />
          <Container>{children}</Container>
          <DebugButton />
          <FooterBar />
        </>
      )}
    </>
  )
}
