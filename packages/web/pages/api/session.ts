import { NextApiRequest, NextApiResponse } from 'next'
import { signJwt } from '../../lib/auth'

const COOKIE_VALUE = 'monster'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {  
  try {
    const token = signJwt(COOKIE_VALUE, '7days')
    res.status(200).json({ status: 'success', token })
  } catch (err: any) {
    console.error(err)
    res.status(401).json({ status: 'fail', message: err.message })
  }
}
