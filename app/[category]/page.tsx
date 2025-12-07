import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CrumbCard from '@/components/CrumbCard';
import SectionHeader from '@/components/SectionHeader';
import { quickCrumbs, reviews, Category } from '@/lib/data';
import { notFound } from 'next/navigation';
import { BookOpen, Mic } from 'lucide-react';
import Link from 'next/link';

export function generateStaticParams() {
  return [
    { category: 'curiosity' },
    { category: 'crypto' },
    { category: 'tech' },
  ];
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category as Category;
  const validCategories = ['curiosity', 'crypto', 'tech'];

  if (!validCategories.includes(category)) {
    notFound();
  }

  // Filter content based on category (Mock logic)
  const categoryPosts = quickCrumbs.filter(post => post.category === category || post.category === 'curiosity'); // Including curiosity as filler for demo
  const categoryReviews = reviews.filter(review => review.category === category);

  const colors = {
    curiosity: 'from-pink-500 to-purple-600',
    crypto: 'from-blue-500 to-indigo-600',
    tech: 'from-cyan-500 to-blue-600',
  };

  const heroGradient = colors[category] || colors.curiosity;

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Category Header */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b ${heroGradient} opacity-10 blur-[100px] rounded-full pointer-events-none`} />
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-[var(--font-orbitron)] font-bold capitalize mb-4 tracking-tight">
            {category}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Exploring the edge of {category}. Deep dives, quick thoughts, and curated resources.
          </p>
        </div>
      </div>

      <div className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-20">
        
        {/* Recommended Starters */}
        <section>
          <SectionHeader title="Recommended Starters" subtitle="Start your journey here." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categoryPosts.slice(0, 3).map((post) => (
              <CrumbCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        {/* Full Archive (Mocked list) */}
        <section>
          <SectionHeader title="The Archive" />
          <div className="space-y-4">
             {/* Simulating a list view for archive */}
             {[1, 2, 3, 4].map((i) => (
               <div key={i} className="glass-panel p-6 rounded-lg flex flex-col md:flex-row md:items-center justify-between hover:bg-white/5 transition-colors cursor-pointer">
                 <div>
                   <h4 className="text-lg font-bold text-white">Archive Article Title #{i}</h4>
                   <p className="text-gray-400 text-sm">A brief summary of this older article found in the {category} archives...</p>
                 </div>
                 <span className="text-xs text-gray-500 mt-2 md:mt-0">Oct {10 + i}, 2022</span>
               </div>
             ))}
          </div>
        </section>

        {/* Relevant Resources */}
        <section>
           <SectionHeader title="Books & Podcasts" subtitle="Curated knowledge sources." href="/reviews" linkText="View Library" />
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {categoryReviews.length > 0 ? categoryReviews.map((review) => (
               <div key={review.id} className="glass-panel p-6 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    {review.type === 'book' ? <BookOpen size={18} className="text-bc-purple" /> : <Mic size={18} className="text-bc-cyan" />}
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{review.type}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{review.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">by {review.author}</p>
                  <div className="flex flex-wrap gap-2">
                    {review.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-1 bg-white/5 rounded-full text-gray-400">#{tag}</span>
                    ))}
                  </div>
               </div>
             )) : (
               <p className="text-gray-500 italic">No specific reviews curated for this category yet.</p>
             )}
           </div>
        </section>

      </div>
      <Footer />
    </main>
  );
}