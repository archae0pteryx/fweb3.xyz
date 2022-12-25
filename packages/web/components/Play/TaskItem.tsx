import { Box, Typography } from "@mui/material";

export function TaskItem({ title }: { title: string }) {
  return (
    <Box>
      <Typography variant="body1">{title}</Typography>
    </Box>
  )
}
