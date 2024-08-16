'use server';
/*
 * @Author       : fallen_zero
 * @Date         : 2024-08-16 16:17:15
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-08-16 16:19:35
 * @FilePath     : /earthworm/src/actions/course.ts
 * @FileName     :
 */
import prisma from '@lib/prisma';
import { Course } from '@prisma/client';

export async function getCourseList(): Promise<Course[]> {
  const courses = await prisma.course.findMany();
  return courses;
}
