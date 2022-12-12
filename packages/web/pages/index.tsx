import { Skeleton } from '@mui/material'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const HomeView = dynamic(() => import('../components/HomeView'), {
  suspense: true,
})

export default function Page() {
  return (
    <Suspense fallback={<Skeleton animation="wave" />}>
      <HomeView />
    </Suspense>
  )
}
