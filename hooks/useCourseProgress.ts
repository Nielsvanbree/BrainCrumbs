import { useState, useEffect } from 'react';

export function useCourseProgress(courseId: string) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  // Load progress from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`course_progress_${courseId}`);
    if (saved) {
      try {
        setCompletedLessons(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse course progress', e);
      }
    }
  }, [courseId]);

  // Save progress whenever it changes
  useEffect(() => {
    if (completedLessons.length > 0) {
      localStorage.setItem(`course_progress_${courseId}`, JSON.stringify(completedLessons));
    }
  }, [completedLessons, courseId]);

  const markAsCompleted = (lessonId: string) => {
    setCompletedLessons(prev => {
      if (prev.includes(lessonId)) return prev;
      return [...prev, lessonId];
    });
  };

  const toggleCompletion = (lessonId: string) => {
    setCompletedLessons(prev => {
      if (prev.includes(lessonId)) {
        return prev.filter(id => id !== lessonId);
      } else {
        return [...prev, lessonId];
      }
    });
  };

  const isCompleted = (lessonId: string) => completedLessons.includes(lessonId);

  return {
    completedLessons,
    markAsCompleted,
    toggleCompletion,
    isCompleted
  };
}
