/*
 * @Author       : fallen_zero
 * @Date         : 2024-08-09 10:10:58
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-08-12 14:41:13
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
      const courseIds = data.map((item) => item.courseId);
      const statements = await prisma.statement.findMany({
        where: {
          courseId: {
            in: courseIds,
          },
        },
      });
      const updateList = data.filter((item) =>
        statements.some(
          (statement) =>
            statement.courseId === item.courseId &&
            statement.order === item.order
        )
      );
      const createList = data.filter(
        (item) =>
          !statements.some(
            (statement) =>
              statement.courseId === item.courseId &&
              statement.order === item.order
          )
      );
      for (const updateItem of updateList) {
        const id = statements.find(
          (statement) =>
            statement.courseId === updateItem.courseId &&
            statement.order === updateItem.order
        )!.id;
        await prisma.statement.update({
          where: {
            id,
          },
          data: updateItem,
        });
      }
      await prisma.statement.createMany({
        data: createList,
      });
      return;
    }
    const { chinese, english, soundmark, courseId, order } = data;
    const statement = await prisma.statement.findFirst({
      where: {
        courseId,
        order,
      },
    });
    if (statement) {
      return await prisma.statement.update({
        where: {
          id: statement.id,
        },
        data: {
          chinese,
          english,
          soundmark,
        },
      });
    }
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

export async function DELETE() {
  return await usePrisma(async (prisma) => {
    return await prisma.statement.deleteMany();
  });
}
