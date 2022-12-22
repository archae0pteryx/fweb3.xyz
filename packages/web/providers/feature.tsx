import { createContext, useContext } from 'react'
import { gql, useQuery } from '@apollo/client'

interface IFeature {
  flag: string
  value: string
}

const FeatureContext = createContext<{
  features: IFeature[]
  featuresError: string
  featuresLoading: boolean
}>({
  features: [],
  featuresError: '',
  featuresLoading: false,
})

export const ALL_FEATURES = gql`
  query Query {
    allFeatures {
      flag
      value
    }
  }
`

export function FeatureProvider({ children }: { children: React.ReactNode }) {
  const { loading, error, data } = useQuery(ALL_FEATURES)
  return (
    <FeatureContext.Provider
      value={{
        features: data?.allFeatures || [],
        featuresError: error?.message || '',
        featuresLoading: loading,
      }}
    >
      {children}
    </FeatureContext.Provider>
  )
}

export const useFeature = (feature: string) => {
  const { features: allFeatures } = useContext(FeatureContext)
  return allFeatures.filter((f) => f.flag === feature && f.value === 'true').length > 0
}
