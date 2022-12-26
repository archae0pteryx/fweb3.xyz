import { useTheme, Typography, TypographyProps } from '@mui/material'
import React from 'react'

function HeadingComponent(
  props: TypographyProps & { children: React.ReactNode },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const theme = useTheme()
  return (
    <Typography ref={ref} variant="h2" align="center" marginX={theme.spacing(1)} marginY={theme.spacing(2)} {...props}>
      {props.children}
    </Typography>
  )
}

function SubHeadingComponent(props: TypographyProps, ref: React.ForwardedRef<HTMLDivElement>) {
  const theme = useTheme()
  return (
    <Typography
      ref={ref}
      variant="h4"
      color="warning.main"
      marginRight={theme.spacing(1)}
      marginY={theme.spacing(2)}
      {...props}
    >
      {props.children}
    </Typography>
  )
}

function BodyTextComponent(props: TypographyProps, ref: React.ForwardedRef<HTMLDivElement>) {
  const theme = useTheme()
  return (
    <Typography ref={ref} variant="body1" marginX={theme.spacing(1)} marginY={theme.spacing(2)} {...props}>
      {props.children}
    </Typography>
  )
}
function SmallTextComponent(props: TypographyProps, ref: React.ForwardedRef<HTMLDivElement>) {
  const theme = useTheme()
  return (
    <Typography ref={ref} variant="body2" marginX={theme.spacing(1)} marginY={theme.spacing(2)} {...props}>
      {props.children}
    </Typography>
  )
}

export const Heading = React.forwardRef(HeadingComponent)
export const SubHeading = React.forwardRef(SubHeadingComponent)
export const BodyText = React.forwardRef(BodyTextComponent)
export const SmallText = React.forwardRef(SmallTextComponent)
