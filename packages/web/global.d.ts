import type { PrismaClient } from "@prisma/client"

export declare global {
  declare module globalThis {
    const prisma: PrismaClient
  }
}
