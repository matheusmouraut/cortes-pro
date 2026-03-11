import React from 'react';
import { Scissors, X, PlayCircle, FileVideo } from 'lucide-react';
import { Tab } from '../types';

interface SidebarProps {
  activeTab: Tab;
  handleTabClick: (tab: Tab) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ activeTab, handleTabClick, isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) {
  return (
    <aside className={`
      fixed md:static inset-y-0 left-0 z-50
      w-64 bg-white border-r border-neutral-200 flex flex-col shrink-0
      transition-transform duration-300 ease-in-out
      ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
      <div className="p-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center shadow-sm">
            <Scissors className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-[15px] tracking-tight">CortesPro</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(false)} 
          className="md:hidden p-2 -mr-2 text-neutral-500 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <nav className="flex-1 px-4 py-2 flex flex-col gap-1">
        <button
          onClick={() => handleTabClick('estudio')}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors cursor-pointer ${
            activeTab === 'estudio' 
              ? 'bg-neutral-100 text-neutral-900' 
              : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
          }`}
        >
          <PlayCircle className="w-4 h-4" />
          Estúdio de Criação
        </button>
        <button
          onClick={() => handleTabClick('meus-cortes')}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors cursor-pointer ${
            activeTab === 'meus-cortes' 
              ? 'bg-neutral-100 text-neutral-900' 
              : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
          }`}
        >
          <FileVideo className="w-4 h-4" />
          Meus Cortes
        </button>
      </nav>
    </aside>
  );
}
