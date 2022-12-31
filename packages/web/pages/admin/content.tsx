import { gql } from '@apollo/client'
import { Backdrop, Box, CircularProgress, TextField, Typography } from '@mui/material'
import { apolloClient } from '../../graphql/apollo'
import { SmallText, BodyText } from '../../components/shared/Typography'
import { IContent } from '../../graphql/types'
import { Button } from '../../components/shared/Buttons'
import { useCreateContent } from '../../modules/content/useContent'
import { useState } from 'react'
import { PinkBox } from '../../components/shared/Boxes'
import Layout from '../../components/Layouts/Layout'

export default function AdminContentPage(props: any) {
  const { createContent, loading } = useCreateContent()
  const [editing, setEditing] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [html, setHtml] = useState('')

  const handleEdit = (id: string) => {
    const found = props.content.find((c: IContent) => c.id === id)
    setPrompt(found?.prompt || '')
    setTitle(found?.title || '')
    setType(found?.type || '')
    setHtml(found?.html || '')
    setEditing(true)
  }

  const handleCreate = () => {
    createContent({
      prompt,
      title,
      type,
    })
  }

  const handleView = (id: string) => {
    const found = props.content.find((c: IContent) => c.id === id)
    setHtml(found?.html || '')
  }

  return (
    <Layout>
      <Box margin={5}>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress color="secondary" />
        </Backdrop>
        <BodyText>Admin Content Page</BodyText>
        {props.content && <SmallText>Count: {props.content.length}</SmallText>}
        {props.error && <SmallText color="error">{props.error}</SmallText>}
        <Box>
          {editing && (
            <PinkBox
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginY: 3,
                gap: 3,
              }}
            >
              <TextField label="type" value={type} onChange={(e) => setType(e.target.value)} />
              <TextField label="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
              <TextField label="title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <Button onClick={handleCreate}>create</Button>
            </PinkBox>
          )}
          {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
        </Box>
        {props.content.map((c: IContent, i: number) => (
          <Box
            key={i}
            sx={{
              background: 'rgba(0,0,0,0.5)',
              padding: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography color="primary">{c.type}</Typography>
            <Typography>{c.title}</Typography>
            <Box gap={1} display="flex">
              <Button color="error" onClick={() => handleEdit(c.id || '')}>
                edit
              </Button>
              <Button color="primary" onClick={() => handleView(c.id || '')}>
                view
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Layout>
  )
}

export async function getStaticProps() {
  const { data, error } = await apolloClient.query({
    query: gql`
      query Query {
        latestContent {
          id
          type
          title
          html
          prompt
        }
      }
    `,
  })

  return {
    props: {
      content: data?.latestContent || [],
      error: error?.message || '',
    },
  }
}
