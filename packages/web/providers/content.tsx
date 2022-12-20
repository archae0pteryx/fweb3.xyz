import { gql, useLazyQuery } from '@apollo/client'
import { createContext, ReactNode, useMemo, useContext, useState } from 'react'

interface IContentContext {
  content: {
    about: string
    onboarding: string
  }
  contentLoading: boolean
  contentError: string
  handleContentRequest: (types: string[]) => Promise<void>
}

const ContentContext = createContext<IContentContext>({
  content: {
    about: '',
    onboarding: '',
  },
  contentLoading: false,
  contentError: '',
  handleContentRequest: async (_types: string[]) => {}
})

const REQUEST_CONTENT = gql`
  query RequestContent($prompts: [String]) {
    requestContent(prompts: $prompts) {
      about
      onboard
    }
  }
`

export function ContentProvider({ children }: { children: ReactNode }) {
  const [requestContent, { loading, error, data }] = useLazyQuery(REQUEST_CONTENT)

  const handleContentRequest = async (prompts: string[]) => {
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

  // useMemo(() => {
  //   if (!called) {
  //     requestContent({
  //       variables: {
  //         types: ['onboard', 'about'],
  //       },
  //     })
  //   }
  // }, [])

  return (
    <ContentContext.Provider
      value={{
        content: {
          about: data?.requestContent?.about?.html,
          onboarding: data?.requestContent?.onboarding?.html,
        },
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
