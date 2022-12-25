import { extendType, objectType, list, stringArg, nonNull } from 'nexus'
import { FeatureService } from '../../lib/feature.service'

export const Feature = objectType({
  name: 'Feature',
  definition(t) {
    t.string('id')
    t.string('flag')
    t.string('value')
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
    t.nonNull.list.field('findFeature', {
      type: 'Feature',
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
        value: nonNull(stringArg()),
      },
      resolve: FeatureService.upsert,
    })
  },
})
