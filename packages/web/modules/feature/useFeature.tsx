import { FEATURE_QUERY } from './feature.queries'
import { useQuery } from '@apollo/client'

export function useFeature(flag: string) {
  const { data, error } = useQuery(FEATURE_QUERY, {
    variables: {
      flag,
    },
  })
  if (error) {
    console.error(error?.message || 'error fetching feature')
  }
  return data?.findFeature?.value || false
}
