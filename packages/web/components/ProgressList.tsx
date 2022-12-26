import { Box, Typography, useTheme } from '@mui/material'
import { type Task, useGame } from '../providers'
import { Button } from './shared/Buttons'
import { useRouter } from 'next/router';

function ProgressListItem({ name, completed, path }: Task) {
  const theme = useTheme()
  const router = useRouter()

  const handleInstructions = () => {
    router.push(path)
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
      <Typography variant="h6">{name}</Typography>
      <Button variant="text" sx={{ color: 'aliceblue' }}>
        instructions
      </Button>
    </Box>
  )
}

function ValidatorItem({ name, completed }: { name: string; completed: boolean }) {
  return (
    <Box marginLeft={5}>
      <Typography marginY={2}>- {name}</Typography>
    </Box>
  )
}

export function ProgressList() {
  const { tasks } = useGame()
  const theme = useTheme()
  const completedTasks = tasks.filter((task) => task.completed)
  const lastCompleted = completedTasks[completedTasks.length - 1]
  const nextTask = tasks[lastCompleted.idx + 1]
  return (
    <Box>
      <Box marginBottom={theme.spacing(2)}>
        <Typography variant="h6" marginBottom={theme.spacing(1)}>
          Completed
        </Typography>
        {completedTasks.map((task, i) => (
          <ProgressListItem key={i} {...task} />
        ))}
      </Box>
      <Box marginBottom={theme.spacing(2)}>
        <Typography variant="h6" marginBottom={theme.spacing(1)}>
          Next Task
        </Typography>
        <ProgressListItem {...nextTask} />
      </Box>
    </Box>
  )
}
