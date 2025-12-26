import Link from 'next/link';
import { ArrowLeft, Clock, FileText } from 'lucide-react';
import { Course } from '@/lib/course-data';

interface CourseHeaderProps {
  course: Course;
  totalLessons: number;
}

export default function CourseHeader({ course, totalLessons }: CourseHeaderProps) {
  return (
    <>
      {/* Back Button */}
      <div className="mb-8">
        <Link 
          href="/courses" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to All Courses
        </Link>
      </div>

      {/* Header */}
      <div className="flex-1">
        <div className="inline-block px-3 py-1 rounded-full bg-bc-purple/10 border border-bc-purple/30 text-bc-purple text-xs font-bold uppercase tracking-wider mb-4">
          {course.level}
        </div>
        <h1 className="text-4xl md:text-6xl font-[var(--font-orbitron)] font-bold text-white mb-4">
          {course.title}
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mb-6">
          {course.description}
        </p>
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-2">
            <Clock size={16}/> {course.totalDuration}
          </span>
          <span className="flex items-center gap-2">
            <FileText size={16}/> {totalLessons} Lessons
          </span>
        </div>
      </div>
    </>
  );
}