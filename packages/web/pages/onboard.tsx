import {
  ButtonBase,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Typography,
  Skeleton,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { apolloClient } from '../lib/apolloClient'
import { REQUEST_CONTENT } from '../providers'

const InfoListItem = ({ title, html }: any) => {
  return (
    <Accordion
      disableGutters
      sx={{
        background: 'transparent',
        padding: 0,
        margin: 0,
      }}
    >
      <AccordionSummary
        expandIcon={<QuestionButton>view</QuestionButton>}
        aria-controls="panel1a-content"
        sx={{
          padding: 0,
          margin: 0,
        }}
      >
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography variant="body1" color="aliceblue">
            {title}
          </Typography>
        </Card>
      </AccordionSummary>
      <AccordionDetails>
        {' '}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </AccordionDetails>
    </Accordion>
  )
}

const QuestionButton = (props: any) => {
  const { children, ...rest } = props
  return (
    <ButtonBase
      {...rest}
      sx={{
        fontSize: '0.8em',
        border: `2px solid #FC0BD4`,
        margin: '1em',
        padding: '1.6em',
        '&:hover': {
          backgroundColor: '#FC0BD4',
          color: 'white',
        },
      }}
    >
      {children}
    </ButtonBase>
  )
}

const PROMPTS = [
  {
    title: 'What is a wallet?',
    prompt: 'Explain what a web3 wallet is.',
    type: 'ONBOARD_QUESTION_1',
  },
  {
    title: 'Wallet install info',
    prompt: 'How do i install a metamask wallet in my browser?',
    type: 'ONBOARD_QUESTION_2',
  },
  {
    title: 'Security best practices',
    prompt: 'What are the best ways for me to secure my crypo wallet and assets?',
    type: 'ONBOARD_QUESTION_3',
  },
]

export default function OnboardingPage({ content, error }: any) {
  const [expandedInfoList, setExpandedInfoList] = useState<boolean>(false)
  const router = useRouter()

  const handleContentRequestCallback = async () => {
    setExpandedInfoList(!expandedInfoList)
  }

  const hasContent = content.filter(Boolean).length > 0

  return (
    <Box>
      <Card
        sx={{
          marginBottom: 5,
        }}
      >
        <Box>
          <Typography variant="h6" color="primary" marginBottom={3} align="center">
            Looks like you don&apos;t have a wallet.
          </Typography>
          <Typography color="primary" align="center" marginBottom={5}>
            You need one in order to play.
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-around">
          {!expandedInfoList && (
            <Button variant="contained" color="info" onClick={() => handleContentRequestCallback()}>
              Learn about wallets
            </Button>
          )}
          <Button variant="contained" color="error" onClick={() => router.push('https://metamask.io/download/')}>
            Take me to install
          </Button>
        </Box>
        {error && (
          <Box>
            <Typography color="error" align="center" marginBottom={5}>
              {error}
            </Typography>
          </Box>
        )}
      </Card>
      {hasContent && expandedInfoList ? (
        <Card>
          {content.filter(Boolean).map((item: any) => (
            <InfoListItem key={item.id} {...item} />
          ))}
        </Card>
      ) : (
        ''
      )}
    </Box>
  )
}

export async function getStaticProps() {
  const { data } = await apolloClient.mutate({
    mutation: REQUEST_CONTENT,
    variables: {
      prompts: PROMPTS,
    },
  })

  return {
    props: {
      content: data?.requestContent || [],
    },
  }
}
