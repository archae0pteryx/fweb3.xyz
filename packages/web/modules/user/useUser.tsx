import { createContext, ReactNode, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { CREATE_USER, FIND_USER, UPDATE_USER } from './user.queries'
import { makeVar, useReactiveVar } from '@apollo/client'
import { useAccount, useConnect } from 'wagmi'

// export const reactiveWalletAddress = makeVar('')

// const UserContext = createContext({
//   user: {},
// })

// export function UserProvider({ children }: { children: ReactNode }) {
//   const { address } = useAccount()
//   const {
//     data: { findUser },
//     loading: userLoading,
//     error: userError,
//   } = useQuery(FIND_USER, {
//     variables: {
//       address,
//       skip: !address,
//     },
//   })
//   const [fetchUpdateUser, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_USER, {
//     refetchQueries: ['FindUser'],
//   })

//   const [fetchCreateuser, { loading: createUserLoading, error: createUserError }] = useMutation(CREATE_USER)

//   return (
//     <UserContext.Provider
//       value={{
//         user: findUser || {},
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   )
// }

// export const useCreateUser = () => {}

export function useUser(address?: string) {
  const {
    data,
    loading,
    error,
  } = useQuery(FIND_USER, {
    variables: {
      address,
      skip: !address,
    },
  })
  return {
    user: data?.findUser || {},
    loading,
    error: error?.message || '',
  }
}
