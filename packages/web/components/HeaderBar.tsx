'use client'
import { Spacer, Box, Flex, ButtonGroup, Heading } from '@chakra-ui/react'
import { ConnectButton } from './ConnectButton'
export function HeaderBar() {
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2" p="5">
      <Box p="2">
        <Heading size="xl">Fweb3</Heading>
      </Box>
      <Spacer />
      <ButtonGroup>
        <ConnectButton>Connect</ConnectButton>
      </ButtonGroup>
    </Flex>
  )
}
