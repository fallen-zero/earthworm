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
    <div>
      <div>Course</div>
      <ul className=''>
        {courses.map((course) => {
          return (
            <li key={course.id}>
              <CourseCard course={course} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
