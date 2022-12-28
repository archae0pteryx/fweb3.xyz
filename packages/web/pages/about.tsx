import { Box, Typography } from '@mui/material'
import { apolloClient } from '../lib/apolloClient'
import { FIND_CONTENT } from '../providers'

export default function AboutPage(props: any) {
  const content = props.content?.[0] || { html: '<p>There was an error loading content</p>' }
  if (!content) {
    return (
      <Typography variant="h6" color="primary">
        There was a problem loading content.
      </Typography>
    )
  }
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
      <div dangerouslySetInnerHTML={{ __html: content.html }} />
    </Box>
  )
}

export async function getStaticProps() {
  try {
    const { data } = await apolloClient.query({
      query: FIND_CONTENT,
      variables: {
        types: ['ABOUT_PAGE'],
      },
    })
    console.log('aboutpage.content', data.findContent)
    return {
      props: {
        content: data?.findContent || [],
      },
    }
  } catch (err) {
    return {
      props: {
        content: [],
      }
    }
  }
}
