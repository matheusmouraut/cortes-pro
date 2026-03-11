import React from 'react';
import { FileVideo, PlayCircle, Check, Copy, ExternalLink, Send } from 'lucide-react';
import { Corte } from '../types';

interface HistoryProps {
  meusCortes: Corte[];
  handleCopy: (id: string) => void;
  copiedId: string | null;
}

export default function History({ meusCortes, handleCopy, copiedId }: HistoryProps) {
  const telegramChannelUrl = import.meta.env.VITE_TELEGRAM_CHANNEL_URL;
  const telegramBotUrl = import.meta.env.VITE_TELEGRAM_BOT_URL;

  return (
    <div className="max-w-5xl mx-auto mt-4 md:mt-8">
      <header className="flex flex-col gap-2 mb-8">
        <h1 className="text-[24px] font-semibold tracking-tight text-neutral-900">
          Cortes Gerados
        </h1>
        <p className="text-[14px] text-neutral-500">
          Histórico dos seus vídeos processados.
        </p>
      </header>

      {meusCortes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-neutral-200 rounded-2xl bg-white/50">
          <FileVideo className="w-12 h-12 text-neutral-300 mb-4" />
          <p className="text-[14px] text-neutral-500">Você ainda não gerou nenhum corte.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meusCortes.map((corte) => (
            <div key={corte.id} className="bg-white/70 backdrop-blur-xl border border-neutral-200/80 rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col gap-4 transition-all hover:shadow-md">
              <div className="aspect-video bg-neutral-100 rounded-lg flex items-center justify-center border border-neutral-200/50">
                <PlayCircle className="w-8 h-8 text-neutral-300" />
              </div>
              <div>
                <h3 className="text-[14px] font-medium text-neutral-900 line-clamp-1">
                  {corte.titulo}
                </h3>
                <p className="text-[12px] text-neutral-500 mt-1">Gerado em {corte.data}</p>
              </div>
              
              <div className="flex items-center justify-between bg-neutral-50 px-3 py-2 rounded-lg border border-neutral-100 mt-1">
                <span className="text-[13px] font-mono font-medium text-neutral-600 truncate mr-2">#{corte.id}</span>
                <button
                  onClick={() => handleCopy(corte.id)}
                  className="p-1.5 hover:bg-neutral-200 rounded-md transition-colors text-neutral-500 shrink-0"
                  title="Copiar ID"
                >
                  {copiedId === corte.id ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <a
                  href={telegramChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 bg-[#111111] hover:bg-black text-white rounded-lg text-[12px] font-medium transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Acessar canal
                </a>
                <a
                  href={`${telegramBotUrl}?start=${corte.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-900 rounded-lg text-[12px] font-medium transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  Receber no Bot
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
