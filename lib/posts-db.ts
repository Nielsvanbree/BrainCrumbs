import fs from 'fs/promises';
import path from 'path';
import { Post } from '@/lib/api/types';
import { v4 as uuidv4 } from 'uuid';

// Extended Post type to include admin fields
export interface AdminPost extends Post {
  status: 'published' | 'draft' | 'archived';
  publishedAt?: string;
  content?: string;
}

const DATA_FILE = path.join(process.cwd(), 'data/posts.json');

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    const initialData: AdminPost[] = [];
    await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2));
  }
}

async function readDb(): Promise<AdminPost[]> {
  await ensureDataFile();
  const data = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

async function writeDb(data: AdminPost[]) {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

export const postsDb = {
  async getAll(): Promise<AdminPost[]> {
    return readDb();
  },

  async getBySlug(slug: string): Promise<AdminPost | null> {
    const posts = await readDb();
    return posts.find((p) => p.slug === slug) || null;
  },

  async getById(id: string): Promise<AdminPost | null> {
    const posts = await readDb();
    return posts.find((p) => p.id === id) || null;
  },

  async create(postData: Omit<AdminPost, 'id'>): Promise<AdminPost> {
    const posts = await readDb();
    
    // Check for slug collision
    if (posts.some(p => p.slug === postData.slug)) {
      throw new Error('Slug already exists');
    }

    const newPost: AdminPost = {
      ...postData,
      id: uuidv4(),
    };

    posts.push(newPost);
    await writeDb(posts);
    return newPost;
  },

  async update(slug: string, updates: Partial<AdminPost>): Promise<AdminPost | null> {
    const posts = await readDb();
    const index = posts.findIndex((p) => p.slug === slug);
    
    if (index === -1) return null;

    const updatedPost = { ...posts[index], ...updates };
    
    // Prevent duplicate slugs if slug is being updated
    if (updates.slug && updates.slug !== posts[index].slug) {
      if (posts.some(p => p.slug === updates.slug && p.id !== posts[index].id)) {
        throw new Error('Slug already exists');
      }
    }

    posts[index] = updatedPost;
    await writeDb(posts);
    return updatedPost;
  },

  async delete(slug: string): Promise<boolean> {
    const posts = await readDb();
    const filteredPosts = posts.filter((p) => p.slug !== slug);
    
    if (filteredPosts.length === posts.length) return false;
    
    await writeDb(filteredPosts);
    return true;
  }
};
