import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Check, Flame, Award, ShieldAlert, Zap, Compass, CheckCircle2 } from 'lucide-react';
import { MembershipEnquiryForm, SuccessModal } from '../components/Forms';

export default function JoinNow() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    objective: 'Muscle Gain',
    tier: 'Quarterly',
    fullName: '',
    phone: '',
    email: '',
    slot: 'Morning Frame (6AM - 10AM)',
    hasAgreement: false
  });
  const [isDone, setIsDone] = useState(false);

  const handleNext = () => {
    if (step === 1 && !formData.objective) return;
    if (step === 2 && !formData.tier) return;
    if (step === 3 && (!formData.fullName || !formData.phone)) {
      alert("Name and Active Phone Number are mandatory to lock reservation parameters.");
      return;
    }
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.hasAgreement) {
      alert("Please check your input parameters and fully endorse the Discipline Pledge to finish registration.");
      return;
    }
    setIsDone(true);
  };

  const objectives = [
    { title: 'Muscle Gain & Bulk', desc: 'Accelerated hypertrophic programs built on heavier volume math.', val: 'Muscle Gain' },
    { title: 'Caloric Metcon Shred', desc: 'Aggressive bodyfat caliper cutting while maintaining lean mass fibers.', val: 'Fat Loss' },
    { title: 'Compound Strength Platform', desc: 'Master Squats, Bench, and Deadlifts to maximize lifting torque.', val: 'Strength' },
    { title: 'Beginner Habits Integration', desc: 'Gentle onboarding for fresh lifters focusing close on form safety.', val: 'Beginner' }
  ];

  const tiers = [
    { title: 'Sprint Starter (₹1,200)', desc: '1 Month Core Gym Access', val: 'Monthly' },
    { title: 'Discipline Cohort (₹3,200)', desc: '3 Months Rate Lock-in (Highly Recommended)', val: 'Quarterly' },
    { title: 'Transformation Block (₹5,800)', desc: '6 Months Physique Build Deficit program access', val: 'Half-Yearly' },
    { title: 'Absolute Warrior Club (₹10,000)', desc: '1 Year unlimited everything, locked slots', val: 'Yearly' },
    { title: 'Student Pass (₹1,000/mo)', desc: 'Local college ID holders non-peak access', val: 'Student Package' },
    { title: 'Buddy Couple Bundle (₹2,000/mo)', desc: 'Train paired in selected slot duration', val: 'Couple Package' }
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen flex flex-col justify-between">
      
      {/* Dynamic step ticker top bar */}
      <div className="w-full bg-zinc-900/60 border-b border-zinc-900 py-3 px-4">
        <div className="mx-auto max-w-lg flex items-center justify-between font-mono text-[10px] tracking-widest text-zinc-500 uppercase font-black">
          <span className={step >= 1 ? 'text-[#FFE259]' : ''}>01 Objetivo</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className={step >= 2 ? 'text-[#FFE259]' : ''}>02 Pricing Tier</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className={step >= 3 ? 'text-[#FFE259]' : ''}>03 Parameters Lock</span>
        </div>
      </div>

      <section className="flex-1 py-16 px-4 flex items-center justify-center">
        <div className="w-full max-w-xl bg-zinc-950 border border-zinc-900 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-600 via-[#FFE259] to-amber-600" />
          
          <AnimatePresence mode="wait">
            
            {/* STEP 1: OBJECTIVE SELECTION */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-amber-500 uppercase font-black">
                    ONBOARD STEP 01/03
                  </span>
                  <h2 className="font-sans text-xl sm:text-2xl font-black uppercase text-white mt-1">
                    CHOOSE YOUR TRANSFORMATION STRATEGY
                  </h2>
                  <p className="font-sans text-xs text-zinc-550 mt-1 border-b border-zinc-900 pb-3">
                    We organize training plans mathematically inside specific velocity lines. Tell us your objective vector.
                  </p>
                </div>

                <div className="space-y-3">
                  {objectives.map(obj => (
                    <button
                      key={obj.val}
                      onClick={() => setFormData({ ...formData, objective: obj.val })}
                      className={`w-full text-left p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                        formData.objective === obj.val
                          ? 'border-amber-500 bg-amber-500/5'
                          : 'border-zinc-909 bg-zinc-900/10 hover:bg-zinc-900/40'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="font-sans font-black text-xs sm:text-sm text-white uppercase block">
                          {obj.title}
                        </span>
                        <p className="font-sans text-[11px] text-zinc-400">
                          {obj.desc}
                        </p>
                      </div>
                      <div className={`h-5 w-5 rounded-full border-2 shrink-0 flex items-center justify-center ${
                        formData.objective === obj.val
                          ? 'border-[#FFE259] bg-[#FFE259]'
                          : 'border-zinc-700 bg-transparent'
                      }`}>
                        {formData.objective === obj.val && <Check className="h-3.5 w-3.5 text-black" />}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleNext}
                    className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 py-3.5 font-sans font-black tracking-widest text-black uppercase text-xs transition-transform active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <span>PROCEED TO PRICING</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: MEMBERSHIP TIER */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-amber-500 uppercase font-black">
                    ONBOARD STEP 02/03
                  </span>
                  <h2 className="font-sans text-xl sm:text-2xl font-black uppercase text-white mt-1">
                    SECURE MEMBERSHIP TIER RATE
                  </h2>
                  <p className="font-sans text-xs text-zinc-550 mt-1 border-b border-zinc-910 pb-3">
                    Zero admissions files. Lock in prices matching your physical calendar goals below.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[280px] overflow-y-auto pr-1">
                  {tiers.map(tr => (
                    <button
                      key={tr.val}
                      onClick={() => setFormData({ ...formData, tier: tr.val })}
                      className={`text-left p-3.5 rounded-xl border flex flex-col justify-between h-24 transition-all ${
                        formData.tier === tr.val
                          ? 'border-amber-500 bg-amber-500/5'
                          : 'border-zinc-900 bg-zinc-900/10 hover:bg-zinc-900/40'
                      }`}
                    >
                      <span className="font-sans font-black text-xs text-white uppercase block leading-tight">
                        {tr.title}
                      </span>
                      <p className="font-sans text-[10px] text-zinc-500 leading-snug mt-1">
                        {tr.desc}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="pt-4 grid grid-cols-2 gap-4">
                  <button
                    onClick={handlePrev}
                    className="rounded-xl border border-zinc-700 bg-transparent py-3.5 font-sans font-black tracking-widest text-white uppercase text-xs transition-colors hover:bg-zinc-900"
                  >
                    BACK
                  </button>
                  <button
                    onClick={handleNext}
                    className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 py-3.5 font-sans font-black tracking-widest text-black uppercase text-xs transition-transform active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <span>PARAMETERS LOCK</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: CONTACT LOCKS INSTRUCTIONS */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-amber-500 uppercase font-black">
                    ONBOARD STEP 03/03
                  </span>
                  <h2 className="font-sans text-xl sm:text-2xl font-black uppercase text-white mt-1">
                    LOCK PARAMETER Blueprints
                  </h2>
                  <p className="font-sans text-xs text-zinc-550 mt-1 border-b border-zinc-910 pb-3">
                    Submit active contact channels so we can phone verification call codes and release entry passwords.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1 font-bold">
                      Your First & Last Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ayush Gore"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 font-sans text-xs text-white placeholder-zinc-600 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1 font-bold">
                        Calls & Messages Mobile Net
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 90000 00000"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 font-sans text-xs text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1 font-bold">
                        Daily Operational Workout Slot
                      </label>
                      <select
                        value={formData.slot}
                        onChange={e => setFormData({ ...formData, slot: e.target.value })}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 font-sans text-xs text-white outline-none"
                      >
                        <option value="Morning Frame (6AM - 10AM)">Morning Frame (6AM - 10AM)</option>
                        <option value="Afternoon Frame (11AM - 4PM)">Afternoon Frame (11AM - 4PM)</option>
                        <option value="Evening Frame (5PM - 10PM)">Evening Frame (5PM - 10PM)</option>
                      </select>
                    </div>
                  </div>

                  {/* Discipline Pledge Endorsement */}
                  <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formData.hasAgreement}
                        onChange={e => setFormData({ ...formData, hasAgreement: e.target.checked })}
                        className="mt-0.5 h-4 w-4 accent-amber-500 cursor-pointer"
                      />
                      <span className="font-mono text-[10px] text-zinc-400 leading-normal select-none">
                        I hereby endorse the <span className="text-[#FFE259] font-bold">Till Failure Pledge</span>: committing 100% to heavy lifting safety, sattu macro consistency, and zero failure exceptions.
                      </span>
                    </label>
                  </div>

                  <div className="pt-4 grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="rounded-xl border border-zinc-700 bg-transparent py-3.5 font-sans font-black tracking-widest text-white uppercase text-xs"
                    >
                      BACK
                    </button>
                    <button
                      type="submit"
                      className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 py-3.5 font-sans font-black tracking-widest text-black uppercase text-xs flex items-center justify-center gap-1.5 transition-transform active:scale-95"
                    >
                      <Flame className="h-4 w-4" />
                      <span>LOCK MEMBERSHIP</span>
                    </button>
                  </div>

                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

      {/* Onboarding success dialog */}
      <SuccessModal
        isOpen={isDone}
        onClose={() => {
          setIsDone(false);
          setStep(1);
        }}
        title="Onboarding Locks Succeeded!"
        message="A custom Till Failure Entry barcode pass hash has been generated. Direct billing setup links released to registered WhatsApp inbox."
        details={[
          `Athlete Profile: ${formData.fullName}`,
          `Target Line: ${formData.objective}`,
          `Financial Bracket: ${formData.tier}`,
          `Lifting Slot Allocated: ${formData.slot}`,
          `Rishra Headquarters Verification: Pending ID Checks`
        ]}
      />

    </div>
  );
}
