import { ButtonBase, Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, Typography, Skeleton } from '@mui/material';
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useContent } from '../providers/content'

const InfoListItem = (props: any) => {
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
            {props.title}
          </Typography>
        </Card>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="caption" paddingLeft={3}>
          {props.description}
        </Typography>
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
    cached: false,
  },
]

export default function OnboardingPage() {
  const [expandedInfoList, setExpandedInfoList] = useState<boolean>(true)
  const { handleContentRequest, contentData, contentError, contentLoading } = useContent()
  const router = useRouter()

  handleContentRequest(PROMPTS)

  return (
    <Box marginX={3} marginY={5}>
      <Box>
        <Typography variant="h6" color="primary">
          Looks like you don&apos;t have a wallet.
        </Typography>
        {JSON.stringify(contentData)}
        <Typography color="primary">You need to have one in order to play.</Typography>
      </Box>
      <Box display="flex" justifyContent="space-around" marginY={7}>
        <Button variant="contained" color="info" onClick={() => setExpandedInfoList(!expandedInfoList)}>
          {expandedInfoList ? 'X' : 'Learn about wallets'}
        </Button>
        <Button variant="contained" color="error" onClick={() => router.push('https://metamask.io/download/')}>
          Take me to install
        </Button>
      </Box>
      {contentLoading && <Skeleton />}
      {expandedInfoList && (
        <Box>
          <InfoListItem title="What is a wallet?" description="bar" handleLink={() => console.log('clicked')} />
          <InfoListItem title="How to install" description="bar" handleLink={() => console.log('clicked')} />
          <InfoListItem title="Security best practices" description="bar" handleLink={() => console.log('clicked')} />
          {/* <Button
            fullWidth
            variant="outlined"
            color="info"
            onClick={() => router.push('https://metamask.io/download/')}
            sx={{
              marginTop: 7,
            }}
          >
            Got it! Lets install
          </Button> */}
        </Box>
      )}
    </Box>
  )
}
