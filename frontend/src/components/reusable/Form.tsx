import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
  required?: boolean;
}

export function InputField({ label, error, className = '', required, ...props }: InputProps) {
  return (
    <div className="space-y-1.5 w-full text-left">
      <label className="block text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-black">
        {label} {required && <span className="text-amber-500">*</span>}
      </label>
      <input
        required={required}
        className={`w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 font-sans text-sm text-white placeholder-zinc-650 outline-none focus:border-[#FFE259]/50 focus:ring-2 focus:ring-[#FFE259]/10 transition-all font-medium ${error ? 'border-red-500/50 focus:border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <span className="block text-[10px] font-mono text-red-400 font-bold">
          ⚠ {error}
        </span>
      )}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string | number; label: string }[];
  error?: string;
  className?: string;
}

export function SelectField({ label, options, error, className = '', ...props }: SelectProps) {
  return (
    <div className="space-y-1.5 w-full text-left">
      <label className="block text-[10px] font-mono tracking-widest text-[#FFE259] uppercase font-black">
        {label}
      </label>
      <select
        className={`w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 px-4 font-sans text-xs text-white outline-none focus:border-[#FFE259]/50 transition-all ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-zinc-950 text-white">
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="block text-[10px] font-mono text-red-400 font-bold">
          ⚠ {error}
        </span>
      )}
    </div>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

export function CommandButton({ variant = 'primary', children, className = '', onClick, type = 'button', ...props }: ButtonProps) {
  const baseClasses = "px-5 py-3 rounded-xl font-sans text-xs font-black tracking-wider uppercase transition-all duration-150 active:scale-[0.98] cursor-pointer disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-1.5";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black hover:brightness-110 shadow-lg hover:shadow-amber-500/10",
    secondary: "bg-zinc-900 hover:bg-zinc-850 text-[#FFE259] border border-zinc-800 hover:border-[#FFE259]/30",
    danger: "bg-red-500/10 border border-[#FFE259]/20 text-red-400 hover:bg-red-500/20"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
