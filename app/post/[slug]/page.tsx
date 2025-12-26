import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsletterForm from '@/components/NewsletterForm';
import { postsDb } from '@/lib/posts-db';
import { notFound } from 'next/navigation';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
  const allPosts = await postsDb.getAll();
  const publishedPosts = allPosts.filter(p => p.status === 'published');
  return publishedPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await postsDb.getBySlug(params.slug);

  if (!post || post.status !== 'published') {
    notFound();
  }

  const categoryColors = {
    curiosity: 'text-pink-500 border-pink-500',
    crypto: 'text-bc-blue border-bc-blue',
    tech: 'text-bc-cyan border-bc-cyan',
  };

  // Default to a safe access if category doesn't match keys
  const activeCategoryColor = categoryColors[post.category as keyof typeof categoryColors] || 'text-white border-white';

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
           <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className={`inline-flex items-center px-3 py-1 rounded-full border bg-white/5 text-xs font-bold uppercase tracking-wider mb-6 ${activeCategoryColor}`}>
             {post.category}
          </div>
          <h1 className="text-4xl md:text-6xl font-[var(--font-orbitron)] font-bold mb-6 leading-tight text-white">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-gray-400 text-sm">
             <div className="flex items-center gap-2">
               <Calendar size={16} />
               {post.date}
             </div>
             <div className="flex items-center gap-2">
               <Clock size={16} />
               {post.readTime} read
             </div>
          </div>
        </header>

        {/* Content Rendered from Markdown */}
        <article className="prose prose-invert prose-lg max-w-none prose-headings:font-[var(--font-orbitron)] prose-a:text-bc-cyan prose-img:rounded-xl">
          {post.content ? (
            <ReactMarkdown>{post.content}</ReactMarkdown>
          ) : (
            <p className="text-gray-400 italic">No content available for this post.</p>
          )}
        </article>

        <hr className="border-white/10 my-12" />

        {/* Newsletter CTA */}
        <div className="mt-12">
           <NewsletterForm variant={post.category === 'crypto' ? 'crypto' : post.category === 'tech' ? 'tech' : 'default'} />
        </div>
      </div>

      <Footer />
    </main>
  );
}
