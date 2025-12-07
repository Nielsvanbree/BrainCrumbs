"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { reviews } from '@/lib/data';
import { BookOpen, Mic, MonitorPlay, FileText, Star } from 'lucide-react';
import { useState } from 'react';

export default function ReviewsPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const getFilteredReviews = () => {
    if (activeFilter === 'All') return reviews;
    // Map plural UI filter to singular data type
    const typeMap: Record<string, string> = {
        'Books': 'book',
        'Podcasts': 'podcast',
        'Courses': 'course',
        'Articles': 'article'
    };
    const targetType = typeMap[activeFilter];
    return reviews.filter(review => review.type === targetType);
  };

  const displayReviews = getFilteredReviews();

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-[var(--font-orbitron)] font-bold mb-4">Reviews Library</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">My personal knowledge base. Books, podcasts, courses, and articles that have shaped my thinking.</p>
        </div>

        {/* Filters UI */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {['All', 'Books', 'Podcasts', 'Courses', 'Articles'].map((filter) => (
            <button 
              key={filter} 
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter 
                  ? 'bg-bc-purple text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayReviews.length > 0 ? (
            displayReviews.map((review) => (
            <div key={review.id} className="glass-panel p-6 rounded-xl hover:border-bc-purple/50 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-lg bg-white/5 text-bc-cyan">
                   {review.type === 'book' && <BookOpen size={20} />}
                   {review.type === 'podcast' && <Mic size={20} />}
                   {review.type === 'course' && <MonitorPlay size={20} />}
                   {review.type === 'article' && <FileText size={20} />}
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <span className="font-bold">{review.rating}</span>
                  <Star size={14} fill="currentColor" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-bc-purple transition-colors">{review.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{review.author}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="px-2 py-1 rounded-md bg-white/5 text-xs text-gray-300 uppercase tracking-wider">{review.category}</span>
                {review.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 rounded-md bg-black/30 text-xs text-gray-500">#{tag}</span>
                ))}
              </div>
            </div>
          ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
                No reviews found for this category yet.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}