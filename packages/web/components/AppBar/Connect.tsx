import { InjectedConnector } from 'wagmi/connectors/injected'
import { LoadingButton } from '../common/LoadingButton'
import { useToast, useConnect, useAccount } from '../../providers'
import { useRouter } from 'next/router'

export function ConnectButton() {
  const { isConnected } = useAccount()
  const router = useRouter()
  const { triggerToast } = useToast()
  const { connect, isLoading } = useConnect({
    connector: new InjectedConnector(),
  })

  const handleConnect = async () => {
    try {
      await connect()
      router.push('/play')
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
      text="Connect"
      variant="outlined"
      color="warning"
      loading={isLoading}
      onClick={() => handleConnect()}
    />
  )
}
