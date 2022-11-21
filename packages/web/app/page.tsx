'use client'
import { Box, Center, Container, Flex, Text } from '@chakra-ui/react'
import { ClosedChestImage } from '../components/ClosedChest'
import { HeaderText } from '../components/HeaderText'

export default function Page() {
  return (
    <Flex direction="row" justifyContent="center" alignItems="center">
      <Center>
        <ClosedChestImage />
      </Center>
      <Flex direction="column" justifyContent="center" alignItems="left">
        <Box>
          <HeaderText mb="5" ml="3">
            Update: Nov 20, 2022
          </HeaderText>
        </Box>
        <Box>
          <Container>
            <Text>
              The game has been undergoing a bunch of updates the last few months and is still around! There is still a
              community here - whatever the size. Importantly, there are still folks that see the value in guiding
              people to the web3 world. It's important that people equip themselves with the basic knowledge to protect
              themselves in this wild west. So... A new version of the game will be live in F(web)uary that is built
              upon all the great knowledge we've learned so far. We are still completely community supported and that
              means all are welcome! We need every level of fweeb so whether you write smart contracts for a living, or
              struggle to install Metamask, your help is welcome! Come visit the
              [discord](https://discord.gg/u9dBFXrT7e) and introduce yourself, throw your ideas in and let us know where
              you'd like to help!
            </Text>
          </Container>
        </Box>
      </Flex>
    </Flex>
  )
}
