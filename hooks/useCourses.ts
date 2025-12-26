import { useState, useEffect } from 'react';
import { Course } from '@/lib/api/types';
import { coursesApi } from '@/lib/api/courses';

/**
 * Custom hook for fetching and managing courses
 * Provides loading states, error handling, and data caching
 */

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchCourses() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await coursesApi.getAllCourses();
        
        if (isMounted) {
          setCourses(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load courses');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  return { courses, isLoading, error };
}

/**
 * Custom hook for fetching a single course by slug
 */
export function useCourse(slug: string) {
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchCourse() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await coursesApi.getCourseBySlug(slug);
        
        if (isMounted) {
          setCourse(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load course');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (slug) {
      fetchCourse();
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { course, isLoading, error };
}

/**
 * Custom hook for searching courses
 */
export function useSearchCourses(query: string) {
  const [results, setResults] = useState<Course[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function search() {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        setIsSearching(true);
        setError(null);
        const data = await coursesApi.searchCourses(query);
        
        if (isMounted) {
          setResults(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Search failed');
        }
      } finally {
        if (isMounted) {
          setIsSearching(false);
        }
      }
    }

    // Debounce search
    const timeoutId = setTimeout(search, 300);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [query]);

  return { results, isSearching, error };
}
