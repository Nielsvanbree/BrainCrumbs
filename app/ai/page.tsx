import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeader from '@/components/SectionHeader';
import CrumbCard from '@/components/CrumbCard';
import { Bot } from 'lucide-react';
import { quickCrumbs } from '@/lib/data';

export default function AiPage() {
  // Filter for AI related posts
  const posts = quickCrumbs.filter(p => p.category === 'ai' || p.category === 'tech');

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Artificial Intelligence" 
            subtitle="The last invention we'll ever need to make."
            icon={<Bot className="w-8 h-8 text-bc-cyan" />}
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.length > 0 ? (
              posts.map(post => (
                <CrumbCard key={post.id} post={post} />
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-gray-500">
                <p>Generating insights... content coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}