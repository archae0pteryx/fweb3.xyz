import { PrismaClient } from "@prisma/client"
import { FeatureEntity } from "./feature.entity"

export class FeatureService {
  static async upsert(prisma: PrismaClient, args: { flag: string; value: string }) {
    const { flag, value } = args
    const featureFlag = await FeatureEntity.upsert(prisma, {
      flag,
      value,
    })
    return featureFlag
  }
}
