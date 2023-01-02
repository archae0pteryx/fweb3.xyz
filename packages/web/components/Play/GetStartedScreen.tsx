import { Box } from '@mui/material'
import { SubHeading, BodyText } from '../shared/Typography'
import { Button } from '../shared/Buttons'
import { useAccount, useConnect } from 'wagmi'

export function GetStartedScreen(setCurrentScreen: any) {
  const { connect } = useConnect()

  return (
    <Box>
      <Box margin={5}>
        <SubHeading>Solve challenges, win NFT&apos;s and knowledge!</SubHeading>
        <BodyText>
          If you&apos;re completely new to web3, wallets, or smart contracts. You&apos;re in the right spot.{' '}
        </BodyText>
        <BodyText>These challenges are designed to take you from complete noob to a level 2 web3 warrior.</BodyText>
        <BodyText> While there is no coding required, you will be exposed to some.</BodyText>
        <BodyText marginTop={5}>
          The goal: Equip folks from all over the world with the knowledge to safely interact with this emerging
          technology. We believe that privacy is an unalienable human right. The decentralized solutions that form the
          backbone of &quot;web3&quot; are a major step toward users&apos; being in control of their personal data.
          People are not products. It may not be the best tool toward empowerment (or even the one that will stick) but
          it&apos;s a start... More about people as products, privacy, and things here.
        </BodyText>
      </Box>
      <Box marginTop={5} marginX={5}>
        <SubHeading>The Challenges</SubHeading>
        <BodyText>1. Create and connect a metamask wallet</BodyText>
        <BodyText>2. Add additional networks and tokens</BodyText>
        <BodyText>3. Find a specific wallet and tx</BodyText>
        <BodyText>4. Send a TX, receive a TX</BodyText>
        <BodyText>5. Swap tokens</BodyText>
        <BodyText>6. Create your own token contract</BodyText>
        <BodyText>7. Burn tokens</BodyText>
        <BodyText>7. Create an NFT contract</BodyText>
        <BodyText>9. The boss fight</BodyText>
      </Box>
      <Box marginTop={5} marginX={5}>
        <Button size="large" onClick={() => connect()}>
          Connect your wallet
        </Button>
      </Box>
    </Box>
  )
}
