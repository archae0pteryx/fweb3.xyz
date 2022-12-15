import { gql, useLazyQuery } from '@apollo/client'
import { createContext, ReactNode, useMemo, useContext } from 'react'

interface IContentContext {
  content: {
    about: string
  }
  contentLoading: boolean
  contentError: string
}

const ContentContext = createContext<IContentContext>({
  content: {
    about: '',
  },
  contentLoading: false,
  contentError: '',
})

const REQUEST_CONTENT = gql`
  query RequestContent($type: String!) {
    requestContent(type: $type) {
      html
    }
  }
`

export function ContentProvider({ children }: { children: ReactNode }) {
  const [requestContent, { loading, error, called, data }] = useLazyQuery(REQUEST_CONTENT)

  useMemo(() => {
    if (!called) {
      requestContent({
        variables: {
          type: 'about',
        },
      })
    }
  }, [])

  return (
    <ContentContext.Provider
      value={{
        content: {
          about: data?.requestContent?.html,
        },
        contentLoading: loading,
        contentError: error?.message || '',
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export const useContent = () => useContext(ContentContext)
