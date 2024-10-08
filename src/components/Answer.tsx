import { debounce } from 'lodash-es';
import { memo, useEffect, useRef } from 'react';

function Answer({
  word,
  soundmark,
  onToNextStatement,
}: {
  word: string;
  soundmark: string;
  onToNextStatement: () => void;
}) {
  const audioSrc = `https://dict.youdao.com/dictvoice?audio=${word}&type=1`;

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleplaySoundmark = debounce(() => {
    audioRef.current && audioRef.current.play();
  }, 200);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onToNextStatement();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onToNextStatement]);

  return (
    <div className='text-center mb-20 mt-10'>
      <div className='text-5xl mb-3'>
        {word}
        <svg
          className='w-7 h-7 inline-block ml-1 cursor-pointer active:opacity-50 duration-200'
          viewBox='0 0 1024 1024'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          onClick={handleplaySoundmark}
        >
          <path
            d='M342.4 384H128v256h214.4L576 826.8V197.2L342.4 384zM64 320h256L640 64v896L320 704H64V320z m640 256h256v-64H704v64z m16.8 159.5l181 181 45.3-45.3-181-181-45.3 45.3z m33.9-343.9l181-181-45.3-45.3-181 181 45.3 45.3z'
            fill='#666666'
          ></path>
        </svg>
        <audio
          ref={audioRef}
          controls
          autoPlay
          className='hidden'
        >
          <source
            src={audioSrc}
            type='audio/mpeg'
          />
          Your browser does not support the sudio element.
        </audio>
      </div>
      <div className='text-2xl text-slate-600'>{soundmark}</div>
      <button
        className='border-2 border-solid border-slate-400 bg-slate-100 rounded-lg mt-8 mb-11 indent-1 h-10 text-2xl px-10 haver:bg-slate-200 active:opacity-50 duration-200'
        onClick={debounce(() => onToNextStatement(), 300)}
      >
        next
      </button>
    </div>
  );
}

export default memo(Answer);
