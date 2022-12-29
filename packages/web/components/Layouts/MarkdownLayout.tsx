import { Box } from '@mui/material';
import { useEffect, useState } from 'react'
import { MDXProvider } from '@mdx-js/react'
import Image from 'next/image'
import { Typography } from '@mui/material'

const ResponsiveImage = (props: any) => <Image alt={props.alt} fill {...props} />

const components = {
  img: ResponsiveImage,
  p: (props: any) => <Typography>{props.children}</Typography>,
}
export function MarkdownLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <></>
  }

  return (
    <MDXProvider components={components}>
      <Box margin={2}>{children}</Box>
    </MDXProvider>
  )
}
