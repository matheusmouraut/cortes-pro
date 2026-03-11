import React from 'react';
import { Menu, Scissors, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Notificacao, Tab } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  isNotificacoesOpen: boolean;
  setIsNotificacoesOpen: (isOpen: boolean) => void;
  temNotificacao: boolean;
  setTemNotificacao: (has: boolean) => void;
  notificacoes: Notificacao[];
  handleTabClick: (tab: Tab) => void;
}

export default function Header({
  setIsMobileMenuOpen,
  isNotificacoesOpen,
  setIsNotificacoesOpen,
  temNotificacao,
  setTemNotificacao,
  notificacoes,
  handleTabClick
}: HeaderProps) {
  const { user } = useAuth();
  const initial = user?.email ? user.email.charAt(0).toUpperCase() : 'U';
  const displayName = user?.email ? user.email.split('@')[0] : 'Usuário';

  return (
    <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-4 md:px-8 shrink-0 z-30">
      <div className="flex items-center gap-3 md:hidden">
        <button 
          onClick={() => setIsMobileMenuOpen(true)} 
          className="p-2 -ml-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-neutral-900 rounded-lg flex items-center justify-center shadow-sm">
            <Scissors className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-semibold text-[15px] tracking-tight">CortesPro</span>
        </div>
      </div>

      <div className="hidden md:block flex-1"></div>

      <div className="flex items-center gap-4 ml-auto">
        <div className="relative">
          {isNotificacoesOpen && (
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsNotificacoesOpen(false)}
            />
          )}
          
          <button 
            onClick={() => {
              setIsNotificacoesOpen(!isNotificacoesOpen);
              if (!isNotificacoesOpen) {
                setTemNotificacao(false);
              }
            }}
            className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer relative z-50"
          >
            <Bell className="w-5 h-5" />
            {temNotificacao && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </button>

          <AnimatePresence>
            {isNotificacoesOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-[-10px] sm:right-0 mt-2 w-[300px] sm:w-80 bg-white/80 backdrop-blur-xl border border-neutral-200/80 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-50 overflow-hidden origin-top-right"
              >
                <div className="p-4 border-b border-neutral-200/50">
                  <h3 className="text-[14px] font-semibold text-neutral-900">Notificações</h3>
                </div>
                <div className="max-h-[320px] overflow-y-auto p-2">
                  {notificacoes.length === 0 ? (
                    <div className="p-6 text-center text-[13px] text-neutral-500">
                      Nenhuma notificação no momento.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1">
                      {notificacoes.map(notif => (
                        <div key={notif.id} className="p-3 rounded-xl hover:bg-neutral-50 transition-colors flex flex-col gap-1">
                          <p className="text-[13px] text-neutral-800 leading-snug">{notif.mensagem}</p>
                          <span className="text-[11px] text-neutral-400">{notif.hora}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="h-8 w-px bg-neutral-200 hidden md:block"></div>
        <div 
          onClick={() => handleTabClick('perfil')}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[12px] font-medium">
            {initial}
          </div>
          <span className="text-[14px] font-medium text-neutral-700 hidden md:block">
            {displayName}
          </span>
        </div>
      </div>
    </header>
  );
}
