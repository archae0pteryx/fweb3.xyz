import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { createContext, ReactNode, useContext } from 'react'

interface IContentContext {
  contentData: any[]
  contentError: string
  contentLoading: boolean
  handleContentRequest: (types: PromptInputType[]) => Promise<void>
  handleFindByType: (types: string[]) => Promise<void>
}

const ContentContext = createContext<IContentContext>({
  contentData: [],
  contentError: '',
  contentLoading: false,
  handleContentRequest: async (_types: PromptInputType[]) => {},
  handleFindByType: async (_types: string[]) => {},
})

const FIND_CONTENT = gql`
  query Query($types: [String]!) {
    findContent(types: $types) {
      title
      html
      type
    }
  }
`
const REQUEST_CONTENT = gql`
  mutation RequestContent($prompts: [PromptInputType]!) {
    requestContent(prompts: $prompts) {
      title
      html
      type
      id
    }
  }
`

interface PromptInputType {
  prompt: string
  type: string
  title: string
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [requestContent, { loading, error, data }] = useMutation(REQUEST_CONTENT)

  const [findByType, { loading: findByTypeLoading, error: findByTypeError, data: findByTypeData }] =
    useLazyQuery(FIND_CONTENT)

  const handleFindByType = async (types: string[]) => {
    try {
      await findByType({
        variables: {
          types,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleContentRequest = async (prompts: PromptInputType[]) => {
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
        contentData: data?.requestContent || findByTypeData?.findContent || [],
        contentError: error?.message || findByTypeError?.message || '',
        contentLoading: loading || findByTypeLoading,
        handleContentRequest,
        handleFindByType,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export const useContent = () => useContext(ContentContext)
