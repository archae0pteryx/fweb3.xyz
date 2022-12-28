import { Box, Typography, useTheme } from '@mui/material'
import { Button } from './shared/Buttons'
import { type Task, useGame } from '../providers'
import { useRouter } from 'next/router'

function ProgressListItem({ id, title, completed }: Task) {
  const theme = useTheme()
  const router = useRouter()

  const handleInstructions = () => {
    router.push(`game/${id}`)
  }
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding={theme.spacing(2)}
      marginY={theme.spacing(1)}
      onClick={handleInstructions}
      sx={{
        border: '2px solid',
        borderColor: !completed ? 'warning.main' : 'success.main',
        borderRadius: theme.spacing(1),
        cursor: 'pointer',
        backgroundColor: !completed ? '' : 'success.main',
        '&:hover': {
          backgroundColor: !completed ? 'warning.main' : '',
        },
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <Button variant="text" sx={{ color: 'aliceblue' }}>
        instructions
      </Button>
    </Box>
  )
}

export function ProgressList() {
  const { tasks } = useGame()
  const theme = useTheme()
  console.log('progresslist.tasks', tasks)
  return (
    <Box>
      <Box marginBottom={theme.spacing(2)}>
        <Typography variant="h6" marginBottom={theme.spacing(1)}>
          Completed
        </Typography>
        {tasks.map((task, i) => (
          <ProgressListItem key={i} {...task} />
        ))}
      </Box>
    </Box>
  )
}
