import { useState, useEffect } from 'react';
import { ReviewItem } from '@/lib/api/types';
import { reviewsApi } from '@/lib/api/reviews';

/**
 * Custom hook for fetching and managing reviews
 * Provides loading states, error handling, and data caching
 */

export function useReviews() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchReviews() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await reviewsApi.getAllReviews();
        
        if (isMounted) {
          setReviews(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load reviews');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  return { reviews, isLoading, error };
}

/**
 * Custom hook for fetching a single review by ID
 */
export function useReview(id: string) {
  const [review, setReview] = useState<ReviewItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchReview() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await reviewsApi.getReviewById(id);
        
        if (isMounted) {
          setReview(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load review');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (id) {
      fetchReview();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { review, isLoading, error };
}

/**
 * Custom hook for fetching reviews by type
 */
export function useReviewsByType(type: 'book' | 'podcast' | 'course' | 'article') {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchReviews() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await reviewsApi.getReviewsByType(type);
        
        if (isMounted) {
          setReviews(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load reviews');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (type) {
      fetchReviews();
    }

    return () => {
      isMounted = false;
    };
  }, [type]);

  return { reviews, isLoading, error };
}

/**
 * Custom hook for fetching reviews by category
 */
export function useReviewsByCategory(category: string) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchReviews() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await reviewsApi.getReviewsByCategory(category);
        
        if (isMounted) {
          setReviews(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load reviews');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (category) {
      fetchReviews();
    }

    return () => {
      isMounted = false;
    };
  }, [category]);

  return { reviews, isLoading, error };
}

/**
 * Custom hook for fetching reviews by tag
 */
export function useReviewsByTag(tag: string) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchReviews() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await reviewsApi.getReviewsByTag(tag);
        
        if (isMounted) {
          setReviews(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load reviews');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (tag) {
      fetchReviews();
    }

    return () => {
      isMounted = false;
    };
  }, [tag]);

  return { reviews, isLoading, error };
}

/**
 * Custom hook for fetching reviews with minimum rating
 */
export function useReviewsByRating(minRating: number) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchReviews() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await reviewsApi.getReviewsByRating(minRating);
        
        if (isMounted) {
          setReviews(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load reviews');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, [minRating]);

  return { reviews, isLoading, error };
}

/**
 * Custom hook for searching reviews
 */
export function useSearchReviews(query: string) {
  const [results, setResults] = useState<ReviewItem[]>([]);
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
        const data = await reviewsApi.searchReviews(query);
        
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
