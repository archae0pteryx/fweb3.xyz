import { default as MuiAppBar } from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { ConnectButtons } from './ConnectButtons'

export function AppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fweb3
          </Typography>
          <ConnectButtons />
        </Toolbar>
      </MuiAppBar>
    </Box>
  )
}
