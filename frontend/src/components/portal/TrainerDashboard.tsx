import React, { useState } from 'react';
import { useGymStore } from '../../store/gymStore';
import { 
  Plus, 
  Dumbbell, 
  Flame, 
  FileText, 
  TrendingUp, 
  Save, 
  Sparkles, 
  Activity, 
  Calendar,
  Layers,
  ClipboardList
} from 'lucide-react';
import { SaasMember, MemberProgress, WorkoutPlan, DietPlan } from '../../types';

export default function TrainerDashboard() {
  const store = useGymStore();
  const coach = store.currentUser;

  // Filter assigned members
  const assignedMembers = store.members.filter(m => m.assignedTrainerId === coach?.trainerId);

  // Active view: 'members' | 'progress' | 'workout' | 'diet'
  const [activeTab, setActiveTab] = useState<'members' | 'progress' | 'workout' | 'diet'>('members');

  // Selected member across form structures
  const [targetMemberId, setTargetMemberId] = useState('');

  // 1. Workout Plan Draft states
  const [wpTitle, setWpTitle] = useState('Heavy Concentric Hypertrophy Push-Pull-Legs');
  const [monRoutine, setMonRoutine] = useState('Low Bar Barbell Squats: 5 sets x 5 reps (Till failure on set 5). Overhead Barbell Press: 4 sets x 8 reps.');
  const [wedRoutine, setWedRoutine] = useState('Platform Deficit Deadlifts: 5 sets x 3 reps (Lock torque). Weighted Chin-ups: 4 sets x 10 reps.');
  const [friRoutine, setFriRoutine] = useState('Barbell Flat Bench Press: 4 sets x 8 reps. Hammer Dumbbell Curls: 3 sets x 15 reps (Strict squeeze).');

  // 2. Diet Plan Draft states
  const [dpTitle, setDpTitle] = useState('Caloric Surplus local Sattu & Katla Fueling');
  const [calories, setCalories] = useState(2800);
  const [protein, setProtein] = useState(150);
  const [meal1, setMeal1] = useState('4 boiled eggs (2 whole) + 1 large banana + 100g oatmeal with almonds');
  const [meal2, setMeal2] = useState('250g boiled rice + 150g fresh Hooghly Katla/Rohu fish stew + green vegetables');
  const [meal3, setMeal3] = useState('3 tablespoons local roasted chickpea sattu stirred in cold mineral water + black salt');
  const [meal4, setMeal4] = useState('200g grilled chicken breast + 3 rotis + cucumber salad');

  // 3. Biometric Metric states
  const [bmWeight, setBmWeight] = useState(80);
  const [bmBmi, setBmBmi] = useState(24.2);
  const [bmMuscle, setBmMuscle] = useState(38);
  const [bmFat, setBmFat] = useState(16);
  const [bmNotes, setBmNotes] = useState('');

  const [toastText, setToastText] = useState('');

  const triggerToast = (msg: string) => {
    setToastText(msg);
    setTimeout(() => setToastText(''), 3000);
  };

  // Submit Workout Plan
  const handleWorkoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetMemberId) {
      triggerToast('Select an assigned athlete first.');
      return;
    }
    store.assignWorkoutPlan({
      memberId: targetMemberId,
      title: wpTitle,
      exercises: [
        { day: 'Monday (Squat/Push)', routine: monRoutine },
        { day: 'Wednesday (Heavy Dead/Pull)', routine: wedRoutine },
        { day: 'Friday (Bench/Joint Bracing)', routine: friRoutine }
      ]
    });
    triggerToast(`Workout routine mapped to athlete.`);
    setActiveTab('members');
  };

  // Submit Diet Plan
  const handleDietSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetMemberId) {
      triggerToast('Select an assigned athlete first.');
      return;
    }
    store.assignDietPlan({
      memberId: targetMemberId,
      title: dpTitle,
      calories,
      proteinGrams: protein,
      meals: [
        { time: '08:00 AM Breakfast', intake: meal1 },
        { time: '01:30 PM Lunch', intake: meal2 },
        { time: '05:30 PM Pre-Workout Intake', intake: meal3 },
        { time: '08:45 PM Post-Workout Dinner', intake: meal4 }
      ]
    });
    triggerToast(`Caloric diet regime mapped successfully.`);
    setActiveTab('members');
  };

  // Log Caliper Metric
  const handleMetricSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetMemberId) {
      triggerToast('Select an assigned athlete first.');
      return;
    }
    store.addProgressMetric({
      memberId: targetMemberId,
      weight: bmWeight,
      bmi: bmBmi,
      muscleMass: bmMuscle,
      bodyFatPercent: bmFat,
      notes: bmNotes
    });
    triggerToast(`Biometric log locked in member chart.`);
    setBmNotes('');
    setActiveTab('members');
  };

  const handleQuickConfigureForms = (memberId: string, type: 'workout' | 'diet' | 'biometric') => {
    setTargetMemberId(memberId);
    if (type === 'workout') {
      setActiveTab('workout');
    } else if (type === 'diet') {
      setActiveTab('diet');
    } else if (type === 'biometric') {
      setActiveTab('progress');
    }
  };

  return (
    <div className="space-y-6">

      {/* Toast Alert overlay */}
      {toastText && (
        <div className="fixed bottom-5 right-5 z-50 p-4 bg-zinc-900 border border-[#FFE259] text-[#FFE259] rounded-xl shadow-2xl text-xs font-mono animate-bounce uppercase">
          🚀 {toastText}
        </div>
      )}

      {/* Header Coach Status card */}
      <div className="p-5 bg-zinc-900/40 border border-zinc-900 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono text-[#FFE259] uppercase tracking-widest">Scope: Certified Athlete Mentor</span>
          <h2 className="text-xl font-sans font-black text-white mt-0.5 uppercase">COACH WORKSPACE PORTAL</h2>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 bg-[#FFE259]/5 border border-[#FFE259]/20 rounded-lg text-xs font-mono text-[#FFE259] font-bold">
            COACH ID: {coach?.id}
          </div>
        </div>
      </div>

      {/* Sub tabs line */}
      <div className="flex border-b border-zinc-900 gap-1.5 py-1">
        <button
          onClick={() => setActiveTab('members')}
          className={`px-4 py-2 text-xs font-mono font-black uppercase tracking-widest rounded-lg transition-all ${
            activeTab === 'members' ? 'bg-zinc-800 text-[#FFE259] border-b-2 border-[#FFE259] rounded-b-none' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          My Athlete Directory
        </button>
        {targetMemberId && (
          <>
            <button
              onClick={() => setActiveTab('workout')}
              className={`px-4 py-2 text-xs font-mono font-black uppercase tracking-widest rounded-lg transition-all ${
                activeTab === 'workout' ? 'bg-zinc-800 text-[#FFE259] border-b-2 border-[#FFE259] rounded-b-none' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Draft Workout Plan
            </button>
            <button
              onClick={() => setActiveTab('diet')}
              className={`px-4 py-2 text-xs font-mono font-black uppercase tracking-widest rounded-lg transition-all ${
                activeTab === 'diet' ? 'bg-zinc-800 text-[#FFE259] border-b-2 border-[#FFE259] rounded-b-none' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Configure Meal Plan
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-4 py-2 text-xs font-mono font-black uppercase tracking-widest rounded-lg transition-all ${
                activeTab === 'progress' ? 'bg-zinc-800 text-[#FFE259] border-b-2 border-[#FFE259] rounded-b-none' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Log Biometrics
            </button>
          </>
        )}
      </div>

      {/* 1. ASSIGNED MEMBERS DIRECTORY */}
      {activeTab === 'members' && (
        <div className="space-y-4">
          <h3 className="text-sm font-sans font-black tracking-widest text-zinc-100 uppercase">
            MY CURRENT DISCIPLINE COHORTS ({assignedMembers.length})
          </h3>
          <p className="text-xs text-zinc-400 font-sans">
            You are currently appointed to evaluate, log weight metrics, and configure muscle gains diets for these registered Rishra athletes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignedMembers.map(m => (
              <div key={m.id} className="p-5 bg-zinc-900/60 border border-zinc-900 rounded-2xl space-y-4 hover:border-zinc-850 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500">[{m.id}]</span>
                      <h4 className="text-base font-sans font-black text-white uppercase mt-0.5">{m.name}</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-[#FFE259]/10 text-[#FFE259] font-bold border border-[#FFE259]/20">
                      {m.activeSlot}
                    </span>
                  </div>

                  <div className="mt-3 text-xs font-mono space-y-1.5 text-zinc-400">
                    <div>👤 Gender: <span className="text-zinc-200 font-bold">{m.gender}</span></div>
                    <div>📞 Mobile: <span className="text-zinc-200">{m.phone}</span></div>
                    <div>🔄 Program: <span className="text-amber-500">{m.membershipName}</span></div>
                    <div>🎯 Gym attendance: <span className="text-[#FFE259] font-black">{m.attendanceCount} sessions logged</span></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-805/40 grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleQuickConfigureForms(m.id, 'workout')}
                    className="p-2 bg-zinc-950 border border-zinc-850 hover:border-[#FFE259] rounded-lg text-center text-[10px] font-mono tracking-wider font-black text-white hover:text-[#FFE259] flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Dumbbell className="h-4 w-4" />
                    <span>WORKOUT</span>
                  </button>
                  <button
                    onClick={() => handleQuickConfigureForms(m.id, 'diet')}
                    className="p-2 bg-zinc-950 border border-zinc-850 hover:border-[#FFE259] rounded-lg text-center text-[10px] font-mono tracking-wider font-black text-white hover:text-[#FFE259] flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Layers className="h-4 w-4" />
                    <span>MEAL DIETS</span>
                  </button>
                  <button
                    onClick={() => handleQuickConfigureForms(m.id, 'biometric')}
                    className="p-2 bg-zinc-950 border border-zinc-850 hover:border-[#FFE259] rounded-lg text-center text-[10px] font-mono tracking-wider font-black text-white hover:text-[#FFE259] flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Activity className="h-4 w-4" />
                    <span>TRACK LOG</span>
                  </button>
                </div>
              </div>
            ))}
            {assignedMembers.length === 0 && (
              <div className="col-span-full p-12 bg-zinc-900/20 border border-zinc-900 rounded-2xl text-center text-zinc-500 font-mono text-xs uppercase tracking-widest">
                No active lifters assigned to you by the administrator. Contact Director Desk.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. ADD BIOMETRICS FORM */}
      {activeTab === 'progress' && targetMemberId && (
        <div className="p-6 bg-zinc-900/60 border border-zinc-900 rounded-2xl max-w-2xl">
          <h3 className="text-sm font-sans font-black tracking-widest text-[#FFE259] uppercase mb-4 flex items-center gap-1.5">
            <Activity className="h-4 w-4" /> RECORD BI-WEEKLY COMPASS CHART BIOMETRICS
          </h3>
          <p className="text-xs text-zinc-400 font-mono mb-6 uppercase">
            Targeting Athlete ID: <span className="text-white font-bold">{targetMemberId}</span>
          </p>

          <form onSubmit={handleMetricSubmit} className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Body Weight (KG)</label>
                <input
                  type="number"
                  step="0.1"
                  value={bmWeight}
                  onChange={(e) => setBmWeight(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs font-mono text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Calculated BMI</label>
                <input
                  type="number"
                  step="0.1"
                  value={bmBmi}
                  onChange={(e) => setBmBmi(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs font-mono text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Muscle Mass (KG)</label>
                <input
                  type="number"
                  step="0.1"
                  value={bmMuscle}
                  onChange={(e) => setBmMuscle(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs font-mono text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">BodyFat % (Caliper)</label>
                <input
                  type="number"
                  step="0.1"
                  value={bmFat}
                  onChange={(e) => setBmFat(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs font-mono text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1.5">Coach Diagnostic Notes / Remarks</label>
              <textarea
                rows={3}
                placeholder="Muscle striations developing nicely, keep up local sattu pre-workout limits..."
                value={bmNotes}
                onChange={(e) => setBmNotes(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-white"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('members')}
                className="flex-1 py-2.5 bg-zinc-950 border border-zinc-850 text-zinc-400 font-mono text-[10px] rounded-xl cursor-pointer"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-[#FFE259] text-black font-sans font-black text-xs tracking-widest uppercase rounded-xl hover:brightness-110 cursor-pointer"
              >
                COMMIT BIOMETRIC ENTRY
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. DRAFT WORKOUT PLAN FORM */}
      {activeTab === 'workout' && targetMemberId && (
        <div className="p-6 bg-zinc-900/60 border border-zinc-900 rounded-2xl max-w-3xl">
          <h3 className="text-sm font-sans font-black tracking-widest text-zinc-100 uppercase mb-4 flex items-center gap-1.5">
            <Dumbbell className="h-5 w-5 text-[#FFE259]" /> COMPILE ATHLETE WEIGHT TRAINING PROTOCOL
          </h3>
          <p className="text-xs text-zinc-400 font-mono mb-6 uppercase">
            LINKED ATHLETE ID: <span className="text-white font-bold">{targetMemberId}</span>
          </p>

          <form onSubmit={handleWorkoutSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1.5">Protocol Title / Split Category</label>
              <input
                type="text"
                value={wpTitle}
                onChange={(e) => setWpTitle(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs font-mono text-white"
              />
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Monday (Heavy Squat/Push split)</label>
                <textarea
                  rows={2}
                  value={monRoutine}
                  onChange={(e) => setMonRoutine(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Wednesday (Heavy Deadlift/Pull split)</label>
                <textarea
                  rows={2}
                  value={wedRoutine}
                  onChange={(e) => setWedRoutine(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Friday (Bench/Bracing Pump split)</label>
                <textarea
                  rows={2}
                  value={friRoutine}
                  onChange={(e) => setFriRoutine(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-white"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('members')}
                className="flex-1 py-2.5 bg-zinc-950 border border-zinc-850 text-zinc-400 font-mono text-[10px] rounded-xl cursor-pointer"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-[#FFE259] text-black font-sans font-black text-xs tracking-widest uppercase rounded-xl hover:brightness-110 cursor-pointer shadow shadow-amber-500/10"
              >
                PUBLISH WORKOUT PLANS
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4. CONFIGURE MEAL DIRECTORY */}
      {activeTab === 'diet' && targetMemberId && (
        <div className="p-6 bg-zinc-900/60 border border-zinc-900 rounded-2xl max-w-3xl">
          <h3 className="text-sm font-sans font-black tracking-widest text-zinc-100 uppercase mb-4 flex items-center gap-1.5">
            <ClipboardList className="h-5 w-5 text-[#FFE259]" /> DIET SCHEDULE DESIGNER
          </h3>
          <p className="text-xs text-zinc-400 font-mono mb-6 uppercase">
            ONBOARDED ATHLETE: <span className="text-white font-bold">{targetMemberId}</span>
          </p>

          <form onSubmit={handleDietSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="sm:col-span-1">
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Caloric Target (kcal)</label>
                <input
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs font-mono text-white"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Protein Goal (g)</label>
                <input
                  type="number"
                  value={protein}
                  onChange={(e) => setProtein(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs font-mono text-white"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Plan Nickname</label>
                <input
                  type="text"
                  value={dpTitle}
                  onChange={(e) => setDpTitle(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs font-mono text-white"
                />
              </div>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Meal 1: Breakfast (08:00 AM)</label>
                <input
                  type="text"
                  value={meal1}
                  onChange={(e) => setMeal1(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs font-mono text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Meal 2: Lunch (01:30 PM)</label>
                <input
                  type="text"
                  value={meal2}
                  onChange={(e) => setMeal2(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs font-mono text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Meal 3: Pre-Workout (05:30 PM)</label>
                <input
                  type="text"
                  value={meal3}
                  onChange={(e) => setMeal3(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs font-mono text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Meal 4: Post-Workout Dinner (08:45 PM)</label>
                <input
                  type="text"
                  value={meal4}
                  onChange={(e) => setMeal4(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs font-mono text-white"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('members')}
                className="flex-1 py-2.5 bg-zinc-950 border border-zinc-850 text-zinc-400 font-mono text-[10px] rounded-xl cursor-pointer"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-[#FFE259] text-black font-sans font-black text-xs tracking-widest uppercase rounded-xl hover:brightness-110 cursor-pointer shadow shadow-amber-500/10"
              >
                PUBLISH MEAL PLANS
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
