import Cors from 'micro-cors'
import { apolloServer } from '../../graphql'

const cors = Cors({
  allowMethods: ['POST', 'OPTIONS'],
})

const startServer = apolloServer.start()

export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  await startServer

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
})

// NextJS request config
export const config = {
  api: {
    bodyParser: false,
  },
}
