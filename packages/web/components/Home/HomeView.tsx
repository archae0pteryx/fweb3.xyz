import { Box, Button, Grid, Typography } from '@mui/material'
import { ClosedChest } from '../common/ClosedChest'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { useRouter } from 'next/router';
import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { ImCheckmark } from 'react-icons/im'
import Link from 'next/link';
import { TfiClose } from 'react-icons/tfi'

const GAME_TASKS = [
  {
    title: 'Connect your wallet',
    outcomes: ['Learn about wallets', 'Key storage best practices'],
    description: 'Connect your wallet to start the game',
    link: '/tasks/1',
    completed: true,
  },
  {
    title: 'Network Basics',
    outcomes: ['Learn about layered networks', 'Learn about testnets', 'How to add networks'],
    description: 'Instructions need to be written',
    link: '/tasks/2',
    completed: false,
  },
  {
    title: 'Receive your first tokens',
    outcomes: ['Learn about gas', 'Learn estimations and termology'],
    description: 'Follow the instructions to receive your first tokens',
    link: '/tasks/3',
    completed: false,
  },
  {
    title: 'Look up transaction on the block explorer',
    outcomes: ['Tracing transactions', 'Looking up and verifying contracts'],
    description: 'This chain is an open ledger, you can look up any transaction on the block explorer',
    link: '/tasks/4',
    completed: false,
  },
  {
    title: 'Interact with a smart contract',
    outcomes: ['Transact with a smart contract', 'Learn about gas'],
    description: 'Sign your first transaction!',
    link: '/tasks/5',
    completed: false,
  },
  {
    title: 'Create your first NFT',
    outcomes: ['Learn about ERC721 etc', 'Learn about Openzepplin'],
    description: 'Create a basic NFT!',
    link: '/tasks/6',
    completed: false,
  },
  {
    title: 'TBD',
    outcomes: ['TBD', 'TBD'],
    description: 'Blah blah blah!',
    link: '/tasks/7',
    completed: false,
  },
]

const TaskContainer = ({
  title,
  outcomes,
  description,
  link,
  completed,
}: {
  title: string
  outcomes: string[]
  description: string
  link: string
  completed: boolean
}, key: number) => {
  const router = useRouter()
  return (
    <Paper elevation={12} key={key}>
      <Accordion disabled={completed}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="task-panel">
          <Box display="flex" alignItems="center" gap={3}>
            {completed ? <ImCheckmark color='lightgreen'/> : <TfiClose color='red'/>}
            <Link href={link}>
              <Typography variant="body1" color='aliceblue'>{title}</Typography>
            </Link>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="caption" paddingLeft={3}>
            {description}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Paper>
  )
  // return (
  //   <Paper>
  //     <Typography variant="h6">{title}</Typography>
  //     <Typography variant="body1">{description}</Typography>
  //     <Typography variant="body2">Outcomes:</Typography>

  //     <Button onClick={() => router.push(link)}>Instructions</Button>
  //   </Paper>
  // )
}

function BasicStack() {
  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        {GAME_TASKS.map(TaskContainer)}
      </Stack>
    </Box>
  )
}

function SideBySide() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" justifyContent="space-around" alignItems="center">
            <Typography variant="h5">Complete the tasks</Typography>
            <ClosedChest />
            <Typography variant="h6">Unlock the chest</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <BasicStack />
        </Grid>
      </Grid>
    </Box>
  )
}

export default function HomeView() {
  return <SideBySide />
  // return (
  //   <Box
  //     sx={{
  //       position: 'fixed',
  //       zIndex: -1,
  //       top: 0,
  //       left: 0,
  //       width: '100%',
  //       height: '100%',
  //       display: 'flex',
  //       flexDirection: 'column',
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //     }}
  //   >
  //     <ClosedChest />
  //   </Box>
  // )
}
