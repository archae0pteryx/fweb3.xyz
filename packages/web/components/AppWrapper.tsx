import { useEffect, useState } from 'react'
import { Box, Alert, AlertTitle } from '@mui/material'
import Link from 'next/link'

function InstallMetamaskMessage() {
  return (
    <Alert
      severity="error"
      variant="filled"
      sx={{
        position: 'relative',
        zIndex: 1000,
      }}
    >
      <AlertTitle>Missing Required Extension</AlertTitle>A web3 wallet is required to play this game. Please install{' '}
      <Link
        href="https://metamask.io/download.html"
        target="_blank"
        style={{
          color: 'yellow',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        Metamask
      </Link>{' '}
      and refresh the page.
    </Alert>
  )
}

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const [onboarding, setOnboarding] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (window && !window.ethereum) {
      setOnboarding(true)
    }
  }, [])

  if (!mounted) {
    return <></>
  }

  return (
    <>
      {onboarding && <InstallMetamaskMessage />}
      {children}
    </>
  )
}
