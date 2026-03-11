import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { AppState, Tab, Corte, Notificacao } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Toast from './components/Toast';
import Studio from './components/Studio';
import History from './components/History';
import Profile from './components/Profile';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('estudio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [appState, setAppState] = useState<AppState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [jobId, setJobId] = useState<string | null>(null);
  
  const [meusCortes, setMeusCortes] = useState<Corte[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [temNotificacao, setTemNotificacao] = useState(false);
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [isNotificacoesOpen, setIsNotificacoesOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(`#${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  useEffect(() => {
    const savedJob = localStorage.getItem('corteJob');
    if (savedJob) {
      try {
        const parsed = JSON.parse(savedJob);
        if (parsed.jobId && parsed.status === 'processando') {
          setJobId(parsed.jobId);
          setAppState('processing');
        } else {
          localStorage.removeItem('corteJob');
        }
      } catch (e) {
        localStorage.removeItem('corteJob');
      }
    }
  }, []);

  useEffect(() => {
    if (activeTab !== 'estudio') {
      if (appState === 'success' || appState === 'error') {
        setAppState('idle');
        setUrl('');
        setJobId(null);
      }
    }
  }, [activeTab, appState]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const checkStatus = async () => {
      if (!jobId || appState !== 'processing') return;
      try {
        const res = await fetch(`${import.meta.env.VITE_N8N_WEBHOOK_STATUS}?jobId=${jobId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.status === 'concluido') {
            clearInterval(intervalId);
            localStorage.removeItem('corteJob');
            setAppState('success');
            
            setMeusCortes(prev => [{
              id: jobId,
              titulo: "Vídeo Processado - " + jobId.substring(0, 4),
              data: new Date().toLocaleDateString()
            }, ...prev]);
            
            setTemNotificacao(true);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 5000);
            
            const novaNotificacao: Notificacao = {
              id: Math.random().toString(36).substring(2, 9),
              mensagem: "O corte do seu vídeo está pronto!",
              hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setNotificacoes(prev => [novaNotificacao, ...prev]);
          }
        }
      } catch (err) {
        console.error("Erro ao verificar status:", err);
      }
    };

    if (appState === 'processing' && jobId) {
      checkStatus();
      intervalId = setInterval(checkStatus, 10000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [appState, jobId]);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#FAFAFA] text-neutral-900 font-sans selection:bg-neutral-200 overflow-hidden">
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
          />
        )}
      </AnimatePresence>

      <Sidebar 
        activeTab={activeTab} 
        handleTabClick={handleTabClick} 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isNotificacoesOpen={isNotificacoesOpen}
          setIsNotificacoesOpen={setIsNotificacoesOpen}
          temNotificacao={temNotificacao}
          setTemNotificacao={setTemNotificacao}
          notificacoes={notificacoes}
          handleTabClick={handleTabClick}
        />

        <main className="flex-1 overflow-auto p-6 md:p-12">
          {activeTab === 'estudio' ? (
            <Studio 
              appState={appState}
              setAppState={setAppState}
              url={url}
              setUrl={setUrl}
              jobId={jobId}
              setJobId={setJobId}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              handleCopy={handleCopy}
              copiedId={copiedId}
            />
          ) : activeTab === 'perfil' ? (
            <Profile />
          ) : (
            <History 
              meusCortes={meusCortes}
              handleCopy={handleCopy}
              copiedId={copiedId}
            />
          )}
        </main>
      </div>

      <Toast showToast={showToast} onClose={() => {
        setActiveTab('estudio');
        setShowToast(false);
        setTemNotificacao(false);
      }} />
    </div>
  );
}
