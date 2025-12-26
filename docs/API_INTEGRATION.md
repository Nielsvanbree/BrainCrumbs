# API Integration Guide

This guide explains how to connect Brain Crumbs to a real backend API.

## 📋 Table of Contents

- [Overview](#overview)
- [Current Architecture](#current-architecture)
- [Setup Steps](#setup-steps)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Testing](#testing)

---

## Overview

Brain Crumbs is built with a **clean separation between data fetching and UI components**. This makes it trivial to switch from mock data to a real API.

### Key Benefits

✅ **Zero component changes needed** - All components already use the abstracted API layer  
✅ **Type-safe** - Full TypeScript support throughout  
✅ **Centralized configuration** - Single file to update API endpoints  
✅ **Built-in error handling** - Standardized error responses  
✅ **Loading states** - All hooks include loading and error states  
✅ **Feature flags** - Toggle between mock/real API instantly  

---

## Current Architecture

```
app/
├── courses/              # Pages that consume data
│   └── [courseSlug]/
├── post/[slug]/          # Blog post pages
├── reviews/              # Reviews page
components/
├── courses/              # UI components (API-agnostic)
hooks/
├── useCourses.ts         # Course data fetching hooks
├── usePosts.ts           # Post/crumb data fetching hooks
├── useReviews.ts         # Review data fetching hooks
├── useCourseProgress.ts  # Progress tracking
lib/
├── api/
│   ├── client.ts         # HTTP client (fetch wrapper)
│   ├── courses.ts        # Course API service
│   ├── posts.ts          # Posts API service
│   ├── reviews.ts        # Reviews API service
│   └── types.ts          # API type definitions
├── config.ts             # App configuration
├── course-data.ts        # Mock course data (temporary)
└── data.ts               # Mock posts/reviews data (temporary)
```

### Data Flow

```
┌─────────────┐
│   Page      │ (app/courses/[courseSlug]/page.tsx)
└──────┬──────┘
       │ uses
       ▼
┌─────────────┐
│   Hook      │ (hooks/useCourse.ts)
└──────┬──────┘
       │ calls
       ▼
┌─────────────┐
│ API Service │ (lib/api/courses.ts)
└──────┬──────┘
       │ uses
       ▼
┌─────────────┐
│ API Client  │ (lib/api/client.ts)
└──────┬──────┘
       │
       ▼
   Real API or Mock Data
```

---

## Setup Steps

### 1. Configure Environment Variables

```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local
NEXT_PUBLIC_API_URL=https://api.yourapp.com
NEXT_PUBLIC_USE_MOCK_DATA=false
```

### 2. Update API Configuration

Edit `lib/config.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.yourapp.com',
  TIMEOUT: 30000,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
};

export const FEATURES = {
  USE_MOCK_DATA: process.env.NEXT_PUBLIC_USE_MOCK_DATA !== 'false',
  // ...
};
```

### 3. Implement Real API Calls

Update `lib/api/courses.ts`, `lib/api/posts.ts`, `lib/api/reviews.ts` - Remove mock implementation:

**Example for courses:**

```typescript
import { apiClient } from './client';
import { Course } from './types';

export const coursesApi = {
  async getAllCourses(): Promise<Course[]> {
    // Replace mock with real API call
    return apiClient.get<Course[]>('/courses');
  },

  async getCourseBySlug(slug: string): Promise<Course | null> {
    try {
      return await apiClient.get<Course>(`/courses/${slug}`);
    } catch (error) {
      return null;
    }
  },

  // ... other methods
};
```

**Example for posts:**

```typescript
export const postsApi = {
  async getAllPosts(): Promise<Post[]> {
    return apiClient.get<Post[]>('/posts');
  },

  async getDeepCrumbs(): Promise<Post[]> {
    return apiClient.get<Post[]>('/posts?type=deep');
  },
  // ...
};
```

**Example for reviews:**

```typescript
export const reviewsApi = {
  async getAllReviews(): Promise<ReviewItem[]> {
    return apiClient.get<ReviewItem[]>('/reviews');
  },
  // ...
};
```

### 4. That's It!

No other code changes needed. The components already consume data through the hooks.

---

## API Endpoints

Your backend should implement these endpoints:

### Courses

| Method | Endpoint | Description | Request | Response |
|--------|----------|-------------|---------|----------|
| GET | `/courses` | Get all courses | - | `Course[]` |
| GET | `/courses/:slug` | Get course by slug | - | `Course` |
| GET | `/courses/id/:id` | Get course by ID | - | `Course` |
| GET | `/courses/search` | Search courses | `?q=query` | `Course[]` |
| GET | `/courses?level=:level` | Filter by level | - | `Course[]` |

### Posts (Crumbs & Deep Crumbs)

| Method | Endpoint | Description | Request | Response |
|--------|----------|-------------|---------|----------|
| GET | `/posts` | Get all posts | - | `Post[]` |
| GET | `/posts/:slug` | Get post by slug | - | `Post` |
| GET | `/posts?category=:category` | Filter by category | - | `Post[]` |
| GET | `/posts?type=deep` | Get only deep crumbs | - | `Post[]` |
| GET | `/posts?type=quick` | Get only quick crumbs | - | `Post[]` |
| GET | `/posts/latest-deep` | Get latest deep crumb | - | `Post` |
| GET | `/posts/search` | Search posts | `?q=query` | `Post[]` |
| GET | `/posts?page=:page&pageSize=:size` | Paginated posts | - | `PaginatedResponse<Post>` |

### Reviews

| Method | Endpoint | Description | Request | Response |
|--------|----------|-------------|---------|----------|
| GET | `/reviews` | Get all reviews | - | `ReviewItem[]` |
| GET | `/reviews/:id` | Get review by ID | - | `ReviewItem` |
| GET | `/reviews?type=:type` | Filter by type | - | `ReviewItem[]` |
| GET | `/reviews?category=:category` | Filter by category | - | `ReviewItem[]` |
| GET | `/reviews?tag=:tag` | Filter by tag | - | `ReviewItem[]` |
| GET | `/reviews?minRating=:rating` | Filter by rating | - | `ReviewItem[]` |
| GET | `/reviews/search` | Search reviews | `?q=query` | `ReviewItem[]` |
| POST | `/reviews` | Create review | `ReviewItem` | `ReviewItem` |
| PATCH | `/reviews/:id` | Update review | `Partial<ReviewItem>` | `ReviewItem` |
| DELETE | `/reviews/:id` | Delete review | - | `void` |

### User Progress (Optional)

| Method | Endpoint | Description | Request | Response |
|--------|----------|-------------|---------|----------|
| GET | `/progress/:courseId` | Get user progress | - | `UserProgress` |
| POST | `/progress/:courseId/lessons/:lessonId` | Mark lesson complete | `{ completed: boolean }` | `UserProgress` |
| PUT | `/progress/:courseId` | Update progress | `{ completedLessons: string[] }` | `UserProgress` |

### Newsletter (Optional)

| Method | Endpoint | Description | Request | Response |
|--------|----------|-------------|---------|----------|
| POST | `/newsletter/subscribe` | Subscribe to newsletter | `{ email: string, category?: string }` | `{ success: boolean }` |
| POST | `/newsletter/unsubscribe` | Unsubscribe | `{ email: string }` | `{ success: boolean }` |

---

## API Response Types

Your API should return data matching these TypeScript types:

### Course Response

```typescript
interface Course {
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

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz';
  duration: string;
  content?: string;
  videoUrl?: string;
  imageUrl?: string;
  questions?: QuizQuestion[];
}
```

### Post Response

```typescript
interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: 'curiosity' | 'crypto' | 'tech';
  date: string;
  readTime: string;
  isDeepCrumb?: boolean;
  content?: string; // Full content for detail page
  author?: string;
  tags?: string[];
}
```

### Review Response

```typescript
interface ReviewItem {
  id: string;
  title: string;
  author: string;
  type: 'book' | 'podcast' | 'course' | 'article';
  rating: number; // 0-5
  category: 'curiosity' | 'crypto' | 'tech';
  tags: string[];
  review?: string; // Full review text
  reviewDate?: string;
  url?: string;
}
```

### Paginated Response

```typescript
interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
```

See `lib/api/types.ts` for complete type definitions.

---

## Authentication

### Adding Auth Headers

The API client supports authentication out of the box:

```typescript
import { apiClient } from '@/lib/api/client';

// Set token (after user login)
apiClient.setAuthToken('your-jwt-token');

// Clear token (on logout)
apiClient.clearAuthToken();
```

### Implementing Auth Flow

1. Create `lib/api/auth.ts`:

```typescript
import { apiClient } from './client';
import { AuthResponse, LoginRequest, RegisterRequest } from './types';

export const authApi = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    apiClient.setAuthToken(response.token);
    // Store token in localStorage or cookie
    localStorage.setItem('authToken', response.token);
    return response;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    apiClient.setAuthToken(response.token);
    localStorage.setItem('authToken', response.token);
    return response;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
    apiClient.clearAuthToken();
    localStorage.removeItem('authToken');
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/auth/me');
  },
};
```

2. Create `hooks/useAuth.ts` for authentication state

3. Wrap app with auth context in `app/layout.tsx`

---

## Error Handling

### Standard Error Format

All API errors are standardized:

```typescript
try {
  const course = await coursesApi.getCourseBySlug('invalid-slug');
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message); // "HTTP 404: Not Found"
  }
}
```

### Custom Error Handling

Add to `lib/api/client.ts`:

```typescript
private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Handle specific error codes
      if (response.status === 401) {
        // Redirect to login
        window.location.href = '/login';
      } else if (response.status === 403) {
        throw new Error('Access denied');
      } else if (response.status === 404) {
        throw new Error('Resource not found');
      }
      
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError) {
      throw new Error('Network error. Please check your connection.');
    }
    throw error;
  }
}
```

### Using Error States in Components

```typescript
const { courses, isLoading, error } = useCourses();

if (error) {
  return (
    <div className="text-red-500">
      Error: {error}
    </div>
  );
}
```

---

## Testing

### Testing with Mock Data

```bash
# Use mock data
NEXT_PUBLIC_USE_MOCK_DATA=true npm run dev
```

### Testing with Real API

```bash
# Use real API
NEXT_PUBLIC_API_URL=http://localhost:3001/api \
NEXT_PUBLIC_USE_MOCK_DATA=false \
npm run dev
```

### Example Backend Server

Create a simple Express.js API for testing:

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Courses
app.get('/api/courses', (req, res) => {
  res.json([
    {
      id: 'c1',
      slug: 'crypto-foundations',
      title: 'Crypto Foundations',
      // ... rest of course data
    }
  ]);
});

app.get('/api/courses/:slug', (req, res) => {
  // Fetch from database
  const course = /* get from DB */;
  res.json(course);
});

// Posts
app.get('/api/posts', (req, res) => {
  const { type, category, page = 1, pageSize = 10 } = req.query;
  // Filter and paginate posts
  res.json(posts);
});

app.get('/api/posts/:slug', (req, res) => {
  const post = /* get from DB */;
  res.json(post);
});

// Reviews
app.get('/api/reviews', (req, res) => {
  const { type, category, tag, minRating } = req.query;
  // Filter reviews
  res.json(reviews);
});

app.listen(3001, () => {
  console.log('API running on http://localhost:3001');
});
```

---

## Advanced Features

### Caching with SWR (Recommended)

For production, consider using [SWR](https://swr.vercel.app/) or [React Query](https://tanstack.com/query):

```bash
npm install swr
```

Update `hooks/useCourses.ts`:

```typescript
import useSWR from 'swr';
import { coursesApi } from '@/lib/api/courses';

export function useCourses() {
  const { data, error, isLoading } = useSWR(
    '/courses',
    coursesApi.getAllCourses,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
    }
  );

  return {
    courses: data || [],
    isLoading,
    error: error?.message,
  };
}
```

### Optimistic Updates

```typescript
import { mutate } from 'swr';

async function markLessonComplete(courseId: string, lessonId: string) {
  // Optimistically update UI
  mutate(`/progress/${courseId}`, (data) => ({
    ...data,
    completedLessons: [...data.completedLessons, lessonId],
  }), false);

  // Make API call
  await api.post(`/progress/${courseId}/lessons/${lessonId}`, { completed: true });

  // Revalidate
  mutate(`/progress/${courseId}`);
}
```

### Request Retry Logic

Add to `lib/api/client.ts`:

```typescript
private async requestWithRetry<T>(
  endpoint: string,
  options: RequestInit = {},
  retries: number = API_CONFIG.MAX_RETRIES
): Promise<T> {
  try {
    return await this.request<T>(endpoint, options);
  } catch (error) {
    if (retries > 0 && this.shouldRetry(error)) {
      await this.delay(API_CONFIG.RETRY_DELAY);
      return this.requestWithRetry<T>(endpoint, options, retries - 1);
    }
    throw error;
  }
}

private shouldRetry(error: unknown): boolean {
  // Retry on network errors or 5xx status codes
  return error instanceof TypeError || 
         (error instanceof Error && error.message.includes('HTTP 5'));
}

private delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

---

## Checklist

Before going to production:

- [ ] Set up backend API with required endpoints
- [ ] Update `.env.local` with production API URL
- [ ] Test all API endpoints (courses, posts, reviews)
- [ ] Implement error handling for network failures
- [ ] Add authentication if needed
- [ ] Set up API rate limiting on backend
- [ ] Configure CORS on backend
- [ ] Add loading states to all data fetching
- [ ] Test with slow/failed network conditions
- [ ] Implement data caching strategy (SWR/React Query)
- [ ] Add API response validation
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Test pagination for posts/reviews
- [ ] Implement search functionality
- [ ] Add request/response logging (development only)

---

## Support

If you need help with API integration:

1. Check the types in `lib/api/types.ts` - they define the API contract
2. Review the API client in `lib/api/client.ts` - it handles all HTTP logic
3. Look at API services:
   - `lib/api/courses.ts` - Course endpoints
   - `lib/api/posts.ts` - Post/crumb endpoints
   - `lib/api/reviews.ts` - Review endpoints
4. Examine hooks in `hooks/` - they show how components consume data

The architecture is designed to make the transition from mock → real API seamless.
