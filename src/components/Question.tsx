import { ChangeEvent, KeyboardEvent, memo, useState } from 'react';

function Question({
  word,
  onCheckAnswer,
}: {
  word: string;
  onCheckAnswer: (userInput: string) => void;
}) {
  const [inputValue, setInputValue] = useState('');

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      onCheckAnswer(inputValue);
      setInputValue('');
    }
  }
  return (
    <div className='text-5xl text-center mb-20 mt-10'>
      <div className='font-[楷体]'>{word}</div>
      <input
        className='border-2 border-solid border-sky-500 bg-slate-100 rounded-lg mt-8 mb-11 indent-1 h-10 text-2xl'
        type='text'
        autoFocus
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
    </div>
  );
}

export default memo(Question);
