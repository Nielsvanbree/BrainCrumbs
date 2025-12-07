import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsletterForm from '@/components/NewsletterForm';
import { CheckCircle2 } from 'lucide-react';

export default function SubscribePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-[var(--font-orbitron)] font-bold mb-6">
            <span className="text-gradient">Upgrade Your Feed</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join 5,000+ curious minds. Choose the stream that fits your interests.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
           {/* Main General Newsletter */}
           <div className="space-y-8">
              <div className="glass-panel p-8 rounded-2xl border-t-4 border-pink-500">
                <h2 className="text-2xl font-bold mb-4">The Generalist</h2>
                <p className="text-gray-400 mb-6">A weekly blend of everything. The best crumbs from curiosity, crypto, and tech tailored for the polymath.</p>
                <ul className="space-y-3 mb-8">
                  {['Weekly deep dive summary', 'Top 3 curated links', 'Book of the month'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                      <CheckCircle2 size={16} className="text-pink-500" /> {item}
                    </li>
                  ))}
                </ul>
                <NewsletterForm variant="default" />
              </div>
           </div>

           {/* Specialized Streams */}
           <div className="space-y-8">
              <div className="glass-panel p-8 rounded-2xl border-t-4 border-bc-blue">
                 <h2 className="text-xl font-bold mb-2 text-bc-blue">Crypto Foundations</h2>
                 <p className="text-sm text-gray-400 mb-4">Strictly crypto. No noise, just signal and education.</p>
                 <NewsletterForm variant="crypto" />
              </div>

              <div className="glass-panel p-8 rounded-2xl border-t-4 border-bc-cyan">
                 <h2 className="text-xl font-bold mb-2 text-bc-cyan">Tech Insights</h2>
                 <p className="text-sm text-gray-400 mb-4">For developers and tech leaders.</p>
                 <NewsletterForm variant="tech" />
              </div>
           </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}