'use client';

import Answer from '@/components/Answer';
import Header from '@/components/Header';
import Question from '@/components/Question';
import Statistics from '@/components/Statistics';
import useCourse from '@/stores/useCourse';
import useFailedCount from '@/stores/useFailedCount';
import { useEffect, useState } from 'react';

export default function Home() {
  const [currentMode, setCurrentMode] = useState<'question' | 'answer'>(
    'question'
  );
  const [toNextStatement, fetchCourse, getCurrentStatement, checkCorrect] =
    useCourse((state) => [
      state.toNextStatement,
      state.fetchCourse,
      state.getCurrentStatement,
      state.checkCorrect,
    ]);
  const [increaseFailedCount, resetFailedCount] = useFailedCount((state) => [
    state.increaseFailedCount,
    state.resetFailedCount,
  ]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  const {
    chinese = '',
    english = '',
    soundMark = '',
  } = getCurrentStatement() ?? {};

  function handleToNextStatement() {
    toNextStatement();
    setCurrentMode('question');
    resetFailedCount();
  }

  function handleCheckAnswer(userInput: string) {
    if (checkCorrect(userInput)) {
      setCurrentMode('answer');
    } else {
      increaseFailedCount(() => setCurrentMode('answer'));
    }
  }

  return (
    <div className='flex flex-col'>
      <div className='mb-20'>
        <Header />
      </div>
      <div className='mb-18 mt-20'>
        <div className='container mx-auto flex flex-1 flex-col items-center justify-center pb-10 h-96'>
          <div className='container relative mx-auto flex h-full flex-col items-center'>
            <div className='container flex flex-grow items-center justify-center'>
              <div className='container flex h-full w-full flex-col items-center justify-center'>
                <div className='container flex flex-grow flex-col items-center justify-center'>
                  <div className='flex flex-col items-center justify-center pb-1 pt-4'>
                    {currentMode === 'question' ? (
                      <Question
                        word={chinese}
                        onCheckAnswer={handleCheckAnswer}
                      ></Question>
                    ) : (
                      <Answer
                        word={english}
                        soundmark={soundMark}
                        onToNextStatement={handleToNextStatement}
                      ></Answer>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Statistics />
          </div>
        </div>
      </div>
    </div>
  );
}
