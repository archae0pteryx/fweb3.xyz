import { apolloClient } from '../graphql/apollo'
import { Box, Typography } from '@mui/material'
import { IContent } from '../modules/content/content.types'
import { REQUEST_CONTENT } from '../modules/content/content.queries'
import { Heading } from '../components/shared/Typography'

export default function AboutPage({ content, error }: { content: IContent; error: string }) {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh + 10em)',
        fontSize: '0.5',
        color: 'aliceblue',
        margin: 5,
      }}
    >
      <Heading>What is this about?</Heading>
      {error && <Typography color="error">{error}</Typography>}
      {content && <div dangerouslySetInnerHTML={{ __html: content?.html || 'unknown error' }} />}
    </Box>
  )
}

export async function getServerSideProps() {
  try {
    const { data, error } = await apolloClient.query({
      query: REQUEST_CONTENT,
      variables: {
        type: 'ABOUT_PAGE',
        types: [],
      },
    })

    return {
      props: {
        content: data?.requestContent || [],
        error: error?.message || '',
      },
    }
  } catch (err: any) {
    return {
      props: {
        content: [],
        error: err?.message || 'Unknown error!',
      },
    }
  }
}
