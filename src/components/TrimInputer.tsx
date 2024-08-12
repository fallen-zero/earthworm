import {
  ChangeEvent,
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

function TrimInputer({
  onCheckAnswer,
}: {
  onCheckAnswer: (userInput: string) => void;
}) {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const textList = useMemo(() => {
    const list = inputValue.replace(/\s+/g, ' ').trimStart().split(' ');
    return list.length ? list : [''];
  }, [inputValue]);

  function handleFocusInputListener() {
    inputRef.current?.focus();
    setIsFocused(true);
  }

  function handleInputBlur() {
    document.addEventListener('keydown', handleFocusInputListener);
    setIsFocused(false);
  }

  function handleInputFocus() {
    document.removeEventListener('keydown', handleFocusInputListener);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      onCheckAnswer(inputValue.replace(/\s+/g, ' '));
      setInputValue('');
    }
  }

  useEffect(() => {
    return () => {
      document.removeEventListener('keydown', handleFocusInputListener);
    };
  }, []);

  return (
    <div>
      <ul className='flex items-center justify-center flex-wrap'>
        {textList.map((text) => (
          <li
            key={crypto.randomUUID()}
            className='w-fit min-w-20 border-b-2 border-blue-200 border-solid py-3 px-5 h-16 leading-10 mr-3 mt-3 last:mr-0 last:border-blue-500 text-center'
          >
            {text}
          </li>
        ))}
      </ul>
      {!isFocused && <div className='mt-4 text-2xl'>按任意键开始输入</div>}
      <input
        ref={inputRef}
        className='w-0 h-0'
        type='text'
        autoFocus
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
      />
    </div>
  );
}

export default memo(TrimInputer);
