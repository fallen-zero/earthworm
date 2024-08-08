/*
 * @Author       : fallen_zero
 * @Date         : 2024-08-06 10:34:28
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-08-06 14:35:05
 * @FilePath     : /earthworm/scripts/parsePdf.test.js
 * @FileName     :
 */

import { describe, expect, it } from 'vitest';
import { parse, parseEnglishAndSoundMark } from './parsePdf';

describe('parsePdf', () => {
  it('happy path', () => {
    const pdfText =
      ' \n' +
      '你好，我是星荣。 \n' +
      '好久之前我发了一个视频说“英语学习就像吃瓜子，但是和平常吃瓜子不同的是\n' +
      '你不能剥一颗吃一颗，规则要求你必须剥好了一小堆，你才有资格把这一小堆瓜子\n' +
      '\n' +
      '2 \n' +
      ' \n' +
      '中文 英文 K.K.音标 \n' +
      '我 \n' +
      'I /aɪ/ \n' +
      '喜欢 \n' +
      'like /laɪk/ \n' +
      '我喜欢 \n' +
      'I like /aɪ/ /laɪk/ \n' +
      '\n' +
      '3 \n' +
      ' \n' +
      '现在 \n' +
      'now /naʊ/ \n' +
      '我现在想要吃这个食物 \n' +
      'I want to eat the food now /aɪ/ /wɑnt/ /tə/ /it/ /ðə/ /fud/ /naʊ/ \n';

    expect(parse(pdfText)).toEqual([
      {
        chinese: '我',
        english: 'I',
        soundMark: '/aɪ/',
      },
      {
        chinese: '喜欢',
        english: 'like',
        soundMark: '/laɪk/',
      },
      {
        chinese: '我喜欢',
        english: 'I like',
        soundMark: '/aɪ/ /laɪk/',
      },
      {
        chinese: '现在',
        english: 'now',
        soundMark: '/naʊ/',
      },
      {
        chinese: '我现在想要吃这个食物',
        english: 'I want to eat the food now',
        soundMark: '/aɪ/ /wɑnt/ /tə/ /it/ /ðə/ /fud/ /naʊ/',
      },
    ]);
  });

  it('complex', () => {
    const pdfText =
      ' \n' +
      '你好，我是星荣。 \n' +
      '好久之前我发了一个视频说“英语学习就像吃瓜子，但是和平常吃瓜子不同的是\n' +
      '你不能剥一颗吃一颗，规则要求你必须剥好了一小堆，你才有资格把这一小堆瓜子\n' +
      '\n' +
      '2 \n' +
      ' \n' +
      '中文 英文 K.K.音标 \n' +
      '我 \n' +
      'I /aɪ/ \n' +
      '喜欢 \n' +
      'like /laɪk/ \n' +
      '我喜欢 \n' +
      'I like /aɪ/ /laɪk/ \n' +
      '\n' +
      '3 \n' +
      ' \n' +
      '我需要告诉你重要的某些事情 \n' +
      'I need to tell you important things \n' +
      '/aɪ/ /nɪd/ /tə/ /tə/ /ðə/ /fud/ /naʊ/ \n' +
      '现在 \n' +
      'now /naʊ/ \n' +
      '我现在想要吃这个食物 \n' +
      'I want to eat the food now /aɪ/ /wɑnt/ /tə/ /it/ /ðə/ /fud/ /naʊ/ \n';

    expect(parse(pdfText)).toEqual([
      {
        chinese: '我',
        english: 'I',
        soundMark: '/aɪ/',
      },
      {
        chinese: '喜欢',
        english: 'like',
        soundMark: '/laɪk/',
      },
      {
        chinese: '我喜欢',
        english: 'I like',
        soundMark: '/aɪ/ /laɪk/',
      },
      {
        chinese: '我需要告诉你重要的某些事情',
        english: 'I need to tell you important things',
        soundMark: '/aɪ/ /nɪd/ /tə/ /tə/ /ðə/ /fud/ /naʊ/',
      },
      {
        chinese: '现在',
        english: 'now',
        soundMark: '/naʊ/',
      },
      {
        chinese: '我现在想要吃这个食物',
        english: 'I want to eat the food now',
        soundMark: '/aɪ/ /wɑnt/ /tə/ /it/ /ðə/ /fud/ /naʊ/',
      },
    ]);
  });

  it('中文里面包含符号', () => {
    const pdfText =
      ' \n' +
      '你好，我是星荣。 \n' +
      '好久之前我发了一个视频说“英语学习就像吃瓜子，但是和平常吃瓜子不同的是\n' +
      '你不能剥一颗吃一颗，规则要求你必须剥好了一小堆，你才有资格把这一小堆瓜子\n' +
      '\n' +
      '2 \n' +
      ' \n' +
      '中文 英文 K.K.音标 \n' +
      '我 \n' +
      'I /aɪ/ \n' +
      '喜欢 \n' +
      'like /laɪk/ \n' +
      '我喜欢 \n' +
      'I like /aɪ/ /laɪk/ \n' +
      '它；这件事 \n' +
      'it /it/ \n' +
      '\n' +
      '3 \n' +
      ' \n' +
      '我需要告诉你重要的某些事情 \n' +
      'I need to tell you important things \n' +
      '/aɪ/ /nɪd/ /tə/ /tə/ /ðə/ /fud/ /naʊ/ \n' +
      '现在 \n' +
      'now /naʊ/ \n' +
      '我现在想要吃这个食物 \n' +
      'I want to eat the food now /aɪ/ /wɑnt/ /tə/ /it/ /ðə/ /fud/ /naʊ/ \n';

    expect(parse(pdfText)).toEqual([
      {
        chinese: '我',
        english: 'I',
        soundMark: '/aɪ/',
      },
      {
        chinese: '喜欢',
        english: 'like',
        soundMark: '/laɪk/',
      },
      {
        chinese: '我喜欢',
        english: 'I like',
        soundMark: '/aɪ/ /laɪk/',
      },
      {
        chinese: '它；这件事',
        english: 'it',
        soundMark: '/it/',
      },
      {
        chinese: '我需要告诉你重要的某些事情',
        english: 'I need to tell you important things',
        soundMark: '/aɪ/ /nɪd/ /tə/ /tə/ /ðə/ /fud/ /naʊ/',
      },
      {
        chinese: '现在',
        english: 'now',
        soundMark: '/naʊ/',
      },
      {
        chinese: '我现在想要吃这个食物',
        english: 'I want to eat the food now',
        soundMark: '/aɪ/ /wɑnt/ /tə/ /it/ /ðə/ /fud/ /naʊ/',
      },
    ]);
  });

  describe('parse English and SoundMark', () => {
    it('parse simply', () => {
      expect(parseEnglishAndSoundMark('like /laɪk/')).toEqual({
        english: 'like',
        soundMark: '/laɪk/',
      });
    });
    it('parse multi group', () => {
      expect(parseEnglishAndSoundMark('I like /aɪ/ /laɪk/')).toEqual({
        english: 'I like',
        soundMark: '/aɪ/ /laɪk/',
      });
    });
  });
});
