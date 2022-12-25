import { Box, useTheme } from '@mui/material'
import React from 'react'

function PinkBoxComponent(
  {
    children,
    ...rest
  }: {
    children: React.ReactNode
  },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const theme = useTheme()
  return (
    <Box
      ref={ref}
      sx={{
        border: `2px solid #FC0BD4`,
        padding: theme.spacing(3),
        maring: theme.spacing(1),
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}

export const PinkBox = React.forwardRef(PinkBoxComponent)
