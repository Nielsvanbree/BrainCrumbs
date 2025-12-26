import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Course } from '@/lib/course-data';
import CourseHeader from './CourseHeader';
import CourseProgressCard from './CourseProgressCard';
import ModuleList from './ModuleList';

interface CourseOverviewProps {
  course: Course;
  progressPercentage: number;
  totalLessons: number;
  isCompleted: (lessonId: string) => boolean;
  onLessonClick: (lessonId: string) => void;
  onStartCourse: () => void;
}

export default function CourseOverview({
  course,
  progressPercentage,
  totalLessons,
  isCompleted,
  onLessonClick,
  onStartCourse,
}: CourseOverviewProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full pb-20">
        <div className="mb-12 text-center md:text-left">
          <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between">
            <CourseHeader course={course} totalLessons={totalLessons} />
            <CourseProgressCard 
              progressPercentage={progressPercentage}
              onStartCourse={onStartCourse}
            />
          </div>
        </div>

        {/* Long Description */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">About this Course</h2>
          <p className="text-gray-300 leading-relaxed max-w-3xl">
            {course.longDescription}
          </p>
        </div>

        {/* Curriculum */}
        <ModuleList 
          modules={course.modules}
          isCompleted={isCompleted}
          onLessonClick={onLessonClick}
        />
      </main>
      <Footer />
    </div>
  );
}