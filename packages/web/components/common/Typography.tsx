import { useTheme, Typography, TypographyProps } from '@mui/material';
import React from 'react'

function HeadingComponent(
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
    <Typography ref={ref} variant="h2" align="center" marginX={theme.spacing(1)} marginY={theme.spacing(2)} {...rest}>
      {children}
    </Typography>
  )
}

function SubHeadingComponent(
  props: TypographyProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const theme = useTheme()
  return (
    <Typography ref={ref} variant="h6" align="center" marginX={theme.spacing(1)} marginY={theme.spacing(2)} {...props}>
      {props.children}
    </Typography>
  )
}

export const Heading = React.forwardRef(HeadingComponent)
export const SubHeading = React.forwardRef(SubHeadingComponent)
