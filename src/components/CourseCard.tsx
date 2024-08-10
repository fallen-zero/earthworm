'use client';

import useCourse from '@/stores/useCourse';
import { Course } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { memo } from 'react';

function CourseCard({ course }: { course: Course }) {
  const router = useRouter();
  const fetchCourse = useCourse((state) => state.fetchCourse);
  async function handleClick(id: Course['id']) {
    await fetchCourse(id);
    router.push(`/`);
  }
  return (
    <>
      <button onClick={() => handleClick(course.id)}>{course.title}</button>
    </>
  );
}

export default memo(CourseCard);
