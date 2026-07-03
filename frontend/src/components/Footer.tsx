import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, Phone, Calendar, Dumbbell, MapPin, Map, Share2 } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-zinc-900 bg-zinc-950 text-zinc-400 font-sans mt-auto">
      {/* Visual top border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-zinc-800 via-amber-500/20 to-zinc-800" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          
          {/* Brand Presentation Column */}
          <div className="flex flex-col gap-5">
            <Logo size="md" variant="vertical" className="!items-start !text-left" />
            <p className="font-sans text-xs text-zinc-500 mt-2 leading-relaxed">
              Based in Rishra, West Bengal. We are not a club; we are an unyielding forge of physical resilience. Focused purely on high-caliber strength and raw transformation outcomes since 2021.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 transition-colors hover:border-amber-500 hover:text-[#FFE259]"
                aria-label="Instagram handle"
              >
                <span className="font-mono text-xs font-bold font-mono">IG</span>
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 transition-colors hover:border-amber-500 hover:text-[#FFE259]"
                aria-label="Facebook handle"
              >
                <span className="font-mono text-xs font-bold font-mono">FB</span>
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 transition-colors hover:border-amber-500 hover:text-[#FFE259]"
                aria-label="YouTube channel"
              >
                <span className="font-mono text-xs font-bold font-mono">YT</span>
              </a>
              <a
                href="https://wa.me/918240501258"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-green-950/40 text-green-400 transition-colors hover:border-green-400 hover:text-white"
                aria-label="WhatsApp Hotline"
              >
                <span className="font-mono text-xs font-bold">WA</span>
              </a>
            </div>
          </div>

          {/* Quick Page Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs font-black tracking-widest text-white uppercase border-b-2 border-amber-500 w-fit pb-1">
              GYM SECTIONS
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              {[
                { name: 'Training Facilities', path: '/about' },
                { name: 'Discipline Programs', path: '/programs' },
                { name: 'Elite Coaching Staff', path: '/trainers' },
                { name: 'Rates & Memberships', path: '/memberships' },
                { name: 'Success Galleries', path: '/transformations' },
                { name: 'Interactive BMI Center', path: '/bmi-calculator' },
                { name: 'Fitness & Muscle Blogs', path: '/blog' },
                { name: 'Facility Location Hub', path: '/contact' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <Dumbbell className="h-2.5 w-2.5 text-amber-500" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs font-black tracking-widest text-white uppercase border-b-2 border-amber-500 w-fit pb-1">
              RISHRA HEADQUARTERS
            </h4>
            <ul className="space-y-3 font-sans text-xs">
              <li className="flex gap-2.5 items-start">
                <MapPin className="h-4 w-4 text-[#FFE259] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  24/1 Broad Road, Near Railway Station Platform 1, Rishra, Hooghly, West Bengal, Zip 712248
                </span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone className="h-4 w-4 text-[#FFE259] shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+918240501258" className="hover:text-white leading-none font-bold">
                    +91 82405 01258
                  </a>
                  <a href="tel:+919433799912" className="hover:text-white mt-1 leading-none">
                    +91 94337 99912
                  </a>
                </div>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail className="h-4 w-4 text-[#FFE259] shrink-0" />
                <a href="mailto:contact@tillfailure.com" className="hover:text-white">
                  contact@tillfailure.com
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours & Regional Details */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs font-black tracking-widest text-white uppercase border-b-2 border-[#FFE259] w-fit pb-1">
              IRON HOURS
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-zinc-900">
                <span className="font-medium text-zinc-400">Monday - Friday</span>
                <span className="font-mono text-white font-bold">06:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-900">
                <span className="font-medium text-zinc-400">Saturday</span>
                <span className="font-mono text-white font-bold">06:00 AM - 09:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-900">
                <span className="font-medium text-zinc-400">Sunday (Audit Day)</span>
                <span className="font-mono text-[#FFE259] font-bold">08:00 AM - 01:00 PM</span>
              </div>
            </div>
            
            <div className="mt-3 p-3 rounded-lg border border-amber-500/10 bg-amber-500/5 text-center">
              <span className="font-mono text-[10px] text-amber-400 font-bold tracking-wider uppercase block">
                ⭐ TRANSFORMATIONS COHORT
              </span>
              <p className="font-mono text-[9px] text-zinc-500 mt-1">
                Hooghly's #1 Dedicated Body Transformation Gym
              </p>
            </div>
          </div>

        </div>

        {/* Footer bottom */}
        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="font-mono text-[10px] text-zinc-600">
            &copy; {currentYear} Till Failure Fitness. All Rights Reserved. Rishra, Hooghly. Designed to standard.
          </p>
          <div className="flex gap-4 font-mono text-[10px] text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Charter</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Discipline Guidelines</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Hooghly Gym Rules</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
