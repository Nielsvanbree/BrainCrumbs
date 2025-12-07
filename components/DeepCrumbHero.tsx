import Link from 'next/link';
import { Post } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import Crumbie from './Crumbie';

interface DeepCrumbHeroProps {
  post: Post;
}

export default function DeepCrumbHero({ post }: DeepCrumbHeroProps) {
  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden rounded-3xl my-8 border border-white/10 bg-gradient-to-br from-bc-card to-black group">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-bc-purple/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-bc-blue/20 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10 px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bc-purple/20 border border-bc-purple/50 text-bc-purple text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-bc-purple animate-pulse" />
              Latest Deep Crumb
            </div>
            {/* Crumbie peeking at the badge */}
            <Crumbie className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity" variant="hero" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-[var(--font-orbitron)] font-bold text-white leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
             <span>{post.date}</span>
             <span>•</span>
             <span>{post.readTime} read</span>
          </div>
          <div className="pt-4">
             <Link href={`/post/${post.slug}`} className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-bc-blue rounded-full hover:bg-bc-purple transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)]">
               Read Deep Dive <ArrowRight className="ml-2 h-5 w-5" />
             </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
