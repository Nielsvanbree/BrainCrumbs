import { useState, useEffect } from 'react';
import { Post } from '@/lib/api/types';
import { postsApi } from '@/lib/api/posts';

/**
 * Custom hook for fetching and managing posts
 * Provides loading states, error handling, and data caching
 */

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPosts() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await postsApi.getAllPosts();
        
        if (isMounted) {
          setPosts(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load posts');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  return { posts, isLoading, error };
}

/**
 * Custom hook for fetching a single post by slug
 */
export function usePost(slug: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPost() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await postsApi.getPostBySlug(slug);
        
        if (isMounted) {
          setPost(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load post');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (slug) {
      fetchPost();
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { post, isLoading, error };
}

/**
 * Custom hook for fetching posts by category
 */
export function usePostsByCategory(category: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPosts() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await postsApi.getPostsByCategory(category);
        
        if (isMounted) {
          setPosts(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load posts');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (category) {
      fetchPosts();
    }

    return () => {
      isMounted = false;
    };
  }, [category]);

  return { posts, isLoading, error };
}

/**
 * Custom hook for fetching deep crumbs (long-form posts)
 */
export function useDeepCrumbs() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchDeepCrumbs() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await postsApi.getDeepCrumbs();
        
        if (isMounted) {
          setPosts(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load deep crumbs');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchDeepCrumbs();

    return () => {
      isMounted = false;
    };
  }, []);

  return { posts, isLoading, error };
}

/**
 * Custom hook for fetching quick crumbs (short-form posts)
 */
export function useQuickCrumbs() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchQuickCrumbs() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await postsApi.getQuickCrumbs();
        
        if (isMounted) {
          setPosts(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load quick crumbs');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchQuickCrumbs();

    return () => {
      isMounted = false;
    };
  }, []);

  return { posts, isLoading, error };
}

/**
 * Custom hook for fetching the latest deep crumb
 */
export function useLatestDeepCrumb() {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchLatest() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await postsApi.getLatestDeepCrumb();
        
        if (isMounted) {
          setPost(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load latest deep crumb');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchLatest();

    return () => {
      isMounted = false;
    };
  }, []);

  return { post, isLoading, error };
}

/**
 * Custom hook for searching posts
 */
export function useSearchPosts(query: string) {
  const [results, setResults] = useState<Post[]>([]);
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
        const data = await postsApi.searchPosts(query);
        
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
