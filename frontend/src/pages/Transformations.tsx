import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scale, Milestone, UserCheck, Flame, Medal, Compass, ChevronRight, X } from 'lucide-react';
import { transformationStoriesData } from '../data';
import { ChallengeRegistrationForm } from '../components/Forms';

export default function Transformations() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Fat Loss' | 'Muscle Gain' | 'Lifestyle'>('All');
  const [showChallengeModal, setShowChallengeModal] = useState(false);

  const filteredStories = activeCategory === 'All' 
    ? transformationStoriesData 
    : transformationStoriesData.filter(s => s.category.includes(activeCategory) || (activeCategory === 'Lifestyle' && s.category === 'Lifestyle Transformation'));

  const categories = [
    { name: 'All Journeys', val: 'All' },
    { name: 'Caloric Cut Fat Loss', val: 'Fat Loss' },
    { name: 'Anabolic Muscle Growth', val: 'Muscle Gain' },
    { name: 'Lifestyle Modifications', val: 'Lifestyle' }
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      
      {/* 1. CINEMATIC IMPACT HEADER */}
      <section className="bg-linear-to-b from-zinc-900 via-zinc-950 to-zinc-950 px-4 py-20 border-b border-zinc-900 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 h-52 w-92 rounded-full bg-amber-500/5 blur-[120px]" />
        
        <div className="relative max-w-3xl mx-auto z-10 space-y-4">
          <span className="font-mono text-xs font-black tracking-[0.3em] text-amber-500 uppercase">
            // UNYIELDING RESULTS IN BULLET NUMBERS
          </span>
          <h1 className="font-sans text-4xl sm:text-6xl font-black uppercase tracking-tight">
            THE HALL OF STEEL
          </h1>
          <p className="font-sans text-xs sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
            We don't sell dream dust or cozy fat burner pills. Read the absolute timelines of local Rishra candidates who lifted heavy, tracked macros, and earned change.
          </p>

          {/* Filter Bar */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat.val}
                onClick={() => setActiveCategory(cat.val as any)}
                className={`py-2 px-4 rounded-full font-mono text-[10px] tracking-wider uppercase font-black transition-all ${
                  activeCategory === tabMatch(cat.val)
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/15'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-805 hover:border-zinc-700 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. REALISTIC BEFORE-AFTER SLIDES COLLECTION */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredStories.map((story) => (
              <motion.div
                key={story.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-2xl border border-zinc-900 bg-zinc-950 p-6 sm:p-10 shadow-2xl hover:border-amber-500/10 transition-colors relative overflow-hidden"
              >
                {/* Design graphic */}
                <div className="absolute top-0 left-0 h-1 w-24 bg-gradient-to-r from-amber-500 to-yellow-500" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Visual Before & After Frame */}
                  <div className="lg:col-span- così grid grid-cols-2 gap-4 lg:col-span-5">
                    
                    {/* Before Image Frame */}
                    <div className="relative rounded-xl overflow-hidden border border-zinc-900 bg-zinc-900/50 h-72">
                      <div className="absolute top-2 left-2 bg-red-600/90 text-white font-mono text-[8px] font-black px-2 py-0.5 rounded tracking-widest uppercase z-10">
                        START STATUS
                      </div>
                      
                      <img
                        src={story.imageUrlBefore}
                        alt="Before"
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 h-full w-full object-cover brightness-[0.35]"
                      />
                      
                      <div className="absolute bottom-4 left-3 right-3 text-center">
                        <Scale className="h-4.5 w-4.5 text-zinc-500 mx-auto mb-1" />
                        <span className="block font-sans font-black text-white text-base leading-none">
                          {story.beforeWeight}
                        </span>
                        <span className="block font-mono text-[7px] text-zinc-500 mt-1 uppercase tracking-widest leading-none">
                          METRIC WEIGHT
                        </span>
                      </div>
                    </div>

                    {/* After Image Frame */}
                    <div className="relative rounded-xl overflow-hidden border border-amber-500/30 bg-zinc-900 h-72">
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-mono text-[8px] font-black px-2 py-0.5 rounded tracking-widest uppercase z-10 animate-pulse">
                        TRANSFORMED
                      </div>

                      <img
                        src={story.imageUrlAfter}
                        alt="After"
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 h-full w-full object-cover brightness-[0.9]"
                      />

                      <div className="absolute bottom-4 left-3 right-3 text-center bg-black/85 backdrop-blur-sm rounded-lg py-1.5 border border-amber-500/20">
                        <span className="block font-sans font-black text-[#FFE259] text-lg leading-none">
                          {story.afterWeight}
                        </span>
                        <span className="block font-mono text-[7px] text-zinc-400 mt-1 uppercase tracking-widest leading-none font-bold">
                          POST TIMELINE
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Detailed Journey Chronology */}
                  <div className="lg:col-span-7 space-y-5">
                    
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-amber-550/10 border border-amber-500/30 rounded px-2.5 py-1 font-mono text-[9px] text-amber-500 font-bold uppercase tracking-widest leading-none">
                          {story.category.toUpperCase()}
                        </span>
                        <span className="font-mono text-[10px] text-zinc-500">
                          Timeline: {story.duration}
                        </span>
                      </div>

                      <h3 className="font-sans text-xl sm:text-2xl font-black text-white uppercase mt-2.5">
                        {story.name}
                      </h3>
                      
                      <span className="block font-mono text-[10px] text-zinc-500 uppercase mt-0.5">
                        {story.profession} • Aged {story.age} • From {story.location}
                      </span>
                    </div>

                    {/* Highly aesthetic metric results list */}
                    <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-850 grid grid-cols-2 gap-4">
                      <div className="border-r border-zinc-800 pr-2">
                        <span className="font-mono text-[8px] text-zinc-550 uppercase tracking-widest block">
                          CORE ACHIEVEMENT DELTA
                        </span>
                        <span className="font-sans font-black text-sm text-[#FFE259] uppercase block mt-1">
                          {story.achievement}
                        </span>
                      </div>
                      <div>
                        <span className="font-mono text-[8px] text-zinc-550 uppercase tracking-widest block">
                          OVERSIGHT INSTRUCTOR
                        </span>
                        <span className="font-sans font-black text-sm text-white uppercase block mt-1">
                          {story.trainer}
                        </span>
                      </div>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed italic border-l-2 border-amber-500 pl-4">
                      "{story.story}"
                    </p>

                    <div className="pt-2 flex items-center gap-2 text-zinc-500 text-xs">
                      <Medal className="h-4 w-4 text-[#FFE259] shrink-0" />
                      <span className="font-mono text-[10px] uppercase tracking-widest font-black text-zinc-400">
                        Verified Till Failure Transformation index card
                      </span>
                    </div>

                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </section>

      {/* 3. SIGNUP CHALLENGE BLOCK */}
      <section className="bg-zinc-900/40 border-t border-zinc-900 py-24 px-4 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-amber-500 to-yellow-500 text-black">
            <Flame className="h-8 w-8 animate-pulse" />
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            UNCHAIN THE ENTIRE TRANSFORM MATRIX
          </h2>
          <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
            Stop scrolling and looking at others. Join our active 12-Week body Transformation cohorts. Full nutritional blueprints, caliper checks, and uncompromising platform supervision.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setShowChallengeModal(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-3 font-sans text-xs font-black tracking-widest text-black uppercase shadow-lg hover:scale-98 transition-transform"
            >
              <span>APPLY FOR CHALLENGE REGISTRATION</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Challenge modal popup */}
      <AnimatePresence>
        {showChallengeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowChallengeModal(false)}
              className="absolute inset-x-0 inset-y-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              className="relative w-full max-w-lg bg-zinc-950 border border-amber-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl z-10"
            >
              <div className="flex justify-between items-center mb-6 pb-2 border-b border-zinc-900">
                <span className="font-sans font-black text-white uppercase text-xs sm:text-sm">
                  TRANSFORM CHALLENGE CONTRACT REGISTRY
                </span>
                <button
                  onClick={() => setShowChallengeModal(false)}
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ChallengeRegistrationForm onSuccess={() => setShowChallengeModal(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

function tabMatch(tab: string) {
  if (tab === 'All') return 'All';
  if (tab === 'Fat Loss') return 'Fat Loss';
  if (tab === 'Muscle Gain') return 'Muscle Gain';
  return 'Lifestyle';
}
