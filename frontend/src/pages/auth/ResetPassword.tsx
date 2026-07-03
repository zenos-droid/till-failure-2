import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { KeyRound, ShieldCheck, ArrowLeft, AlertTriangle } from 'lucide-react';
import Logo from '../../components/Logo';
import { ApiClient } from '../../services/api.client';

const schema = z.object({
  token: z.string().min(4, { message: 'Override token must be provided' }),
  password: z.string().min(6, { message: 'New password must be at least 6 characters' }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "New passwords must match exactly",
  path: ["confirmPassword"]
});

export default function ResetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { token: '', password: '', confirmPassword: '' }
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    await ApiClient.post('/auth/reset-password', { token: data.token, password: data.password }, false);
    setSuccess(true);
    setLoading(false);
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFE259]/20 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <Logo size="lg" variant="full" />
          </Link>
          <h2 className="mt-4 text-xl font-sans font-black tracking-widest text-[#FFE259] uppercase">
            RE-ESTABLISH CODES
          </h2>
          <p className="mt-1 text-[10px] font-mono text-zinc-400 tracking-wider">
            AUTHORIZE DISPATCH OVERRIDE SYSTEM
          </p>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-xl">
          {success ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-4"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FFE259]/10 border border-[#FFE259]/35 animate-bounce">
                <ShieldCheck className="h-6 w-6 text-[#FFE259]" />
              </div>
              <h3 className="text-base font-sans font-black text-white uppercase tracking-wider">REPROGRAMMING COMPLETE</h3>
              <p className="text-xs font-mono text-zinc-400 leading-relaxed">
                Your credentials have been recompiled and recorded safely in the local system registry. Preparing terminal log...
              </p>
              <span className="text-[10px] text-zinc-500 font-mono block">Redirecting to login...</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Token Input */}
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 tracking-wider uppercase mb-1.5">
                  Secure Override Token
                </label>
                <input
                  type="text"
                  placeholder="TF-OVERRIDE-XXXX"
                  className="w-full bg-zinc-950 text-white px-3.5 py-2.5 rounded-xl border border-zinc-800/80 focus:border-[#FFE259]/80 focus:outline-none focus:ring-1 focus:ring-[#FFE259]/40 text-xs font-mono"
                  {...register('token')}
                />
                {errors.token && (
                  <p className="text-[10px] text-red-500 mt-1 font-mono">{errors.token.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 tracking-wider uppercase mb-1.5">
                  New Passcode
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
                  Confirm New Passcode
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

              <button
                type="submit"
                disabled={loading}
                className="w-full relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 py-3.5 font-sans text-xs font-black tracking-widest text-black uppercase transition-all shadow-lg hover:shadow-amber-500/10 hover:brightness-110 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Recompiling Codes...' : 'COMMIT NEW CREDENTIALS'}
              </button>

              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 hover:text-[#FFE259] uppercase tracking-widest transition-colors"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Return directly to login
                </Link>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
