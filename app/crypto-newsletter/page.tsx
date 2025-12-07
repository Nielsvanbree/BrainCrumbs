import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsletterForm from '@/components/NewsletterForm';
import { CheckCircle2, Coins } from 'lucide-react';

export default function CryptoNewsletterPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="inline-flex justify-center mb-6">
            <div className="p-4 rounded-full bg-bc-blue/10 text-bc-blue border border-bc-blue/30">
               <Coins size={48} />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-[var(--font-orbitron)] font-bold mb-6">
            Crypto Foundations
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            No noise. No hype. Just deep architectural understanding and decentralized philosophy.
          </p>
        </div>

        <div className="glass-panel p-8 md:p-12 rounded-3xl border-t-4 border-bc-blue relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-bc-blue/10 blur-[80px] rounded-full pointer-events-none" />
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
             <div>
                <h2 className="text-2xl font-bold text-white mb-4">What you get</h2>
                <ul className="space-y-4">
                  {['Deep dives into DeFi protocols', 'Smart contract security breakdowns', 'Zero-knowledge proof explainers', 'Early access to my upcoming course'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle2 size={20} className="text-bc-blue shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
             </div>
             <div className="text-sm text-gray-400 bg-black/30 p-6 rounded-xl border border-white/5">
               <p className="mb-4 italic">"The only crypto newsletter I actually read. It focuses on the tech, not the price action."</p>
               <p className="font-bold text-white">— Alex T., Blockchain Dev</p>
             </div>
           </div>

           <div className="max-w-lg mx-auto">
              <NewsletterForm variant="crypto" />
           </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}