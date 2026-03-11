import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, CheckCircle2, Check, Copy, ExternalLink, Send } from 'lucide-react';
import { AppState } from '../types';

interface StudioProps {
  appState: AppState;
  setAppState: (state: AppState) => void;
  url: string;
  setUrl: (url: string) => void;
  jobId: string | null;
  setJobId: (id: string | null) => void;
  errorMessage: string;
  setErrorMessage: (msg: string) => void;
  handleCopy: (id: string) => void;
  copiedId: string | null;
}

export default function Studio({
  appState,
  setAppState,
  url,
  setUrl,
  jobId,
  setJobId,
  errorMessage,
  setErrorMessage,
  handleCopy,
  copiedId
}: StudioProps) {
  const telegramChannelUrl = import.meta.env.VITE_TELEGRAM_CHANNEL_URL;
  const telegramBotUrl = import.meta.env.VITE_TELEGRAM_BOT_URL;

  const generateJobId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setAppState('submitting');
    setErrorMessage('');

    const newJobId = generateJobId();

    try {
      const response = await fetch(import.meta.env.VITE_N8N_WEBHOOK_CORTES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, jobId: newJobId }),
      });

      if (response.ok) {
        localStorage.setItem('corteJob', JSON.stringify({ jobId: newJobId, status: 'processando' }));
        setJobId(newJobId);
        setAppState('processing');
        setUrl('');
      } else {
        setAppState('error');
        setErrorMessage('Erro ao processar a requisição. Tente novamente.');
      }
    } catch (error) {
      setAppState('error');
      setErrorMessage('Erro de conexão. Verifique sua internet e tente novamente.');
    }
  };

  const handleReset = () => {
    setAppState('idle');
    setUrl('');
    setJobId(null);
  };

  const handleCancel = () => {
    localStorage.removeItem('corteJob');
    setJobId(null);
    setAppState('idle');
  };

  return (
    <div className="max-w-[440px] mx-auto mt-4 md:mt-8">
      <header className="flex flex-col gap-2 mb-8">
        <h1 className="text-[24px] font-semibold tracking-tight text-neutral-900">
          Gerador de Cortes Profissionais
        </h1>
        <p className="text-[14px] text-neutral-500">
          Cole o link do seu vídeo e deixe a IA fazer o trabalho pesado.
        </p>
      </header>

      <div className="bg-white/70 backdrop-blur-xl border border-neutral-200/80 rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden min-h-[220px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {appState === 'processing' ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center py-2"
            >
              <Loader2 className="w-8 h-8 animate-spin text-neutral-800 mb-4" />
              <h3 className="text-[15px] font-medium text-neutral-900 mb-2">
                Estamos criando os seus cortes...
              </h3>
              <p className="text-[13px] text-neutral-500 leading-relaxed mb-6">
                Isso leva cerca de 3 a 5 minutos. Você pode navegar pelo painel, nós te avisaremos quando estiver pronto.
              </p>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-white border border-neutral-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100 text-neutral-600 rounded-lg text-[13px] font-medium transition-colors cursor-pointer shadow-sm"
              >
                Cancelar requisição
              </button>
            </motion.div>
          ) : appState === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center py-4"
            >
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4 border border-green-100">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-[18px] font-semibold text-neutral-900 mb-2">
                Vídeo processado!
              </h2>
              <p className="text-[14px] text-neutral-600 leading-relaxed mb-6">
                Seus cortes estão prontos. Escolha como deseja recebê-los:
              </p>

              <div className="flex items-center gap-2 bg-neutral-50 px-4 py-2 rounded-lg mb-6 border border-neutral-200 w-full max-w-[280px] justify-between">
                <span className="text-[14px] font-mono font-medium text-neutral-700 truncate">#{jobId}</span>
                <button
                  onClick={() => handleCopy(jobId!)}
                  className="p-1.5 hover:bg-neutral-200 rounded-md transition-colors text-neutral-500 shrink-0"
                  title="Copiar ID"
                >
                  {copiedId === jobId ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex flex-col gap-3 w-full max-w-[280px]">
                <p className="text-[12px] text-neutral-500 mb-1">
                  Copie seu ID acima e busque na lupa do canal:
                </p>
                <a
                  href={telegramChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-10 bg-[#111111] hover:bg-black text-white rounded-lg text-[14px] font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Acessar canal
                </a>
                <a
                  href={`${telegramBotUrl}?start=${jobId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-10 bg-transparent border border-neutral-200 hover:bg-neutral-50 text-neutral-900 rounded-lg text-[13px] font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  Receber via Assistente
                </a>
                <button
                  onClick={handleReset}
                  className="w-full h-10 mt-2 bg-transparent text-neutral-500 hover:text-neutral-800 text-[13px] font-medium transition-colors cursor-pointer underline underline-offset-4"
                >
                  Gerar novos cortes
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 w-full"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="video-url" className="text-[13px] font-medium text-neutral-500">
                  Link do Vídeo
                </label>
                <input
                  id="video-url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={appState === 'submitting'}
                  placeholder="https://www.youtube.com/..."
                  required
                  className="w-full px-3 py-2.5 bg-white/50 border border-neutral-200 rounded-lg text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all disabled:opacity-50 disabled:bg-neutral-50"
                />
              </div>

              <button
                type="submit"
                disabled={appState === 'submitting' || !url.trim()}
                className="w-full h-10 bg-[#111111] hover:bg-black text-white rounded-lg text-[14px] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                {appState === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-neutral-400" />
                    Carregando...
                  </>
                ) : (
                  'Gerar Cortes'
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {appState === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-6 p-4 rounded-xl border backdrop-blur-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-[14px] leading-relaxed bg-white/60 border-red-100 text-red-600"
          >
            <p>{errorMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
