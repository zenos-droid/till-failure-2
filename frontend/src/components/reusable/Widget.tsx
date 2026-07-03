import React from 'react';
import { LucideIcon } from 'lucide-react';

interface WidgetProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtext?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  accentColor?: 'yellow' | 'red' | 'amber' | 'zinc';
}

export function DashboardWidget({ 
  title, 
  value, 
  icon: IconComponent, 
  subtext, 
  trend,
  accentColor = 'yellow'
}: WidgetProps) {
  const accentClasses = {
    yellow: 'border-[#FFE259]/20 shadow-[#FFE259]/1 focus-within:border-[#FFE259]/50',
    amber: 'border-amber-500/20 shadow-amber-500/1 focus-within:border-amber-500/50',
    red: 'border-red-500/20 shadow-red-500/1 focus-within:border-red-500/50',
    zinc: 'border-zinc-800 shadow-zinc-800/1 focus-within:border-zinc-750'
  };

  const iconColors = {
    yellow: 'text-[#FFE259] bg-[#FFE259]/5 border-[#FFE259]/10',
    amber: 'text-amber-500 bg-amber-500/5 border-amber-500/10',
    red: 'text-red-400 bg-red-500/5 border-red-500/10',
    zinc: 'text-zinc-400 bg-zinc-905 border-zinc-850'
  };

  return (
    <div className={`p-6 rounded-2xl border bg-zinc-950/40 backdrop-blur-sm shadow hover:bg-zinc-900/10 transition-all ${accentClasses[accentColor]}`}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-black">
          {title}
        </span>
        <div className={`p-2 border rounded-xl shrink-0 ${iconColors[accentColor]}`}>
          <IconComponent className="h-4.5 w-4.5" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-2.5">
        <span className="font-sans text-3xl font-black tracking-tight text-white uppercase">
          {value}
        </span>
        {trend && (
          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
            trend.isPositive ? 'text-green-400 bg-green-500/5' : 'text-red-400 bg-red-500/5'
          }`}>
            {trend.value}
          </span>
        )}
      </div>

      {subtext && (
        <p className="mt-2 font-mono text-[9px] text-zinc-500 uppercase tracking-wider">
          {subtext}
        </p>
      )}
    </div>
  );
}
export default DashboardWidget;
