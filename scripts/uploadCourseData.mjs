/*
 * @Author       : fallen_zero
 * @Date         : 2024-08-09 10:21:34
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-08-12 15:24:10
 * @FilePath     : /earthworm/scripts/uploadCourseData.mjs
 * @FileName     :
 */
// 1. 读取 01.json （也就是 course data）
// 2. 调用 后端接口 localhost:3000/statement/api

import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import fs from 'fs';

const courseId = 'clzqo3w9h000010vaj1it31we';

const currentCourseDataPath = './courses/01.json';
const courseDataText = fs.readFileSync(currentCourseDataPath, 'utf-8');
const courseData = JSON.parse(courseDataText);

const prisma = new PrismaClient();
async function uploadStatement(order, chinese, english, soundmark, courseId) {
  try {
    const statement = await prisma.statement.findUnique({
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
  } catch (error) {
    console.log('Failed to upload statement:', error);
    throw error;
  }
}

async function uploadStatementMany(data) {
  try {
    const response = await axios.post(
      'http://localhost:3000/statement/api',
      data
    );
    return response.data;
  } catch (error) {
    console.log('Failed to upload statement:', error);
    throw error;
  }
}

const isMany = false;

(async function () {
  if (isMany)
    uploadStatementMany(
      courseData.map((item, index) => ({ ...item, courseId, order: index + 1 }))
    );
  else {
    const promiseAll = courseData.map((statement, index) => {
      const { chinese, english, soundmark } = statement;
      return uploadStatement(index + 1, chinese, english, soundmark, courseId);
    });
    Promise.all(promiseAll).then(() => {
      console.log('全部上传成功');
    });
  }
})();
