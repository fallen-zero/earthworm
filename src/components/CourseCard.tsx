'use client';

import useCourse from '@/stores/useCourse';
import { Course } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { memo } from 'react';

function CourseCard({ course }: { course: Course }) {
  const router = useRouter();
  const [fetchCourse, setStatementIndex] = useCourse((state) => [
    state.fetchCourse,
    state.setStatementIndex,
  ]);
  async function handleClick(id: Course['id']) {
    console.log('id', id);
    await fetchCourse(id);
    setStatementIndex(0);
    router.push(`/`);
  }
  return (
    <>
      <button
        className='size-full flex items-center justify-center text-2xl font-[楷体] rounded-lg bg-cyan-900 hover:bg-cyan-500 cursor-pointer duration-200'
        onClick={() => handleClick(course.id)}
      >
        {course.title}
      </button>
    </>
  );
}

export default memo(CourseCard);
