import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { KeyRound, Mail, AlertTriangle, ShieldCheck, Flame, User, Users, ClipboardList, Dumbbell } from 'lucide-react';
import { useGymStore } from '../../store/gymStore';
import Logo from '../../components/Logo';

const loginSchema = z.object({
  email: z.string().email({ message: 'Enter a valid corporate or lifter email' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  role: z.enum(['ADMIN', 'RECEPTIONIST', 'TRAINER', 'MEMBER'])
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const login = useGymStore((state) => state.login);
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      role: 'MEMBER'
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    // Simulate premium backend auth delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    try {
      // Validate credentials against current store mock values
      const success = await login(data.email, data.role, data.password);
      
      if (success) {
        setSuccessMessage(`Access Granted: Logged in as ${data.role}`);
        setTimeout(() => {
          navigate('/portal');
        }, 800);
      } else {
        setErrorMessage('Invalid credentials or unauthorized membership key.');
      }
    } catch (err) {
      setErrorMessage('Server connection timeout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Quick Account Login Assist helper
  const handleQuickLogin = (email: string, role: 'ADMIN' | 'RECEPTIONIST' | 'TRAINER' | 'MEMBER') => {
    setValue('email', email);
    setValue('password', 'securedPassword123');
    setValue('role', role);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.04),transparent_50%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFE259]/20 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg z-10"
      >
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block transition-transform duration-200 hover:scale-102">
            <Logo size="xl" variant="vertical" />
          </Link>
          <h2 className="mt-6 text-2xl font-sans font-black tracking-widest text-zinc-100 uppercase">
            PORTAL HUB SIGN IN
          </h2>
          <p className="mt-2 text-xs font-mono text-zinc-400 tracking-wider">
            SECURE ACCESS FOR GENERAL STAFF & ATHLETES
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-xl">
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3"
            >
              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-sans font-black text-red-400 uppercase tracking-wider">ACCESS DENIED</h3>
                <p className="text-xs text-zinc-400 mt-1">{errorMessage}</p>
              </div>
            </motion.div>
          )}

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-[#FFE259]/10 border border-[#FFE259]/20 flex items-start gap-3"
            >
              <ShieldCheck className="h-5 w-5 text-[#FFE259] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-sans font-black text-[#FFE259] uppercase tracking-wider">SECURE SHIELD PASS</h3>
                <p className="text-xs text-zinc-400 mt-1">{successMessage}</p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Design Selection Grid for Roles */}
            <div>
              <label className="block text-xs font-mono text-zinc-400 tracking-wider uppercase mb-3">
                Select Your Designation Scope
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'MEMBER', label: 'Athlete', icon: Dumbbell },
                  { key: 'TRAINER', label: 'Coach', icon: Flame },
                  { key: 'RECEPTIONIST', label: 'Manager', icon: ClipboardList },
                  { key: 'ADMIN', label: 'Director', icon: Users },
                ].map((r) => (
                  <label
                    key={r.key}
                    className="relative flex flex-col items-center justify-center p-3 rounded-xl border border-zinc-800 bg-zinc-950/40 cursor-pointer transition-all hover:bg-zinc-900/50 has-[:checked]:border-[#FFE259] has-[:checked]:bg-[#FFE259]/5 Group text-center"
                  >
                    <input
                      type="radio"
                      value={r.key}
                      className="peer sr-only"
                      {...register('role')}
                    />
                    <r.icon className="h-4 w-4 mb-2 text-zinc-500 peer-checked:text-[#FFE259] group-hover:text-zinc-300 transition-colors" />
                    <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 peer-checked:text-white">
                      {r.label}
                    </span>
                  </label>
                ))}
              </div>
              {errors.role && (
                <p className="text-xs text-red-500 mt-1 font-mono">{errors.role.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-mono text-zinc-400 tracking-wider uppercase mb-2">
                SaaS Email Identifier
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <Mail className="h-4 w-4 text-zinc-500" />
                </span>
                <input
                  type="email"
                  placeholder="name@tillfailure.com"
                  className="w-full bg-zinc-950 text-white pl-10 pr-4 py-3 rounded-xl border border-zinc-800/80 focus:border-[#FFE259]/80 focus:outline-none focus:ring-1 focus:ring-[#FFE259]/40 text-xs font-mono transition-all"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1 font-mono">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-mono text-zinc-400 tracking-wider uppercase">
                  Secure Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[10px] font-mono text-zinc-500 hover:text-[#FFE259] uppercase tracking-wider transition-colors"
                >
                  Forgot passcode?
                </Link>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <KeyRound className="h-4 w-4 text-zinc-500" />
                </span>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full bg-zinc-950 text-white pl-10 pr-4 py-3 rounded-xl border border-zinc-800/80 focus:border-[#FFE259]/80 focus:outline-none focus:ring-1 focus:ring-[#FFE259]/40 text-xs font-mono transition-all"
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1 font-mono">{errors.password.message}</p>
              )}
            </div>

            {/* Action Trigger */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 py-3.5 font-sans text-xs font-black tracking-widest text-black uppercase transition-all shadow-lg hover:shadow-amber-500/10 hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Verifying Token...</span>
                </>
              ) : (
                <>
                  <User className="h-4 w-4" />
                  <span>AUTHORIZE ACCESS</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Assistant */}
          <div className="mt-8 pt-6 border-t border-zinc-900/80">
            <h4 className="text-[10px] font-mono tracking-widest text-[#FFE259] uppercase mb-3 text-center font-bold">
              ⚡ SAAS SIMULATOR QUICK RECON / ROLE SWITCHES
            </h4>
            <div className="grid grid-cols-2 gap-2 text-left">
              <button
                onClick={() => handleQuickLogin('ayushgore21@gmail.com', 'MEMBER')}
                className="p-2 bg-zinc-950/60 border border-zinc-800 rounded-lg hover:border-[#FFE259] text-left transition-all group"
              >
                <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">1. Member Role</div>
                <div className="text-[11px] font-sans font-bold text-zinc-200 group-hover:text-white">Ayush Gore</div>
              </button>
              <button
                onClick={() => handleQuickLogin('biplab@tillfailure.com', 'TRAINER')}
                className="p-2 bg-zinc-950/60 border border-zinc-800 rounded-lg hover:border-[#FFE259] text-left transition-all group"
              >
                <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">2. Trainer/Coach</div>
                <div className="text-[11px] font-sans font-bold text-zinc-200 group-hover:text-white">Biplab Singh</div>
              </button>
              <button
                onClick={() => handleQuickLogin('rita@tillfailure.com', 'RECEPTIONIST')}
                className="p-2 bg-zinc-950/60 border border-zinc-800 rounded-lg hover:border-[#FFE259] text-left transition-all group"
              >
                <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">3. Front Desk</div>
                <div className="text-[11px] font-sans font-bold text-zinc-200 group-hover:text-white">Rita Ghosh</div>
              </button>
              <button
                onClick={() => handleQuickLogin('admin@tillfailure.com', 'ADMIN')}
                className="p-2 bg-zinc-950/60 border border-zinc-800 rounded-lg hover:border-[#FFE259] text-left transition-all group"
              >
                <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">4. Director Adm.</div>
                <div className="text-[11px] font-sans font-bold text-zinc-200 group-hover:text-white">Biplab S. (Admin)</div>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs">
            <span className="text-zinc-500">Not registered in our local Rishra facility yet? </span>
            <Link to="/signup" className="text-[#FFE259] hover:underline font-mono font-bold">
              Apply Online
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
