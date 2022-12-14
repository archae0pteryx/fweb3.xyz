import { Skeleton, Typography } from '@mui/material'
import { useContent } from '../providers'

export default function AboutPage() {
  const { content, contentLoading } = useContent()

  return contentLoading ? (
    <>
      <Skeleton animation="wave" sx={{ width: 'auto', height: '200px' }} />
      <Skeleton sx={{ width: 'auto', height: '300px' }} />
    </>
  ) : (
    <>
      <Typography variant="h4">Fweb3? What is this about?</Typography>
      <div dangerouslySetInnerHTML={{ __html: content.about }} />
    </>
  )
}
