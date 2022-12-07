type Operations =
  | 'aggregate'
  | 'count'
  | 'create'
  | 'createMany'
  | 'delete'
  | 'deleteMany'
  | 'findFirst'
  | 'findMany'
  | 'findUnique'
  | 'update'
  | 'updateMany'
  | 'upsert'

export type DelegateArgs<T> = {
  [K in keyof T]: T[K] extends (args: infer A) => Promise<unknown> ? A : never
}

export type DelegateReturnTypes<T> = {
  [K in keyof T]: T[K] extends (args: infer A) => Promise<infer R> ? R : never
}

export class PrismaRepo<
  D extends { [K in Operations]: (args: unknown) => unknown },
  A extends { [K in Operations]: unknown },
  R extends { [K in Operations]: unknown }
> {
  constructor(protected model: D) {}

  async findUnique(args: A['findUnique']): Promise<R['findUnique']> {
    return this.model.findUnique(args)
  }

  async findFirst(args: A['findFirst']): Promise<R['findFirst']> {
    return this.model.findFirst(args)
  }

  async findMany(args: A['findMany']): Promise<R['findMany']> {
    return this.model.findMany(args)
  }

  async create(args: A['create']): Promise<R['create']> {
    return this.model.create(args)
  }

  async createMany(args: A['createMany']): Promise<R['createMany']> {
    return this.model.createMany(args)
  }

  async update(args: A['update']): Promise<R['update']> {
    return this.model.update(args)
  }

  async delete(args: A['delete']): Promise<R['delete']> {
    return this.model.delete(args)
  }

  async upsert(args: A['upsert']): Promise<R['upsert']> {
    return this.model.upsert(args)
  }

  async count(args: A['count']): Promise<R['count']> {
    return this.model.count(args)
  }

  async aggregate(args: A['aggregate']): Promise<R['aggregate']> {
    return this.model.aggregate(args)
  }

  async deleteMany(args: A['deleteMany']): Promise<R['deleteMany']> {
    return this.model.deleteMany(args)
  }

  async updateMany(args: A['updateMany']): Promise<R['updateMany']> {
    return this.model.updateMany(args)
  }
}
