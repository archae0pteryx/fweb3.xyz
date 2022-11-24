'use client'
import { Box, Button, Center, Container, Flex, Stack, Text, ButtonGroup, IconButton, HStack } from '@chakra-ui/react';
import { ClosedChestImage } from '../components/ClosedChest'
import { HeaderText } from '../components/HeaderText'
import { TbBrandDiscord } from 'react-icons/tb'
import { MdOutlineEmail } from 'react-icons/md'
import Link from 'next/link'

export default function Page() {
  return (
    <Flex direction="row" justifyContent="center" alignItems="center">
      <Center>
        <ClosedChestImage />
      </Center>
      <Flex direction="column" justifyContent="center" alignItems="left">
        <Box>
          <HeaderText mb="5" ml="3">
            Game is being updated
          </HeaderText>
        </Box>
        <Box>
          <Container>
            <Text fontSize="2xl">Check the status on</Text>
            <HStack>
              <Link href="https://discord.gg/u9dBFXrT7e">
                <Button variant="outline" colorScheme="white" leftIcon={<TbBrandDiscord />}>
                  Discord
                </Button>
              </Link>
            </HStack>
          </Container>
        </Box>
      </Flex>
    </Flex>
  )
}
