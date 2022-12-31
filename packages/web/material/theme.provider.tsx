import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
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
      body1: {
        fontSize: 12,
      },
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

export function MaterialProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  )
}

export { useTheme } from '@mui/material/styles'
