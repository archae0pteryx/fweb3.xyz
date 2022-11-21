'use client'

import React from 'react'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import theme from './theme'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Fweb3</title>
      </head>
      <body>
        <ChakraProvider theme={theme}>
          <CSSReset />
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}
