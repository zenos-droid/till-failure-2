import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Flame, Star, ShieldCheck, HelpCircle, Phone, X, Award } from 'lucide-react';
import { membershipPlansData } from '../data';
import { MembershipEnquiryForm } from '../components/Forms';

export default function Memberships() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [addPt, setAddPt] = useState(false);

  const ptCost = 3000;

  const specialPackages = [
    {
      id: 'student-pack',
      name: 'Rishra Student Pass',
      price: 1000,
      duration: 'Month',
      tagline: 'Local College & School ID Holders',
      description: 'Exclusive discounted flat-rate entry to support local athletic students on strict budgets. Verified at front desk (Platform 1 Near Hub).',
      features: [
        'Full Weight Room access in non-peak blocks',
        'Habits workout starter logs included',
        'Rerack priority support access',
        'Valid Student ID check mandatory'
      ]
    },
    {
      id: 'couple-pack',
      name: 'Double Heavy Couple Bundle',
      price: 2000,
      duration: 'Month',
      tagline: 'Partners in Failure',
      description: 'Built for couples or lifting buddies training in the same daily slot. Multiply alignment results together while locking premium value rates.',
      features: [
        'Double physical barcode entries allocated',
        'Coordinated group body fat calipers once of month',
        'Paired progressive weight track logs',
        'Saves flat ₹400 / month over individual starter entries'
      ]
    },
    {
      id: 'transformation-pack',
      name: 'Elite 12-Week Overhaul',
      price: 7500,
      duration: '12 Weeks Complete',
      tagline: 'Includes PT + Macros + Caliper Biometrics',
      description: 'Our ultimate performance bundle. 3 Months of unlimited iron workouts, dedicated double-consult coach slots, and full macro diet blueprints.',
      features: [
        'Unlimited barbell & platform hours',
        '3 Private 1-on-1 coaching blocks included free',
        'Continuous bi-weekly bio-density body-fat scans',
        'Custom interactive calorie sattu guide blueprint'
      ]
    }
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      
      {/* 1. BRAND RICH HEADER */}
      <section className="bg-linear-to-b from-zinc-900 via-zinc-950 to-zinc-950 px-4 py-20 border-b border-zinc-900 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/3 h-52 w-92 rounded-full bg-amber-500/5 blur-[120px]" />
        
        <div className="relative max-w-3xl mx-auto z-10 space-y-4">
          <span className="font-mono text-xs font-black tracking-[0.3em] text-amber-500 uppercase">
            // PURE BARBELL VALUE SCHEMES
          </span>
          <h1 className="font-sans text-4xl sm:text-6xl font-black uppercase tracking-tight">
            ACCESSIBLE RISHRA MEMBERSHIPS
          </h1>
          <p className="font-sans text-xs sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Zero hidden maintenance files. Zero commercial franchising commissions, just premium heavy dumbbells and stellar, certified strength instruction.
          </p>
        </div>
      </section>

      {/* 2. MAIN TICKETS: CORE MATRICES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        
        {/* Dynamic PT Booster Switch */}
        <div className="max-w-md mx-auto mb-16 p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="font-sans font-bold text-xs uppercase text-white block">
              🚀 COALITION SPEED UPGRADE
            </span>
            <p className="font-mono text-[9px] text-zinc-400">
              Add Elite 1-on-1 Private PT oversight to your core membership for an additional ₹{ptCost}/mo.
            </p>
          </div>
          <button
            onClick={() => setAddPt(!addPt)}
            className={`px-4 py-2 rounded-xl font-mono text-[10px] uppercase font-black transition-all ${
              addPt
                ? 'bg-[#FFE259] text-black shadow-lg shadow-yellow-500/10'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
            }`}
          >
            {addPt ? 'PT ACTIVE (₹' + ptCost + '/MO)' : 'ADD COACHING PT'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {membershipPlansData.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border bg-zinc-950 p-6 flex flex-col justify-between hover:border-amber-500/30 transition-all ${
                plan.popular 
                  ? 'border-amber-500 shadow-2xl shadow-amber-500/5 lg:-translate-y-2' 
                  : 'border-zinc-900'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-3 py-1 font-mono text-[8px] font-black text-black uppercase tracking-widest leading-none">
                  ★ COMMENDED CHOICE
                </span>
              )}

              <div>
                <span className="font-mono text-[9px] tracking-widest text-[#FFE259] uppercase font-black">
                  {plan.tagline}
                </span>
                
                <h3 className="font-sans text-xl font-black text-white uppercase mt-1 leading-none">
                  {plan.name}
                </h3>
                
                {/* Cost Section */}
                <div className="mt-5 pb-5 border-b border-zinc-900">
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-3xl font-black text-white">
                      ₹{plan.price + (addPt ? ptCost : 0)}
                    </span>
                    <span className="font-sans text-xs text-zinc-500">
                      / {plan.duration}
                    </span>
                  </div>
                  {plan.originalPrice && !addPt && (
                    <span className="font-mono text-[10px] text-zinc-500 line-through mt-0.5 block">
                      Was ₹{plan.originalPrice}
                    </span>
                  )}
                  {addPt && (
                    <span className="font-mono text-[9px] text-[#FFE259] mt-1 block">
                      Includes ₹{ptCost} Personal Assistant PT
                    </span>
                  )}
                </div>

                {/* Features listing */}
                <ul className="mt-6 space-y-3 font-sans text-xs text-zinc-400">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-900">
                <button
                  onClick={() => setSelectedPlan(plan.name)}
                  className={`w-full rounded-xl py-3 text-center font-sans text-xs font-black tracking-widest uppercase transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg hover:scale-98'
                      : 'bg-zinc-900 hover:bg-zinc-850 text-white'
                  }`}
                >
                  LOCK PORTFOLIO RATE
                </button>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* 3. COHORT SPECIAL BUNDLES SECTION */}
      <section className="bg-zinc-900/30 border-y border-zinc-900 py-24 px-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-2">
            <span className="font-mono text-xs font-black tracking-[0.25em] text-[#FFE259] block uppercase">
              // SPECIFIC DEMOGRAPHY DEALS
            </span>
            <h2 className="font-sans text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
              TILL FAILURE SPECIAL PACKAGES
            </h2>
            <p className="font-sans text-xs text-zinc-500 max-w-md mx-auto">
              Custom-built packages serving students, paired couples, and intensive 3-month weight overhaul clients.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {specialPackages.map((pack) => (
              <div
                key={pack.id}
                className="rounded-2xl border border-zinc-900 bg-zinc-950 p-8 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[9px] tracking-widest text-[#FFE259] uppercase font-black px-2.5 py-1 bg-[#FFE259]/10 rounded border border-[#FFE259]/10">
                      {pack.tagline}
                    </span>
                    <Award className="h-4 w-4 text-amber-500" />
                  </div>

                  <h3 className="font-sans text-lg sm:text-xl font-black text-white uppercase mt-4">
                    {pack.name}
                  </h3>
                  
                  <p className="font-sans text-xs text-zinc-500 mt-2 leading-relaxed">
                    {pack.description}
                  </p>

                  <div className="mt-5 pb-5 border-b border-zinc-900">
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono text-2xl font-black text-white">₹{pack.price}</span>
                      <span className="font-sans text-xs text-zinc-500">/ {pack.duration}</span>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-2.5 font-sans text-xs text-zinc-400">
                    {pack.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-900">
                  <button
                    onClick={() => setSelectedPlan(pack.name)}
                    className="w-full rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 hover:bg-zinc-850 py-3 text-center font-sans text-xs font-black tracking-widest text-zinc-300 uppercase transition-all"
                  >
                    LOCK SPECIAL TICKET rate
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. PRICING FAQs */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <h3 className="font-sans text-xl sm:text-2xl font-black text-white uppercase tracking-tight text-center mb-10">
          PRICING TRANSPARENCY GUIDES
        </h3>
        
        <div className="space-y-4">
          {[
            {
              q: "Is there any hidden admission or 'maintenance files' fee?",
              a: "Absolutely not. Standard commercial gym chains use 'maintenance/franchise registration files' of ₹2000-5000 to trick customers. At Till Failure, you pay the exact advertised membership rate. Zero hidden administrative overheads."
            },
            {
              q: "How does the Student Package check operation work?",
              a: "Candidates who secure the Rishra Student Pass must present a valid physical College/School ID card bearing their name, active semester stamp, and photo. If valid, the ₹1000/mo price is locked."
            },
            {
              q: "Can I transfer my membership terms if I transition physical cities?",
              a: "Yes! If you shift within Hooghly/Calcutta territory, your lock terms can be fully transferred to any verified cohort candidate with a written front-desk request."
            },
          ].map((faq, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-zinc-900 bg-zinc-950">
              <span className="font-mono text-[9px] text-[#FFE259] tracking-widest uppercase font-black block mb-1">
                MEMBERSHIP GUIDE SEC. 0{idx + 1}
              </span>
              <h4 className="font-sans text-sm font-bold text-white uppercase">
                {faq.q}
              </h4>
              <p className="font-sans text-xs text-zinc-400 mt-2 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Enquiry Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlan(null)}
              className="absolute inset-x-0 inset-y-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              className="relative w-full max-w-lg bg-zinc-950 border border-amber-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl z-10"
            >
              <div className="flex justify-between items-center mb-6 pb-2 border-b border-zinc-900">
                <span className="font-sans font-black text-white uppercase text-sm">
                  INITIALIZE PRICING RESERVATION
                </span>
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-center mb-5">
                <span className="font-mono text-[9px] text-zinc-500 tracking-widest block font-bold uppercase">
                  LOCKED RATE TICKET:
                </span>
                <span className="font-sans text-sm font-black text-[#FFE259] block uppercase mt-1">
                  {selectedPlan} {addPt ? '+ Elite Personal Training' : ''}
                </span>
              </div>

              <MembershipEnquiryForm
                defaultPlan={selectedPlan}
                onSuccess={() => setSelectedPlan(null)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
