import { Box, SxProps, useTheme } from '@mui/material'
import React from 'react'

function PinkBoxComponent(
  {
    children,
    sx,
    ...rest
  }: {
    children: React.ReactNode,
    sx?: SxProps
  },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const theme = useTheme()
  return (
    <Box
      ref={ref}
      sx={{
        border: `2px solid #FC0BD4`,
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1),
        ...sx
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
