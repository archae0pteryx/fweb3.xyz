import { Fade, IconButton, Tooltip } from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'

export function InfoButton() {
  return (
    <Tooltip title="What the heck is this all about?" placement="left" TransitionComponent={Fade}>
      <IconButton size="large" aria-label="info" href="/info">
        <HelpIcon />
      </IconButton>
    </Tooltip>
  )
}
