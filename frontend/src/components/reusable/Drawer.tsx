import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Drawer({ isOpen, onClose, title, children }: DrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop blur clickoff */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="pointer-events-auto w-screen max-w-md"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-zinc-950 border-l border-zinc-900 shadow-xl relative">
                {/* Border accent */}
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-amber-600 via-yellow-400 to-amber-600" />

                {/* Drawer header */}
                <div className="px-6 py-5 border-b border-zinc-900 flex items-center justify-between">
                  <h3 className="font-sans text-sm font-black tracking-widest text-[#FFE259] uppercase">
                    {title}
                  </h3>
                  <button
                    onClick={onClose}
                    className="rounded-lg p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-900 cursor-pointer"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Core body */}
                <div className="flex-1 px-6 py-6 overflow-y-auto">
                  {children}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
export default Drawer;
