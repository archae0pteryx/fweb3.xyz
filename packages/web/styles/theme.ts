import { createTheme, responsiveFontSizes, Typography } from '@mui/material';

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { Just_Another_Hand } from '@next/font/google'

const justAnotherHand = Just_Another_Hand({
  weight: '400',
  subsets: ['latin'],
})

export const theme = responsiveFontSizes(
  createTheme({
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
            fontFamily: justAnotherHand.style.fontFamily,
            fontSize: '3rem',
            fontStyle: 'normal',
            background: 'linear-gradient(180deg, #E59500 -89.05%, rgba(68, 64, 72, 0) 239.05%)',
            // textShadow: '0px 8px 8px #000000',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: 'transparent',
          },
        }
      }
    },
  })
)
