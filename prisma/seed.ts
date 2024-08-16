/*
 * @Author       : fallen_zero
 * @Date         : 2024-08-12 15:49:12
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-08-16 15:45:17
 * @FilePath     : /earthworm/prisma/seed.ts
 * @FileName     :
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const list = {
  一: '01',
  二: '02',
  三: '03',
  四: '04',
  五: '05.5',
  '五.五': '05',
  六: '06',
  七: '07',
  八: '08',
  九: '09',
  十: '10.5',
  '十.五': '10',
  十一: '11',
  十二: '12',
  十三: '13',
  十四: '14',
  十五: '15.5',
  '十五.五': '15',
  十六: '16',
  十七: '17',
  十八: '18',
  十九: '19',
  二十: '20.5',
  '二十.五': '20',
  二十一: '21',
  二十二: '22',
  二十三: '23',
  二十四: '24',
  二十五: '25.5',
  '二十五.五': '25',
  二十六: '26',
  二十七: '27',
  二十八: '28',
  二十九: '29',
  三十: '30',
  三十一: '31',
  三十二: '32',
  三十三: '33',
  三十四: '34',
  三十五: '35',
  三十六: '36',
  三十七: '37',
  三十八: '38',
  三十九: '39',
  四十: '40',
  四十一: '41',
  四十二: '42',
  四十三: '43',
  四十四: '44',
  四十五: '45',
  四十六: '46',
  四十七: '47',
  四十八: '48',
  四十九: '49',
  五十: '50',
};

const newPrisma = new PrismaClient();

/**
 * 创建课程
 * @param title 课程名称
 * @returns
 */
async function createCourse(title: string) {
  return await newPrisma.course.create({
    data: {
      title,
    },
  });
}

interface SatementData {
  chinese: string;
  english: string;
  soundmark: string;
  order: number;
  courseId: string;
}

/**
 * 创建语句
 * @param data 语句
 * @returns
 */
async function createStatements(data: SatementData[]) {
  return await newPrisma.statement.createMany({ data });
}

async function main() {
  try {
    await newPrisma.course.deleteMany();
    await newPrisma.statement.deleteMany();
    for (const [key, value] of Object.entries(list)) {
      const courseDataText = fs.readFileSync(
        path.resolve(__dirname, `../scripts/courses/${value}.json`),
        'utf-8'
      );
      const courseData: SatementData[] = JSON.parse(courseDataText);
      const course = await createCourse(`第${key}课`);
      await createStatements(
        courseData.map((item, index) => {
          return {
            chinese: item.chinese,
            english: item.english,
            soundmark: item.soundmark,
            order: index + 1,
            courseId: course.id,
          };
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
}

// main();
