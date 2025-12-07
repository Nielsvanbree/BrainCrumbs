import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsletterForm from '@/components/NewsletterForm';
import { latestDeepCrumb, quickCrumbs } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function generateStaticParams() {
  const allPosts = [latestDeepCrumb, ...quickCrumbs];
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const allPosts = [latestDeepCrumb, ...quickCrumbs];
  const post = allPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const categoryColors = {
    curiosity: 'text-pink-500 border-pink-500',
    crypto: 'text-bc-blue border-bc-blue',
    tech: 'text-bc-cyan border-bc-cyan',
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
           <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className={`inline-flex items-center px-3 py-1 rounded-full border bg-white/5 text-xs font-bold uppercase tracking-wider mb-6 ${categoryColors[post.category]}`}>
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

        {/* Content (Simulated) */}
        <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
           <p className="text-xl text-white font-light">
             {post.excerpt}
           </p>
           
           <div className="p-6 rounded-xl bg-white/5 border-l-4 border-bc-purple my-8 italic text-gray-200">
             "This is where the magic happens. A quote or key takeaway that captures the essence of the article."
           </div>

           <p>
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
           </p>
           
           <h2 className="text-2xl md:text-3xl font-bold font-[var(--font-orbitron)] text-white mt-8 mb-4">The Core Concept</h2>
           <p>
             Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
           </p>
           
           <ul className="list-disc pl-6 space-y-2 marker:text-bc-purple">
             <li>Point one about the future.</li>
             <li>Point two about technology.</li>
             <li>Point three about human nature.</li>
           </ul>

           <h2 className="text-2xl md:text-3xl font-bold font-[var(--font-orbitron)] text-white mt-8 mb-4">Why It Matters</h2>
           <p>
             Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
           </p>
        </div>

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