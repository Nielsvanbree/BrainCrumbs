import { Course } from './types';
import { apiClient } from './client';

/**
 * Course API Service
 * This service will interface with your backend API
 * Currently uses mock data, but structured to easily swap to real API calls
 */

export const coursesApi = {
  /**
   * Fetch all courses
   * @returns Promise<Course[]>
   */
  async getAllCourses(): Promise<Course[]> {
    // TODO: Replace with actual API call
    // return apiClient.get<Course[]>('/courses');
    
    const { courses } = await import('../course-data');
    return Promise.resolve(courses);
  },

  /**
   * Fetch a single course by slug
   * @param slug - Course slug identifier
   * @returns Promise<Course | null>
   */
  async getCourseBySlug(slug: string): Promise<Course | null> {
    // TODO: Replace with actual API call
    // return apiClient.get<Course>(`/courses/${slug}`);
    
    const { getCourse } = await import('../course-data');
    const course = getCourse(slug);
    return Promise.resolve(course || null);
  },

  /**
   * Fetch a single course by ID
   * @param id - Course ID
   * @returns Promise<Course | null>
   */
  async getCourseById(id: string): Promise<Course | null> {
    // TODO: Replace with actual API call
    // return apiClient.get<Course>(`/courses/id/${id}`);
    
    const { courses } = await import('../course-data');
    const course = courses.find(c => c.id === id);
    return Promise.resolve(course || null);
  },

  /**
   * Search courses by query
   * @param query - Search query string
   * @returns Promise<Course[]>
   */
  async searchCourses(query: string): Promise<Course[]> {
    // TODO: Replace with actual API call
    // return apiClient.get<Course[]>(`/courses/search?q=${query}`);
    
    const { courses } = await import('../course-data');
    const lowerQuery = query.toLowerCase();
    const filtered = courses.filter(c => 
      c.title.toLowerCase().includes(lowerQuery) ||
      c.description.toLowerCase().includes(lowerQuery) ||
      c.longDescription.toLowerCase().includes(lowerQuery)
    );
    return Promise.resolve(filtered);
  },

  /**
   * Filter courses by level
   * @param level - Course difficulty level
   * @returns Promise<Course[]>
   */
  async getCoursesByLevel(level: 'Beginner' | 'Intermediate' | 'Advanced'): Promise<Course[]> {
    // TODO: Replace with actual API call
    // return apiClient.get<Course[]>(`/courses?level=${level}`);
    
    const { courses } = await import('../course-data');
    const filtered = courses.filter(c => c.level === level);
    return Promise.resolve(filtered);
  }
};
