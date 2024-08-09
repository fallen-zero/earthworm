/*
 * @Author       : fallen_zero
 * @Date         : 2024-08-09 14:47:36
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-08-09 14:52:19
 * @FilePath     : /earthworm/src/app/course/api/[id]/route.ts
 * @FileName     :
 */

import usePrisma from '@/utils/usePrisma';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  return usePrisma(
    async (prisma) =>
      await prisma.course.findFirst({
        include: {
          statements: {
            orderBy: {
              order: 'asc',
            },
          },
        },
        where: {
          id: params.id,
        },
      })
  );
}
