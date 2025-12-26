import ProgressBar from '@/components/ui/ProgressBar';

interface CourseProgressCardProps {
  progressPercentage: number;
  onStartCourse: () => void;
}

export default function CourseProgressCard({ 
  progressPercentage, 
  onStartCourse 
}: CourseProgressCardProps) {
  return (
    <div className="bg-bc-card p-6 rounded-2xl border border-white/10 w-full md:w-80 shadow-2xl">
      <h3 className="text-white font-bold mb-2">Your Progress</h3>
      <div className="flex items-end gap-2 mb-2">
        <span className="text-3xl font-bold text-bc-blue">
          {Math.round(progressPercentage)}%
        </span>
        <span className="text-sm text-gray-400 mb-1">completed</span>
      </div>
      <ProgressBar progress={progressPercentage} className="mb-6" />
      
      <button 
        onClick={onStartCourse}
        className="w-full py-3 bg-gradient-to-r from-bc-blue to-bc-purple text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
      >
        {progressPercentage > 0 ? 'Continue Learning' : 'Start Course'}
      </button>
    </div>
  );
}