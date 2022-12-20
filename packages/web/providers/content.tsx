import { gql, useLazyQuery } from '@apollo/client'
import { ApolloError } from 'apollo-server-micro'
import { createContext, ReactNode, useContext } from 'react'

interface IContentContext {
  contentData: any[]
  contentError: string
  contentLoading: boolean
  handleContentRequest: (types: IContentPromptRequest[]) => Promise<void>
}

const ContentContext = createContext<IContentContext>({
  contentData: [],
  contentError: '',
  contentLoading: false,
  handleContentRequest: async (_types: IContentPromptRequest[]) => {},
})

const REQUEST_CONTENT = gql`
  query RequestContent($prompts: [String]) {
    requestContent(prompts: $prompts) {
      html
      type
    }
  }
`

interface IContentPromptRequest {
  prompt: string
  type: string
  cached: boolean
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [requestContent, { loading, error, data }] = useLazyQuery(REQUEST_CONTENT)

  const handleContentRequest = async (prompts: IContentPromptRequest[]) => {
    try {
      await requestContent({
        variables: {
          prompts,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ContentContext.Provider
      value={{
        contentData: data?.requestContent || [],
        contentError: error?.message || '',
        contentLoading: loading,
        handleContentRequest,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export const useContent = () => useContext(ContentContext)
