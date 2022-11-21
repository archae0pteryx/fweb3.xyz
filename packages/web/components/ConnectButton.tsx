'use client'

import { Button, Spinner } from '@chakra-ui/react'
import { TbPlugX } from 'react-icons/tb'

export function ConnectButton({ children }: { children: React.ReactNode }) {
  return (
    <Button leftIcon={<TbPlugX />} colorScheme="white" variant="outline" spinner={<Spinner color="white" />}>
      {children}
    </Button>
  )
}
