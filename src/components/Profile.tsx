import React from 'react';

export default function Profile() {
  return (
    <div className="max-w-2xl mx-auto mt-4 md:mt-8">
      <header className="flex flex-col gap-2 mb-8">
        <h1 className="text-[24px] font-semibold tracking-tight text-neutral-900">
          Meu Perfil
        </h1>
        <p className="text-[14px] text-neutral-500">
          Gerencie suas informações e preferências da conta.
        </p>
      </header>

      <div className="bg-white/70 backdrop-blur-xl border border-neutral-200/80 rounded-2xl p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col gap-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[32px] font-medium shadow-sm shrink-0">
            ML
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-[20px] font-semibold text-neutral-900">Matheus</h2>
            <p className="text-[14px] text-neutral-500">matheus@exemplo.com</p>
            <div className="mt-2 inline-flex items-center px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-[12px] font-medium text-neutral-700 w-fit">
              Plano: Beta / Gratuito
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-neutral-200/80"></div>

        <div className="flex justify-end">
          <button className="px-5 py-2.5 bg-white border border-neutral-200 hover:bg-neutral-50 text-red-600 rounded-lg text-[14px] font-medium transition-colors cursor-pointer shadow-sm">
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  );
}
