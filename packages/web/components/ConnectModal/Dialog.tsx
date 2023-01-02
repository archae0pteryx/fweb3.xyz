import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

import { Alert, AlertTitle, Box, ButtonBase, Card, Grid, Paper } from '@mui/material'
import Link from 'next/link'
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import Image from 'next/image'
import { Container } from '@mui/system'
import { Button } from '../shared/Buttons'

export function ButtonGrid() {
  const { address, connector, isConnected } = useAccount()
  const { data: ensAvatar } = useEnsAvatar({ address })
  const { data: ensName } = useEnsName({ address })
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()

  // if (isConnected) {
  //   return (
  //     <Container>
  //       {ensAvatar && <Image alt="ens avatar" src={ensAvatar || ''} />}
  //       <Card>{ensName ? `${ensName} (${address})` : address}</Card>
  //       <Card>Connected to {connector?.name}</Card>
  //       <Button onClick={() => disconnect()}>Disconnect</Button>
  //     </Container>
  //   )
  // }

  return (
    <Box padding={2}>
      <Grid container gap={2}>
        {connectors.map((connector) => (
          <ModalButton key={connector.id} connector={connector} />
        ))}
      </Grid>

      {error && <div>{error.message}</div>}
    </Box>
  )
}

function ModalButton({ connector }: any) {
  const { connect, isLoading, pendingConnector } = useConnect()
  return (
    <Grid
      item
      xs="auto"
    >
      <Button disabled={!connector.ready} key={connector.id} onClick={() => connect({ connector })} sx={{
        borderRadius: 0,
        height: 60
      }}>
        {connector.name}
        {!connector.ready && ' (unsupported)'}
        {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
      </Button>
    </Grid>
  )
}

export function ResponsiveModalDialog({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog hideBackdrop open={open} onClose={handleClose} PaperComponent={Box} sx={{
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(5px)',
      textAlign: 'center',
    }}>
      <DialogTitle>Connect your wallet</DialogTitle>
      <ButtonGrid />
    </Dialog>
  )
}

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
