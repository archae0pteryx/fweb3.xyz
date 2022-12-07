// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { body } = req
    await prisma.$connect()
    const response = await prisma.user.create({ data: body })
    res.status(200).json(response)
  } catch (err) {
    console.error(err)
  }
}

async function _handleCreate(data: any) {
  
}
