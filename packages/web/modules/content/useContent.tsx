import { useQuery, useMutation } from '@apollo/client'
import { CREATE_CONTENT, REQUEST_CONTENT } from './content.queries'
import { IContent } from './content.types'

export function useCreateContent() {
  const [fetchCreateContent, { data, loading, error }] = useMutation(CREATE_CONTENT)

  const createContent = (content: IContent) => {
    fetchCreateContent({
      variables: {
        data: content
      }
    })
  }

  return {
    content: data?.requestContent || [],
    loading,
    error: error?.message || '',
    createContent,
  }
}

export function useContent(types: string[]) {
  const { data, loading, error } = useQuery(REQUEST_CONTENT, {
    variables: {
      types,
      skip: !types.length,
    },
  })
  return {
    content: data?.requestContent || [],
    loading,
    error: error?.message || '',
  }
}
