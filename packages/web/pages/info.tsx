import { Box, Skeleton, Typography } from '@mui/material'
import { useContent } from '../providers'

export default function InfoPage() {
  // const { content, contentLoading } = useContent()
  return <Box>InfoPage</Box>
  // return (
  //   <Box
  //     sx={{
  //       paddingTop: '5.8em',
  //       minHeight: 'calc(100vh + 10em)',
  //     }}
  //   >
  //     <Typography variant="h4">Fweb3? What is this about?</Typography>
  //     {contentLoading ? (
  //       <Skeleton animation="wave" sx={{ width: 'auto', height: '300px' }} />
  //     ) : (
  //       <div dangerouslySetInnerHTML={{ __html: content.about }} />
  //     )}
  //   </Box>
  // )
}
