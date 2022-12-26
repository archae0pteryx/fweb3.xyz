import { Box } from '@mui/material'
import { LinkButton } from '../common/Buttons'
import { NetworkDisplay } from './NetworkDisplay'
import { useUser } from '../../providers/user'

const mainContainerStyle = {
  position: 'fixed',
  width: '100%',
  height: '80px',
  bottom: 0,
  left: 0,
  color: 'white',
  background: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
}

export function FooterBar() {
  const { isAdmin } = useUser()
  return (
    <>
      <Box sx={mainContainerStyle}>
        <NetworkDisplay />
        {isAdmin && <LinkButton to="/admin">admin</LinkButton>}
      </Box>
    </>
  )
}
