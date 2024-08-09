/*
 * @Author       : fallen_zero
 * @Date         : 2024-08-09 10:10:41
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-08-09 14:52:34
 * @FilePath     : /earthworm/src/app/course/api/route.ts
 * @FileName     :
 */

import usePrisma from '@/utils/usePrisma';

export async function GET() {
  return usePrisma(async (prisma) => await prisma.course.findMany());
}

export async function POST(req: Request) {
  return usePrisma(async (prisma) => {
    const { title } = await req.json();
    const course = await prisma.course.create({
      data: {
        title,
      },
    });
    return course;
  });
}
