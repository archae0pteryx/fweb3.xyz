import { Button as MuiButton, useTheme } from '@mui/material'

export function Button(props: React.ComponentProps<typeof MuiButton>) {
  const theme = useTheme()
  return <MuiButton variant="contained" color="secondary" sx={{
    fontSize: theme.spacing(2),
    padding: theme.spacing(1),
    minWidth: theme.spacing(20),
  }} {...props} />
}
