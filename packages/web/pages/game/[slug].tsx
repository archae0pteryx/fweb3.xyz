import { ConnectedLayout } from '../../components/Layouts/ConnectedLayout'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { ValidUserLayout } from '../../components/Layouts/ValidUserLayout'
import { useGame } from '../../providers'
import { PinkBox } from '../../components/shared/Boxes'

export default function TaskInfoPage() {
  const { slug } = useRouter().query
  const { tasks } = useGame()
  const found = tasks.find((task) => task.id === slug) || null
  return (
    <ConnectedLayout>
      <ValidUserLayout>
        {/* <Typography>{slug}</Typography> */}
        <Typography color="secondary" align="center" variant="h5">
          {found?.title}
        </Typography>
        <PinkBox>
          <div dangerouslySetInnerHTML={{ __html: found?.content[0].html || '' }} />
        </PinkBox>
      </ValidUserLayout>
    </ConnectedLayout>
  )
}
