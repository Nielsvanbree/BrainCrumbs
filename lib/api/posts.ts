import { Post } from '@/lib/api/types';
import { AdminPost } from '@/lib/posts-db';

/**
 * Posts API Service
 * Interfaces with the internal Next.js API routes
 */

export const postsApi = {
  /**
   * Fetch all posts
   */
  async getAllPosts(): Promise<Post[]> {
    const response = await fetch('/api/posts?status=published');
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  },

  /**
   * Fetch a single post by slug
   */
  async getPostBySlug(slug: string): Promise<Post | null> {
    const response = await fetch(`/api/posts/${slug}`);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error('Failed to fetch post');
    return response.json();
  },

  /**
   * Fetch posts by category
   */
  async getPostsByCategory(category: string): Promise<Post[]> {
    const response = await fetch(`/api/posts?status=published&category=${category}`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  },

  /**
   * Fetch only deep crumbs (long-form posts)
   */
  async getDeepCrumbs(): Promise<Post[]> {
    const posts = await this.getAllPosts();
    return posts.filter(p => p.isDeepCrumb);
  },

  /**
   * Fetch only quick crumbs (short-form posts)
   */
  async getQuickCrumbs(): Promise<Post[]> {
    const posts = await this.getAllPosts();
    return posts.filter(p => !p.isDeepCrumb);
  },

  /**
   * Fetch the latest deep crumb
   */
  async getLatestDeepCrumb(): Promise<Post | null> {
    const posts = await this.getDeepCrumbs();
    return posts.length > 0 ? posts[0] : null;
  },

  /**
   * Search posts by query
   */
  async searchPosts(query: string): Promise<Post[]> {
    const posts = await this.getAllPosts();
    const lowerQuery = query.toLowerCase();
    return posts.filter(p => 
      p.title.toLowerCase().includes(lowerQuery) ||
      p.excerpt.toLowerCase().includes(lowerQuery)
    );
  },

  /**
   * Fetch paginated posts
   */
  async getPaginatedPosts(page: number = 1, pageSize: number = 10) {
    const posts = await this.getAllPosts();
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = posts.slice(startIndex, endIndex);
    
    return {
      data: paginatedData,
      pagination: {
        page,
        pageSize,
        total: posts.length,
        totalPages: Math.ceil(posts.length / pageSize),
      },
    };
  },
};
