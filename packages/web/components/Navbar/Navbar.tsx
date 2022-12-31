import { AddressDisplay } from './AddressDisplay'
import { Box, useTheme } from '@mui/material'
import { DisconnectButton, LinkButton } from '../shared/Buttons'
import { Flex } from '../shared/Boxes'
import { useRouter } from 'next/router'
import LinkOffIcon from '@mui/icons-material/LinkOff'
import { useConnect, useAccount } from 'wagmi';

const ICON_SIZE = 50

function ConnectedButtons() {
  const router = useRouter()
  const onHome = router.pathname === '/'
  const onAbout = router.pathname === '/about'
  return (
    <Flex>
      {!onHome && <LinkButton to="/">Home</LinkButton>}
      {!onHome && !onAbout && <LinkButton to="/about">About</LinkButton>}
      <DisconnectButton />
    </Flex>
  )
}

export function Navbar() {
  const { connect } = useConnect()
  const { isConnected } = useAccount()
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
        <Box onClick={() => connect()}>
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
