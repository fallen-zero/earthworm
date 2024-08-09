/*
 * @Author       : fallen_zero
 * @Date         : 2024-08-09 10:41:27
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-08-09 10:48:27
 * @FilePath     : /earthworm/src/utils/usePrisma.ts
 * @FileName     :
 */
import { PrismaClient } from '@prisma/client';
import { isObject } from 'lodash-es';

export default async function usePrisma(
  callback: (prisma: PrismaClient) => Promise<any>
): Promise<Response> {
  const prisma = new PrismaClient();
  try {
    const data = await callback(prisma);
    return Response.json({
      code: 1,
      data,
      message: 'success',
    });
  } catch (error) {
    console.error('Failed:', error);
    return Response.json({
      code: 0,
      data: null,
      message: isObject(error) && 'message' in error ? error.message : 'error',
    });
  } finally {
    await prisma.$disconnect();
  }
}
