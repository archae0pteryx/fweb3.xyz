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
      fontSize: 10,
      // body1: {
      //   color: '#FFE0FE',
      //   fontSize: 12,
      // },
      // body2: {
      //   color: '#FFE0FE',
      //   fontSize: 10,
      // },
      // subtitle1: {
      //   color: '#8D8CE5',
      //   fontSize: 10,
      // },
      // caption: {
      //   fontSize: 8,
      // },
    },
    palette: {
      mode: 'dark',
      secondary: {
        main: PINK,
        dark: PINK,
      },
      //   background: {
      //     default: '#030203',
      //   },
      //   primary: {
      //     main: '#FFE0FE',
      //   },
      //   secondary: {
      //     main: PINK,
      //     dark: PINK,
      //     contrastText: '#FFE0FE',
      //   },
      //   warning: {
      //     main: '#FFA709',
      //   },
      //   error: {
      //     main: '#DA2C38',
      //   },
      //   info: {
      //     main: '#1AF1A6',
      //   },
      //   success: {
      //     main: '#8D8CE5',
      //     dark: '#8D8CE5',
      //     contrastText: '#FFE0FE',
      //   },
      // },
      // components: {

      //   MuiButton: {
      //     styleOverrides: {
      //       textPrimary: {
      //         color: '#FFE0FE',
      //         '&:hover': {
      //           backgroundColor: 'rgba(224, 120, 254, 0.5)',
      //         },
      //         padding: '0.5em',
      //       },
      //       textInfo: {
      //         transition: 'all 0.4s ease-in-out',
      //         background: 'transparent',
      //         outline: 'none',
      //         '&:hover': {
      //           outline: 'solid 2px #FC0BD4',
      //           background: 'transparent',
      //         },
      //       },
      //       outlinedPrimary: {
      //         border: `2px solid ${PINK}`,
      //         color: '#FFE0FE',
      //         padding: '0.5em',
      //         '&:hover': {
      //           backgroundColor: '#E078FE',
      //         },
      //       },
      //       containedSizeSmall: {},
      //       textSizeSmall: {},
      //     },
      //   },
    },
  })
)
