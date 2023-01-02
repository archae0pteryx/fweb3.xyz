import { Context } from '../../graphql/context'
import { FeatureEntity } from './feature.entity'

export class FeatureService {
  static async all(_root: any, _args: any, ctx: Context) {
    const f = await FeatureEntity.all(ctx.prisma)
    return f
  }
  static async upsert(_root: any, args: any, ctx: Context) {
    return await FeatureEntity.upsert(ctx.prisma, args)
  }

  static async find(_root: any, args: any, ctx: Context) {
    const { flag } = args
    return await FeatureEntity.find(ctx.prisma, flag)
  }
}
