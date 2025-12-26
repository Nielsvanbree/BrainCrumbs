"use client";

import { useState, useMemo } from 'react';
import { notFound, useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import ProgressBar from '@/components/ui/ProgressBar';
import { getCourse, Course, Lesson } from '@/lib/course-data';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { 
  PlayCircle, 
  FileText, 
  HelpCircle, 
  CheckCircle, 
  Circle, 
  ChevronRight, 
  Clock, 
  ArrowLeft,
  Menu,
  X,
  AlertCircle,
  Check
} from 'lucide-react';

export default function CoursePage({ params }: { params: { courseSlug: string } }) {
  const searchParams = useSearchParams();
  const activeLessonId = searchParams.get('lesson');
  
  const course = getCourse(params.courseSlug);
  
  if (!course) {
    notFound();
  }

  return (
    <CourseContent 
      course={course} 
      activeLessonId={activeLessonId} 
    />
  );
}

function CourseContent({ course, activeLessonId }: { course: Course, activeLessonId: string | null }) {
  const router = useRouter();
  const { completedLessons, markAsCompleted, toggleCompletion, isCompleted } = useCourseProgress(course.id);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Calculate progress
  const totalLessons = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const completedCount = completedLessons.length;
  const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  // Find active lesson object
  const activeLesson = useMemo(() => {
    if (!activeLessonId) return null;
    for (const mod of course.modules) {
      const lesson = mod.lessons.find(l => l.id === activeLessonId);
      if (lesson) return { lesson, module: mod };
    }
    return null;
  }, [course, activeLessonId]);

  const navigateToLesson = (lessonId: string) => {
    router.push(`/courses/${course.slug}?lesson=${lessonId}`, { scroll: true });
    setSidebarOpen(false);
  };

  const handleNextLesson = () => {
    if (!activeLesson) return;
    
    // Find next lesson index
    let foundCurrent = false;
    let nextLessonId = null;

    for (const mod of course.modules) {
      for (const lesson of mod.lessons) {
        if (foundCurrent) {
          nextLessonId = lesson.id;
          break;
        }
        if (lesson.id === activeLesson.lesson.id) {
          foundCurrent = true;
        }
      }
      if (nextLessonId) break;
    }

    if (nextLessonId) {
      navigateToLesson(nextLessonId);
    } else {
      router.push(`/courses/${course.slug}`);
    }
  };

  // View: Course Overview (if no lesson selected or invalid lesson)
  if (!activeLessonId || !activeLesson) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow pt-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full pb-20">
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
          <div className="mb-12 text-center md:text-left">
            <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between">
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
                    <span className="flex items-center gap-2"><Clock size={16}/> {course.totalDuration}</span>
                    <span className="flex items-center gap-2"><FileText size={16}/> {totalLessons} Lessons</span>
                 </div>
              </div>
              
              <div className="bg-bc-card p-6 rounded-2xl border border-white/10 w-full md:w-80 shadow-2xl">
                <h3 className="text-white font-bold mb-2">Your Progress</h3>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-3xl font-bold text-bc-blue">{Math.round(progressPercentage)}%</span>
                  <span className="text-sm text-gray-400 mb-1">completed</span>
                </div>
                <ProgressBar progress={progressPercentage} className="mb-6" />
                
                <button 
                  onClick={() => {
                    let firstIncompleteId = null;
                    let firstLessonId = course.modules[0]?.lessons[0]?.id;
                    
                    for (const mod of course.modules) {
                      for (const l of mod.lessons) {
                        if (!isCompleted(l.id)) {
                          firstIncompleteId = l.id;
                          break;
                        }
                      }
                      if (firstIncompleteId) break;
                    }
                    
                    navigateToLesson(firstIncompleteId || firstLessonId || '');
                  }}
                  className="w-full py-3 bg-gradient-to-r from-bc-blue to-bc-purple text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
                >
                  {progressPercentage > 0 ? 'Continue Learning' : 'Start Course'}
                </button>
              </div>
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
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Course Curriculum</h2>
            <div className="space-y-6">
              {course.modules.map((module) => (
                <div key={module.id} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                  <div className="p-6 border-b border-white/5 bg-white/5">
                    <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
                    <p className="text-sm text-gray-400">{module.description}</p>
                  </div>
                  <div className="divide-y divide-white/5">
                    {module.lessons.map((lesson) => (
                      <button 
                        key={lesson.id} 
                        onClick={() => navigateToLesson(lesson.id)}
                        className="w-full flex items-center p-4 hover:bg-white/5 transition-colors text-left group"
                      >
                        <div className="mr-4">
                           {isCompleted(lesson.id) ? (
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
                             {lesson.type === 'video' && <PlayCircle size={14} />}
                             {lesson.type === 'text' && <FileText size={14} />}
                             {lesson.type === 'quiz' && <HelpCircle size={14} />}
                             {lesson.duration}
                           </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // View: Lesson Player
  const { lesson, module } = activeLesson;

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
                        onClick={() => navigateToLesson(l.id)}
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
                  
                  {lesson.type === 'quiz' && (
                    <QuizRunner 
                      lesson={lesson} 
                      onComplete={() => {
                        if (!isCompleted(lesson.id)) markAsCompleted(lesson.id);
                      }} 
                      onNextLesson={handleNextLesson}
                    />
                  )}
               </div>

               {lesson.type !== 'quiz' && (
                 <div className="flex items-center justify-between border-t border-white/10 pt-8">
                    <button 
                      onClick={() => toggleCompletion(lesson.id)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${isCompleted(lesson.id) ? 'bg-bc-green/20 text-bc-green' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
                    >
                      {isCompleted(lesson.id) ? <CheckCircle size={20}/> : <Circle size={20}/>}
                      {isCompleted(lesson.id) ? 'Completed' : 'Mark as Complete'}
                    </button>

                    <button 
                      onClick={() => {
                        if (!isCompleted(lesson.id)) markAsCompleted(lesson.id);
                        handleNextLesson();
                      }}
                      className="flex items-center gap-2 px-6 py-3 bg-bc-blue text-white rounded-lg font-bold hover:bg-bc-blue/80 transition-colors"
                    >
                      Next Lesson <ChevronRight size={20} />
                    </button>
                 </div>
               )}
            </div>
         </div>
      </main>
    </div>
  );
}

function QuizRunner({ lesson, onComplete, onNextLesson }: { lesson: Lesson, onComplete: () => void, onNextLesson: () => void }) {
  const questions = lesson.questions || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  if (questions.length === 0) return <div className="p-12 text-center">No questions available.</div>;

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedOption === currentQuestion.correctAnswerIndex;

  const handleCheck = () => {
    setIsAnswerChecked(true);
    if (isCorrect) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setQuizFinished(true);
      onComplete();
    }
  };

  if (quizFinished) {
    return (
      <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
         <div className="w-24 h-24 bg-bc-purple/20 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl font-bold text-bc-purple">{Math.round((score / questions.length) * 100)}%</span>
         </div>
         <h3 className="text-3xl font-bold text-white mb-2">
           Quiz Completed!
         </h3>
         <p className="text-gray-400 mb-8">
           You scored {score} out of {questions.length} correctly.
         </p>
         <button 
           onClick={onNextLesson}
           className="px-8 py-3 bg-bc-blue text-white font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
         >
           Continue to Next Lesson <ChevronRight size={20} />
         </button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12">
      <div className="flex justify-between items-center mb-8">
         <span className="text-sm font-bold text-bc-purple uppercase tracking-wider">
           Question {currentIndex + 1} of {questions.length}
         </span>
         <span className="text-sm text-gray-500">
           Current Score: {score}
         </span>
      </div>

      <h3 className="text-2xl font-bold text-white mb-8">
        {currentQuestion.question}
      </h3>

      <div className="space-y-4 mb-8">
        {currentQuestion.options.map((option, idx) => {
          let buttonStyle = "border-white/10 hover:bg-white/5";
          
          if (isAnswerChecked) {
            if (idx === currentQuestion.correctAnswerIndex) {
              buttonStyle = "border-bc-green bg-bc-green/10 text-white";
            } else if (idx === selectedOption) {
              buttonStyle = "border-red-500 bg-red-500/10 text-white";
            } else {
               buttonStyle = "opacity-50 border-white/10";
            }
          } else {
             if (idx === selectedOption) {
               buttonStyle = "border-bc-blue bg-bc-blue/10 text-white";
             }
          }

          return (
            <button
              key={idx}
              onClick={() => !isAnswerChecked && setSelectedOption(idx)}
              disabled={isAnswerChecked}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between group ${buttonStyle}`}
            >
              <span>{option}</span>
              {isAnswerChecked && idx === currentQuestion.correctAnswerIndex && <CheckCircle className="text-bc-green" size={20} />}
              {isAnswerChecked && idx === selectedOption && idx !== currentQuestion.correctAnswerIndex && <X className="text-red-500" size={20} />}
            </button>
          );
        })}
      </div>

      {isAnswerChecked && (
        <div className={`p-6 rounded-xl mb-8 ${isCorrect ? 'bg-bc-green/10 border border-bc-green/30' : 'bg-red-500/10 border border-red-500/30'}`}>
          <div className="flex items-start gap-3">
             {isCorrect ? <Check className="text-bc-green mt-1" size={20}/> : <AlertCircle className="text-red-500 mt-1" size={20}/>}
             <div>
                <h4 className={`font-bold mb-1 ${isCorrect ? 'text-bc-green' : 'text-red-500'}`}>
                  {isCorrect ? 'Correct!' : 'Not quite right.'}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {currentQuestion.explanation}
                </p>
             </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        {!isAnswerChecked ? (
          <button 
            onClick={handleCheck}
            disabled={selectedOption === null}
            className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check Answer
          </button>
        ) : (
          <button 
            onClick={handleNext}
            className="px-8 py-3 bg-bc-blue text-white font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'} <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
