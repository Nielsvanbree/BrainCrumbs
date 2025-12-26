import { ReviewItem } from './types';
import { apiClient } from './client';

/**
 * Reviews API Service
 * This service will interface with your backend API for reviews
 * Currently uses mock data, but structured to easily swap to real API calls
 */

export const reviewsApi = {
  /**
   * Fetch all reviews
   * @returns Promise<ReviewItem[]>
   */
  async getAllReviews(): Promise<ReviewItem[]> {
    // TODO: Replace with actual API call
    // return apiClient.get<ReviewItem[]>('/reviews');
    
    const { reviews } = await import('../data');
    return Promise.resolve(reviews);
  },

  /**
   * Fetch a single review by ID
   * @param id - Review ID
   * @returns Promise<ReviewItem | null>
   */
  async getReviewById(id: string): Promise<ReviewItem | null> {
    // TODO: Replace with actual API call
    // return apiClient.get<ReviewItem>(`/reviews/${id}`);
    
    const { reviews } = await import('../data');
    const review = reviews.find(r => r.id === id);
    return Promise.resolve(review || null);
  },

  /**
   * Fetch reviews by type
   * @param type - Review type (book, podcast, course, article)
   * @returns Promise<ReviewItem[]>
   */
  async getReviewsByType(type: 'book' | 'podcast' | 'course' | 'article'): Promise<ReviewItem[]> {
    // TODO: Replace with actual API call
    // return apiClient.get<ReviewItem[]>(`/reviews?type=${type}`);
    
    const { reviews } = await import('../data');
    const filtered = reviews.filter(r => r.type === type);
    return Promise.resolve(filtered);
  },

  /**
   * Fetch reviews by category
   * @param category - Review category
   * @returns Promise<ReviewItem[]>
   */
  async getReviewsByCategory(category: string): Promise<ReviewItem[]> {
    // TODO: Replace with actual API call
    // return apiClient.get<ReviewItem[]>(`/reviews?category=${category}`);
    
    const { reviews } = await import('../data');
    const filtered = reviews.filter(r => r.category === category);
    return Promise.resolve(filtered);
  },

  /**
   * Fetch reviews by tag
   * @param tag - Review tag
   * @returns Promise<ReviewItem[]>
   */
  async getReviewsByTag(tag: string): Promise<ReviewItem[]> {
    // TODO: Replace with actual API call
    // return apiClient.get<ReviewItem[]>(`/reviews?tag=${tag}`);
    
    const { reviews } = await import('../data');
    const filtered = reviews.filter(r => r.tags.includes(tag));
    return Promise.resolve(filtered);
  },

  /**
   * Fetch reviews with minimum rating
   * @param minRating - Minimum rating (0-5)
   * @returns Promise<ReviewItem[]>
   */
  async getReviewsByRating(minRating: number): Promise<ReviewItem[]> {
    // TODO: Replace with actual API call
    // return apiClient.get<ReviewItem[]>(`/reviews?minRating=${minRating}`);
    
    const { reviews } = await import('../data');
    const filtered = reviews.filter(r => r.rating >= minRating);
    return Promise.resolve(filtered);
  },

  /**
   * Search reviews by query
   * @param query - Search query string
   * @returns Promise<ReviewItem[]>
   */
  async searchReviews(query: string): Promise<ReviewItem[]> {
    // TODO: Replace with actual API call
    // return apiClient.get<ReviewItem[]>(`/reviews/search?q=${query}`);
    
    const { reviews } = await import('../data');
    const lowerQuery = query.toLowerCase();
    const filtered = reviews.filter(r => 
      r.title.toLowerCase().includes(lowerQuery) ||
      r.author.toLowerCase().includes(lowerQuery) ||
      r.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
    return Promise.resolve(filtered);
  },

  /**
   * Create a new review
   * @param review - Review data
   * @returns Promise<ReviewItem>
   */
  async createReview(review: Omit<ReviewItem, 'id'>): Promise<ReviewItem> {
    // TODO: Replace with actual API call
    // return apiClient.post<ReviewItem>('/reviews', review);
    
    const newReview: ReviewItem = {
      id: `r${Date.now()}`,
      ...review,
    };
    return Promise.resolve(newReview);
  },

  /**
   * Update an existing review
   * @param id - Review ID
   * @param updates - Partial review data to update
   * @returns Promise<ReviewItem>
   */
  async updateReview(id: string, updates: Partial<ReviewItem>): Promise<ReviewItem> {
    // TODO: Replace with actual API call
    // return apiClient.patch<ReviewItem>(`/reviews/${id}`, updates);
    
    const { reviews } = await import('../data');
    const review = reviews.find(r => r.id === id);
    if (!review) {
      throw new Error('Review not found');
    }
    const updated = { ...review, ...updates };
    return Promise.resolve(updated);
  },

  /**
   * Delete a review
   * @param id - Review ID
   * @returns Promise<void>
   */
  async deleteReview(id: string): Promise<void> {
    // TODO: Replace with actual API call
    // return apiClient.delete(`/reviews/${id}`);
    
    return Promise.resolve();
  },
};
