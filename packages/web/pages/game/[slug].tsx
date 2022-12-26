import { ConnectedLayout } from '../../components/Layouts/ConnectedLayout'
import { ValidUserLayout } from '../../components/Layouts/ValidUserLayout'
import { SubHeading } from '../../components/shared/Typography'
import { useRouter } from 'next/router'
import { Typography } from '@mui/material';

export default function TaskInfoPage() {
  const { slug } = useRouter().query
  return (
    <ConnectedLayout>
      <ValidUserLayout>
        <SubHeading align="center">Task item</SubHeading>
        <Typography>{slug}</Typography>
      </ValidUserLayout>
    </ConnectedLayout>
  )
}
