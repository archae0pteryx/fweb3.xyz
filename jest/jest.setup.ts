export {}

import { cleanup } from '@testing-library/react'

jest.mock('../providers/ConnectionProvider')
jest.mock('../providers/GameProvider')
jest.mock('../hooks/useDevice')
jest.mock('next/router', () => ({
  useRouter: () => ({ query: { account: '' } }),
}))

afterEach(cleanup)
