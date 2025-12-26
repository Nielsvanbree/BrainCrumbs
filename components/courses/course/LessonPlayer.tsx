import { Menu, CheckCircle, Circle, ChevronRight } from 'lucide-react';
import ProgressBar from '@/components/ui/ProgressBar';
import { Course, Lesson } from '@/lib/course-data';
import CourseSidebar from './CourseSidebar';
import LessonContent from './LessonContent';
import QuizRunner from './QuizRunner';

interface LessonPlayerProps {
  course: Course;
  lesson: Lesson;
  module: { id: string; title: string };
  activeLessonId: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isCompleted: (lessonId: string) => boolean;
  toggleCompletion: (lessonId: string) => void;
  markAsCompleted: (lessonId: string) => void;
  onLessonClick: (lessonId: string) => void;
  onNextLesson: () => void;
  progressPercentage: number;
  completedCount: number;
  totalLessons: number;
}

export default function LessonPlayer({
  course,
  lesson,
  module,
  activeLessonId,
  sidebarOpen,
  setSidebarOpen,
  isCompleted,
  toggleCompletion,
  markAsCompleted,
  onLessonClick,
  onNextLesson,
  progressPercentage,
  completedCount,
  totalLessons,
}: LessonPlayerProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full z-50 bg-bc-dark border-b border-white/10 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="text-white" />
          </button>
          <span className="font-bold text-white truncate max-w-[200px]">{course.title}</span>
        </div>
        <div className="w-24">
          <ProgressBar progress={progressPercentage} className="h-1.5" />
        </div>
      </div>

      {/* Sidebar */}
      <CourseSidebar
        course={course}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeLessonId={activeLessonId}
        isCompleted={isCompleted}
        onLessonClick={onLessonClick}
        progressPercentage={progressPercentage}
        completedCount={completedCount}
        totalLessons={totalLessons}
      />

      {/* Main Content */}
      <main className="flex-1 min-h-screen pt-20 md:pt-0 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 md:p-12">
          <div className="mb-8">
            <div className="text-sm text-bc-purple mb-2 font-medium">
              {module.title}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {lesson.title}
            </h1>
            
            {/* Content Area */}
            {lesson.type === 'quiz' ? (
              <QuizRunner 
                lesson={lesson} 
                onComplete={() => {
                  if (!isCompleted(lesson.id)) markAsCompleted(lesson.id);
                }} 
                onNextLesson={onNextLesson}
              />
            ) : (
              <>
                <LessonContent lesson={lesson} />
                
                <div className="flex items-center justify-between border-t border-white/10 pt-8">
                  <button 
                    onClick={() => toggleCompletion(lesson.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                      isCompleted(lesson.id) 
                        ? 'bg-bc-green/20 text-bc-green' 
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {isCompleted(lesson.id) ? <CheckCircle size={20}/> : <Circle size={20}/>}
                    {isCompleted(lesson.id) ? 'Completed' : 'Mark as Complete'}
                  </button>

                  <button 
                    onClick={() => {
                      if (!isCompleted(lesson.id)) markAsCompleted(lesson.id);
                      onNextLesson();
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-bc-blue text-white rounded-lg font-bold hover:bg-bc-blue/80 transition-colors"
                  >
                    Next Lesson <ChevronRight size={20} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}