import { createTheme, responsiveFontSizes } from '@mui/material'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { Just_Another_Hand, Inter } from '@next/font/google'
import { Big_Shoulders_Display } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })
const bigShouldersDisplay = Big_Shoulders_Display({ subsets: ['latin'] })
const justAnotherHand = Just_Another_Hand({
  weight: '400',
  subsets: ['latin'],
})

export const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: inter.style.fontFamily,
    },
    palette: {
      mode: 'dark',
      background: {
        default: '#1F0E25',
      },
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          h1: {
            fontFamily: bigShouldersDisplay.style.fontFamily,
          },
          h2: {
            fontFamily: bigShouldersDisplay.style.fontFamily,
          },
          h6: {
            color: 'aliceblue',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: 'transparent',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: inter.style.fontFamily,
            // fontSize: '1rem',
          }
        },
      }
    },
  })
)
