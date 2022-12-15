import Box, { BoxProps } from '@mui/material/Box'

export function FlexBox(props: BoxProps) {
  const { sx, ...rest } = props
  const style = {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5em',
    margin: '0.5em',
    ...sx,
  }
  return <Box sx={style} {...rest} />
}
