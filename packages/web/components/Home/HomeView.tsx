import { Box, Grid, Typography } from '@mui/material'
import { ClosedChest } from '../common/ClosedChest'
import CollapseList from '../TaskList/CollapseList'

export default function HomeView() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" justifyContent="space-around" alignItems="center">
            <Typography variant="h5">Complete the tasks</Typography>
            <ClosedChest />
            <Typography variant="h6">Unlock the chest</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <CollapseList />
        </Grid>
      </Grid>
    </Box>
  )
}
