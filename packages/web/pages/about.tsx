import { Suspense, useState, useEffect } from 'react'
import { Skeleton, Typography } from '@mui/material'
import { remark } from 'remark'
import html from 'remark-html'

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [about, setAbout] = useState<any>()

  // Use remark to convert markdown into HTML string
  useEffect(() => {
    ;(async () => {
      try {
        if (mounted) {
          setLoading(true)
          // console.log('fetching from openai')
          // const response = await fetch('/api/about')
          // const data = await response.json()
          // // console.log({ data })
          // const processedContent = await remark().use(html).process(data.output.text)
          // const contentHtml = processedContent.toString()
          // setAbout(contentHtml)
          // setLoading(false)
        }
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])
  useEffect(() => {
    setMounted(true)
  })
  return loading ? (
    <>
      <Skeleton animation='wave' sx={{ width: 'auto', height: '200px' }} />
      <Skeleton sx={{ width: 'auto', height: '300px' }} />
    </>
  ) : (
    <>
    <Typography variant="h4">About</Typography>
    <div dangerouslySetInnerHTML={{ __html: about }} />
    </>
  )
}
