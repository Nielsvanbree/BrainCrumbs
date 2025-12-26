"use client";

import { useState, useCallback, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Save,
  X,
  Eye,
  Calendar,
  ArrowLeft,
  Clock,
  LayoutTemplate,
  AlertCircle
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import "easymde/dist/easymde.min.css";
import { format } from 'date-fns';
import { Category } from '@/lib/api/types';

// Dynamically import SimpleMDE to avoid SSR issues
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

// Local interface matching the API expectation
interface PostData {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  category: Category;
  readTime: string;
  isDeepCrumb: boolean;
  status: 'published' | 'draft' | 'archived';
  publishedAt?: string;
  date: string;
  content: string;
}

interface PostEditorProps {
  initialPost?: PostData;
  isNew?: boolean;
}

export default function PostEditor({ initialPost, isNew = false }: PostEditorProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);
  
  const [formData, setFormData] = useState<PostData>(() => ({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'tech',
    status: 'draft',
    readTime: '5 min',
    isDeepCrumb: false,
    publishedAt: new Date().toISOString(),
    date: format(new Date(), 'MMM d, yyyy'),
    ...initialPost
  }));

  // Auto-generate slug from title for new posts
  useEffect(() => {
    if (isNew && !slugTouched && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, isNew, slugTouched]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'slug') setSlugTouched(true);
  };

  const handleContentChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, content: value }));
  }, []);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Memoize options to prevent editor re-rendering on every keystroke
  const editorOptions = useMemo(() => ({
    placeholder: "Write your masterpiece here... (Markdown supported)",
    spellChecker: false,
    status: false,
    minHeight: "400px",
    maxHeight: "600px", // Constrain height to enable internal scrolling
    toolbar: [
      "bold", "italic", "heading", "|", 
      "quote", "unordered-list", "ordered-list", "|",
      "link", "image", "|",
      "preview", "side-by-side", "fullscreen"
    ]
  }), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const targetSlug = isNew ? '' : initialPost?.slug;
      const endpoint = isNew ? '/api/posts' : `/api/posts/${targetSlug}`;
      const method = isNew ? 'POST' : 'PUT';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save post');
      }

      router.push('/admin');
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSaving(false);
    }
  };

  const categoryColors = {
    curiosity: 'text-pink-500 border-pink-500',
    crypto: 'text-bc-blue border-bc-blue',
    tech: 'text-bc-cyan border-bc-cyan',
  };

  const activeCategoryColor = categoryColors[formData.category] || 'text-white border-white';

  // Full Screen Preview Mode
  if (showPreview) {
    return (
      <div className="fixed inset-0 z-[100] bg-bc-dark overflow-y-auto animate-in fade-in duration-200">
        <div className="max-w-4xl mx-auto px-4 py-12 relative">
           <button 
             onClick={() => setShowPreview(false)}
             className="fixed top-6 right-6 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md z-50 transition-all hover:scale-105"
             title="Close Preview"
           >
             <X size={24} />
           </button>

           <div className="bg-bc-dark min-h-screen pt-12">
             {/* Preview Header */}
             <header className="mb-12">
                <div className={`inline-flex items-center px-3 py-1 rounded-full border bg-white/5 text-xs font-bold uppercase tracking-wider mb-6 ${activeCategoryColor}`}>
                  {formData.category}
                </div>
                <h1 className="text-4xl md:text-6xl font-[var(--font-orbitron)] font-bold mb-6 leading-tight text-white">
                  {formData.title || 'Untitled Post'}
                </h1>
                <div className="flex items-center gap-6 text-gray-400 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {formData.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    {formData.readTime}
                  </div>
                </div>
              </header>

              {/* Preview Content */}
              <div className="prose prose-invert prose-lg max-w-none prose-headings:font-[var(--font-orbitron)] prose-a:text-bc-cyan prose-img:rounded-xl">
                 <p className="text-xl text-white font-light mb-8 border-b border-white/10 pb-8 leading-relaxed">
                   {formData.excerpt || 'No excerpt provided.'}
                 </p>
                 {formData.content ? (
                   <ReactMarkdown>{formData.content}</ReactMarkdown>
                 ) : (
                   <p className="text-gray-500 italic">Start writing content to see it appear here...</p>
                 )}
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-16 z-20 bg-bc-dark/95 backdrop-blur-md p-4 -mx-4 border-b border-white/10 shadow-lg">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin" 
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-xl font-bold font-[var(--font-orbitron)]">
            {isNew ? 'New Post' : 'Edit Post'}
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
           <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 transition-colors"
           >
             <Eye size={18} />
             <span className="hidden sm:inline">Preview</span>
           </button>
           <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-bc-purple hover:bg-bc-blue text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
           >
             {isSaving ? (
               <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
             ) : (
               <Save size={18} />
             )}
             Save Post
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-xl text-white placeholder-gray-600 focus:outline-none focus:border-bc-purple transition-colors"
              required
            />
          </div>

          <div className="space-y-2">
             <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Content</label>
             {/* Editor Wrapper with Explicit Styling for Visibility and Scrolling */}
             <div className="prose max-w-none 
               [&_.EasyMDEContainer]:bg-white 
               [&_.EasyMDEContainer]:rounded-lg 
               [&_.editor-toolbar]:bg-gray-100 
               [&_.editor-toolbar]:border-b-gray-200
               [&_.editor-toolbar]:opacity-100
               [&_.editor-toolbar_button]:text-gray-700 
               [&_.editor-toolbar_button:hover]:bg-gray-200
               [&_.editor-toolbar_button.active]:bg-gray-300
               [&_.CodeMirror]:bg-white 
               [&_.CodeMirror]:text-gray-900 
               [&_.CodeMirror]:border-none 
               [&_.CodeMirror]:rounded-b-lg 
               [&_.CodeMirror-scroll]:min-h-[400px]
               [&_.CodeMirror-scroll]:max-h-[600px]
               [&_.CodeMirror-scroll]:overflow-y-auto
               [&_.editor-preview]:bg-white 
               [&_.editor-preview]:text-gray-900">
                <SimpleMDE 
                  value={formData.content} 
                  onChange={handleContentChange}
                  options={editorOptions}
                />
             </div>
          </div>
        </div>

        {/* Sidebar Metadata */}
        <div className="space-y-6">
           {/* Status Card */}
           <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <h3 className="font-bold text-white flex items-center gap-2">
                <LayoutTemplate size={18} className="text-bc-cyan" />
                Publishing
              </h3>
              
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-bc-dark border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-bc-cyan"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase">Publish Date</label>
                <input
                  type="datetime-local"
                  name="publishedAt"
                  value={formData.publishedAt ? formData.publishedAt.slice(0, 16) : ''}
                  onChange={handleChange}
                  className="w-full bg-bc-dark border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-bc-cyan"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isDeepCrumb"
                  name="isDeepCrumb"
                  checked={formData.isDeepCrumb}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 rounded border-gray-500 text-bc-purple focus:ring-bc-purple bg-transparent"
                />
                <label htmlFor="isDeepCrumb" className="text-sm text-gray-300 select-none">
                  Deep Crumb (Long Form)
                </label>
              </div>
           </div>

           {/* Metadata Card */}
           <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <h3 className="font-bold text-white flex items-center gap-2">
                <AlertCircle size={18} className="text-bc-purple" />
                Metadata
              </h3>

              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full bg-bc-dark border border-white/20 rounded-lg px-3 py-2 text-gray-300 font-mono text-sm focus:outline-none focus:border-bc-purple"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-bc-dark border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-bc-purple capitalize"
                >
                  <option value="tech">Tech</option>
                  <option value="crypto">Crypto</option>
                  <option value="curiosity">Curiosity</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase">Read Time</label>
                <input
                  type="text"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  placeholder="e.g. 5 min"
                  className="w-full bg-bc-dark border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-bc-purple"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase">Excerpt</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-bc-dark border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-bc-purple resize-none text-sm leading-relaxed"
                  placeholder="Short summary for cards..."
                  required
                />
              </div>
           </div>
        </div>
      </div>
    </form>
  );
}
