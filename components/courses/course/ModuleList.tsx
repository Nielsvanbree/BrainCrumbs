import { Module } from '@/lib/course-data';
import LessonListItem from './LessonListItem';

interface ModuleListProps {
  modules: Module[];
  isCompleted: (lessonId: string) => boolean;
  onLessonClick: (lessonId: string) => void;
}

export default function ModuleList({ modules, isCompleted, onLessonClick }: ModuleListProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-8">Course Curriculum</h2>
      <div className="space-y-6">
        {modules.map((module) => (
          <div key={module.id} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
            <div className="p-6 border-b border-white/5 bg-white/5">
              <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
              <p className="text-sm text-gray-400">{module.description}</p>
            </div>
            <div className="divide-y divide-white/5">
              {module.lessons.map((lesson) => (
                <LessonListItem
                  key={lesson.id}
                  lesson={lesson}
                  isCompleted={isCompleted(lesson.id)}
                  onClick={() => onLessonClick(lesson.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}