import { NextApiRequest, NextApiResponse } from 'next'
import { UsersService } from '../../lib/users.service'
import prisma from '../../prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { token, address } = req.query
    if (!token || !address) {
      res.status(400).json({ status: 'fail' })
      return
    }
    await UsersService.verifyEmail({ prisma }, { address: address?.toString(), token: token?.toString() })
    res.redirect('/?verified=true')
  } catch (err: any) {
    console.error(err)
    res.status(401).json({ status: 'fail', message: err.message })
  }
}
