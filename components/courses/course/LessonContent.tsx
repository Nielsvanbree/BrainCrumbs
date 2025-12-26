import { FileText } from 'lucide-react';
import { Lesson } from '@/lib/course-data';

interface LessonContentProps {
  lesson: Lesson;
}

export default function LessonContent({ lesson }: LessonContentProps) {
  return (
    <div className="bg-bc-card border border-white/10 rounded-2xl overflow-hidden min-h-[400px] mb-8">
      {lesson.type === 'video' && lesson.videoUrl && (
        <div className="aspect-video w-full bg-black flex items-center justify-center">
          <iframe 
            src={lesson.videoUrl} 
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        </div>
      )}
      
      {lesson.type === 'text' && (
        <div>
          {lesson.imageUrl && (
            <div className="w-full h-64 md:h-80 relative">
              <img 
                src={lesson.imageUrl} 
                alt={lesson.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bc-card to-transparent" />
            </div>
          )}
          <div className="p-8 md:p-12 prose prose-invert max-w-none">
            {!lesson.imageUrl && (
              <div className="flex items-center justify-center h-48 bg-white/5 rounded-xl mb-8">
                <FileText size={48} className="text-gray-600" />
              </div>
            )}
            <p className="text-lg leading-relaxed text-gray-300 whitespace-pre-line">
              {lesson.content || "Content pending..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}