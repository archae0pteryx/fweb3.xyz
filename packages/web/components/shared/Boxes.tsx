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
        borderRadius: theme.spacing(2),
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}

function FlexComponent({ children, ...rest }: any, ref: React.ForwardedRef<HTMLDivElement>) {
  const theme = useTheme()
  const { sx, ...restProps } = rest
  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
        ...sx,
      }}
      {...restProps}
    >
      {children}
    </Box>
  )
}

export const PinkBox = React.forwardRef(PinkBoxComponent)
export const Flex = React.forwardRef(FlexComponent)
