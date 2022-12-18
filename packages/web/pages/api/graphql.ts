import Cors from 'micro-cors'
import { ApolloServer } from 'apollo-server-micro'
import { createContext, BasicLogger, schema } from '../../graphql'

const cors = Cors()

const apolloServer = new ApolloServer({
  schema,
  plugins: [BasicLogger],
  context: createContext,
})

const startServer = apolloServer.start()

export default cors(async function handler(req, res) {
  try {
    if (req.method === 'OPTIONS') {
      res.end()
      return false
    }
    await startServer

    await apolloServer.createHandler({
      path: '/api/graphql',
    })(req, res)
  } catch (err) {
    console.log({ err })
  }
})

// NextJS request config
export const config = {
  api: {
    bodyParser: false,
  },
}
