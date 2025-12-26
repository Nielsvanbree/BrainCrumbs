# API Architecture Summary

## Overview

Brain Crumbs has been fully refactored with a **production-ready API architecture** that separates data fetching from UI components. You can seamlessly switch from mock data to a real backend API with minimal configuration.

---

## 📊 Architecture at a Glance

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (Next.js)                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐      ┌──────────┐      ┌──────────┐         │
│  │  Pages   │─────▶│  Hooks   │─────▶│   API    │         │
│  │ (app/*/) │      │(hooks/*) │      │ Services │         │
│  └──────────┘      └──────────┘      │(lib/api/)│         │
│                                       └─────┬────┘         │
│                                             │              │
│                                       ┌─────▼────┐         │
│                                       │   API    │         │
│                                       │  Client  │         │
│                                       └─────┬────┘         │
└───────────────────────────────────────────┼────────────────┘
                                            │
                                            ▼
                        ┌───────────────────────────────┐
                        │   Backend API (Your Server)   │
                        │  OR Mock Data (lib/data.ts)   │
                        └───────────────────────────────┘
```

---

## 🗂️ File Structure

### Core API Files

```
lib/
├── api/
│   ├── types.ts          # TypeScript interfaces for all API data
│   ├── client.ts         # HTTP client with auth, error handling
│   ├── courses.ts        # Course-related API calls
│   ├── posts.ts          # Posts/crumbs API calls
│   └── reviews.ts        # Reviews API calls
├── config.ts             # Environment & feature flags
├── course-data.ts        # Mock course data (temporary)
└── data.ts               # Mock posts/reviews data (temporary)
```

### Custom Hooks (Data Layer)

```
hooks/
├── useCourses.ts         # Course data fetching
│   ├── useCourses()      # Get all courses
│   ├── useCourse(slug)   # Get single course
│   └── useSearchCourses(query)
├── usePosts.ts           # Posts/crumbs data fetching
│   ├── usePosts()        # Get all posts
│   ├── usePost(slug)     # Get single post
│   ├── useDeepCrumbs()   # Get long-form posts
│   ├── useQuickCrumbs()  # Get short-form posts
│   ├── useLatestDeepCrumb()
│   └── useSearchPosts(query)
├── useReviews.ts         # Reviews data fetching
│   ├── useReviews()      # Get all reviews
│   ├── useReview(id)     # Get single review
│   ├── useReviewsByType(type)
│   ├── useReviewsByCategory(category)
│   └── useSearchReviews(query)
└── useCourseProgress.ts  # Course progress tracking
```

### Environment Configuration

```
.env.local.example        # Template for environment variables
.env.local               # Your local configuration (create this)
```

### Documentation

```
docs/
├── API_INTEGRATION.md   # Step-by-step integration guide
└── API_SUMMARY.md       # This file - architecture overview
```

---

## 🎯 Key Features

### ✅ Complete Type Safety

- All API responses are strongly typed with TypeScript
- Catch errors at compile time, not runtime
- IDE autocomplete for all API data

### ✅ Centralized HTTP Client

**Location:** `lib/api/client.ts`

**Features:**
- Authentication token management
- Automatic error handling
- Request/response interceptors ready
- Support for all HTTP methods (GET, POST, PUT, PATCH, DELETE)

**Usage Example:**
```typescript
import { apiClient } from '@/lib/api/client';

// Set auth token
apiClient.setAuthToken('your-jwt-token');

// Make authenticated requests
const data = await apiClient.get('/protected-endpoint');

// Clear token on logout
apiClient.clearAuthToken();
```

### ✅ Service Layer Pattern

**Locations:** `lib/api/courses.ts`, `lib/api/posts.ts`, `lib/api/reviews.ts`

Each service encapsulates all API calls for a specific domain:

```typescript
// lib/api/courses.ts
export const coursesApi = {
  getAllCourses(): Promise<Course[]>,
  getCourseBySlug(slug: string): Promise<Course | null>,
  getCourseById(id: string): Promise<Course | null>,
  searchCourses(query: string): Promise<Course[]>,
  getCoursesByLevel(level: string): Promise<Course[]>,
};

// lib/api/posts.ts
export const postsApi = {
  getAllPosts(): Promise<Post[]>,
  getPostBySlug(slug: string): Promise<Post | null>,
  getPostsByCategory(category: string): Promise<Post[]>,
  getDeepCrumbs(): Promise<Post[]>,
  getQuickCrumbs(): Promise<Post[]>,
  getLatestDeepCrumb(): Promise<Post | null>,
  searchPosts(query: string): Promise<Post[]>,
  getPaginatedPosts(page: number, pageSize: number),
};

// lib/api/reviews.ts
export const reviewsApi = {
  getAllReviews(): Promise<ReviewItem[]>,
  getReviewById(id: string): Promise<ReviewItem | null>,
  getReviewsByType(type: string): Promise<ReviewItem[]>,
  getReviewsByCategory(category: string): Promise<ReviewItem[]>,
  getReviewsByTag(tag: string): Promise<ReviewItem[]>,
  getReviewsByRating(minRating: number): Promise<ReviewItem[]>,
  searchReviews(query: string): Promise<ReviewItem[]>,
  createReview(review: Omit<ReviewItem, 'id'>): Promise<ReviewItem>,
  updateReview(id: string, updates: Partial<ReviewItem>): Promise<ReviewItem>,
  deleteReview(id: string): Promise<void>,
};
```

### ✅ Custom React Hooks

**Locations:** `hooks/useCourses.ts`, `hooks/usePosts.ts`, `hooks/useReviews.ts`

All hooks provide:
- **Loading states**: `isLoading`, `isSearching`
- **Error handling**: `error` (string | null)
- **Data**: Typed response data
- **Automatic cleanup**: Prevents memory leaks

**Hook Example:**
```typescript
import { useCourse } from '@/hooks/useCourses';

function CoursePage({ slug }: { slug: string }) {
  const { course, isLoading, error } = useCourse(slug);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!course) return <NotFound />;

  return <CourseDetails course={course} />;
}
```

### ✅ Feature Flags

**Location:** `lib/config.ts`

```typescript
export const FEATURES = {
  // Toggle between mock data and real API
  USE_MOCK_DATA: process.env.NEXT_PUBLIC_USE_MOCK_DATA !== 'false',
  
  // Enable/disable features
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  ENABLE_USER_AUTH: process.env.NEXT_PUBLIC_ENABLE_AUTH === 'true',
  ENABLE_COURSE_PROGRESS: true,
};
```

### ✅ Configuration Management

**Location:** `lib/config.ts`

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  TIMEOUT: 30000,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
  CACHE_TTL: 5 * 60 * 1000,
};
```

---

## 📝 Data Types

### Course Types

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

### Post Types

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
  content?: string;
  author?: string;
  tags?: string[];
}
```

### Review Types

```typescript
interface ReviewItem {
  id: string;
  title: string;
  author: string;
  type: 'book' | 'podcast' | 'course' | 'article';
  rating: number;
  category: 'curiosity' | 'crypto' | 'tech';
  tags: string[];
  review?: string;
  reviewDate?: string;
  url?: string;
}
```

### API Response Types

```typescript
interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}

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

---

## 🚀 Quick Start Guide

### Using Mock Data (Current State)

```bash
# Already working - no setup needed!
npm run dev
```

All data is served from:
- `lib/course-data.ts` - Courses
- `lib/data.ts` - Posts and reviews

### Connecting to Real API (3 Steps)

#### Step 1: Configure Environment

```bash
# Copy example file
cp .env.local.example .env.local

# Edit .env.local
NEXT_PUBLIC_API_URL=https://api.yourapp.com
NEXT_PUBLIC_USE_MOCK_DATA=false
```

#### Step 2: Update API Services

Replace mock implementations in:
- `lib/api/courses.ts`
- `lib/api/posts.ts`
- `lib/api/reviews.ts`

**Example:**

```typescript
// Before (Mock)
export const coursesApi = {
  async getAllCourses(): Promise<Course[]> {
    const { courses } = await import('../course-data');
    return Promise.resolve(courses);
  },
};

// After (Real API)
export const coursesApi = {
  async getAllCourses(): Promise<Course[]> {
    return apiClient.get<Course[]>('/courses');
  },
};
```

#### Step 3: Test & Deploy

```bash
# Test with real API
NEXT_PUBLIC_API_URL=http://localhost:3001/api \
NEXT_PUBLIC_USE_MOCK_DATA=false \
npm run dev
```

---

## 🔌 Backend API Requirements

Your backend should implement these endpoints:

### Courses Endpoints

| Endpoint | Method | Description | Response |
|----------|--------|-------------|----------|
| `/courses` | GET | List all courses | `Course[]` |
| `/courses/:slug` | GET | Get course by slug | `Course` |
| `/courses/id/:id` | GET | Get course by ID | `Course` |
| `/courses/search?q=:query` | GET | Search courses | `Course[]` |
| `/courses?level=:level` | GET | Filter by level | `Course[]` |

### Posts Endpoints

| Endpoint | Method | Description | Response |
|----------|--------|-------------|----------|
| `/posts` | GET | List all posts | `Post[]` |
| `/posts/:slug` | GET | Get post by slug | `Post` |
| `/posts?category=:cat` | GET | Filter by category | `Post[]` |
| `/posts?type=deep` | GET | Get deep crumbs | `Post[]` |
| `/posts?type=quick` | GET | Get quick crumbs | `Post[]` |
| `/posts/latest-deep` | GET | Latest deep crumb | `Post` |
| `/posts/search?q=:query` | GET | Search posts | `Post[]` |
| `/posts?page=:p&pageSize=:s` | GET | Paginated posts | `PaginatedResponse<Post>` |

### Reviews Endpoints

| Endpoint | Method | Description | Response |
|----------|--------|-------------|----------|
| `/reviews` | GET | List all reviews | `ReviewItem[]` |
| `/reviews/:id` | GET | Get review by ID | `ReviewItem` |
| `/reviews?type=:type` | GET | Filter by type | `ReviewItem[]` |
| `/reviews?category=:cat` | GET | Filter by category | `ReviewItem[]` |
| `/reviews?tag=:tag` | GET | Filter by tag | `ReviewItem[]` |
| `/reviews?minRating=:rating` | GET | Filter by rating | `ReviewItem[]` |
| `/reviews/search?q=:query` | GET | Search reviews | `ReviewItem[]` |
| `/reviews` | POST | Create review | `ReviewItem` |
| `/reviews/:id` | PATCH | Update review | `ReviewItem` |
| `/reviews/:id` | DELETE | Delete review | `void` |

### Optional Endpoints

| Endpoint | Method | Description | Response |
|----------|--------|-------------|----------|
| `/progress/:courseId` | GET | Get user progress | `UserProgress` |
| `/progress/:courseId/lessons/:lessonId` | POST | Mark lesson complete | `UserProgress` |
| `/newsletter/subscribe` | POST | Subscribe to newsletter | `{ success: boolean }` |
| `/auth/login` | POST | User login | `AuthResponse` |
| `/auth/register` | POST | User registration | `AuthResponse` |
| `/auth/logout` | POST | User logout | `void` |
| `/auth/me` | GET | Current user | `User` |

---

## 🎨 Usage Examples

### Example 1: Fetching Courses

```typescript
// In a page component
import { useCourses } from '@/hooks/useCourses';

export default function CoursesPage() {
  const { courses, isLoading, error } = useCourses();

  if (isLoading) return <div>Loading courses...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
```

### Example 2: Fetching a Single Post

```typescript
import { usePost } from '@/hooks/usePosts';

export default function PostPage({ params }: { params: { slug: string } }) {
  const { post, isLoading, error } = usePost(params.slug);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;
  if (!post) return <NotFoundPage />;

  return <PostContent post={post} />;
}
```

### Example 3: Searching Posts

```typescript
import { useState } from 'react';
import { useSearchPosts } from '@/hooks/usePosts';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const { results, isSearching, error } = useSearchPosts(query);

  return (
    <div>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
      />
      {isSearching && <Spinner />}
      {results.map(post => (
        <SearchResult key={post.id} post={post} />
      ))}
    </div>
  );
}
```

### Example 4: Filtering Reviews by Type

```typescript
import { useReviewsByType } from '@/hooks/useReviews';

export default function BookReviews() {
  const { reviews, isLoading, error } = useReviewsByType('book');

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <div>
      <h2>Book Reviews</h2>
      {reviews.map(review => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
```

### Example 5: Direct API Service Call

```typescript
// Sometimes you need to call API outside of components
import { coursesApi } from '@/lib/api/courses';

export async function getStaticProps() {
  const courses = await coursesApi.getAllCourses();
  
  return {
    props: { courses },
    revalidate: 60, // Revalidate every 60 seconds
  };
}
```

---

## 🔧 Advanced Configuration

### Adding Authentication

Create `lib/api/auth.ts`:

```typescript
import { apiClient } from './client';
import { AuthResponse, LoginRequest } from './types';

export const authApi = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    apiClient.setAuthToken(response.token);
    return response;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
    apiClient.clearAuthToken();
  },
};
```

### Adding Request Caching (SWR)

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
      dedupingInterval: 60000, // Cache for 1 minute
    }
  );

  return {
    courses: data || [],
    isLoading,
    error: error?.message,
  };
}
```

### Adding Request Interceptors

Modify `lib/api/client.ts`:

```typescript
private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // Log request in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[API] ${options.method || 'GET'} ${endpoint}`);
  }

  const response = await fetch(url, config);

  // Log response in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[API] Response: ${response.status}`);
  }

  // ... rest of logic
}
```

---

## ✅ Benefits of This Architecture

### 1. **Zero Component Changes**
Components never directly call APIs. They use hooks. When you switch from mock → real API, components don't need updates.

### 2. **Type Safety**
TypeScript catches API contract mismatches at compile time.

### 3. **Easy Testing**
Mock the hooks or API services in tests, not individual API calls.

### 4. **Centralized Error Handling**
All API errors flow through `lib/api/client.ts`. Add logging, monitoring, or retry logic in one place.

### 5. **Feature Flags**
Test new features without deploying backend changes.

### 6. **Flexible Caching**
Easy to add SWR, React Query, or custom caching strategies.

### 7. **Scalable**
Add new endpoints by creating new methods in service files. No need to touch components.

### 8. **Developer Experience**
Clear separation of concerns. New developers know exactly where to add API calls.

---

## 📚 Additional Resources

- **[API Integration Guide](./API_INTEGRATION.md)** - Step-by-step setup instructions
- **Type Definitions** - See `lib/api/types.ts` for all API interfaces
- **Service Layer** - Check `lib/api/*.ts` for available API methods
- **Hooks** - Review `hooks/*.ts` for data fetching patterns
- **Configuration** - See `lib/config.ts` for environment setup

---

## 🎯 Next Steps

1. ✅ **Read API Integration Guide** - See `docs/API_INTEGRATION.md`
2. ⚙️ **Set up environment variables** - Copy `.env.local.example`
3. 🔌 **Build backend API** - Implement required endpoints
4. 🔄 **Update API services** - Replace mock calls with real API calls
5. 🧪 **Test thoroughly** - Verify all functionality works
6. 🚀 **Deploy** - Ship to production!

---

## 🤝 Support

If you have questions about the API architecture:

1. Check type definitions in `lib/api/types.ts`
2. Review service implementations in `lib/api/*.ts`
3. See hook examples in `hooks/*.ts`
4. Read the integration guide in `docs/API_INTEGRATION.md`

The architecture is designed to be intuitive and self-documenting. Happy coding! 🎉
