/**
 * Application Configuration
 * Centralized configuration for API endpoints, feature flags, and environment variables
 */

// Environment detection
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

// API Configuration
export const API_CONFIG = {
  // Base URL - Update this when you have a backend API
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  
  // API Timeouts
  TIMEOUT: 30000, // 30 seconds
  
  // Retry configuration
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
  
  // Cache configuration
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes in milliseconds
};

// Feature Flags
export const FEATURES = {
  // Toggle API mode vs mock data
  USE_MOCK_DATA: process.env.NEXT_PUBLIC_USE_MOCK_DATA !== 'false', // Default to true
  
  // Feature toggles
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  ENABLE_USER_AUTH: process.env.NEXT_PUBLIC_ENABLE_AUTH === 'true',
  ENABLE_COURSE_PROGRESS: true, // Local storage based, always available
};

// Storage Keys
export const STORAGE_KEYS = {
  COURSE_PROGRESS: 'bc_course_progress',
  USER_PREFERENCES: 'bc_user_preferences',
  AUTH_TOKEN: 'bc_auth_token',
};

// Application Metadata
export const APP_CONFIG = {
  NAME: 'Brain Crumbs',
  DESCRIPTION: 'Learn the fundamentals of emerging technologies',
  VERSION: '1.0.0',
};
