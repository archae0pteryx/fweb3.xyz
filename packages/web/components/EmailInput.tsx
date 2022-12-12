import { Email } from '@mui/icons-material'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

export function EmailInput({
  value,
  setValue,
  validValue,
}: {
  validValue: boolean
  value: string
  setValue: (value: string) => void
}) {
  return (
    <Box>
      <TextField
        fullWidth
        color="secondary"
        error={!validValue}
        helperText={!validValue ? 'Invalid email' : ' '}
        label="Email Address"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  )
}
