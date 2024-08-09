/*
 * @Author       : fallen_zero
 * @Date         : 2024-08-08 15:09:35
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-08-09 15:17:21
 * @FilePath     : /earthworm/src/pages/api/user.ts
 * @FileName     :
 */
import prisma from '@lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const users = await prisma.course.findMany();
  res.status(200).json({ code: 1, data: users, message: 'success' });
}
