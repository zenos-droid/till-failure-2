import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, UserCheck, Flame, Compass, GraduationCap, ArrowRight, X } from 'lucide-react';
import { trainersData } from '../data';
import { TrainerConsultationForm } from '../components/Forms';

export default function Trainers() {
  const [bookingCoach, setBookingCoach] = useState<string | null>(null);

  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      
      {/* 1. SECTION INTUITIVE HEADER */}
      <section className="bg-linear-to-b from-zinc-900 via-zinc-950 to-zinc-950 px-4 py-20 border-b border-zinc-900 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/3 h-52 w-92 rounded-full bg-amber-500/5 blur-[120px]" />
        
        <div className="relative max-w-3xl mx-auto z-10 space-y-4">
          <span className="font-mono text-xs font-black tracking-[0.3em] text-[#FFE259] uppercase">
            // UNCOMPROMISING INSTRUCTION COHORT
          </span>
          <h1 className="font-sans text-4xl sm:text-6xl font-black uppercase tracking-tight">
            OUR COACHING COHORT
          </h1>
          <p className="font-sans text-xs sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
            We do not employ floor collectors. Every leader below has completed comprehensive national biomechanical certifications and sports nutrition degrees to optimize human capacity safely.
          </p>
        </div>
      </section>

      {/* 2. TRAINER CARDS ASSEMBLY */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainersData.map((trainer) => (
            <div
              key={trainer.id}
              className="group relative rounded-2xl border border-zinc-900 bg-zinc-950 overflow-hidden shadow-2xl flex flex-col justify-between hover:border-amber-500/30 transition-all duration-300"
            >
              {/* Graphic top band */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-900 group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-yellow-500 transition-all" />

              <div>
                
                {/* Visual Avatar Frame */}
                <div className="relative h-64 overflow-hidden bg-zinc-900">
                  <img
                    src={trainer.imageUrl}
                    alt={trainer.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  
                  {/* Floating Insta banner */}
                  {trainer.instagram && (
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur border border-zinc-800 rounded px-2.5 py-1 font-mono text-[9px] tracking-widest text-[#FFE259] font-black uppercase">
                      @{trainer.instagram}
                    </div>
                  )}

                  {/* Position title on avatar border */}
                  <div className="absolute bottom-4 left-5 right-5">
                    <span className="font-mono text-[9px] tracking-widest text-[#FFE259] uppercase font-black bg-black/80 px-2 py-1 rounded">
                      {trainer.experience}
                    </span>
                    <h3 className="font-sans text-lg sm:text-xl font-bold text-white uppercase mt-2 drop-shadow-md leading-none">
                      {trainer.name}
                    </h3>
                    <span className="block font-sans text-[11px] text-zinc-400 mt-1 uppercase font-semibold leading-none">
                      {trainer.role}
                    </span>
                  </div>
                </div>

                {/* Info block */}
                <div className="p-6 space-y-4">
                  
                  {/* Specialties tag block */}
                  <div className="space-y-1.5">
                    <span className="block font-mono text-[9px] text-[#FFE259] uppercase tracking-widest font-black">
                      Focus Areas / Specialization:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {trainer.specialty.map((s, idx) => (
                        <span key={idx} className="bg-zinc-900 border border-zinc-800 rounded px-2 py-0.5 font-sans text-[10px] text-zinc-300 transition-colors hover:border-zinc-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications ledger */}
                  <div className="space-y-1.5">
                    <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest font-bold">
                      National Credentials held:
                    </span>
                    <ul className="space-y-1 font-sans text-xs text-zinc-400">
                      {trainer.certifications.map((c, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <GraduationCap className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <span className="leading-snug text-[11px]">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Private philosophy block */}
                  <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-850">
                    <span className="font-mono text-[8px] text-zinc-500 tracking-wider uppercase block">
                      MANTRA DIALOGUE:
                    </span>
                    <p className="font-sans text-[11px] text-zinc-400 mt-1 leading-normal italic">
                      "{trainer.philosophy}"
                    </p>
                  </div>

                </div>
              </div>

              {/* Booking CTAs */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setBookingCoach(trainer.name)}
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 hover:text-[#FFE259] border border-zinc-800 py-3 font-sans text-xs font-black tracking-widest text-[#FFE259] uppercase transition-all active:scale-[0.98]"
                >
                  <span>REQUEST ASSESS PROTOCOL</span>
                  <ArrowRight className="h-4 w-4 text-white" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* Booking popup */}
      <AnimatePresence>
        {bookingCoach && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingCoach(null)}
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
                  INITIALIZE ACQUISITION CONSULTATION
                </span>
                <button
                  onClick={() => setBookingCoach(null)}
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-center mb-5">
                <span className="font-mono text-[9px] text-zinc-500 tracking-widest block">
                  ASSIGNED COACHING TARGET:
                </span>
                <span className="font-sans text-sm font-black text-[#FFE259] block uppercase mt-1">
                  {bookingCoach}
                </span>
              </div>

              <TrainerConsultationForm
                preSelectedTrainer={bookingCoach}
                onSuccess={() => setBookingCoach(null)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
