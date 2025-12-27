"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Loader2, ArrowLeft, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { forgotPassword } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await forgotPassword(email);
      setSubmitted(true);
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
          <Link href="/login" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>

          <div className="text-center mb-8">
            <h1 className="font-[var(--font-orbitron)] text-3xl font-bold text-gradient mb-2">Reset Password</h1>
            <p className="text-gray-400">We'll send you instructions to reset your password</p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-bc-purple hover:bg-bc-blue text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-bc-purple/20 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-bc-purple" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Check your email</h3>
              <p className="text-gray-400 mb-6">
                We've sent a password reset link to <span className="text-white font-medium">{email}</span>
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-bc-cyan hover:text-bc-blue text-sm font-medium transition-colors"
              >
                Try another email
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
