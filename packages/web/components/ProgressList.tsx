import { Box, Typography } from '@mui/material'
import { Flex } from './common/Boxes'
import { type Task, useGame } from '../providers'

function ProgressListItem({ name, completed, validators = [] }: Task) {
  return (
    <Box marginY={5}>
      <Typography>{name}</Typography>
      {validators.map((validator) => {
        return (
          <Flex key={validator.idx}>
            <ValidatorItem name={validator.name} completed={validator.completed} />
          </Flex>
        )
      })}
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
  return (
    <Box>
      {tasks.map((task, i) => (
        <ProgressListItem key={i} {...task} />
      ))}
    </Box>
  )
}
