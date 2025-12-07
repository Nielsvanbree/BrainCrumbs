import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DeepCrumbHero from '@/components/DeepCrumbHero';
import CrumbCard from '@/components/CrumbCard';
import SectionHeader from '@/components/SectionHeader';
import NewsletterForm from '@/components/NewsletterForm';
import { latestDeepCrumb, quickCrumbs } from '@/lib/data';
import Link from 'next/link';
import { Brain, Cpu, Coins } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <DeepCrumbHero post={latestDeepCrumb} />

        {/* Quick Crumbs */}
        <section className="py-12">
          <SectionHeader title="Quick Crumbs" subtitle="Bite-sized insights for your daily commute." href="/all-news" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickCrumbs.map((crumb) => (
              <CrumbCard key={crumb.id} post={crumb} />
            ))}
          </div>
        </section>

        {/* 3 Roads Section */}
        <section className="py-16">
          <SectionHeader title="3 Roads into brainCrumbs" subtitle="Choose your stream of consciousness." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/curiosity" className="group relative p-8 rounded-2xl glass-panel overflow-hidden border-t-4 border-pink-500 hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Brain className="w-12 h-12 text-pink-500 mb-4" />
              <h3 className="text-2xl font-bold font-[var(--font-orbitron)] mb-2">Curiosity</h3>
              <p className="text-gray-400">Generalist exploration of philosophy, future trends, and mental models.</p>
            </Link>
            
            <Link href="/crypto" className="group relative p-8 rounded-2xl glass-panel overflow-hidden border-t-4 border-bc-blue hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-bc-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Coins className="w-12 h-12 text-bc-blue mb-4" />
              <h3 className="text-2xl font-bold font-[var(--font-orbitron)] mb-2">Crypto</h3>
              <p className="text-gray-400">Deep dives into decentralized finance, identity, and blockchain architecture.</p>
            </Link>

            <Link href="/tech" className="group relative p-8 rounded-2xl glass-panel overflow-hidden border-t-4 border-bc-cyan hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-bc-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Cpu className="w-12 h-12 text-bc-cyan mb-4" />
              <h3 className="text-2xl font-bold font-[var(--font-orbitron)] mb-2">Tech</h3>
              <p className="text-gray-400">Software engineering, AI developments, and the tools building tomorrow.</p>
            </Link>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 mb-12">
           <NewsletterForm />
        </section>
      </div>

      <Footer />
    </main>
  );
}