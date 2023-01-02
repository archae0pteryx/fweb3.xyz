import { extendType, objectType, stringArg, nonNull, booleanArg } from 'nexus'
import { FeatureService } from './feature.service'

export interface IFeature {
  id?: string
  flag?: string
  value?: boolean
  createdAt?: string
  updatedAt?: string
}

export const Feature = objectType({
  name: 'Feature',
  definition(t) {
    t.string('id')
    t.string('flag')
    t.boolean('value')
    t.string('createdAt')
    t.string('updatedAt')
  },
})

export const FeatureQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('allFeatures', {
      type: 'Feature',
      resolve: FeatureService.all,
    }),
      t.field('findFeature', {
        type: 'Feature',
        args: {
          flag: nonNull(stringArg()),
        },
        resolve: FeatureService.find,
      })
  },
})

export const FeatureMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('upsertFeature', {
      type: 'Feature',
      args: {
        flag: nonNull(stringArg()),
        value: nonNull(booleanArg()),
      },
      resolve: FeatureService.upsert,
    })
  },
})
