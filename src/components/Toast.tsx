import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  showToast: boolean;
  onClose: () => void;
}

export default function Toast({ showToast, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, type: 'spring', bounce: 0.4 }}
          onClick={onClose}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-neutral-900 text-white shadow-lg rounded-xl p-4 max-w-[320px] cursor-pointer hover:bg-neutral-800 transition-colors"
        >
          <div className="shrink-0">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
          </div>
          <div className="flex-1">
            <p className="text-[14px] font-medium">
              🎉 Processo concluído! Seus cortes estão prontos.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
