export type Category = 'curiosity' | 'crypto' | 'tech';

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: Category;
  date: string;
  readTime: string;
  isDeepCrumb?: boolean;
}

export interface ReviewItem {
  id: string;
  title: string;
  author: string;
  type: 'book' | 'podcast' | 'course' | 'article';
  rating: number;
  category: Category;
  tags: string[];
}

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
    title: "Rust vs Go in 2024",
    slug: "rust-vs-go-2024",
    excerpt: "A quick look at performance benchmarks.",
    category: "tech",
    date: "Oct 10, 2023",
    readTime: "3 min",
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
    title: "Mastering Ethereum",
    author: "Andreas M. Antonopoulos",
    type: "book",
    rating: 4.8,
    category: "crypto",
    tags: ["technical", "smart contracts"],
  },
  {
    id: 'r3',
    title: "Lex Fridman #123",
    author: "Lex Fridman",
    type: "podcast",
    rating: 4.5,
    category: "tech",
    tags: ["ai", "discussion"],
  }
];