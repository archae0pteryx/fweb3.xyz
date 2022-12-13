import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { FlexBox } from '../common/Boxes'

const style = {
  margin: '0 0.1em',
  padding: 0,
}

export function HomeText() {
  return (
    <FlexBox
      sx={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <Link href="/about">
        <Typography variant="h1" sx={style} align="center">
          About
        </Typography>
      </Link>
      <Typography variant="h1" sx={style}>
        |
      </Typography>
      <Link href="/start">
        <Typography variant="h1" sx={style} align="center">
          Start
        </Typography>
      </Link>
    </FlexBox>
  )
}
