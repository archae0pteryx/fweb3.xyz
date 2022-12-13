import { Typography } from '@mui/material'
import Container from '@mui/system/Container'
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/system/Box'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

export function Unauthorized() {
  const router = useRouter()
  return (
    <Container>
      <Box
        sx={{
          transform: 'translateY(50%)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconButton>
            <CrisisAlertIcon
              sx={{
                fontSize: 200,
                color: 'red',
              }}
            />
          </IconButton>
          <Typography
            sx={{
              fontSize: 100,
            }}
          >
            Unauthorized
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            sx={{
              fontSize: 50,
            }}
            variant="contained"
            size="large"
            onClick={() => router.push('/')}
          >
            Home
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
