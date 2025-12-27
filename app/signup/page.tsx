"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Loader2, Github, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, socialLogin } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await signup(email, password, name);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bc-dark flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
          <div className="text-center mb-8">
            <h1 className="font-[var(--font-orbitron)] text-3xl font-bold text-gradient mb-2">Create Account</h1>
            <p className="text-gray-400">Join the Brain Crumbs community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-bc-dark border border-white/10 rounded-lg focus:ring-2 focus:ring-bc-purple focus:border-transparent outline-none text-white placeholder-gray-500 transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-bc-dark border border-white/10 rounded-lg focus:ring-2 focus:ring-bc-purple focus:border-transparent outline-none text-white placeholder-gray-500 transition-all"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-bc-dark border border-white/10 rounded-lg focus:ring-2 focus:ring-bc-purple focus:border-transparent outline-none text-white placeholder-gray-500 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-bc-purple hover:bg-bc-blue text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-bc-dark text-gray-400">Or sign up with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => socialLogin('github')}
                className="flex items-center justify-center px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-white"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </button>
              <button
                type="button"
                onClick={() => socialLogin('google')}
                className="flex items-center justify-center px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-white"
              >
                <Mail className="w-5 h-5 mr-2" />
                Google
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-bc-purple hover:text-bc-cyan font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
