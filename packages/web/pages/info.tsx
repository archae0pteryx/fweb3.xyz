import { Box, Typography } from '@mui/material'
import { apolloClient, FIND_CONTENT, REQUEST_CONTENT } from '../lib/apolloClient'

export default function InfoPage(props: any) {
  const content = props.content[0]
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh + 10em)',
        fontSize: '0.5',
        color: 'aliceblue',
        margin: 5,
      }}
    >
      <Typography variant="h6" color='primary'>Fweb3? What is this about?</Typography>
      <div dangerouslySetInnerHTML={{ __html: content.html }} />
    </Box>
  )
}

// export async function getStaticProps() {
//   const { data } = await apolloClient.mutate({
//     mutation: REQUEST_CONTENT,
//     variables: {
//       prompts: [
//         {
//           prompt:
//             'Explain the importance of the web3 movement using markdown syntax. Use important bullet points and links to learn more along the way.',
//           type: 'INFO',
//           title: 'Fweb3? What is this about?',
//         },
//       ],
//     },
//   })
//   return {
//     props: {
//       content: data.requestContent,
//     },
//   }
// }

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: FIND_CONTENT,
    variables: {
      types: ["INFO"],
    },
  })

  return {
    props: {
      content: data.findContent,
    },
  }
}
