"use client";

import Link from 'next/link';
import { ArrowLeft, LayoutDashboard, FileText, Settings, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (!user.isAdmin) {
        router.push('/');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bc-dark flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-bc-purple animate-spin" />
      </div>
    );
  }

  if (!user || !user.isAdmin) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-bc-dark text-gray-100 font-sans">
      {/* Admin Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-bc-dark/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-6 h-6 text-bc-purple" />
                <span className="font-[var(--font-orbitron)] text-xl font-bold tracking-wider">
                  Admin
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <Link 
                  href="/admin" 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/5 text-bc-cyan transition-colors"
                >
                  Posts
                </Link>
                {/* Placeholder for future settings */}
                <span className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 cursor-not-allowed">
                  Settings
                </span>
              </div>
            </div>
            
            <Link 
              href="/" 
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Site
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
