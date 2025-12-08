"use client";

import Link from 'next/link';
import { Course } from '@/lib/course-data';
import { ArrowRight, Clock, BarChart, BookOpen } from 'lucide-react';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import ProgressBar from '@/components/ui/ProgressBar';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const { completedLessons } = useCourseProgress(course.id);
  
  const totalLessons = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const completedCount = completedLessons.length;
  const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
  const hasStarted = progressPercentage > 0;

  return (
    <Link 
      href={`/courses/${course.slug}`}
      className="group flex flex-col bg-bc-card border border-white/10 rounded-2xl overflow-hidden hover:border-bc-purple/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
    >
      <div className="h-48 relative overflow-hidden">
         {/* Image Background */}
         {course.thumbnail ? (
           <div 
             className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
             style={{ backgroundImage: `url(${course.thumbnail})` }}
           />
         ) : (
           <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
             <BookOpen size={48} className="text-white/20" />
           </div>
         )}
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
         
         <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-xs font-bold uppercase tracking-wider text-bc-cyan">
            {course.level}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-[var(--font-orbitron)] font-bold text-white mb-3 group-hover:text-bc-purple transition-colors">
          {course.title}
        </h3>
        <p className="text-gray-400 text-sm mb-6 line-clamp-2">
          {course.description}
        </p>
        
        <div className="mt-auto space-y-4">
          {hasStarted && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-400">
                <span>{Math.round(progressPercentage)}% Complete</span>
                <span>{completedCount}/{totalLessons}</span>
              </div>
              <ProgressBar progress={progressPercentage} className="h-1 bg-white/5" colorClass="bg-bc-green" />
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-white/5">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock size={14} /> {course.totalDuration}
              </span>
              <span className="flex items-center gap-1">
                <BarChart size={14} /> {course.modules.length} Modules
              </span>
            </div>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-bc-blue" />
          </div>
        </div>
      </div>
    </Link>
  );
}