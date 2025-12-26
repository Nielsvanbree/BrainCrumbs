import { Post } from './types';
import { apiClient } from './client';

/**
 * Posts API Service
 * This service will interface with your backend API for blog posts (crumbs)
 * Currently uses mock data, but structured to easily swap to real API calls
 */

export const postsApi = {
  /**
   * Fetch all posts
   * @returns Promise<Post[]>
   */
  async getAllPosts(): Promise<Post[]> {
    // TODO: Replace with actual API call
    // return apiClient.get<Post[]>('/posts');
    
    const { quickCrumbs, latestDeepCrumb } = await import('../data');
    return Promise.resolve([latestDeepCrumb, ...quickCrumbs]);
  },

  /**
   * Fetch a single post by slug
   * @param slug - Post slug identifier
   * @returns Promise<Post | null>
   */
  async getPostBySlug(slug: string): Promise<Post | null> {
    // TODO: Replace with actual API call
    // return apiClient.get<Post>(`/posts/${slug}`);
    
    const { quickCrumbs, latestDeepCrumb } = await import('../data');
    const allPosts = [latestDeepCrumb, ...quickCrumbs];
    const post = allPosts.find(p => p.slug === slug);
    return Promise.resolve(post || null);
  },

  /**
   * Fetch posts by category
   * @param category - Post category
   * @returns Promise<Post[]>
   */
  async getPostsByCategory(category: string): Promise<Post[]> {
    // TODO: Replace with actual API call
    // return apiClient.get<Post[]>(`/posts?category=${category}`);
    
    const { quickCrumbs, latestDeepCrumb } = await import('../data');
    const allPosts = [latestDeepCrumb, ...quickCrumbs];
    const filtered = allPosts.filter(p => p.category === category);
    return Promise.resolve(filtered);
  },

  /**
   * Fetch only deep crumbs (long-form posts)
   * @returns Promise<Post[]>
   */
  async getDeepCrumbs(): Promise<Post[]> {
    // TODO: Replace with actual API call
    // return apiClient.get<Post[]>('/posts?type=deep');
    
    const { quickCrumbs, latestDeepCrumb } = await import('../data');
    const allPosts = [latestDeepCrumb, ...quickCrumbs];
    const deepCrumbs = allPosts.filter(p => p.isDeepCrumb);
    return Promise.resolve(deepCrumbs);
  },

  /**
   * Fetch only quick crumbs (short-form posts)
   * @returns Promise<Post[]>
   */
  async getQuickCrumbs(): Promise<Post[]> {
    // TODO: Replace with actual API call
    // return apiClient.get<Post[]>('/posts?type=quick');
    
    const { quickCrumbs } = await import('../data');
    return Promise.resolve(quickCrumbs);
  },

  /**
   * Fetch the latest deep crumb
   * @returns Promise<Post | null>
   */
  async getLatestDeepCrumb(): Promise<Post | null> {
    // TODO: Replace with actual API call
    // return apiClient.get<Post>('/posts/latest-deep');
    
    const { latestDeepCrumb } = await import('../data');
    return Promise.resolve(latestDeepCrumb);
  },

  /**
   * Search posts by query
   * @param query - Search query string
   * @returns Promise<Post[]>
   */
  async searchPosts(query: string): Promise<Post[]> {
    // TODO: Replace with actual API call
    // return apiClient.get<Post[]>(`/posts/search?q=${query}`);
    
    const { quickCrumbs, latestDeepCrumb } = await import('../data');
    const allPosts = [latestDeepCrumb, ...quickCrumbs];
    const lowerQuery = query.toLowerCase();
    const filtered = allPosts.filter(p => 
      p.title.toLowerCase().includes(lowerQuery) ||
      p.excerpt.toLowerCase().includes(lowerQuery)
    );
    return Promise.resolve(filtered);
  },

  /**
   * Fetch paginated posts
   * @param page - Page number (1-indexed)
   * @param pageSize - Number of posts per page
   * @returns Promise<PaginatedResponse<Post>>
   */
  async getPaginatedPosts(page: number = 1, pageSize: number = 10) {
    // TODO: Replace with actual API call
    // return apiClient.get<PaginatedResponse<Post>>(`/posts?page=${page}&pageSize=${pageSize}`);
    
    const { quickCrumbs, latestDeepCrumb } = await import('../data');
    const allPosts = [latestDeepCrumb, ...quickCrumbs];
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = allPosts.slice(startIndex, endIndex);
    
    return Promise.resolve({
      data: paginatedData,
      pagination: {
        page,
        pageSize,
        total: allPosts.length,
        totalPages: Math.ceil(allPosts.length / pageSize),
      },
    });
  },
};
