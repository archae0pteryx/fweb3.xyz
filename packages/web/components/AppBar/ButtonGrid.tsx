import { FaDiscord, FaGithubAlt } from 'react-icons/fa'
import { Grid, Box, Skeleton, Button as MuiButton } from '@mui/material'
import { ImHome3 } from 'react-icons/im'
import { LoadingButton } from '../common/LoadingButton'
import { TbPlug } from 'react-icons/tb'
import { TfiHelpAlt } from 'react-icons/tfi'
import { useRouter } from 'next/router'
import { useUser } from '../../providers'
import { VscDebugDisconnect } from 'react-icons/vsc'
import { BiGame } from 'react-icons/bi'

const BUTTONS = [
  { Icon: ImHome3, text: 'Home', href: '/' },
  { Icon: FaDiscord, text: 'Discord', href: 'https://discord.gg/2Z9Z7Yj' },
  { Icon: FaGithubAlt, text: 'Github', href: 'https://github.com/archae0pteryx/fweb3.xyz' },
  { Icon: TfiHelpAlt, text: 'Info', href: '/info' },
]

export function ButtonGrid() {
  const { initialized, isConnected } = useUser()
  return (
    <Box sx={{ flexGrow: 1 }} margin={3}>
      <Grid container justifyContent='flex-end'>
        {/* <>
          {initialized ? renderButtons() : <Skeleton animation="wave" />}
          <Item>
            <GameButton />
          </Item>
        </> */}
        <Item>
          <ConnectDisconnectButton />
        </Item>
      </Grid>
    </Box>
  )
}

function renderButtons() {
  return BUTTONS.map((button) => <Button {...button} />)
}

function Button({ href, Icon, text }: { href: string; Icon: any; text: string }) {
  const router = useRouter()
  if (router.pathname === href) return null
  return (
    <Item>
      <MuiButton variant="outlined" color="info" onClick={() => router.push(href)} startIcon={<Icon size={20} />}>
        {text}
      </MuiButton>
    </Item>
  )
}

function Item(props: any) {
  return <Grid item {...props} />
}

function ConnectDisconnectButton() {
  const { isConnected, disconnectUser, isConnecting, connectUser } = useUser()
  if (isConnected) {
    return (
      <MuiButton
        size="small"
        color="warning"
        variant="outlined"
        onClick={() => disconnectUser()}
        startIcon={<VscDebugDisconnect size={20} />}
      >
        Disconnect
      </MuiButton>
    )
  }
  return (
    <LoadingButton
      text="Connect"
      color="success"
      loading={isConnecting}
      onClick={() => connectUser()}
      startIcon={<TbPlug size={20} />}
    />
  )
}

function GameButton() {
  return <MuiButton variant="outlined" color="info" startIcon={<BiGame size={20}/>}>Game</MuiButton>
}
