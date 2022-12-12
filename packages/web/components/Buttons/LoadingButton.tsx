import MuiLoadingButton from '@mui/lab/LoadingButton'

export function LoadingButton({ text, loading, onClick }: { text: string; loading: boolean; onClick: () => void }) {
  return (
    <MuiLoadingButton loading={loading} size="small" color="secondary" variant="contained" onClick={onClick}>
      {text}
    </MuiLoadingButton>
  )
}
