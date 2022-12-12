import Box from '@mui/material/Box'
import Email from '@mui/icons-material/Email'
import InputAdornment from '@mui/material/InputAdornment'
import TextField, { TextFieldProps } from '@mui/material/TextField'

export function EmailInput(props: TextFieldProps) {
  const { error } = props
  return (
    <Box>
      <TextField
        fullWidth
        color="secondary"
        helperText={error || ' '}
        label="Email Address"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
        }}
        {...props}
      />
    </Box>
  )
}
