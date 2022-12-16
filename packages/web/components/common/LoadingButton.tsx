import MuiLoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton'

interface IBProps extends LoadingButtonProps {
  text: string
}

export function LoadingButton(props: IBProps) {
  const { text } = props
  return (
    <MuiLoadingButton size="small" color="secondary" variant="outlined" {...props}>
      {text}
    </MuiLoadingButton>
  )
}
