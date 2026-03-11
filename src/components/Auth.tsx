import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Scissors, Loader2, Mail, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        // Se usar confirmação de email, poderíamos avisar o usuário aqui
        // Para simplificar, o signUp já loga caso não exija confirmação (default do Supabase pode variar).
        alert('Conta criada com sucesso! Verifique seu email se o login automático falhar.');
      }
    } catch (error: any) {
      setErrorMsg(error.message || 'Erro de autenticação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#FAFAFA] text-neutral-900 font-sans selection:bg-neutral-200">
      <div className="w-full max-w-[400px] p-6 lg:p-8">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center shadow-md">
            <Scissors className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-[24px] font-semibold tracking-tight text-neutral-900 mt-2">
            Bem-vindo ao CortesPro
          </h1>
          <p className="text-[14px] text-neutral-500 text-center">
            {isLogin 
              ? 'Faça login com sua conta para continuar.' 
              : 'Crie sua conta para começar a gerar cortes virais.'}
          </p>
        </div>

        {/* Auth Form Card */}
        <div className="bg-white/70 backdrop-blur-xl border border-neutral-200/80 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-neutral-700">Email</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 w-4 h-4 text-neutral-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-neutral-700">Senha</label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-4 h-4 text-neutral-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all"
                />
              </div>
            </div>

            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-[13px] text-red-500 font-medium"
                >
                  <p className="mt-1">{errorMsg}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full h-10 bg-[#111111] hover:bg-black text-white rounded-lg text-[14px] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin text-neutral-400" />
              ) : isLogin ? (
                'Entrar'
              ) : (
                'Criar Conta'
              )}
            </button>
          </form>
        </div>

        {/* Toggle between Login and Signup */}
        <div className="mt-8 text-center text-[13px] text-neutral-500">
          {isLogin ? (
            <p>
              Ainda não tem conta?{' '}
              <button
                onClick={() => { setIsLogin(false); setErrorMsg(''); }}
                className="text-neutral-900 font-medium hover:underline focus:outline-none cursor-pointer"
              >
                Cadastre-se
              </button>
            </p>
          ) : (
            <p>
              Já possui conta?{' '}
              <button
                onClick={() => { setIsLogin(true); setErrorMsg(''); }}
                className="text-neutral-900 font-medium hover:underline focus:outline-none cursor-pointer"
              >
                Faça login
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
