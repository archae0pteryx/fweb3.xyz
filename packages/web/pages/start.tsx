// import { MarkdownLayout } from '../components/Layouts/MarkdownLayout'
// import { GetStartedTasks } from '../components/start/GetStartedTasks'

import { Box, Typography } from '@mui/material'
import { SubHeading, BodyText } from '../components/shared/Typography'
import Layout from '../components/AppWrapper'

export const meta = {
  title: 'Get Started',
  description: 'Learn how to interact with the web3 ecosystem',
  tags: ['web3', 'ethereum', 'crypto', 'blockchain', 'nft', 'wallet', 'smart contract'],
  layout: 'docs',
  publish: true,
}

export default function StartPage() {
  return (
    <Layout>
      <Box>
        <SubHeading>Solve challenges, win NFT&apos;s and knowledge!</SubHeading>
        <BodyText>
          If you&apos;re completely new to web3, wallets, or smart contracts. You&apos;re in the right spot. These
          challenges are designed to take you from complete noob to an empowered, safe web3 user. While there is no
          coding required, you will be exposed to some. Our hope is to equip folks from all over the world with the
          knowledge to safely interact with this emerging technology. We believe that privacy is an unalienable human
          right. The decentralized solutions that form the backbone of &quot;web3&quot; are a major step toward
          users&apos; being in control of their personal data. People are not products. It may not be the best tool
          toward empowerment (or even the one that will stick) but it&apos;s a start... More about people as products,
          privacy, and things here.
        </BodyText>
      </Box>
    </Layout>
  )
}
