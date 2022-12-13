import { useAccount, useUser, useNetwork } from '../../providers'
import { useState } from 'react'
import Box from '@mui/material/Box'
import BugReportIcon from '@mui/icons-material/BugReport'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'

function DebugBox({ data }: any) {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <List
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        margin: 2
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Box
            sx={{
              marginBottom: 5,
              color: 'grey',
            }}
          >
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </Box>
        </List>
      </Collapse>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <BugReportIcon />
        </ListItemIcon>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
    </List>
  )
}

export function DebugAppState() {
  const { address } = useAccount()
  const net = useNetwork()
  const {
    userAddress,
    onboarding,
    showOnboardModal,
    loading,
    error,
    role,
    email,
    verified,
    discord,
    disabled,
    foundUser,
  } = useUser()
  const DEBUG_DATA = {
    wagmi: {
      address: address?.substring(0, 5),
      chain: net?.chain?.id,
      net: net.chain?.name,
    },
    graphql: {
      foundUser,
      loading,
      error,
      userAddress: userAddress?.substring(0, 5),
      onboarding,
      showOnboardModal,
      role,
      email,
      discord,
      verified,
      disabled,
    },
  }
  return <DebugBox data={DEBUG_DATA} />
}
