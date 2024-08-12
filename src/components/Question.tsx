import { ChangeEvent, KeyboardEvent, memo, useState } from 'react';
import TrimInputer from './TrimInputer';

function Question({
  word,
  onCheckAnswer,
}: {
  word: string;
  onCheckAnswer: (userInput: string) => void;
}) {
  return (
    <div className='text-5xl text-center mb-20 mt-10'>
      <div className='font-[楷体]'>{word}</div>
      <TrimInputer onCheckAnswer={onCheckAnswer} />
    </div>
  );
}

export default memo(Question);
