import { default as MuiAppBar } from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/system'
import { ConnectButtons } from './ConnectButtons'

export function AppBar() {
  return (
      <MuiAppBar position="static">
        <Container maxWidth='xl'>

        <Toolbar disableGutters>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fweb3
          </Typography>
          <ConnectButtons />
        </Toolbar>
        </Container>
      </MuiAppBar>
  )
}
