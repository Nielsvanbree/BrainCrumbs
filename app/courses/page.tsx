import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsletterForm from '@/components/NewsletterForm';
import { Lock } from 'lucide-react';

export default function CoursesPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center pt-24 pb-12 px-4">
        <div className="max-w-4xl w-full text-center">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bc-purple/10 border border-bc-purple/30 text-bc-purple mb-8">
             <span className="w-2 h-2 rounded-full bg-bc-purple animate-pulse" />
             Coming Q4 2024
           </div>
           
           <h1 className="text-5xl md:text-7xl font-[var(--font-orbitron)] font-bold mb-8 leading-tight">
             Crypto Foundations <br/> <span className="text-gray-600">Course</span>
           </h1>
           
           <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
             From zero to understanding the blockchain architecture. A comprehensive guide for the curious mind, not just the investor.
           </p>

           <div className="relative max-w-md mx-auto mb-16">
              <div className="absolute -inset-1 bg-gradient-to-r from-bc-blue to-bc-purple rounded-lg blur opacity-25" />
              <div className="relative bg-bc-dark p-8 rounded-lg border border-white/10">
                 <NewsletterForm variant="crypto" />
              </div>
           </div>

           {/* Curriculum Preview (Locked) */}
           <div className="max-w-3xl mx-auto text-left">
             <h3 className="text-xl font-bold mb-6 text-center">Curriculum Preview</h3>
             <div className="space-y-4 opacity-60">
               {['Module 1: The History of Money', 'Module 2: Distributed Ledgers', 'Module 3: Smart Contracts', 'Module 4: DeFi Ecosystem'].map((mod, i) => (
                 <div key={i} className="flex items-center justify-between p-4 border border-white/10 rounded-lg bg-white/5">
                    <span>{mod}</span>
                    <Lock size={16} className="text-gray-500" />
                 </div>
               ))}
             </div>
           </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}