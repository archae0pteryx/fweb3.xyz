import { AddressDisplay } from './AddressDisplay'
import { Box, useTheme } from '@mui/material'
import { DisconnectButton, LinkButton } from '../common/Buttons'
import { Flex } from '../common/Boxes'
import { useRouter } from 'next/router'
import { useUser } from '../../providers'
import LinkOffIcon from '@mui/icons-material/LinkOff'

const ICON_SIZE = 50

function ConnectedButtons() {
  const router = useRouter()
  const onHome = router.pathname === '/'
  const onAbout = router.pathname === '/about'
  const showAboutButton = !onHome && !onAbout
  return (
    <Flex>
      {!onHome && <LinkButton to="/">Home</LinkButton>}
      {showAboutButton && <LinkButton to="/about">About</LinkButton>}
      <DisconnectButton />
    </Flex>
  )
}

export function Navbar() {
  const { isConnected, connectUser } = useUser()
  const theme = useTheme()
  return (
    <Box
      margin={theme.spacing(3)}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        minHeight: 50,
      }}
    >
      <AddressDisplay />
      {isConnected ? (
        <ConnectedButtons />
      ) : (
        <Box onClick={() => connectUser()}>
          <LinkOffIcon
            color="error"
            sx={{
              fontSize: ICON_SIZE,
            }}
          />
        </Box>
      )}
    </Box>
  )
}
