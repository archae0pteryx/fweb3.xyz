import { gql, useQuery } from "@apollo/client"

const FEATURE_FLAGS = gql`
  query FeatureFlags {
    featureFlags {
      flag
      enabled
    }
  }
`


export function useFeature(flags: string[]) {
  const { data, loading, error } = useQuery(FEATURE_FLAGS, {})
  return true
}
