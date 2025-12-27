import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { FeatureFlagProvider } from "@/lib/feature-flags";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const orbitron = Orbitron({ subsets: ["latin"], variable: '--font-orbitron' });

export const metadata: Metadata = {
  title: "brainCrumbs | Futuristic Insights",
  description: "Deep dives into Curiosity, Crypto, and Tech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>
) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${orbitron.variable} font-sans antialiased bg-background text-foreground selection:bg-bc-purple selection:text-white`}>
        <AuthProvider>
          <FeatureFlagProvider>
            <div className="fixed inset-0 -z-10 opacity-20 pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-bc-purple blur-[120px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-bc-blue blur-[120px]" />
            </div>
            {children}
          </FeatureFlagProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
