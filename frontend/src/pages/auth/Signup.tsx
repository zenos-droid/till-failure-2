import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { Dumbbell, Mail, Phone, User, KeyRound, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';
import { useGymStore } from '../../store/gymStore';
import { ApiClient } from '../../services/api.client';
import Logo from '../../components/Logo';

const signupSchema = z.object({
  name: z.string().min(3, { message: 'Full name must be at least 3 characters' }),
  email: z.string().email({ message: 'Enter a valid communication email' }),
  phone: z.string().min(10, { message: 'Enter a valid 10-digit Indian phone number' }),
  gender: z.enum(['Male', 'Female']),
  activeSlot: z.string().min(1, { message: 'Select your preferred lifting frame' }),
  interestPlan: z.string().min(1, { message: 'Choose a starter package' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match exactly",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function Signup() {
  const navigate = useNavigate();
  const addLead = useGymStore((state) => state.addLead);
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      gender: 'Male',
      activeSlot: 'Evening Frame (5PM - 10PM)',
      interestPlan: 'Discipline Quarterly Lock',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data: SignupFormValues) => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    // Simulate premium system registration pipeline
    await new Promise((resolve) => setTimeout(resolve, 1400));
    
    try {
      // Dynamic onboarding: add them directly as a real active SaaS member!
      const planName = data.interestPlan;
      const today = new Date();
      const futureDate = new Date();
      
      // Determine plan details
      let months = 1;
      if (planName.toLowerCase().includes('quarterly')) months = 3;
      if (planName.toLowerCase().includes('annual') || planName.toLowerCase().includes('warrior')) months = 12;
      
      futureDate.setMonth(today.getMonth() + months);
      
      const newMember = await ApiClient.post<any>('/signup', {
        name: data.name,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        activeSlot: data.activeSlot,
        interestPlan: planName,
        password: data.password
      }, false);

      // Also register as Converted Lead for statistical fidelity
      addLead({
        name: data.name,
        phone: data.phone,
        email: data.email,
        interest: planName,
        status: 'Converted'
      });
      
      setSuccessMessage(`Athlete Onboarding Clear! Your account token is ${newMember.id}`);
      
      // Redirect to login to activate session
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      
    } catch (err) {
      setErrorMessage('Onboarding server error. Please verify input fields.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.04),transparent_50%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFE259]/20 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl z-10"
      >
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-block transition-transform duration-200 hover:scale-102">
            <Logo size="lg" variant="full" />
          </Link>
          <h2 className="mt-4 text-xl font-sans font-black tracking-widest text-zinc-100 uppercase">
            STRENGTH ONLINE ADMISSIONS
          </h2>
          <p className="mt-1 text-[10px] font-mono text-zinc-400 tracking-wider">
            UPGRADE BODY INDICES AT TILL FAILURE RISHRA
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3"
            >
              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0" />
              <div>
                <h3 className="text-xs font-sans font-black text-red-400 uppercase tracking-wider">ONBOARDING REFUSED</h3>
                <p className="text-[11px] text-zinc-400 mt-1">{errorMessage}</p>
              </div>
            </motion.div>
          )}

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-4 rounded-xl bg-[#FFE259]/10 border border-[#FFE259]/20 flex items-start gap-3"
            >
              <ShieldCheck className="h-5 w-5 text-[#FFE259] shrink-0" />
              <div>
                <h3 className="text-xs font-sans font-black text-[#FFE259] uppercase tracking-wider">WELCOME TO THE TEAM</h3>
                <p className="text-[11px] text-zinc-400 mt-1">{successMessage}</p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 tracking-wider uppercase mb-1.5">
                  Full Athlete Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-3.5 w-3.5 text-zinc-500" />
                  </span>
                  <input
                    type="text"
                    placeholder="Ayush Gore"
                    className="w-full bg-zinc-950 text-white pl-9 pr-3 py-2.5 rounded-xl border border-zinc-800/80 focus:border-[#FFE259]/80 focus:outline-none focus:ring-1 focus:ring-[#FFE259]/40 text-xs font-mono"
                    {...register('name')}
                  />
                </div>
                {errors.name && (
                  <p className="text-[10px] text-red-500 mt-1 font-mono">{errors.name.message}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 tracking-wider uppercase mb-1.5">
                  Secure Email Addr
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-3.5 w-3.5 text-zinc-500" />
                  </span>
                  <input
                    type="email"
                    placeholder="ayush@domain.com"
                    className="w-full bg-zinc-950 text-white pl-9 pr-3 py-2.5 rounded-xl border border-zinc-800/80 focus:border-[#FFE259]/80 focus:outline-none focus:ring-1 focus:ring-[#FFE259]/40 text-xs font-mono"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-[10px] text-red-500 mt-1 font-mono">{errors.email.message}</p>
                )}
              </div>

              {/* Phone contact */}
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 tracking-wider uppercase mb-1.5">
                  Indian Phone Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Phone className="h-3.5 w-3.5 text-zinc-500" />
                  </span>
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-zinc-950 text-white pl-9 pr-3 py-2.5 rounded-xl border border-zinc-800/80 focus:border-[#FFE259]/80 focus:outline-none focus:ring-1 focus:ring-[#FFE259]/40 text-xs font-mono"
                    {...register('phone')}
                  />
                </div>
                {errors.phone && (
                  <p className="text-[10px] text-red-500 mt-1 font-mono">{errors.phone.message}</p>
                )}
              </div>

              {/* Gender selection */}
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 tracking-wider uppercase mb-1.5">
                  Gender Identity
                </label>
                <select
                  className="w-full bg-zinc-950 text-white px-3 py-2.5 rounded-xl border border-zinc-800/80 focus:border-[#FFE259]/80 focus:outline-none focus:ring-1 focus:ring-[#FFE259]/40 text-xs font-mono"
                  {...register('gender')}
                >
                  <option value="Male">Male Lifter</option>
                  <option value="Female">Female Lifter</option>
                </select>
                {errors.gender && (
                  <p className="text-[10px] text-red-500 mt-1 font-mono">{errors.gender.message}</p>
                )}
              </div>

              {/* Workout Slot */}
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 tracking-wider uppercase mb-1.5">
                  Preferred Gym Frame
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Clock className="h-3.5 w-3.5 text-zinc-500" />
                  </span>
                  <select
                    className="w-full bg-zinc-950 text-white pl-9 pr-3 py-2.5 rounded-xl border border-zinc-800/80 focus:border-[#FFE259]/80 focus:outline-none focus:ring-1 focus:ring-[#FFE259]/40 text-xs font-mono"
                    {...register('activeSlot')}
                  >
                    <option value="Morning Frame (6AM - 10AM)">Morning (06:00 - 10:00)</option>
                    <option value="Afternoon Frame (11AM - 4PM)">Afternoon (11:00 - 16:00)</option>
                    <option value="Evening Frame (5PM - 10PM)">Evening (17:00 - 22:00)</option>
                  </select>
                </div>
                {errors.activeSlot && (
                  <p className="text-[10px] text-red-500 mt-1 font-mono">{errors.activeSlot.message}</p>
                )}
              </div>

              {/* Desired membership plan */}
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 tracking-wider uppercase mb-1.5">
                  Target Plan Bundle
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Dumbbell className="h-3.5 w-3.5 text-zinc-500" />
                  </span>
                  <select
                    className="w-full bg-zinc-950 text-white pl-9 pr-3 py-2.5 rounded-xl border border-zinc-800/80 focus:border-[#FFE259]/80 focus:outline-none focus:ring-1 focus:ring-[#FFE259]/40 text-xs font-mono"
                    {...register('interestPlan')}
                  >
                    <option value="Sprint Monthly Starter">Sprint Monthly Starter (₹1,200/mo)</option>
                    <option value="Discipline Quarterly Lock">Discipline Quarterly Lock (3mo @ ₹3,200)</option>
                    <option value="Double Heavy Couple Bundle">Double Heavy Partner Bundle (3mo @ ₹5,500)</option>
                    <option value="Absolute Warrior Club">Absolute Warrior Club (12mo @ ₹10,000)</option>
                  </select>
                </div>
                {errors.interestPlan && (
                  <p className="text-[10px] text-red-500 mt-1 font-mono">{errors.interestPlan.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 tracking-wider uppercase mb-1.5">
                  Set Passage Code
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <KeyRound className="h-3.5 w-3.5 text-zinc-500" />
                  </span>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-zinc-950 text-white pl-9 pr-3 py-2.5 rounded-xl border border-zinc-800/80 focus:border-[#FFE259]/80 focus:outline-none focus:ring-1 focus:ring-[#FFE259]/40 text-xs font-mono"
                    {...register('password')}
                  />
                </div>
                {errors.password && (
                  <p className="text-[10px] text-red-500 mt-1 font-mono">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 tracking-wider uppercase mb-1.5">
                  Confirm Passage Code
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <KeyRound className="h-3.5 w-3.5 text-zinc-500" />
                  </span>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-zinc-950 text-white pl-9 pr-3 py-2.5 rounded-xl border border-zinc-800/80 focus:border-[#FFE259]/80 focus:outline-none focus:ring-1 focus:ring-[#FFE259]/40 text-xs font-mono"
                    {...register('confirmPassword')}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-[10px] text-red-500 mt-1 font-mono">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            {/* Submit admission */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative mt-4 inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 py-3.5 font-sans text-xs font-black tracking-widest text-black uppercase transition-all shadow-lg hover:shadow-amber-500/10 hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Provisioning Lifting Slots...</span>
                </>
              ) : (
                <>
                  <Dumbbell className="h-4 w-4 animate-pulse" />
                  <span>SUBMIT SECURE REGISTRATION</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-5 text-center text-xs">
            <span className="text-zinc-500">Already part of the local Rishra facility? </span>
            <Link to="/login" className="text-[#FFE259] hover:underline font-mono font-bold uppercase tracking-wide">
              Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
