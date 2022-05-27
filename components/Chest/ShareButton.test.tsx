import { MOCK_CONNECTION_STATE } from '../../providers/__mocks__/ConnectionProvider'
import { screen, render } from '@testing-library/react'
import { useConnection } from '../../providers'
import { ShareButton } from './ShareButton'

const mockUseConnection = useConnection as jest.MockedFunction<typeof useConnection>

const renderComponent = (props?: any) => render(<ShareButton {...props} />)

test('renders the share button', () => {
  renderComponent()
  expect(screen.getByTestId('share-btn')).toBeTruthy()
})

test('it wont render if loaded by query account', () => {
  mockUseConnection.mockReturnValueOnce({ ...MOCK_CONNECTION_STATE, isQueryLoad: true })
  renderComponent()
  expect(() => screen.getByTestId('share-btn')).toThrow()
})
