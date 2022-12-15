import { Fade, IconButton, Link, Tooltip } from '@mui/material'
import { useRouter } from 'next/router'
import { ImHome3 } from 'react-icons/im'
import { TfiHelpAlt } from 'react-icons/tfi'

const renderHomeIcon = () => {
  return (
    <Tooltip title="" placement="bottom" TransitionComponent={Fade}>
      <Link href="/">
        <IconButton size="large" aria-label="info">
          <ImHome3 />
        </IconButton>
      </Link>
    </Tooltip>
  )
}

export function InfoButton() {
  const router = useRouter()
  const { pathname } = router
  const notOnHome = pathname !== '/'

  if (notOnHome) {
    return renderHomeIcon()
  }

  return (
    <Tooltip title="What the heck is this all about?" placement="left" TransitionComponent={Fade}>
      <Link href="/info">
        <IconButton size="large" aria-label="info">
          <TfiHelpAlt />
        </IconButton>
      </Link>
    </Tooltip>
  )
}
