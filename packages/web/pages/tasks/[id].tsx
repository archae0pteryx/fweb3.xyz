import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export default function TaskInfo() {
  const router = useRouter()
  const { id } = router.query
  return (
    <Box>
      <Typography variant="h6">Task Info</Typography>
      <Typography>{id}</Typography>
    </Box>
  )
}
