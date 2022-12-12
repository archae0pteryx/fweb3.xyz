import { InjectedConnector } from 'wagmi/connectors/injected'
import { LoadingButton } from './LoadingButton'
import { useAccount, useConnect } from 'wagmi'
import { useToast } from '../../providers/toast'

export function ConnectButton() {
  const { isConnected } = useAccount()
  const { triggerToast } = useToast()
  const { connect, isLoading } = useConnect({
    connector: new InjectedConnector(),
  })

  const handleConnect = async () => {
    try {
      await connect()
      triggerToast('Connected')
    } catch (error: any) {
      triggerToast(error.message)
    }
  }

  if (isConnected) {
    return null
  }

  return <LoadingButton text="Connect" loading={isLoading} onClick={() => handleConnect()} />
}
