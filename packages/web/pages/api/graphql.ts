import { ApolloServer } from 'apollo-server-micro'
import { createContext, BasicLogger, schema } from '../../graphql'
import { NextApiRequest, NextApiResponse } from 'next'

const apolloServer = new ApolloServer({
  schema,
  plugins: [BasicLogger],
  context: createContext,
})

const startServer = apolloServer.start()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
}

// NextJS request config
export const config = {
  api: {
    bodyParser: false,
  },
}
