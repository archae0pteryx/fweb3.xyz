import { useEffect, useState } from 'react'
import Container from '@mui/system/Container'
import Head from 'next/head'
import { AlertBar } from './AlertBar'
import { DebugButton } from './Footer/DebugButton'
import { FooterBar } from './Footer/FooterBar'
import { Navigation } from './Navigation'
import { useFeature } from '../providers/feature'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const HeadBlock = () => (
  <Head>
    <title>Fweb3</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <link key="favicon" rel="icon" type="image/svg+xml" sizes="any" href="favicon-pink.svg" />
  </Head>
)

function renderMaintenance() {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Typography style={{ color: 'white' }}>Maintenance</Typography>
    </Box>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const isMaintenance = useFeature('use_maintenance')
  useEffect(() => {
    setMounted(true)
  }, [])

  if (isMaintenance) return renderMaintenance()

  return (
    <>
      <HeadBlock />
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
