import { InjectedConnector } from 'wagmi/connectors/injected'
import { LoadingButton } from './LoadingButton'
import { useToast, useConnect, useAccount } from '../../providers'

export function ConnectButton() {
  const { isConnected } = useAccount()
  const { triggerToast } = useToast()
  const { connect, isLoading } = useConnect({
    connector: new InjectedConnector(),
  })

  const handleConnect = async () => {
    try {
      await connect()
    } catch (error: any) {
      triggerToast(error.message)
    }
  }

  if (isConnected) {
    return null
  }

  return (
    <LoadingButton
      sx={{
        fontSize: '1.5em',
        width: '35%',
        padding: '1rem',
        marginTop: '1em',
      }}
      text="Play"
      variant="outlined"
      color="warning"
      loading={isLoading}
      onClick={() => handleConnect()}
    />
  )
}
