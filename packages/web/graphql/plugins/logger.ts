import { GraphQLRequestContext } from "apollo-server-types"

export const BasicLogger = {
  async requestDidStart(_requestContext: GraphQLRequestContext) {
    console.log('Apollo Server received request')
    // return {
    //   async didEncounterErrors(_requestContext: GraphQLRequestContext) {
    //     console.log('Apollo Server didEncounterErrors!')
    //   },
    //   async parsingDidStart(_requestContext: GraphQLRequestContext) {
    //     console.log('Apollo Server parsingDidStart!')
    //   },
    //   async validationDidStart(_requestContext: GraphQLRequestContext) {
    //     console.log('Apollo Server validationDidStart!')
    //   },
    // }
  },
}
