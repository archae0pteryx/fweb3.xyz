import { Fade, IconButton, Tooltip } from '@mui/material'
import { useRouter } from 'next/router'
import { ImHome3 } from 'react-icons/im'
import { TfiHelpAlt } from 'react-icons/tfi'

const renderHomeIcon = () => {
  const router = useRouter()
  return (
    <Tooltip title="Home" placement="bottom" TransitionComponent={Fade}>
      <IconButton aria-label="info" onClick={() => router.push('/')}>
        <ImHome3 />
      </IconButton>
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
      <IconButton aria-label="info" onClick={() => router.push('/info')}>
        <TfiHelpAlt />
      </IconButton>
    </Tooltip>
  )
}
