import { useTheme, Typography, TypographyProps } from '@mui/material'
import React from 'react'

function HeadingComponent(
  props: TypographyProps & { children: React.ReactNode },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const theme = useTheme()
  return (
    <Typography ref={ref} variant="h2" marginBottom={theme.spacing(2)} {...props}>
      {props.children}
    </Typography>
  )
}

function SubHeadingComponent(props: TypographyProps, ref: React.ForwardedRef<HTMLDivElement>) {
  const theme = useTheme()
  return (
    <Typography ref={ref} variant="h4" color="warning.main" marginBottom={theme.spacing(2)} {...props}>
      {props.children}
    </Typography>
  )
}

function LargeTextComponent(props: TypographyProps, ref: React.ForwardedRef<HTMLDivElement>) {
  const theme = useTheme()
  return (
    <Typography ref={ref} variant="h5" marginBottom={theme.spacing(2)} {...props}>
      {props.children}
    </Typography>
  )
}

function BodyTextComponent(props: TypographyProps, ref: React.ForwardedRef<HTMLDivElement>) {
  const theme = useTheme()
  return (
    <Typography ref={ref} variant="body1" marginBottom={theme.spacing(2)} {...props}>
      {props.children}
    </Typography>
  )
}
function SmallTextComponent(props: TypographyProps, ref: React.ForwardedRef<HTMLDivElement>) {
  const theme = useTheme()
  return (
    <Typography ref={ref} variant="body2" marginBottom={theme.spacing(2)} {...props}>
      {props.children}
    </Typography>
  )
}

export const Heading = React.forwardRef(HeadingComponent)
export const SubHeading = React.forwardRef(SubHeadingComponent)
export const BodyText = React.forwardRef(BodyTextComponent)
export const SmallText = React.forwardRef(SmallTextComponent)
export const LargeText = React.forwardRef(LargeTextComponent)
