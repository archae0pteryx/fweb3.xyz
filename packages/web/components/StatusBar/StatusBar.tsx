import { Box, useTheme } from '@mui/material'
import { useUser } from '../../providers'
import { AddressDisplay } from './AddressDisplay'
import { DisconnectButton } from '../common/Buttons'
import LinkOffIcon from '@mui/icons-material/LinkOff'

const ICON_SIZE = 50

export function StatusBar() {
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
        <DisconnectButton />
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
