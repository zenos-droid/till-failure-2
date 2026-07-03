import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white selection:bg-amber-500 selection:text-black">
      {/* Navigation Core Container */}
      <Navbar />

      {/* Main Public Content Port */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Structural Footer */}
      <Footer />
    </div>
  );
}
export { MainLayout };
