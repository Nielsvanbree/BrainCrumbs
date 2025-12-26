"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Archive, 
  CheckCircle, 
  FileText,
  Clock,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { Post } from '@/lib/api/types';

// Extension of Post type to include admin-specific fields handled by the API
interface AdminPost extends Post {
  status: 'published' | 'draft' | 'archived';
  publishedAt?: string;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) return;

    try {
      const response = await fetch(`/api/posts/${slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete post');
      
      // Remove from local state
      setPosts(posts.filter(p => p.slug !== slug));
    } catch (err) {
      alert('Error deleting post');
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'archived': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle size={14} />;
      case 'archived': return <Archive size={14} />;
      default: return <FileText size={14} />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bc-purple"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-[var(--font-orbitron)] font-bold text-white mb-2">
            Manage Posts
          </h1>
          <p className="text-gray-400">
            Create, edit, and manage your blog content.
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center justify-center gap-2 bg-bc-purple hover:bg-bc-blue text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 shadow-lg shadow-bc-purple/20"
        >
          <Plus size={20} />
          Create New Post
        </Link>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg mb-6 flex items-center gap-3">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Title</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Category</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Status</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Date</th>
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No posts found. Start by creating one!
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="font-medium text-white mb-1 group-hover:text-bc-cyan transition-colors">
                        {post.title}
                      </div>
                      <div className="text-xs text-gray-500 font-mono">
                        /{post.slug}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-white/5 text-gray-300 capitalize">
                        {post.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(post.status)} uppercase tracking-wide`}>
                        {getStatusIcon(post.status)}
                        {post.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5 text-sm text-gray-300">
                          <Clock size={12} />
                          {post.publishedAt 
                            ? format(new Date(post.publishedAt), 'MMM d, yyyy')
                            : <span className="italic">Unscheduled</span>
                          }
                        </div>
                        {post.publishedAt && (
                          <span className="text-xs text-gray-600 pl-4">
                            {format(new Date(post.publishedAt), 'h:mm a')}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {post.status === 'published' && (
                          <Link
                            href={`/post/${post.slug}`}
                            target="_blank"
                            className="p-2 text-gray-400 hover:text-bc-cyan hover:bg-bc-cyan/10 rounded-lg transition-colors"
                            title="View Live"
                          >
                            <Eye size={18} />
                          </Link>
                        )}
                        <Link
                          href={`/admin/posts/${post.slug}`}
                          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.slug)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}