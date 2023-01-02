import { NextApiRequest, NextApiResponse } from 'next'
import { UsersService } from '../../modules/user/user.service'
import prisma from '../../prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { token, address } = req.query
    if (!token || !address) {
      res.status(400).json({ status: 'fail' })
      return
    }
    const verifyRes = await UsersService.verifyEmail({ prisma, features: null }, { address: address?.toString() || '', token: token?.toString() })
    console.log({ verifyRes })
    res.redirect('/?verified=true')
  } catch (err: any) {
    console.error(err)
    res.status(401).json({ status: 'fail', message: err.message })
  }
}
