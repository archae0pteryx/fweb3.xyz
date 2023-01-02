import { Container } from '@mui/system'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <>{children}</>
    </Container>
  )
}
