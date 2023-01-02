import { Box, Typography, Button, Card } from '@mui/material'

export default function StylePage() {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
      <Card>
        <Box flexDirection="column">
          <Typography color="primary">primary default</Typography>
          <Typography variant="h1">h1</Typography>
          <Typography variant="h2">h2</Typography>
          <Typography variant="h3">h3</Typography>
          <Typography variant="h4">h4</Typography>
          <Typography variant="h5">h5</Typography>
          <Typography variant="h6">h6</Typography>
        </Box>
      </Card>
      <Box>
        <Typography variant="body1" color="secondary">
          secondary
        </Typography>
        <Typography variant="body1" color="success">
          success
        </Typography>
        <Typography color="info">info</Typography>
        <Typography color="warning">warning</Typography>
        <Typography color="error">error</Typography>
        <Button >normal</Button>
        <Button variant='outlined'>normal outlined</Button>
      </Box>
    </Box>
  )
}
