/*
 * @Author       : fallen_zero
 * @Date         : 2024-08-09 10:10:58
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-08-09 13:47:13
 * @FilePath     : /earthworm/src/app/statement/api/route.ts
 * @FileName     :
 */
import usePrisma from '@/utils/usePrisma';
import { isArray } from 'lodash-es';

export async function GET() {
  return usePrisma(async (prisma) => await prisma.statement.findMany());
}

export async function POST(req: Request) {
  return usePrisma(async (prisma) => {
    const data = await req.json();
    if (isArray(data)) {
      return await prisma.statement.createMany({
        data,
      });
    }
    const { chinese, english, soundmark, courseId, order } = data;
    return await prisma.statement.create({
      data: {
        chinese,
        english,
        soundmark,
        order,
        Course: {
          connect: {
            id: courseId,
          },
        },
      },
    });
  });
}
