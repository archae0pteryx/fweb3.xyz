import { createTheme, responsiveFontSizes } from '@mui/material'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { Press_Start_2P } from '@next/font/google'

const player2 = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
})

const PINK = '#FC0BD4'

export const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: player2.style.fontFamily,
      fontSize: 8,
    },
    palette: {
      mode: 'dark',
      secondary: {
        main: PINK,
        dark: PINK,
      },
    },
  })
)
