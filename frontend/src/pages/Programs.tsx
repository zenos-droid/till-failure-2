import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dumbbell, Target, Clock, UserCheck, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { programsData } from '../data';
import { TrainerConsultationForm } from '../components/Forms';

export default function Programs() {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [consultingProgram, setConsultingProgram] = useState<string | null>(null);

  const filteredPrograms = selectedFilter === 'All' 
    ? programsData 
    : programsData.filter(p => p.intensity === selectedFilter);

  const filterTabs = [
    { name: 'All Curriculums', val: 'All' },
    { name: 'Beginner Foundations', val: 'Beginner' },
    { name: 'Intermediate Hardcore', val: 'Intermediate' },
    { name: 'Elite Athlete Blocks', val: 'Advanced' }
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      
      {/* 1. CINEMATIC HEADER */}
      <section className="bg-linear-to-b from-zinc-900 via-zinc-950 to-zinc-950 px-4 py-20 border-b border-zinc-900 text-center relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-64 w-92 rounded-full bg-amber-500/5 blur-[120px]" />
        
        <div className="relative max-w-3xl mx-auto z-10 space-y-4">
          <span className="font-mono text-xs font-black tracking-[0.3em] text-[#FFE259] uppercase">
            // MATHEMATICAL HARDCORE REPS
          </span>
          <h1 className="font-sans text-4xl sm:text-6xl font-black uppercase tracking-tight">
            TRANSFORMATION PROGRAMMING
          </h1>
          <p className="font-sans text-xs sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Choose your physical vector. Every curriculum below has been curated using rigorous sport physiology parameters to maximize lean muscle retention and raw athletic power.
          </p>

          {/* Filter Bar */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-2">
            {filterTabs.map(tab => (
              <button
                key={tab.val}
                onClick={() => setSelectedFilter(tab.val as any)}
                className={`py-2 px-4 rounded-full font-mono text-[10px] tracking-wider uppercase font-black transition-all ${
                  selectedFilter === tab.val
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/15'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. PROGRAMMING LISTING GRID */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPrograms.map((program) => (
              <motion.div
                key={program.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="group relative rounded-2xl border border-zinc-900 bg-zinc-950 overflow-hidden shadow-2xl hover:border-amber-500/30 transition-colors"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 h-full">
                  
                  {/* Visual Left Frame */}
                  <div className="sm:col-span-5 relative h-52 sm:h-full min-h-[220px]">
                    <img
                      src={program.imageUrl}
                      alt={program.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-zinc-950 via-zinc-950/20 to-transparent" />
                    
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block font-mono text-[8px] font-black tracking-widest bg-amber-500 text-black px-2 py-0.5 rounded uppercase">
                        {program.intensity}
                      </span>
                      <span className="block font-mono text-[9px] text-zinc-300 font-bold tracking-widest uppercase mt-1">
                        SEC: 0{program.id.length}
                      </span>
                    </div>
                  </div>

                  {/* Content Right Frame */}
                  <div className="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Dumbbell className="h-4 w-4 text-amber-500" />
                        <h3 className="font-sans text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                          {program.title}
                        </h3>
                      </div>
                      <span className="block font-mono text-[9px] text-zinc-500 uppercase mt-0.5 tracking-wider font-semibold">
                        {program.tagline}
                      </span>
                      
                      <p className="mt-3 font-sans text-xs text-zinc-400 leading-relaxed">
                        {program.description}
                      </p>

                      {/* Micro Specs List */}
                      <div className="mt-4 grid grid-cols-2 gap-3 pb-4 border-b border-zinc-900">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3 text-zinc-500" />
                          <span className="font-mono text-[10px] text-zinc-400">{program.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <UserCheck className="h-3 w-3 text-zinc-500" />
                          <span className="font-mono text-[10px] text-zinc-400 truncate">{program.coachingStyle.split(' ')[0]} Frame</span>
                        </div>
                      </div>

                      {/* Program goals and benefits */}
                      <div className="mt-4 space-y-2">
                        <span className="font-mono text-[9px] tracking-wider text-[#FFE259] font-black uppercase">
                          Target Objectives / Deliverables:
                        </span>
                        <ul className="space-y-1 text-zinc-400 font-sans text-xs">
                          {program.goals.map((g, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle2 className="h-3 w-3 text-amber-500 shrink-0" />
                              <span className="truncate">{g}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => setConsultingProgram(program.title)}
                        className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 hover:text-[#FFE259] py-3 text-center border border-zinc-800 font-sans text-[11px] font-black tracking-widest text-zinc-200 uppercase transition-colors"
                      >
                        <span>BOOK PROGRAM AUDIT</span>
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>

                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </section>

      {/* Assessment Modal Popover */}
      <AnimatePresence>
        {consultingProgram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConsultingProgram(null)}
              className="absolute inset-x-0 inset-y-0 bg-black/85 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              className="relative w-full max-w-lg bg-zinc-950 border border-amber-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-amber-500/5 z-10"
            >
              <div className="flex justify-between items-center mb-6 pb-2 border-b border-zinc-900">
                <span className="font-sans font-black text-white uppercase text-sm">
                  INITIALIZE PROGRAM ASSIGNMENT
                </span>
                <button
                  onClick={() => setConsultingProgram(null)}
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-center mb-5">
                <span className="font-mono text-[9px] text-[#FFE259] tracking-widest block uppercase font-bold">
                  PROGRAM FOCUS TARGET:
                </span>
                <span className="font-sans text-sm font-black text-white block uppercase mt-1">
                  {consultingProgram}
                </span>
              </div>

              <TrainerConsultationForm
                preSelectedTrainer={`Coach Biplab (Assign to: ${consultingProgram})`}
                onSuccess={() => setConsultingProgram(null)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
