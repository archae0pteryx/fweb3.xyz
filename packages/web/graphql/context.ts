import { PrismaClient } from '@prisma/client'
import prisma from '../prisma/client'
import { FeatureEntity } from '../modules/feature/feature.entity'

export type Context = {
  prisma: PrismaClient
  features: { [key: string]: boolean } | null
}

export async function createContext({ req, res }: any): Promise<Context> {
  const f = (await FeatureEntity.all(prisma)) || []
  const features: { [key: string]: boolean } = {}
  for (const feature of f) {
    features[feature.flag] = feature.value || false
  }
  return {
    prisma,
    features,
  }
}
