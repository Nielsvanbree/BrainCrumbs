import Link from 'next/link';
import { Post } from '@/lib/data';
import { Clock, ArrowRight } from 'lucide-react';

interface CrumbCardProps {
  post: Post;
}

export default function CrumbCard({ post }: CrumbCardProps) {
  const categoryColor = {
    curiosity: 'text-pink-500',
    crypto: 'text-bc-blue',
    tech: 'text-bc-cyan'
  };

  return (
    <Link href={`/post/${post.slug}`} className="group block h-full">
      <div className="glass-panel p-6 rounded-xl h-full flex flex-col hover-glow transition-transform duration-300 hover:-translate-y-1">
        <div className="flex items-center justify-between mb-4">
          <span className={`text-xs font-bold uppercase tracking-wider ${categoryColor[post.category] || 'text-gray-400'}`}>
            {post.category}
          </span>
          <span className="text-xs text-gray-500 flex items-center gap-1">
             <Clock size={12} /> {post.readTime}
          </span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-bc-purple transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
          {post.excerpt}
        </p>
        <div className="flex items-center text-bc-blue text-sm font-medium group-hover:translate-x-2 transition-transform">
          Read Crumb <ArrowRight size={16} className="ml-1" />
        </div>
      </div>
    </Link>
  );
}