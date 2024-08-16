import { getCourseList } from '@/actions/course';
import CourseCard from '@/components/CourseCard';

export default async function Course() {
  const courses = await getCourseList();

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
