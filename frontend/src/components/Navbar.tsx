import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, CalendarRange, UserCheck, Flame } from 'lucide-react';
import Logo from './Logo';
import { useGymStore } from '../store/gymStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentUser = useGymStore((state) => state.currentUser);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Trainers', path: '/trainers' },
    { name: 'Memberships', path: '/memberships' },
    { name: 'Transformations', path: '/transformations' },
    { name: 'BMI Tool', path: '/bmi-calculator' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-zinc-950/90 backdrop-blur-xl">
      {/* Design Line representing pure golden power */}
      <div className="h-1 bg-gradient-to-r from-amber-600 via-[#FFE259] to-amber-600 w-full" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo Brand Wing */}
          <Link to="/" className="flex-shrink-0 transition-transform active:scale-95">
            <Logo size="md" variant="full" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg font-mono text-[11px] tracking-wider uppercase font-bold transition-all hover:bg-zinc-900/60 ${
                    isActive
                      ? 'text-[#FFE259] bg-[#FFE259]/5 border-b-2 border-[#FFE259] rounded-b-none'
                      : 'text-zinc-400 hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* CTA Membership Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+918240501258"
              className="flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-[#FFE259] transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>+91 82405 01258</span>
            </a>
            
            <Link
              to={currentUser ? "/portal" : "/login"}
              className="px-3.5 py-2.5 bg-zinc-900 hover:bg-zinc-850 text-[#FFE259] hover:text-[#FFE259] border border-zinc-800 hover:border-[#FFE259]/50 rounded-xl font-mono text-[11px] font-bold uppercase tracking-wider transition-all"
            >
              {currentUser ? "⚡ PORTAL" : "🔑 PORTAL LOGIN"}
            </Link>

            <Link
              to="/join-now"
              className="relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 px-5 py-2.5 font-sans text-xs font-black tracking-widest text-black uppercase transition-all shadow-lg hover:shadow-amber-500/10 hover:brightness-110 active:scale-[0.98]"
            >
              <Flame className="h-3.5 w-3.5 animate-pulse" />
              <span>JOIN NOW</span>
            </Link>
          </div>

          {/* Mobile Menu Action Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to={currentUser ? "/portal" : "/login"}
              className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[#FFE259] font-mono text-[10px] uppercase font-bold tracking-wider"
            >
              {currentUser ? "PORTAL" : "LOGIN"}
            </Link>
            <Link
              to="/join-now"
              className="inline-flex items-center justify-center p-2.5 rounded-lg bg-[#FFE259] text-black font-sans font-black text-[10px] tracking-widest uppercase"
            >
              JOIN
            </Link>
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white focus:outline-none transition-colors border border-zinc-800"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="h-5 w-5 text-[#FFE259]" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute left-0 right-0 border-b border-zinc-900 bg-zinc-950 p-6 shadow-2xl z-40"
          >
            <div className="space-y-2 flex flex-col">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl font-mono text-xs tracking-wider uppercase font-bold transition-all ${
                      isActive
                        ? 'text-[#FFE259] bg-[#FFE259]/10 border-l-4 border-[#FFE259]'
                        : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="pt-4 mt-2 border-t border-zinc-900 flex flex-col gap-4">
                <a
                  href="tel:+918240501258"
                  className="flex items-center gap-2.5 px-4 font-mono text-xs text-zinc-400"
                >
                  <Phone className="h-4 w-4 text-amber-500" />
                  <span>Call Desk: +91 82405 01258</span>
                </a>
                <Link
                  to="/join-now"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 step-join-btn to-yellow-500 py-3.5 font-sans font-black tracking-widest text-black uppercase text-xs"
                >
                  <Flame className="h-4 w-4 animate-bounce" />
                  JOIN TILL FAILURE NOW
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
