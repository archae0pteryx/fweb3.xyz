import { createContext, useContext } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'

interface IFeature {
  flag: string
  value: string
}

export const FEATURE_FLAGS = {
  USE_EMAIL: 'use_email',
  USE_OPENAI: 'use_openai',
  USE_MAINTENANCE: 'use_maintenance',
}

const FeatureContext = createContext<{
  features: IFeature[]
  featuresError: string
  featuresLoading: boolean
  updateFeature: (f: IFeature) => void
  featuresUpdateError: string
  featuresUpdateLoading: boolean
  featuresUpdateData: any
}>({
  features: [],
  featuresError: '',
  featuresLoading: false,
  updateFeature: (_feat: IFeature) => {},
  featuresUpdateError: '',
  featuresUpdateLoading: false,
  featuresUpdateData: {},
})

export const ALL_FEATURES = gql`
  query Query {
    allFeatures {
      flag
      value
    }
  }
`

export const UPDATE_FEATURE = gql`
  mutation Mutation($flag: String!, $value: String!) {
    upsertFeature(flag: $flag, value: $value) {
      value
      flag
    }
  }
`

export function FeatureProvider({ children }: { children: React.ReactNode }) {
  const { loading, error, data } = useQuery(ALL_FEATURES)
  const [fetchUpsertFeature, { loading: featureUpdateLoading, error: featureUpdateError, data: featureUpdateData }] =
    useMutation(UPDATE_FEATURE)

  const updatefeature = ({ flag, value }: IFeature) => {
    fetchUpsertFeature({
      variables: {
        flag,
        value,
      },
    })
  }

  return (
    <FeatureContext.Provider
      value={{
        features: data?.allFeatures || [],
        featuresError: error?.message || '',
        featuresLoading: loading,
        updateFeature: updatefeature,
        featuresUpdateError: featureUpdateError?.message || '',
        featuresUpdateLoading: featureUpdateLoading,
        featuresUpdateData: featureUpdateData?.upsertFeature || {},
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
