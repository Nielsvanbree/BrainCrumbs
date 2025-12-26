// API Response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// Common types
export type Category = 'curiosity' | 'crypto' | 'tech';

// Course API types
export type LessonType = 'video' | 'text' | 'quiz';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  duration: string;
  content?: string;
  videoUrl?: string;
  imageUrl?: string;
  questions?: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  totalDuration: string;
  modules: Module[];
}

// Post API types (Crumbs)
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: Category;
  date: string;
  readTime: string;
  isDeepCrumb?: boolean;
  content?: string; // Full content for individual post pages
  author?: string;
  tags?: string[];
}

// Review API types
export interface ReviewItem {
  id: string;
  title: string;
  author: string;
  type: 'book' | 'podcast' | 'course' | 'article';
  rating: number;
  category: Category;
  tags: string[];
  review?: string; // Full review text
  reviewDate?: string;
  url?: string; // Link to the reviewed item
}

// User progress types
export interface UserProgress {
  courseId: string;
  completedLessons: string[];
  lastAccessedLesson?: string;
  progressPercentage: number;
  updatedAt: string;
}

// Request types
export interface UpdateProgressRequest {
  courseId: string;
  lessonId: string;
  completed: boolean;
}

// Newsletter subscription types
export interface NewsletterSubscription {
  email: string;
  category?: 'crypto' | 'tech' | 'both';
  subscribedAt?: string;
}

// Authentication types (for future use)
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme?: 'light' | 'dark';
  emailNotifications?: boolean;
  categories?: Category[];
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}
