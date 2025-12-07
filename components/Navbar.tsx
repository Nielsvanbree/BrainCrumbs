"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Crumbie from './Crumbie';

const navLinks = [
  { href: '/curiosity', label: 'Curiosity' },
  { href: '/crypto', label: 'Crypto' },
  { href: '/tech', label: 'Tech' },
  { href: '/reviews', label: 'Reviews' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-bc-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <Crumbie className="w-10 h-10" variant="logo" />
              <span className="font-[var(--font-orbitron)] text-2xl font-bold text-gradient tracking-wider group-hover:opacity-90 transition-opacity">
                brainCrumbs
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300",
                    pathname.startsWith(link.href)
                      ? "text-bc-cyan bg-white/5"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/subscribe" className="bg-bc-purple hover:bg-bc-blue text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300">
                Subscribe
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-bc-dark border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
             <Link
                href="/subscribe"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-bc-cyan hover:text-white hover:bg-white/10"
              >
                Subscribe
              </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
