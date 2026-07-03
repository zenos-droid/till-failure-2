import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Target, ShieldCheck, Zap, ArrowRight, Star, Dumbbell, Award, Flame, Navigation, Scale } from 'lucide-react';
import { trainersData, transformationStoriesData, membershipPlansData, programsData } from '../data';
import { FreeTrialForm } from '../components/Forms';

export default function Home() {
  const [activeStory, setActiveStory] = useState(0);
  const [showPassModal, setShowPassModal] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 20 } }
  };

  return (
    <div className="bg-zinc-950 text-white overflow-hidden">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/60 via-zinc-950 to-zinc-950 px-4 py-20 border-b border-zinc-900">
        
        {/* Abstract background graphics representing heavy industrial steel lines */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-amber-500/5 via-zinc-950/0 to-zinc-950/0 opacity-60" />
        <div className="absolute top-1/4 left-1/10 h-72 w-72 rounded-full bg-amber-500/5 blur-[120px] animate-pulse" />
        
        {/* Background Image overlay for supreme agency quality */}
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-25"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1600')` }}
        />

        <div className="relative mx-auto max-w-5xl text-center z-10">
          
          {/* Ticker / Alert Tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 mb-8"
          >
            <Flame className="h-4 w-4 text-[#FFE259]" />
            <span className="font-mono text-[10px] sm:text-xs font-black tracking-[0.2em] text-white uppercase">
              RISHRA'S FLAGSHIELD TRANSFORMATIONS HUB
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="font-sans text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]"
          >
            BUILT THROUGH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-[#FFE259] to-yellow-500">
              DISCIPLINE
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-6 max-w-xl font-sans text-sm sm:text-lg text-zinc-400 tracking-wide leading-relaxed"
          >
            No shortcuts. No soft excuses. Welcome to the unyielding forge of Rishra where we lift <span className="text-white font-bold">Till Failure</span>, correct postures, and build legendary bodies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/join-now"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-8 py-4 font-sans text-sm font-black tracking-widest text-black uppercase shadow-lg shadow-amber-500/10 transition-transform active:scale-95"
            >
              <span>LOCK MEMBERSHIP</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            
            <button
              onClick={() => setShowPassModal(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/40 backdrop-blur-sm px-8 py-4 font-sans text-sm font-black tracking-widest text-[#FFE259] uppercase transition-colors hover:bg-zinc-900"
            >
              <span>1-DAY FREE PASS</span>
            </button>
          </motion.div>

          {/* Quick numbers bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-zinc-900 pt-10"
          >
            {[
              { num: '320+', label: 'Transformations Done' },
              { num: '1000+', label: 'Sells of Iron lift logs' },
              { num: '6', label: 'Elite certified coaches' },
              { num: '12+', label: 'Elite Lifting Stations' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <span className="block font-sans text-2xl sm:text-3xl font-black text-amber-500">
                  {stat.num}
                </span>
                <span className="block font-mono text-[9px] sm:text-[10px] tracking-wider text-zinc-500 uppercase mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* 2. WHY TILL FAILURE (CORE CULTURE) */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        
        <div className="text-center md:text-left md:flex md:items-end md:justify-between mb-16">
          <div className="max-w-xl">
            <span className="font-mono text-xs font-black tracking-[0.25em] text-amber-500 uppercase">
              // REJECT FRAGILE STANDARDS
            </span>
            <h2 className="mt-3 font-sans text-3xl sm:text-5xl font-black uppercase tracking-tight">
              WHY TILL FAILURE?
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-xs font-sans text-xs text-zinc-500 leading-relaxed text-center md:text-left">
            We operate Hooghly's premiere strength lines. If you are here to purely check emails on cards, we are wrong. We build actual steel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Dumbbell className="h-6 w-6 text-black" />,
              title: "Scientific Progressive Overload",
              desc: "Every workout session is logged. No random guesswork. We log lifting velocity, physical micro-progressions, and reps to failure to build real mass reserves."
            },
            {
              icon: <Award className="h-6 w-6 text-black" />,
              title: "K11 & Gold's Gym Certs Only",
              desc: "Our trainers are not standard local floor-helpers. They possess rigorous state certifications in anatomical biomechanics, structural alignments, and active macro dietetics."
            },
            {
              icon: <Target className="h-6 w-6 text-black" />,
              title: "Aggressive Metric Audits",
              desc: "Every 2 weeks, we track your body fat caliper metrics, structural body alignments, and micro dietary calorie math to guarantees real fat loss."
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl border border-zinc-900 bg-zinc-950 p-8 hover:border-amber-500/40 transition-all duration-300 shadow-xl"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#FFE259] transition-all rounded-t-2xl" />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFE259] to-amber-500 mb-6">
                {item.icon}
              </div>
              <h3 className="font-sans text-lg font-black uppercase text-white tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 font-sans text-xs text-zinc-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PROGRAMS SUMMARY SCROLL */}
      <section className="bg-zinc-900/40 border-y border-zinc-900 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between mb-12">
            <div>
              <span className="font-mono text-xs font-black tracking-[0.25em] text-[#FFE259] uppercase block text-center sm:text-left">
                // ACTIVE SYSTEM CURRICULUMS
              </span>
              <h2 className="mt-2 font-sans text-3xl sm:text-5xl font-black uppercase tracking-tight text-center sm:text-left">
                DISCIPLINE PROGRAMS
              </h2>
            </div>
            
            <Link
              to="/programs"
              className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 font-mono text-xs text-amber-500 hover:text-white uppercase font-bold"
            >
              <span>Explore 8 Programs</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programsData.slice(0, 4).map((program) => (
              <div
                key={program.id}
                className="group overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950 shadow-2xl hover:border-[#FFE259]/30 transition-all"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={program.imageUrl}
                    alt={program.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  <span className="absolute bottom-3 left-4 font-mono text-[9px] font-black tracking-widest bg-amber-500 text-black px-2.5 py-1 rounded">
                    {program.intensity.toUpperCase()}
                  </span>
                </div>
                
                <div className="p-6">
                  <h3 className="font-sans text-base font-black text-white uppercase tracking-tight">
                    {program.title}
                  </h3>
                  <p className="font-mono text-[10px] text-zinc-500 mt-1 uppercase">
                    {program.tagline}
                  </p>
                  <p className="mt-3 font-sans text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {program.description}
                  </p>
                  <Link
                    to="/programs"
                    className="mt-4 inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#FFE259] hover:text-white"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. BEFORE-AFTER LIVING PROOF */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs font-black tracking-[0.25em] text-[#FFE259] uppercase block">
              // NO SHAME, JUST SUCCESS
            </span>
            <h2 className="font-sans text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none">
              REAL LIVING PROTOCOLS
            </h2>
            <p className="font-sans text-sm text-zinc-400 leading-relaxed">
              Before and after numbers represent facts. These aren't paid models from California. These are local Hooghly IT consultants, Serampore students, and local mothers who committed 100% to the iron floor.
            </p>

            <div className="space-y-4">
              {transformationStoriesData.map((story, idx) => (
                <button
                  key={story.id}
                  onClick={() => setActiveStory(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    activeStory === idx
                      ? 'border-amber-500 bg-amber-500/5'
                      : 'border-zinc-900 bg-zinc-950 hover:bg-zinc-900/40'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-sans font-black text-xs uppercase text-white">
                      {story.name}
                    </span>
                    <span className="font-mono text-[10px] text-amber-500 font-bold uppercase">
                      {story.category}
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-zinc-500 mt-1">
                    {story.achievement} • {story.duration}
                  </p>
                </button>
              ))}
            </div>

            <Link
              to="/transformations"
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 text-white font-mono text-xs font-bold leading-none px-5 py-3 hover:bg-zinc-800 transition-colors"
            >
              <span>Explore All Transformations</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#FFE259]" />
            </Link>
          </div>

          {/* Before After interactive view */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-900 bg-zinc-950 shadow-2xl p-6 sm:p-8">
              
              <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                
                {/* Images comparison section */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 h-64">
                    <div className="absolute top-2 left-2 bg-black/80 backdrop-blur text-red-500 text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase z-10">
                      BEFORE ({transformationStoriesData[activeStory].beforeWeight})
                    </div>
                    {/* Dark silhouette preview with active client text */}
                    <img
                      src={transformationStoriesData[activeStory].imageUrlBefore}
                      alt="Before"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 h-full w-full object-cover brightness-[0.4]"
                    />
                    <div className="absolute bottom-3 left-3 text-center right-3">
                      <Scale className="h-5 w-5 text-red-500 opacity-60 mx-auto mb-1" />
                      <span className="block font-sans font-black text-white text-base">
                        {transformationStoriesData[activeStory].beforeWeight}
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative overflow-hidden rounded-xl border border-amber-500/30 bg-zinc-900 h-64">
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-[9px] font-mono font-black px-2 py-0.5 rounded uppercase z-10 animate-pulse">
                      AFTER ({transformationStoriesData[activeStory].afterWeight})
                    </div>
                    <img
                      src={transformationStoriesData[activeStory].imageUrlAfter}
                      alt="After"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 h-full w-full object-cover brightness-95"
                    />
                    <div className="absolute bottom-3 left-3 right-3 text-center bg-black/75 backdrop-blur-sm rounded-lg py-1 border border-amber-500/30">
                      <span className="block font-sans font-black text-[#FFE259] text-base leading-none">
                        {transformationStoriesData[activeStory].afterWeight}
                      </span>
                      <span className="block font-mono text-[7px] text-zinc-400 mt-0.5 uppercase tracking-widest font-black">
                        PROUD OUTCOME
                      </span>
                    </div>
                  </div>
                </div>

                {/* Narrative section */}
                <div className="space-y-4">
                  <div>
                    <span className="font-mono text-[9px] text-[#FFE259] tracking-widest uppercase font-black">
                      SUCCESS PROTOCOL #{transformationStoriesData[activeStory].id.slice(0, 5).toUpperCase()}
                    </span>
                    <h3 className="font-sans text-xl font-black text-white uppercase mt-1 leading-none">
                      {transformationStoriesData[activeStory].name}
                    </h3>
                    <p className="font-mono text-[10px] text-zinc-500 mt-1 uppercase">
                      {transformationStoriesData[activeStory].profession} • age {transformationStoriesData[activeStory].age}
                    </p>
                  </div>

                  <p className="font-sans text-xs text-zinc-400 leading-relaxed italic border-l-2 border-amber-500 pl-3">
                    "{transformationStoriesData[activeStory].story}"
                  </p>

                  <div className="rounded-lg bg-zinc-900/60 p-3.5 border border-zinc-800">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 block">
                      ASSIGNED COACHING LEAD
                    </span>
                    <span className="font-sans font-black text-xs text-white uppercase block mt-0.5">
                      {transformationStoriesData[activeStory].trainer}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. MEMBERSHIP PREVIEW TRIGGER */}
      <section className="bg-zinc-900/30 border-t border-zinc-900 py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <span className="font-mono text-xs font-black tracking-[0.25em] text-amber-500 uppercase">
            // UNCOMPROMISING VALUE
          </span>
          <h2 className="mt-2 font-sans text-3xl sm:text-5xl font-black uppercase tracking-tight">
            ACCESSIBLE STRENGTH COESIONS
          </h2>
          <p className="mt-4 mx-auto max-w-lg font-sans text-xs sm:text-sm text-zinc-400">
            We operate fully open rates with zero hidden franchise fee overheads. Clean. Absolute. Pure barbell values.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
            {membershipPlansData.slice(0, 3).map((plan) => (
              <div
                key={plan.id}
                className="rounded-xl border border-zinc-850 bg-zinc-950 p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-[#FFE259] font-black uppercase">
                    {plan.tagline}
                  </span>
                  <h3 className="font-sans text-lg font-black text-white uppercase mt-1">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="font-mono text-2xl font-black text-white">₹{plan.price}</span>
                    <span className="font-sans text-xs text-zinc-500">/ {plan.duration}</span>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    to="/memberships"
                    className="w-full inline-flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 hover:bg-zinc-850 py-2 px-3 font-mono text-[10px] text-zinc-300 font-bold uppercase transition-all"
                  >
                    View Details & Join
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BMI HIGH FIDELITY MODULE */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 border-t border-zinc-900">
        <div className="rounded-3xl border border-zinc-900 bg-linear-to-b from-zinc-950 to-zinc-900 p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-amber-500/5 blur-[120px]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-xs font-black tracking-[0.25em] text-[#FFE259] uppercase block">
                // CHECK YOUR METRIC REALITY
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl font-black uppercase tracking-tight">
                COMPUTE YOUR TARGET VECTOR
              </h2>
              <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                Before booking, utilize our dynamic health dashboard mapping. Learn which specific intensity line fits your current BMI structure best.
              </p>
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="font-sans text-[11px] text-zinc-500 leading-normal">
                  Our calculations are based on standard sports biological indexes and prioritize lean skeletal density matching.
                </p>
              </div>
              <Link
                to="/bmi-calculator"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-black text-[#FFE259] uppercase hover:text-white pt-2"
              >
                <span>Launch Advanced Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="lg:col-span-7 bg-zinc-950 border border-zinc-850 rounded-2xl p-6 sm:p-8">
              <BMIShortForm />
            </div>
          </div>
        </div>
      </section>

      {/* 7. ATHLETIC MEDIA GALLERY */}
      <section className="bg-zinc-900/30 border-y border-zinc-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-mono text-xs font-zinc-550 block font-black uppercase tracking-widest text-[#FFE259]">
            #TILLFAILURECAMPUS
          </span>
          <h2 className="font-sans text-xl font-bold uppercase tracking-widest mt-1 text-zinc-300">
            OUR SACRED CHAMBER OF METAL
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              {
                url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400',
                title: 'Lifting Platform Base'
              },
              {
                url: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=400',
                title: 'Custom Rogue Dumbbell Racks'
              },
              {
                url: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=400',
                title: 'Metcon Kettlebell Arena'
              },
              {
                url: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=400',
                title: 'High Velocity Heavy Cage'
              },
            ].map((pic, idx) => (
              <div key={idx} className="group relative h-40 md:h-56 overflow-hidden rounded-xl border border-zinc-800">
                <img
                  src={pic.url}
                  alt={pic.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <span className="font-sans font-black text-xs text-white uppercase tracking-wider text-center">
                    {pic.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. MOTIVATIONAL CTA STRIP */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-r from-amber-600 to-yellow-600 text-black px-4 text-center">
        <div className="absolute -top-12 -left-12 h-44 w-44 rounded-full bg-white/10 blur-xl" />
        
        <div className="relative mx-auto max-w-4xl z-10 space-y-6">
          <span className="font-mono text-xs font-black tracking-[0.3em] uppercase leading-none text-black/80 block">
            ★ YOUR TURN PROTOCOLS ★
          </span>
          <h2 className="font-sans text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none text-black">
            STRENGTH DEMANDS DECISION.
          </h2>
          <p className="mx-auto max-w-lg font-sans text-sm font-bold text-black/85 leading-relaxed">
            Stop waiting for the next calendar year. The iron floor at Rishra is open right now. Book your assessment slot or lock in your pricing portfolio.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/join-now"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-black px-8 py-4 font-sans text-xs font-black tracking-widest text-[#FFE259] uppercase shadow-2xl transition-transform active:scale-95"
            >
              <span>ENTER THE MOVEMENT</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border-2 border-black bg-transparent px-8 py-4 font-sans text-xs font-black tracking-widest text-black uppercase transition-colors hover:bg-black hover:text-white"
            >
              <span>TALK TO COACH BIPLAB</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 1-day pass modal popup */}
      {showPassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-y-0 inset-x-0 bg-black/80 backdrop-blur" onClick={() => setShowPassModal(false)} />
          <div className="relative w-full max-w-md bg-zinc-950 border border-amber-500 rounded-2xl p-6 sm:p-8 shadow-2xl z-10">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-zinc-900">
              <span className="font-sans font-black text-white uppercase text-sm">
                CLAIM YOUR FREE DAY PASS
              </span>
              <button 
                onClick={() => setShowPassModal(false)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <XButton />
              </button>
            </div>
            <FreeTrialForm onSuccess={() => {}} />
          </div>
        </div>
      )}

    </div>
  );
}

function BMIShortForm() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [tier, setTier] = useState('');

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (!w || !h) return;
    
    const bmiVal = parseFloat((w / (h * h)).toFixed(1));
    setBmi(bmiVal);
    
    if (bmiVal < 18.5) {
      setTier('Gain-Weight Hypertrophy Track (Priority)');
    } else if (bmiVal >= 18.5 && bmiVal < 25) {
      setTier('Lean Definition & Strength Progression Program');
    } else {
      setTier('12-Week Metcon Transformation Deficit Shred');
    }
  };

  return (
    <form onSubmit={calculate} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1 font-bold">
            Weight (KG)
          </label>
          <input
            type="number"
            required
            placeholder="e.g. 74"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 font-mono text-sm text-white"
          />
        </div>
        <div>
          <label className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1 font-bold">
            Height (CM)
          </label>
          <input
            type="number"
            required
            placeholder="e.g. 175"
            value={height}
            onChange={e => setHeight(e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 font-mono text-sm text-white"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-500 py-3 font-sans font-bold text-xs uppercase tracking-wider text-[#FFE259] transition-all"
      >
        Calculate Level Class
      </button>

      {bmi !== null && (
        <div className="mt-4 p-4 rounded-xl bg-[#FFE259]/5 border border-[#FFE259]/20 text-center">
          <span className="font-mono text-[9px] text-[#FFE259] tracking-widest uppercase block mb-1">
            CALCULATION COMPLETE
          </span>
          <span className="font-sans font-black text-2xl text-white">
            BMI indices: <span className="text-[#FFE259]">{bmi}</span>
          </span>
          <span className="block font-mono text-[10px] text-zinc-300 uppercase mt-2">
            Target Tier: <span className="text-white font-bold block mt-1">{tier}</span>
          </span>
        </div>
      )}
    </form>
  );
}

function XButton() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
