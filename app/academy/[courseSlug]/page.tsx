"use client";

import { useMemo, useState } from 'react';
import { notFound, useSearchParams, useRouter } from 'next/navigation';
import { getCourse } from '@/lib/course-data';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import CourseOverview from '@/components/courses/course/CourseOverview';
import LessonPlayer from '@/components/courses/course/LessonPlayer';

export default function CoursePage({ params }: { params: { courseSlug: string } }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeLessonId = searchParams.get('lesson');
  
  const course = getCourse(params.courseSlug);
  
  if (!course) {
    notFound();
  }

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
    router.push(`/academy/${course.slug}?lesson=${lessonId}`, { scroll: true });
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
      router.push(`/academy/${course.slug}`);
    }
  };

  const handleStartCourse = () => {
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
  };

  // View: Course Overview (if no lesson selected or invalid lesson)
  if (!activeLessonId || !activeLesson) {
    return (
      <CourseOverview
        course={course}
        progressPercentage={progressPercentage}
        totalLessons={totalLessons}
        isCompleted={isCompleted}
        onLessonClick={navigateToLesson}
        onStartCourse={handleStartCourse}
      />
    );
  }

  // View: Lesson Player
  const { lesson, module } = activeLesson;

  return (
    <LessonPlayer
      course={course}
      lesson={lesson}
      module={module}
      activeLessonId={activeLessonId}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      isCompleted={isCompleted}
      toggleCompletion={toggleCompletion}
      markAsCompleted={markAsCompleted}
      onLessonClick={navigateToLesson}
      onNextLesson={handleNextLesson}
      progressPercentage={progressPercentage}
      completedCount={completedCount}
      totalLessons={totalLessons}
    />
  );
}