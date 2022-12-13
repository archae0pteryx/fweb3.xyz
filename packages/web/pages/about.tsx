import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const DynamicAboutView = dynamic(() => import('../components/About/AboutView'), {
  suspense: true,
})

export default function AboutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DynamicAboutView />
    </Suspense>
  )
}
