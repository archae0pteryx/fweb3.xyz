import { Box, Typography } from '@mui/material'

export function MaintenanceView() {
return (
  <Box
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
    }}
  >
    <Typography style={{ color: 'white' }}>Disabled for maintenance</Typography>
  </Box>
)
}
