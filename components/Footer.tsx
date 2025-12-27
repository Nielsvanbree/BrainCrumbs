import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black/40 border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-[var(--font-orbitron)] text-lg font-bold text-white mb-4">brainCrumbs</h3>
            <p className="text-gray-400 text-sm">
              Navigating the future through curiosity, crypto, and technology.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-bc-cyan uppercase tracking-wider mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/curiosity" className="text-gray-400 hover:text-white transition">Curiosity</Link></li>
              <li><Link href="/crypto" className="text-gray-400 hover:text-white transition">Crypto</Link></li>
              <li><Link href="/ai" className="text-gray-400 hover:text-white transition">AI</Link></li>
            </ul>
          </div>
          <div>
             <h4 className="text-sm font-semibold text-bc-purple uppercase tracking-wider mb-4">Future</h4>
             <ul className="space-y-2">
               <li><Link href="/academy" className="text-gray-400 hover:text-white transition">Academy</Link></li>
               <li><Link href="/subscribe" className="text-gray-400 hover:text-white transition">Newsletter</Link></li>
             </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-gray-500">&copy; {new Date().getFullYear()} brainCrumbs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}