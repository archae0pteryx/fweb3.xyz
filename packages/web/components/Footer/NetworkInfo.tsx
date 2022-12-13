import { FlexBox } from '../common/Boxes'
import { useAccount, useNetwork } from '../../providers'
import LinkIcon from '@mui/icons-material/Link'
import LinkOffIcon from '@mui/icons-material/LinkOff'
import Typography from '@mui/material/Typography'

const iconStyle = {
  marginRight: '0.4em',
}

export function NetworkInfo() {
  const { isConnected } = useAccount()
  const netInfo = useNetwork()
  const netName = netInfo.chain?.name || 'Unknown'
  const connectedText = isConnected ? netName : 'Disconnected'
  return (
    <FlexBox
      sx={{
        justifyContent: 'space-between',
      }}
    >
      {isConnected ? <LinkIcon color="success" sx={iconStyle} /> : <LinkOffIcon color="error" sx={iconStyle} />}
      <Typography variant="caption">{connectedText}</Typography>
    </FlexBox>
  )
}
