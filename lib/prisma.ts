/*
 * @Author       : fallen_zero
 * @Date         : 2024-08-08 14:50:30
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-08-08 15:00:30
 * @FilePath     : /earthworm/lib/prisma.ts
 * @FileName     :
 */
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
