import { apolloClient } from '../graphql/apollo'
import { Box } from '@mui/material'
import { Button } from '../components/shared/Buttons'
import { Heading } from '../components/shared/Typography'
import { REQUEST_CONTENT } from '../modules/content/content.queries'
import Layout from '../components/Layout'
import Link from 'next/link'

export default function InstructionPage({ content, error }: any) {
  return (
    <Layout>
      <Box margin={5}>
        <Heading>Instructions</Heading>
        {error && <div>Error: {error}</div>}
        <div dangerouslySetInnerHTML={{ __html: content?.html || 'Cannot load content' }} />
      </Box>
      <Box width="100%" display="flex" justifyContent="center">
        <Link
          href="https://metamask.io/download.html"
          target="_blank"
          style={{
            color: 'yellow',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          <Button size="large">Install metamask</Button>
        </Link>
      </Box>
    </Layout>
  )
}

export async function getServerSideProps() {
  try {
    const { data, error } = await apolloClient.query({
      query: REQUEST_CONTENT,
      variables: {
        type: 'INSTRUCTION_PAGE',
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
        error: err?.message || '',
      },
    }
  }
}
