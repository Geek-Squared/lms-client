import { SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/nav'
import Hero from './components/shared/hero';
import CourseNav from './components/nav/ClientNav';
import CourseList from './components/misc/lists/CourseList';
import { useCourseStore } from './state/course/course';

function ClientView() {
  const [courses, setCourses] = useState([]);
  const fetchAllCourses = useCourseStore((state) => state.fetchAllCourses);

  useEffect(() => {
    // Fetch all courses when the component mounts
    fetchAllCourses()
      .then((courses: SetStateAction<never[]>) => setCourses(courses))
      .catch((error: any) => console.error(error));
  }, []);


  return (
    <>
      <Navbar />
      <Hero />
      <CourseNav />
      <div className="course-list">
        {
          courses.length > 0 ? (
            courses.map((course: any) => (
              <Link to={`/course/${course._id}`}>
                <CourseList title={course?.title} description={course?.description} image={course?.image} level={course?.level} />
              </Link>
            ))
          ) : (
            <p>No course available</p>
          )
        }
      </div>
    </>
  )
}

export default ClientView