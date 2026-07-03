import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Scale, Heart, ShieldAlert, ArrowRight, BookOpen, Flame, Droplet, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BMICalculator() {
  const [weight, setWeight] = useState('72');
  const [height, setHeight] = useState('174');
  const [age, setAge] = useState('25');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [activity, setActivity] = useState('Active');
  
  const [results, setResults] = useState<{
    bmi: number;
    category: string;
    bmr: number;
    maintenance: number;
    targetProtein: string;
    goalPlan: string;
    macroBreakdown: { protein: number; carbs: number; fats: number };
  } | null>(null);

  const calculateMetrics = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    const a = parseInt(age);

    if (!w || !h || !a) return;

    // BMI
    const bmiVal = parseFloat((w / (h * h)).toFixed(1));
    
    let category = '';
    let goal = '';
    let proteinMult = 2.0;

    if (bmiVal < 18.5) {
      category = 'Underweight (Need Lean Mass Hypertrophy)';
      goal = 'Surplus Hypertrophy (Anabolic Gain)';
      proteinMult = 2.2;
    } else if (bmiVal >= 18.5 && bmiVal < 25) {
      category = 'Normal Healthy Weight (Strength & Joint Bracing)';
      goal = 'Clean Recomp & Strength Peak';
      proteinMult = 2.0;
    } else if (bmiVal >= 25 && bmiVal < 30) {
      category = 'Overweight (Ready for Deficit Shred)';
      goal = '12-Week Metcon Caloric Deficit Cutting';
      proteinMult = 1.8;
    } else {
      category = 'Highly Obese (Priority Transformation Track)';
      goal = 'Aggressive Deficit Alignment';
      proteinMult = 1.6;
    }

    // BMR (Harris-Benedict Equation)
    let bmr = 0;
    if (gender === 'Male') {
      bmr = Math.round(88.362 + (13.397 * w) + (4.799 * parseFloat(height)) - (5.677 * a));
    } else {
      bmr = Math.round(447.593 + (9.247 * w) + (3.098 * parseFloat(height)) - (4.330 * a));
    }

    // Maintenance calories
    let activityMult = 1.2;
    if (activity === 'Sedentary') activityMult = 1.2;
    else if (activity === 'Light') activityMult = 1.375;
    else if (activity === 'Active') activityMult = 1.55;
    else activityMult = 1.725;

    const maintenance = Math.round(bmr * activityMult);
    const targetProteinValue = Math.round(w * proteinMult);

    let goalCalories = maintenance;
    if (bmiVal < 18.5) goalCalories += 400; // Hypertrophy surplus
    else if (bmiVal >= 25) goalCalories -= 500; // Deficit shred

    // Macros based on target calories
    // Protein: 4 cal/g, Fats: 9 cal/g, Carbs: 4 cal/g
    const proteinCal = targetProteinValue * 4;
    const fatCal = Math.round(goalCalories * 0.25);
    const fatGrams = Math.round(fatCal / 9);
    const remainingCal = goalCalories - proteinCal - fatCal;
    const carbGrams = Math.round(remainingCal / 4);

    setResults({
      bmi: bmiVal,
      category,
      bmr,
      maintenance: goalCalories,
      targetProtein: `${targetProteinValue}g`,
      goalPlan: goal,
      macroBreakdown: {
        protein: targetProteinValue,
        fats: fatGrams,
        carbs: Math.max(0, carbGrams)
      }
    });
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      
      {/* 1. SECTION INTRO */}
      <section className="bg-linear-to-b from-zinc-900 via-zinc-950 to-zinc-950 px-4 py-20 border-b border-zinc-900 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/3 h-52 w-92 rounded-full bg-amber-500/5 blur-[120px]" />
        
        <div className="relative max-w-3xl mx-auto z-10 space-y-4">
          <span className="font-mono text-xs font-black tracking-[0.3em] text-[#FFE259] uppercase">
            // METRIC CLINICAL ASSESSMENT
          </span>
          <h1 className="font-sans text-4xl sm:text-6xl font-black uppercase tracking-tight">
            BIOMECHANIC COMPUTER
          </h1>
          <p className="font-sans text-xs sm:text-base text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Stop guessing your sports diet calorie deficits. Provide your parameters below to compute your active BMR reserves and daily macronutrient guidelines.
          </p>
        </div>
      </section>

      {/* 2. LIVE DASHBOARD PANEL */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form controls: 5 Cols */}
          <div className="lg:col-span-5 bg-zinc-950 border border-zinc-900 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <div className="absolute top-0 right-10 h-1 w-20 bg-amber-500" />
            
            <h3 className="font-sans font-black text-white uppercase text-base mb-6 pb-2 border-b border-zinc-900">
              Input Parameters
            </h3>

            <form onSubmit={calculateMetrics} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1 font-bold">
                    Gender Line
                  </label>
                  <div className="flex rounded-lg bg-zinc-900 p-0.5 border border-zinc-800">
                    <button
                      type="button"
                      onClick={() => setGender('Male')}
                      className={`flex-1 py-2 font-mono text-[10px] uppercase font-black rounded-md ${
                        gender === 'Male' ? 'bg-[#FFE259] text-black' : 'text-zinc-400'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('Female')}
                      className={`flex-1 py-2 font-mono text-[10px] uppercase font-black rounded-md ${
                        gender === 'Female' ? 'bg-[#FFE259] text-black' : 'text-zinc-400'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1 font-bold">
                    Age Index
                  </label>
                  <input
                    type="number"
                    required
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2 px-3 font-mono text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1 font-bold">
                    Body Weight (KG)
                  </label>
                  <input
                    type="number"
                    required
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2 px-3 font-mono text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1 font-bold">
                    Stature Height (CM)
                  </label>
                  <input
                    type="number"
                    required
                    value={height}
                    onChange={e => setHeight(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2 px-3 font-mono text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase mb-1 font-bold">
                  Activity Velocity Class
                </label>
                <select
                  value={activity}
                  onChange={e => setActivity(e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2.5 px-3 font-mono text-xs text-white"
                >
                  <option value="Sedentary">Sedentary (No Exercise, IT Shifts)</option>
                  <option value="Light">Lightly Active (1-2 days simple dumbbell cardio)</option>
                  <option value="Active">Active Athlete (3-5 days heavy barbell lifting)</option>
                  <option value="Hardcore">Absolute Hardcore (6 days Till Failure sets)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 py-3.5 font-sans font-black tracking-widest text-black text-xs uppercase transition-transform active:scale-95"
              >
                EXECUTE DIAGNOSTICS CALCULUS
              </button>
            </form>
          </div>

          {/* Right outputs: 7 Cols */}
          <div className="lg:col-span-7 space-y-6">
            {results ? (
              <div className="rounded-2xl border border-amber-500/20 bg-linear-to-b from-zinc-950 to-zinc-900 p-6 sm:p-8 space-y-6 shadow-2xl">
                
                {/* Gauge Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950">
                    <span className="font-mono text-[8px] text-zinc-500 tracking-wider block uppercase">
                      BMI VALUE SCORE
                    </span>
                    <span className="font-sans font-black text-3xl sm:text-4xl text-[#FFE259] block mt-1">
                      {results.bmi}
                    </span>
                    <span className="block font-sans text-[10px] text-zinc-400 mt-2 font-bold uppercase truncate">
                      {results.category.split(' ')[0]} Frame
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950">
                    <span className="font-mono text-[8px] text-zinc-500 tracking-wider block uppercase">
                      GOAL DIET TARGET
                    </span>
                    <span className="font-sans font-black text-lg sm:text-xl text-white block mt-2.5 uppercase leading-tight line-clamp-1">
                      {results.goalPlan.split(' ')[0]}
                    </span>
                    <span className="block font-sans text-[9px] text-[#FFE259] mt-3 uppercase tracking-widest font-black leading-none">
                      {results.maintenance} KCAL / DAY
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950">
                    <span className="font-mono text-[8px] text-zinc-500 tracking-wider block uppercase">
                      TARGET PROTEIN RESERVE
                    </span>
                    <span className="font-sans font-black text-3xl sm:text-4xl text-amber-500 block mt-1">
                      {results.targetProtein}
                    </span>
                    <span className="block font-mono text-[9px] text-zinc-400 mt-3 uppercase font-bold leading-none">
                      Calculated on 2.0x w/kg
                    </span>
                  </div>
                </div>

                {/* Macro Distribution sliders */}
                <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-950 space-y-4">
                  <span className="font-mono text-[9px] text-[#FFE259] tracking-widest uppercase font-black">
                    MACRONUTRIENT BALANCE MATRIX (DAILY TARGETS):
                  </span>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between font-mono text-[10px] mb-1">
                        <span className="text-zinc-400 uppercase">Protein (Muscle Repair)</span>
                        <span className="text-amber-500 font-bold">{results.macroBreakdown.protein}g</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '35%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-mono text-[10px] mb-1">
                        <span className="text-zinc-400 uppercase">Carbohydrates (Torque Fuel)</span>
                        <span className="text-white font-bold">{results.macroBreakdown.carbs}g</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <div className="h-full bg-white rounded-full" style={{ width: '45%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-mono text-[10px] mb-1">
                        <span className="text-zinc-400 uppercase">Fats (Hormonal Anchor)</span>
                        <span className="text-[#FFE259] font-bold">{results.macroBreakdown.fats}g</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <div className="h-full bg-[#FFE259] rounded-full" style={{ width: '20%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* BENGST RANGE LOGS (LOCAL SATTU MATHS) */}
                <div className="p-5 bg-zinc-900/40 border border-zinc-850 rounded-xl space-y-3">
                  <div className="flex gap-2 items-center">
                    <Heart className="h-4.5 w-4.5 text-[#FFE259]" />
                    <span className="font-sans font-black text-xs text-white uppercase tracking-wider">
                      HOOGHLY LOCAL DIET INTEGRATION Blueprints
                    </span>
                  </div>
                  <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                    Hitting {results.targetProtein} of premium protein locally in Rishra can be maximized using these budget sources:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-[11px] text-zinc-300">
                    <div className="p-3 rounded bg-zinc-950 border border-zinc-850 text-center">
                      <span className="text-amber-500 font-bold">100g Local Sattu</span>
                      <span className="block text-[10px] text-zinc-500 mt-1">20g Prot • 10g Fiber</span>
                    </div>
                    <div className="p-3 rounded bg-zinc-950 border border-zinc-850 text-center">
                      <span className="text-white font-bold">6 Whole Local Eggs</span>
                      <span className="block text-[10px] text-zinc-500 mt-1">36g Prot • 30g Fats</span>
                    </div>
                    <div className="p-3 rounded bg-zinc-950 border border-zinc-850 text-center">
                      <span className="text-[#FFE259] font-bold">250g Fresh Katla/Fish</span>
                      <span className="block text-[10px] text-zinc-500 mt-1">45g Prot • Clean Omega-3</span>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-12 text-center flex flex-col items-center justify-center space-y-3 min-h-[300px]">
                <Scale className="h-12 w-12 text-zinc-650 animate-pulse mb-2" />
                <span className="font-sans font-black text-zinc-400 uppercase tracking-widest">
                  Awaiting Input Parameters
                </span>
                <p className="font-sans text-xs text-zinc-500 max-w-xs leading-relaxed mx-auto">
                  Provide your stature indices and torque activity level on the left to activate the dynamic body diagnostic calculator.
                </p>
              </div>
            )}

            {/* Local sattu general tips block always visible */}
            <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-900 space-y-4">
              <h4 className="font-sans font-bold text-white uppercase text-xs flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-amber-500" />
                THE RISHRA SATTU CHEAT CODE
              </h4>
              <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                Our Head Coach Biplab Singh swear by local chickpea sattu for budget strength building. Mixing 3 tablespoons of raw sattu with cold water and pink salt post workout acts as an instant digestive protein lock.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
