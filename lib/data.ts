/**
 * Posts & Reviews Data - Mock Data Source
 * 
 * This file serves as a mock data source while you don't have a backend API.
 * When you're ready to connect to a real API:
 * 1. The types are already defined in lib/api/types.ts
 * 2. The API client is set up in lib/api/client.ts
 * 3. The service layer is ready in lib/api/posts.ts and lib/api/reviews.ts
 * 4. Simply update FEATURES.USE_MOCK_DATA in lib/config.ts to false
 * 5. Configure your API_CONFIG.BASE_URL in lib/config.ts
 * 
 * No other code changes needed - the components already use the abstracted API layer!
 */

import { Post, ReviewItem, Category } from './api/types';

export type { Post, ReviewItem, Category };

export const latestDeepCrumb: Post = {
  id: '1',
  title: "The Future of Decentralized Identity",
  slug: "decentralized-identity-future",
  excerpt: "Why your digital soul belongs to you, and how blockchain is making it happen.",
  category: "crypto",
  date: "Oct 12, 2023",
  readTime: "12 min",
  isDeepCrumb: true,
};

export const quickCrumbs: Post[] = [
  {
    id: '2',
    title: "Agents are the New Apps",
    slug: "ai-agents-new-apps",
    excerpt: "Why conversational interfaces are replacing traditional GUIs.",
    category: "ai",
    date: "Oct 10, 2023",
    readTime: "4 min",
  },
  {
    id: '3',
    title: "The Philosophy of Antifragility",
    slug: "antifragility-philosophy",
    excerpt: "Chaos is not just to be survived, but used.",
    category: "curiosity",
    date: "Oct 08, 2023",
    readTime: "4 min",
  },
  {
    id: '4',
    title: "Bitcoin Halving Explained",
    slug: "bitcoin-halving",
    excerpt: "What happens when the block reward cuts in half?",
    category: "crypto",
    date: "Oct 05, 2023",
    readTime: "3 min",
  },
];

export const reviews: ReviewItem[] = [
  {
    id: 'r1',
    title: "The Sovereign Individual",
    author: "James Dale Davidson",
    type: "book",
    rating: 5,
    category: "curiosity",
    tags: ["economics", "future"],
  },
  {
    id: 'r2',
    title: "Superintelligence",
    author: "Nick Bostrom",
    type: "book",
    rating: 4.6,
    category: "ai",
    tags: ["safety", "philosophy"],
  },
  {
    id: 'r3',
    title: "Lex Fridman #123",
    author: "Lex Fridman",
    type: "podcast",
    rating: 4.5,
    category: "ai",
    tags: ["ai", "discussion"],
  }
];