import { useRouter } from 'next/navigation';
import { ArrowLeft, X, CheckCircle, Circle } from 'lucide-react';
import ProgressBar from '@/components/ui/ProgressBar';
import { Course } from '@/lib/course-data';

interface CourseSidebarProps {
  course: Course;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeLessonId: string | null;
  isCompleted: (lessonId: string) => boolean;
  onLessonClick: (lessonId: string) => void;
  progressPercentage: number;
  completedCount: number;
  totalLessons: number;
}

export default function CourseSidebar({
  course,
  sidebarOpen,
  setSidebarOpen,
  activeLessonId,
  isCompleted,
  onLessonClick,
  progressPercentage,
  completedCount,
  totalLessons,
}: CourseSidebarProps) {
  const router = useRouter();

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-40 w-80 bg-black/90 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      md:translate-x-0 md:relative md:bg-black/20
    `}>
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <button 
            onClick={() => router.push(`/courses/${course.slug}`)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} /> Course Overview
          </button>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={20} className="text-gray-400" />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto py-4">
          {course.modules.map((mod) => (
            <div key={mod.id} className="mb-6">
              <h4 className="px-6 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                {mod.title}
              </h4>
              <div>
                {mod.lessons.map(l => (
                  <button
                    key={l.id}
                    onClick={() => onLessonClick(l.id)}
                    className={`
                      w-full flex items-center px-6 py-3 border-l-2 text-left transition-colors
                      ${l.id === activeLessonId 
                        ? 'bg-bc-blue/10 border-bc-blue text-white' 
                        : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5'}
                    `}
                  >
                    <div className="mr-3">
                      {isCompleted(l.id) ? (
                        <CheckCircle size={16} className="text-bc-green" />
                      ) : (
                        <Circle size={16} className={l.id === activeLessonId ? 'text-bc-blue' : 'text-gray-600'} />
                      )}
                    </div>
                    <div className="flex-grow text-sm font-medium truncate">
                      {l.title}
                    </div>
                    <div className="text-xs opacity-50 ml-2">
                      {l.duration}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-white/10 bg-black/20">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>{completedCount} / {totalLessons} completed</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <ProgressBar progress={progressPercentage} />
        </div>
      </div>
    </aside>
  );
}