import { createContext, ReactNode, useState, useContext } from 'react'

const ErrorContext = createContext({
  error: '',
  setError: (_error: string) => {},
})

export function ErrorAlertProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<string>('')
  return (
    <ErrorContext.Provider
      value={{
        error,
        setError,
      }}
    >
      {children}
    </ErrorContext.Provider>
  )
}

export const useError = () => useContext(ErrorContext)
