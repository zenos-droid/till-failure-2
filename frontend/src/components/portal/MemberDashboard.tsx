import React, { useState } from 'react';
import { useGymStore } from '../../store/gymStore';
import { motion } from 'motion/react';
import { 
  Flame, 
  Dumbbell, 
  Layers, 
  Activity, 
  Calendar, 
  FileText, 
  TrendingUp, 
  ArrowUpRight,
  Download,
  AlertCircle
} from 'lucide-react';
import { PaymentRecord } from '../../types';

export default function MemberDashboard() {
  const store = useGymStore();
  const currentAthlete = store.currentUser;

  // Retrieve matching member parameters
  const mProfile = store.members.find(m => m.id === currentAthlete?.id || m.email === currentAthlete?.email) || store.members[0];

  // Retrieve assigned workout & diet plans
  const activeWorkout = store.workouts.find(w => w.memberId === mProfile?.id);
  const activeDiet = store.diets.find(d => d.memberId === mProfile?.id);

  // Retrieve progress metrics sorted by date
  const progressLogs = store.progress.filter(p => p.memberId === mProfile?.id);
  const latestProgress = progressLogs[0]; // because we prepend newest

  // Receipt viewing overlay state
  const [activeReceipt, setActiveReceipt] = useState<PaymentRecord | null>(null);

  // Expiry dates maths
  const getDaysRemaining = () => {
    if (!mProfile) return 0;
    const end = new Date(mProfile.endDate);
    const today = new Date();
    const diff = end.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  const daysLeft = getDaysRemaining();
  const daysPercentage = Math.max(0, Math.min(100, (daysLeft / 90) * 100)); // normalized to quarter

  // Match Payment history
  const memberPayments = store.payments.filter(p => p.memberId === mProfile?.id);

  // Printable Download simulate
  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="space-y-6">

      {/* Expiry Warning Header */}
      {daysLeft <= 10 && daysLeft > 0 && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center gap-3 animate-pulse">
          <AlertCircle className="h-5 w-5 text-[#FFE259]" />
          <div>
            <h4 className="text-xs font-sans font-black text-[#FFE259] uppercase tracking-wider">RENEWAL PERMIT EXPIRATION</h4>
            <p className="text-[11px] text-zinc-400 font-mono mt-0.5 uppercase">
              Your current membership card expires in {daysLeft} days. Clear your renewal invoice to retain portal privileges.
            </p>
          </div>
        </div>
      )}

      {/* Top Profile Summary Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Card & Counts */}
        <div className="p-5 bg-zinc-900/40 border border-zinc-900 rounded-2xl space-y-4">
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">SaaS ID: {mProfile?.id}</span>
            <h3 className="text-lg font-sans font-black text-white uppercase mt-0.5">{mProfile?.name}</h3>
            <p className="text-xs font-sans text-[#FFE259] mt-1 font-bold">{mProfile?.membershipName}</p>
          </div>

          <div className="border-t border-zinc-900 pt-3 space-y-1.5 text-xs font-mono text-zinc-400">
            <div>📞 Contact: <span className="text-white">{mProfile?.phone}</span></div>
            <div>🏫 Lift Slot: <span className="text-white font-sans font-bold">{mProfile?.activeSlot}</span></div>
            <div>📅 Start: <span className="text-zinc-500">{mProfile?.startDate}</span></div>
            <div>⏳ Expire: <span className="text-zinc-500">{mProfile?.endDate}</span></div>
          </div>
        </div>

        {/* Expiry countdown card */}
        <div className="p-5 bg-zinc-900/60 border border-zinc-900 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">EXPIRATION COUNTDOWN</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-sans font-black text-[#FFE259]">{daysLeft}</span>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Days Remaining</span>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <div className="flex justify-between text-[10px] font-mono text-zinc-500">
              <span>CARD PERIODIC HEALTH</span>
              <span>{Math.round(daysPercentage)}%</span>
            </div>
            <div className="h-1.5 bg-zinc-950 rounded-full overflow-hidden">
              <div 
                style={{ width: `${daysPercentage}%` }} 
                className="h-full bg-gradient-to-r from-amber-600 to-[#FFE259] rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Assigned Personal Coach Block */}
        <div className="p-5 bg-zinc-900/40 border border-zinc-900 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">MY ASSIGNED COACH</span>
            {mProfile?.assignedTrainerName ? (
              <div className="mt-3">
                <h4 className="text-base font-sans font-black text-white uppercase">{mProfile.assignedTrainerName}</h4>
                <p className="text-xs font-mono text-zinc-400 mt-1">Specialty: General Hypertrophy, Deadlift locks</p>
                <p className="text-[10px] font-mono text-zinc-500 mt-2">Consultation Desk hours: slot-aligned</p>
              </div>
            ) : (
              <div className="mt-4 p-3 rounded-xl bg-zinc-950 border border-zinc-900 text-xs text-zinc-500 font-sans italic">
                No coach assigned to you yet by the administrator. Apply for a coach at front desk.
              </div>
            )}
          </div>
          
          <div className="pt-2 text-xs font-mono flex justify-between text-zinc-400">
            <span>RISHRA OPERATIONS</span>
            <span className="text-[#FFE259] font-black">{mProfile?.attendanceCount} sessions attended</span>
          </div>
        </div>

      </div>

      {/* Biometrics Matrix (Dynamic Graph & Stats) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Physical index cards */}
        <div className="p-5 bg-zinc-900/60 border border-zinc-900 rounded-2xl space-y-4">
          <h4 className="text-xs font-sans font-black tracking-widest text-[#FFE259] uppercase">
            LATEST CALIPER BIOMETRICS
          </h4>

          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-900 text-center">
              <span className="block text-[9px] font-mono text-zinc-550 uppercase">Current BMI</span>
              <span className="block text-xl font-sans font-black text-white mt-1">
                {latestProgress?.bmi || 24.0}
              </span>
            </div>
            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-900 text-center">
              <span className="block text-[9px] font-mono text-zinc-550 uppercase">Skel. Muscle</span>
              <span className="block text-xl font-sans font-black text-[#FFE259] mt-1">
                {latestProgress?.muscleMass || '39'}kg
              </span>
            </div>
            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-900 text-center">
              <span className="block text-[9px] font-mono text-zinc-550 uppercase">BodyFat %</span>
              <span className="block text-xl font-sans font-black text-white mt-1">
                {latestProgress?.bodyFatPercent || '16'}%
              </span>
            </div>
          </div>

          <div className="p-3 bg-zinc-950 text-[11px] font-sans text-zinc-400 rounded-xl border border-zinc-900 leading-relaxed italic">
            " {latestProgress?.notes || 'No biometric annotations published yet for this week. Push through on Wednesday heavy pulls.'} "
          </div>
        </div>

        {/* CSS/SVG Custom Weight Graph */}
        <div className="lg:col-span-2 p-5 bg-zinc-900/40 border border-zinc-900 rounded-2xl">
          <h4 className="text-xs font-sans font-black tracking-widest text-zinc-100 uppercase mb-4">
            BODYWEIGHT MASS INDEX TREND (KG)
          </h4>

          <div className="relative h-44 border-b border-zinc-800 flex items-end justify-between font-mono text-[9px] text-zinc-550">
            {mProfile?.weightHistory && mProfile.weightHistory.length > 0 ? (
              <>
                {/* SVG path to trace weight trend */}
                <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                  <polyline
                    fill="none"
                    stroke="#FFE259"
                    strokeWidth="2.5"
                    points="30,110 140,80 280,60 410,40"
                    className="animate-pulse"
                  />
                </svg>

                {mProfile.weightHistory.map((pt, i) => (
                  <div key={i} className="flex flex-col items-center z-10">
                    <span className="text-xs text-white font-sans font-black mb-1 bg-zinc-950 px-1 py-0.5 rounded border border-zinc-900">
                      {pt.weight}kg
                    </span>
                    <span className="block">{pt.date}</span>
                  </div>
                ))}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-zinc-450 uppercase tracking-wider font-mono">
                Weight parameters populate upon coaching calibration.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Regimen Planners (Workouts and Diets side by side) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Active training regimen card */}
        <div className="p-5 bg-zinc-900/60 border border-zinc-900 rounded-2xl space-y-4">
          <h4 className="text-xs font-sans font-black tracking-widest text-white uppercase flex items-center gap-1.5">
            <Dumbbell className="h-4 w-4 text-[#FFE259]" /> CURRENT TRAINING PROTOCOL
          </h4>

          {activeWorkout ? (
            <div className="space-y-3">
              <div className="p-2 bg-zinc-950 rounded border border-zinc-900 text-xs font-mono text-[#FFE259] font-bold">
                🎯 {activeWorkout.title}
              </div>
              
              <div className="space-y-2 text-xs font-mono">
                {activeWorkout.exercises.map((ex, i) => (
                  <div key={i} className="p-3 bg-zinc-955/60 border border-zinc-900 rounded-xl space-y-1">
                    <span className="block text-[#FFE259] font-black">{ex.day}</span>
                    <p className="text-zinc-400 font-sans leading-relaxed">{ex.routine}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 text-xs text-zinc-500 font-sans italic text-center py-12">
              No custom training routines assigned by personal coach Amit or Biplab yet.
            </div>
          )}
        </div>

        {/* Active nutrition card */}
        <div className="p-5 bg-zinc-900/40 border border-zinc-900 rounded-2xl space-y-4">
          <h4 className="text-xs font-sans font-black tracking-widest text-white uppercase flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-[#FFE259]" /> LOCAL MEALS & MACROS
          </h4>

          {activeDiet ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-zinc-950 p-2.5 rounded border border-zinc-900 text-xs font-mono">
                <span className="text-zinc-300">Calories: <span className="text-[#FFE259] font-bold">{activeDiet.calories} kcal</span></span>
                <span className="text-zinc-305">Protein: <span className="text-amber-500 font-bold">{activeDiet.proteinGrams}g</span></span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                {activeDiet.meals.map((m, i) => (
                  <div key={i} className="p-2 rounded-lg bg-zinc-950/40 flex justify-between items-start gap-4 hover:bg-zinc-900/20">
                    <span className="text-zinc-500 shrink-0 text-[10px] uppercase font-bold">{m.time}</span>
                    <span className="text-zinc-300 font-sans leading-relaxed text-right">{m.intake}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-900 text-xs text-zinc-500 font-sans italic text-center py-12">
              Nutrition macro sheets populate upon calibration by your coach.
            </div>
          )}
        </div>

      </div>

      {/* Athletic Account Payments History receipts */}
      <div className="p-5 bg-zinc-900/40 border border-zinc-900 rounded-2xl">
        <h4 className="text-xs font-sans font-black tracking-widest text-[#FFE259] uppercase mb-4">
          PERSONAL TRANSACTIONS & INVOICES
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-zinc-900 text-[10px] text-zinc-500 uppercase tracking-widest">
                <th className="py-3 px-2">Invoice Code</th>
                <th className="py-3 px-2">Sub Plan</th>
                <th className="py-3 px-2">Transaction Date</th>
                <th className="py-3 px-2">Gross Sub</th>
                <th className="py-3 px-2">Auth gateway</th>
                <th className="py-3 px-2 text-right">Receipt Sheet</th>
              </tr>
            </thead>
            <tbody>
              {memberPayments.map(p => (
                <tr key={p.id} className="border-b border-zinc-900/60 text-xs hover:bg-zinc-955/20">
                  <td className="py-3 px-2 text-zinc-350">{p.receiptNumber}</td>
                  <td className="py-3 px-2 text-white font-sans font-bold">{p.planName}</td>
                  <td className="py-3 px-2 text-zinc-500">{p.paymentDate}</td>
                  <td className="py-3 px-2 text-zinc-300">₹{p.amount}.00</td>
                  <td className="py-3 px-2 text-zinc-550 text-[10px] uppercase">{p.paymentMethod}</td>
                  <td className="py-3 px-2 text-right">
                    <button
                      onClick={() => setActiveReceipt(p)}
                      className="px-2 py-1 bg-zinc-950 hover:bg-zinc-900 text-[#FFE259] rounded border border-zinc-850 hover:border-[#FFE259] font-black text-[9px] uppercase tracking-wider transition-all cursor-pointer"
                    >
                      DOWNLOAD
                    </button>
                  </td>
                </tr>
              ))}
              {memberPayments.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-zinc-500 font-mono text-[10px] uppercase">
                    No payment enforcements on file for this athlete index.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EXPANDABLE MODAL PREVIEW FOR ATHLETE RECEIPTS */}
      {activeReceipt && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg bg-zinc-950 border border-zinc-850 rounded-2xl overflow-hidden shadow-2xl relative animate-in fade-in"
          >
            <div className="h-1 bg-[#FFE259]" />
            <button
              onClick={() => setActiveReceipt(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white font-mono text-xs uppercase cursor-pointer"
            >
              [Dismiss]
            </button>

            <div className="p-6 md:p-8 space-y-6">
              
              <div className="flex justify-between items-start border-b border-zinc-900 pb-4">
                <div>
                  <span className="block font-sans font-black tracking-widest text-[#FFE259] leading-none uppercase text-sm">
                    TILL FAILURE
                  </span>
                  <span className="block font-mono text-[8px] text-zinc-500 mt-1">RISHRA ATHLETE TERMINAL RECEIPT</span>
                </div>
                <div className="text-right font-mono">
                  <span className="block text-[8px] text-zinc-500 uppercase">OFFICIAL DOCUMENT</span>
                  <span className="block text-xs font-bold text-[#FFE259] mt-0.5">{activeReceipt.receiptNumber}</span>
                </div>
              </div>

              <div className="text-xs font-mono space-y-2 text-zinc-400">
                <div>Athletes Roster Profile: <span className="text-white font-sans font-bold uppercase">{mProfile?.name}</span></div>
                <div>Authorized Expiry Period: <span className="text-white">{activeReceipt.expiryExtendedDate}</span></div>
                <div>Direct gateway status: <span className="text-green-400 font-black">SETTLED (SUCCESS)</span></div>
              </div>

              <div className="border-t border-zinc-900 pt-3 flex justify-between font-mono font-bold text-sm text-[#FFE259]">
                <span>TOTAL SUBS FEE PAID</span>
                <span>₹{activeReceipt.amount}.00</span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setActiveReceipt(null)}
                  className="flex-1 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 font-bold uppercase rounded-xl cursor-pointer border border-zinc-800 text-xs font-mono"
                >
                  DISMISS
                </button>
                <button
                  onClick={handlePrintReceipt}
                  className="flex-1 py-2.5 bg-[#FFE259] text-black font-sans font-black uppercase text-xs tracking-widest rounded-xl hover:brightness-110 flex items-center justify-center gap-1.5 cursor-pointer shadow shadow-amber-500/10"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>DOWNLOAD INVOICE</span>
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
