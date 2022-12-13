import { DebugInfo } from './DebugInfo'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import Box from '@mui/material/Box'
import BugReportIcon from '@mui/icons-material/BugReport'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

export function DebugButton() {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <DebugInfo />
      </Collapse>
      <IconButton
        size="small"
        onClick={handleClick}
        sx={{
          margin: '0.5em',
          padding: '0.5em',
        }}
      >
        <BugReportIcon />
        {open ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
    </Box>
  )
}
