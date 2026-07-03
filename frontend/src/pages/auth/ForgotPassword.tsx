import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { Mail, AlertTriangle, ShieldCheck, ArrowLeft, KeyRound } from 'lucide-react';
import Logo from '../../components/Logo';
import { ApiClient } from '../../services/api.client';

const schema = z.object({
  email: z.string().email({ message: 'Enter a valid registered lifter email address' })
});

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: '' }
  });

  const onSubmit = async (data: { email: string }) => {
    setLoading(true);
    setErrorMessage('');
    
    try {
      await ApiClient.post('/auth/forgot-password', { email: data.email }, false);
      setSuccess(true);
    } catch (error) {
      setErrorMessage('Recovery service could not process this email right now.');
    } finally {
      setLoading(false);
    }
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
            RESTORE PASSWORD
          </h2>
          <p className="mt-1 text-[10px] font-mono text-zinc-400 tracking-wider">
            RE-VERIFY SECURE LIFTER CREDENTIALS
          </p>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-xl">
          {success ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-4"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FFE259]/10 border border-[#FFE259]/35">
                <ShieldCheck className="h-6 w-6 text-[#FFE259]" />
              </div>
              <h3 className="text-base font-sans font-black tracking-wider text-white uppercase">RECOVERY TOKEN SENT</h3>
              <p className="text-xs font-mono text-zinc-400 leading-relaxed">
                We have transmitted a secure password override key to your registered email directory. Enter your new code values under <Link to="/reset-password" className="text-[#FFE259] underline">Reset Token Hub</Link> to finish.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FFE259] hover:underline uppercase tracking-widest pt-2"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to portal sign in
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Type your corporate or athlete email below. A cryptographic token link will be dispatched to update your access codes.
              </p>

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-2.5">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                  <span className="text-[11px] text-zinc-400 font-mono leading-relaxed">{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-mono text-zinc-400 tracking-wider uppercase mb-2">
                  Lifter Email Directory
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-3.5 w-3.5 text-zinc-500" />
                  </span>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full bg-zinc-950 text-white pl-9 pr-3 py-2.5 rounded-xl border border-zinc-800/80 focus:border-[#FFE259]/80 focus:outline-none focus:ring-1 focus:ring-[#FFE259]/40 text-xs font-mono"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-[10px] text-red-500 mt-1 font-mono">{errors.email.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 py-3.5 font-sans text-xs font-black tracking-widest text-black uppercase transition-all shadow-lg hover:shadow-amber-500/10 hover:brightness-110 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Transmitting Key...' : 'GENERATE RECOVERY PASS'}
              </button>

              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 hover:text-[#FFE259] uppercase tracking-widest transition-colors"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Cancel and login
                </Link>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
