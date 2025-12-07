import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsletterForm from '@/components/NewsletterForm';
import { CheckCircle2, Cpu } from 'lucide-react';

export default function TechNewsletterPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="inline-flex justify-center mb-6">
            <div className="p-4 rounded-full bg-bc-cyan/10 text-bc-cyan border border-bc-cyan/30">
               <Cpu size={48} />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-[var(--font-orbitron)] font-bold mb-6">
            Tech Insights
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Stay ahead of the curve. Analysis on AI, software architecture, and the tools building tomorrow.
          </p>
        </div>

        <div className="glass-panel p-8 md:p-12 rounded-3xl border-t-4 border-bc-cyan relative overflow-hidden">
           <div className="absolute top-0 left-0 w-64 h-64 bg-bc-cyan/10 blur-[80px] rounded-full pointer-events-none" />
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
             <div>
                <h2 className="text-2xl font-bold text-white mb-4">Why subscribe?</h2>
                <ul className="space-y-4">
                  {['Emerging tech trends analysis', 'Developer tool reviews', 'System design case studies', 'Career growth for engineers'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle2 size={20} className="text-bc-cyan shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
             </div>
             <div className="text-sm text-gray-400 bg-black/30 p-6 rounded-xl border border-white/5">
               <p className="mb-4 italic">"Cuts through the hype and explains how things actually work. Essential reading for my team."</p>
               <p className="font-bold text-white">— Sarah J., CTO</p>
             </div>
           </div>

           <div className="max-w-lg mx-auto">
              <NewsletterForm variant="tech" />
           </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}