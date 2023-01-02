import { Box, Typography } from '@mui/material'
import { apolloClient } from '../graphql/apollo'
import { REQUEST_CONTENT } from '../modules/content/content.queries'
import { IContent } from '../modules/content/content.types'

export default function AboutPage({ content, error }: { content: IContent, error: string }) {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh + 10em)',
        fontSize: '0.5',
        color: 'aliceblue',
        margin: 5,
      }}
    >
      <Typography variant="h6" color="primary">
        Fweb3? What is this about?
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <div dangerouslySetInnerHTML={{ __html: content.html || 'unknown error' }} />
    </Box>
  )
}

export async function getStaticProps() {
  const { data, error } = await apolloClient.query({
    query: REQUEST_CONTENT,
    variables: {
      type: 'ABOUT_PAGE',
      types: []
    },
  })

  return {
    props: {
      content: data?.requestContent || [],
      error: error?.message || '',
    },
  }
}
