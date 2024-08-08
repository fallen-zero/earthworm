/*
 * @Author       : fallen_zero
 * @Date         : 2024-08-06 10:04:54
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-08-08 00:19:25
 * @FilePath     : /earthworm/scripts/parsePdf.js
 * @FileName     :
 */
const fs = require('fs');
const pdf = require('pdf-parse');

function main() {
  const dataBuffer = fs.readFileSync('./01.pdf');

  pdf(dataBuffer).then(function (data) {
    const result = parse(data.text);
    fs.writeFileSync('./result.json', JSON.stringify(result));
  });
}

main();

const STARTSIGH = '中文 英文 K.K.音标';

function parse(text) {
  // 0. 先基于 \n 来切分成数组
  const rawTextList = text.split('\n').map((t) => t.trim());
  // 1. 先获取到开始的点
  const startIndex = rawTextList.findIndex((t) => t === STARTSIGH);
  // 2. 过滤掉没有用的数据
  //   1. 空的
  //   2. 只有 number 的 （这个时换页符）
  const textList = rawTextList
    .slice(startIndex + 1)
    .filter((t) => t && !/\d/.test(Number(t)));

  // 对齐格式
  // 看看当前是不是英文 如果是英文的话看看有没有音标
  // 如果当前行有英文和音标的话 那么就是ok的
  // 如果当前行只有英文但是没有音标 那么需要做处理
  //    处理方式：向下一个位置检测 是不是音标 如果是的话 那么合并成一行
  //            向下检测 看看是不是中文 如果不是中文的话 那么就把这一行合并到当前行

  // 如果当前是英文的话 那么检测下一行是不是中文， 如果不是中文的话 那么需要把这行的内容合并到当前行，并且删除掉这一个元素

  // 3. 成组 2个为一组 （中文 / 英文+音标）
  const result = [];

  for (let i = 0; i < textList.length; i++) {
    let data = {
      chinese: '',
      english: '',
      soundMark: '',
    };

    function run() {
      const element = textList[i];
      let chinese = '';
      let englishAndSoundMark = '';
      if (isChinese(element)) {
        chinese += element;

        while (isChinese(textList[i + 1])) {
          chinese += `，${textList[i + 1]}`;
          i++;
        }
        data.chinese = chinese;
      } else {
        englishAndSoundMark += element;

        while (textList[i + 1] && !isChinese(textList[i + 1])) {
          englishAndSoundMark += ` ${textList[i + 1]}`;
          i++;
        }

        const { english, soundMark } =
          parseEnglishAndSoundMark(englishAndSoundMark);
        data.english = english;
        data.soundMark = soundMark;
      }
    }

    run();
    i++;
    run();
    result.push(data);
  }

  return result;
}

function isChinese(str) {
  const reg = /^[\u4e00-\u9fa5]/;
  return reg.test(str);
}

function parseEnglishAndSoundMark(text) {
  const list = text.split(' ');
  const soundMarkdStartIndex = list.findIndex((t) => t.startsWith('/'));

  const english = list.slice(0, soundMarkdStartIndex).join(' ').trim();
  const soundMark = list.slice(soundMarkdStartIndex).join(' ').trim();

  return { english, soundMark };
}
