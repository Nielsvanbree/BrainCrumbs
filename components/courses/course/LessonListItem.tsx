import { PlayCircle, FileText, HelpCircle, CheckCircle, Circle } from 'lucide-react';
import { Lesson } from '@/lib/course-data';

interface LessonListItemProps {
  lesson: Lesson;
  isCompleted: boolean;
  onClick: () => void;
  isActive?: boolean;
}

export default function LessonListItem({ 
  lesson, 
  isCompleted, 
  onClick,
  isActive = false
}: LessonListItemProps) {
  const iconMap = {
    video: PlayCircle,
    text: FileText,
    quiz: HelpCircle,
  };

  const Icon = iconMap[lesson.type];

  return (
    <button 
      onClick={onClick}
      className={`
        w-full flex items-center p-4 hover:bg-white/5 transition-colors text-left group
        ${isActive ? 'bg-white/5' : ''}
      `}
    >
      <div className="mr-4">
        {isCompleted ? (
          <CheckCircle className="text-bc-green w-5 h-5" />
        ) : (
          <Circle className="text-gray-600 w-5 h-5 group-hover:text-bc-blue transition-colors" />
        )}
      </div>
      <div className="flex-grow">
        <div className="text-gray-200 font-medium group-hover:text-white transition-colors">
          {lesson.title}
        </div>
      </div>
      <div className="flex items-center gap-3 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <Icon size={14} />
          {lesson.duration}
        </span>
      </div>
    </button>
  );
}