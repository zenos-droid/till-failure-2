import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldAlert, Compass, Target, Sparkles, Trophy, Anchor, Landmark } from 'lucide-react';

export default function About() {
  const coreValues = [
    {
      icon: <Trophy className="h-5 w-5 text-black" />,
      title: "Unyielding Standards",
      desc: "We reject the modern dilution of physical effort. We do not baby or flatter; we instruct, spot, and hold our students to high technical execution."
    },
    {
      icon: <Anchor className="h-5 w-5 text-black" />,
      title: "Biomechanical Safety First",
      desc: "Lifting heavier weights is useless if done with poor alignment. Core lumbar bracing, knee trajectories, and scapular control are audited in every set."
    },
    {
      icon: <Compass className="h-5 w-5 text-black" />,
      title: "Absolute Accountability",
      desc: "Missed sets are addressed. Skipped leg days are noted. We create an environment where your peers expect you on the platform inside your selected slot."
    }
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      
      {/* 1. HERO BRAND INTENSITY */}
      <section className="relative px-4 py-20 bg-linear-to-b from-zinc-900 via-zinc-950 to-zinc-950 border-b border-zinc-900 text-center overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 h-64 w-92 rounded-full bg-amber-500/5 blur-[120px]" />
        
        <div className="relative max-w-3xl mx-auto z-10 space-y-4">
          <span className="font-mono text-xs font-black tracking-[0.3em] text-amber-500 uppercase">
            // UNCOMPROMISING LEGACY
          </span>
          <h1 className="font-sans text-4xl sm:text-6xl font-black uppercase tracking-tight">
            OUR STORY: FORGED IN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-[#FFE259] to-yellow-500">
              RISHRA'S HEART
          </span>
          </h1>
          <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl mx-auto">
            Founded in Hooghly district in 2021 as a rebellion against soft commercial gym franchises. We set out to establish a temple of raw barbell values, science, and true, irreversible physical progress.
          </p>
        </div>
      </section>

      {/* 2. DETAILED CHRONOLOGY STORY */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="space-y-6">
          <span className="font-mono text-xs font-black tracking-widest text-[#FFE259] uppercase block">
            THE BIRTH OF HOOGHLY'S ULTIMATE SMITH
          </span>
          <h2 className="font-sans text-2xl sm:text-4xl font-black uppercase tracking-tight">
            REJECTING COZY PATTERNS FOR REAL COMPOUND GRIND
          </h2>
          
          <div className="font-sans text-xs sm:text-sm text-zinc-400 space-y-4 leading-relaxed">
            <p>
              In 2021, the founders of <span className="text-white font-bold">Till Failure</span> looked around the fitness landscape of Hooghly district and saw a disappointing pattern: commercial fitness clubs prioritizing premium aroma diffusers, loud electronic pop playlists, and rows of unused high-tech treadmills over genuine, result-oriented strength education.
            </p>
            <p>
              We rented a modest warehouse room off Broad Road, near Rishra Station, and brought in five premium, hand-welded power cages, standard competition iron, and a single, clear charter: program mathematically, lift heavy with absolute safety parameters, and do not compromise on effort. 
            </p>
            <p>
              Local athletes, software consultants, university students, and business owners who were frustrated with zero physical results started showing up. Today, we stand as Rishra's most respected transformation center, hosting multiple deadlift platforms, high-velocity conditioning cages, and a comprehensive coaching cohort.
            </p>
          </div>

          <div className="border-t border-zinc-900 pt-6 flex gap-8">
            <div>
              <span className="block font-sans text-3xl font-black text-[#FFE259]">
                2021
              </span>
              <span className="block font-mono text-[9px] text-zinc-500 uppercase mt-1">
                Barbell Lab Founded
              </span>
            </div>
            <div>
              <span className="block font-sans text-3xl font-black text-amber-500">
                12+
              </span>
              <span className="block font-mono text-[9px] text-zinc-500 uppercase mt-1">
                Lifting Platform Bays
              </span>
            </div>
            <div>
              <span className="block font-sans text-3xl font-black text-amber-500">
                320+
              </span>
              <span className="block font-mono text-[9px] text-zinc-500 uppercase mt-1">
                Caliper verified cuts
              </span>
            </div>
          </div>
        </div>

        {/* Visual representation card */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-3xl blur-[40px] opacity-10 animate-pulse" />
          
          <div className="relative rounded-2xl border border-zinc-900 bg-zinc-950 p-8 shadow-2xl">
            <div className="absolute top-0 right-10 h-1 text-center w-24 bg-[#FFE259]" />
            
            <div className="flex gap-2 items-center mb-6">
              <Landmark className="h-5 w-5 text-amber-500" />
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-black">
                OUR SANCTUARY DATA
              </span>
            </div>

            <p className="font-sans text-lg font-bold text-white uppercase italic leading-snug">
              "We don't sell membership tokens to keep keys. We register candidates for physical evolution."
            </p>

            <div className="mt-8 space-y-4 font-sans text-xs">
              <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800 flex justify-between">
                <span className="text-zinc-500">Primary Core Facility:</span>
                <span className="text-white font-mono font-bold">Rishra Platform One</span>
              </div>
              <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800 flex justify-between">
                <span className="text-zinc-500">Coaching Qualification Standard:</span>
                <span className="text-amber-400 font-mono font-bold">K11 Master Trainer</span>
              </div>
              <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800 flex justify-between">
                <span className="text-zinc-500">Lifting Platform Weight Classes:</span>
                <span className="text-white font-mono font-bold">Eleiko Steel Reracked</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 3. MISSION, VISION & ETHOS */}
      <section className="bg-zinc-900/40 border-y border-zinc-900 py-24 px-4">
        <div className="mx-auto max-w-5xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4 border-l-4 border-amber-500 pl-6">
              <span className="font-mono text-xs font-black tracking-widest text-[#FFE259] uppercase block">
                MISSION STATEMENT
              </span>
              <h3 className="font-sans text-xl font-black text-white uppercase">
                DEMOCRATIZING SCIENTIFIC ATHLETICISM
              </h3>
              <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                To provide the citizens of Hooghly with elite, uncompromising body transformation execution. We align premium exercise science, dietary precision, and habit blueprints to turn human lethargy into dense athletic strength safely.
              </p>
            </div>

            <div className="space-y-4 border-l-4 border-[#FFE259] pl-6">
              <span className="font-mono text-xs font-black tracking-widest text-amber-500 uppercase block">
                VISION CRITERIA
              </span>
              <h3 className="font-sans text-xl font-black text-white uppercase">
                ESTABLISHING THE TRANSFORMATION CODE
              </h3>
              <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                To become West Bengal's hallmark brand for body transformation. We aim to inspire a disciplined athletic lifestyle where strength training is practiced as a structural asset for mental resilience, health recovery, and personal excellence.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. CORE PHYSICAL ETHICS GRID */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-xl mx-auto space-y-2">
          <span className="font-mono text-xs text-[#FFE259] tracking-widest uppercase font-black block">
            // OUR COMPLIANCE CHARTER
          </span>
          <h2 className="font-sans text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
            THE TILL FAILURE ETHICS CODE
          </h2>
          <p className="font-sans text-xs text-zinc-500">
            Read carefully before completing enrollment. We operate with respect to standard, serious training boundaries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreValues.map((value, idx) => (
            <div key={idx} className="rounded-xl border border-zinc-900 bg-zinc-950 p-6 flex flex-col justify-between">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFE259] mb-4">
                  {value.icon}
                </div>
                <h3 className="font-sans text-base font-black uppercase text-white tracking-tight">
                  {value.title}
                </h3>
                <p className="mt-3 font-sans text-xs text-zinc-400 leading-relaxed">
                  {value.desc}
                </p>
              </div>
              <div className="font-mono text-[9px] text-zinc-600 mt-6 tracking-widest uppercase">
                SECTION NO. 0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. DYNAMIC CALL TO ACTION */}
      <section className="bg-zinc-900 py-16 text-center border-t border-zinc-900 px-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <h3 className="font-sans text-2xl font-black uppercase tracking-tight">
            READY TO JOIN THE RISHRA ASSEMBLY?
          </h3>
          <p className="font-sans text-xs text-zinc-400 max-w-md mx-auto">
            Book an introduction hour with Coach Biplab to inspect the floor and run through your physical postural indices.
          </p>
          <div className="pt-4">
            <Link
              to="/join-now"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-7 py-3 font-sans text-xs font-black tracking-widest text-black uppercase transition-transform active:scale-95"
            >
              SCHEDULE PLATFORM AUDIT
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
