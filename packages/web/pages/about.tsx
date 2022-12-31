import { Box, Typography } from '@mui/material'
import { apolloClient } from '../graphql/apollo'
import { REQUEST_CONTENT } from '../modules/content/content.queries'

export default function AboutPage(props: any) {
  const { content } = props
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
      <div dangerouslySetInnerHTML={{ __html: props.content[0].html }} />
    </Box>
  )
}

export async function getStaticProps() {
  const { data, error } = await apolloClient.query({
    query: REQUEST_CONTENT,
    variables: {
      types: ['ABOUT_PAGE'],
    },
  })

  return {
    props: {
      content: data?.requestContent || [],
      error: error?.message || '',
    },
  }
}
