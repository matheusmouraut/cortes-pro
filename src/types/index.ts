export type AppState = 'idle' | 'submitting' | 'processing' | 'success' | 'error';
export type Tab = 'estudio' | 'meus-cortes' | 'perfil';

export interface Corte {
  id: string;
  titulo: string;
  data: string;
}

export interface Notificacao {
  id: string;
  mensagem: string;
  hora: string;
}
