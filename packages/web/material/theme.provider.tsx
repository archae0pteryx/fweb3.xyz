import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, responsiveFontSizes } from '@mui/material'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
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
