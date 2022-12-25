import { DebugInfo } from './DebugInfo'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import { useUser } from '../../providers'
import Box from '@mui/material/Box'
import BugReportIcon from '@mui/icons-material/BugReport'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

export function DebugBar() {
  const [open, setOpen] = useState(false)
  const { address } = useUser()

  const handleClick = () => {
    setOpen(!open)
  }

  const showDebug =
    (process.env.NODE_ENV === 'development' && address) || process.env.NEXT_PUBLIC_DEBUG_ENABLED === 'true'

  if (!showDebug) {
    return null
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
          position: 'fixed',
          zIndex: 10,
          bottom: '1em',
          left: '1em',
          margin: '0.5em',
          padding: '0.5em',
          color: 'rgba(255,100,0,0.6)',
        }}
      >
        <BugReportIcon />
        {open ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
    </Box>
  )
}
