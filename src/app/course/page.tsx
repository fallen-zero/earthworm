import CourseCard from '@/components/CourseCard';
import { Course as CourseModel } from '@prisma/client';

async function fetchCourses(): Promise<CourseModel[]> {
  const respone = await fetch(`${process.env.NEXT_BASE_PATH}/course/api`);
  if (!respone.ok) {
    throw new Error('Failed to fetch courses');
  }
  const data = await respone.json();
  return data.data;
}
export default async function Course() {
  const courses = await fetchCourses();

  return (
    <div className='w-screen h-screen flex flex-col overflow-hidden p-20'>
      <div className='text-5xl font-bold mb-10'>Course</div>
      <ul className='size-full overflow-y-auto grid grid-cols-8 gap-6'>
        {courses.map((course) => {
          return (
            <li
              key={course.id}
              className='w-full h-28'
            >
              <CourseCard course={course} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
