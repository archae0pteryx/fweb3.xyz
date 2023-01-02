import React from 'react'
import { useEffect, useState } from 'react'
import { Alert, AlertTitle } from '@mui/material'
import Link from 'next/link'
import { Navbar } from './Navbar'
import { HeadBlock } from './shared/HeadBlock'
import { MaintenanceView } from './MaintenanceView'
import { useQuery, gql } from '@apollo/client';
import { useFeature } from '../modules/feature/useFeature';

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
      <AlertTitle>Missing Required Extension</AlertTitle>A web3 wallet is required to play this game. Please see the{' '}
      <Link
        href="/instructions"
        style={{
          color: 'yellow',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        instructions
      </Link>
    </Alert>
  )
}

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const [onboarding, setOnboarding] = useState(false)
  const [mounted, setMounted] = useState(false)
  const maintenanceMode = useFeature('use_maintenance')

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

  if (maintenanceMode) {
    return <MaintenanceView />
  }

  return (
    <>
      <HeadBlock />
      {onboarding ? <InstallMetamaskMessage /> : <Navbar />}
      {children}
    </>
  )
}
