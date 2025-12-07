import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Crumbie from './Crumbie';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  href?: string;
  linkText?: string;
}

export default function SectionHeader({ title, subtitle, href, linkText = "View All" }: SectionHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-white/5 pb-4">
      <div className="flex items-start gap-3">
        <Crumbie className="w-10 h-10 -mt-1" variant="section" />
        <div>
          <h2 className="text-3xl font-[var(--font-orbitron)] font-bold text-white leading-none">{title}</h2>
          {subtitle && <p className="text-gray-400 mt-2 text-sm">{subtitle}</p>}
        </div>
      </div>
      {href && (
        <Link href={href} className="flex items-center text-bc-cyan hover:text-white transition-colors text-sm font-medium group">
          {linkText} <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
