import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert } from 'lucide-react';
import { CommandButton } from './Form';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'danger' | 'info';
}

export function Dialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  description, 
  confirmText = "CONFIRM", 
  cancelText = "DISMISS",
  type = 'warning'
}: DialogProps) {
  const iconColors = {
    warning: 'text-[#FFE259] bg-amber-500/10 border-amber-500/35',
    danger: 'text-red-400 bg-red-500/10 border-red-500/35',
    info: 'text-blue-400 bg-blue-500/10 border-blue-500/35'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-sm rounded-2xl border border-zinc-900 bg-zinc-950 p-6 shadow-2xl text-center"
          >
            <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border ${iconColors[type]}`}>
              <ShieldAlert className="h-6 w-6 animate-pulse" />
            </div>

            <h3 className="font-sans text-sm font-black tracking-widest text-white uppercase">
              {title}
            </h3>
            <p className="mt-2 text-zinc-400 text-xs leading-relaxed font-sans">
              {description}
            </p>

            <div className="mt-6 flex gap-2">
              <CommandButton 
                onClick={onClose} 
                variant="secondary"
                className="flex-1 text-[10px] py-2.5 h-10"
              >
                {cancelText}
              </CommandButton>
              <CommandButton 
                onClick={() => {
                  onConfirm();
                  onClose();
                }} 
                variant={type === 'danger' ? 'danger' : 'primary'}
                className="flex-1 text-[10px] py-2.5 h-10"
              >
                {confirmText}
              </CommandButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
export default Dialog;
