"use client";
import Crumbie from './Crumbie';

interface NewsletterFormProps {
  variant?: 'default' | 'crypto' | 'tech';
}

export default function NewsletterForm({ variant = 'default' }: NewsletterFormProps) {
  // Determine specific texts based on variant
  const texts = {
    default: { title: "Join the Stream", subtitle: "Get the latest crumbs delivered to your brain." },
    crypto: { title: "Crypto Foundations", subtitle: "Get notified when my crypto course drops." },
    tech: { title: "Tech Insights", subtitle: "Stay ahead of the curve." }
  };
  
  const currentText = texts[variant];

  return (
    <div className="w-full p-8 rounded-2xl glass-panel border border-white/10 relative overflow-hidden group">
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-bc-purple/20 blur-[50px] rounded-full pointer-events-none" />
      
      {/* Crumbie encourages you to sign up */}
      <div className="absolute -top-2 -right-2 transform rotate-12 opacity-50 group-hover:opacity-100 transition-all duration-500">
         <Crumbie className="w-24 h-24" variant="newsletter" />
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto">
        <h3 className="text-2xl font-[var(--font-orbitron)] font-bold text-white mb-2">{currentText.title}</h3>
        <p className="text-gray-400 mb-6">{currentText.subtitle}</p>
        
        <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="your@email.com" 
            className="flex-1 px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white focus:outline-none focus:border-bc-purple focus:ring-1 focus:ring-bc-purple transition-all placeholder:text-gray-600"
          />
          <button 
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-bc-blue to-bc-purple text-white font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            Subscribe
          </button>
        </form>
        <p className="text-xs text-gray-600 mt-4">No spam. Just pure signal.</p>
      </div>
    </div>
  );
}
