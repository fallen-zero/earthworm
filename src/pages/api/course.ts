/*
 * @Author       : fallen_zero
 * @Date         : 2024-08-06 14:52:50
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-08-06 15:19:26
 * @FilePath     : /earthworm/src/pages/api/course.ts
 * @FileName     :
 */

import { NextApiRequest, NextApiResponse } from 'next';
import courseJson from './result.json';

export default function GET(req: NextApiRequest, res: NextApiResponse) {
  const data = [
    {
      name: '第一节课',
      statements: courseJson,
    },
  ];
  res.status(200).json({ code: 1, data, message: 'success' });
}
