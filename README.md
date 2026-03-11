# CortesPro

Bem-vindo ao CortesPro - Um Gerador de Cortes Virais focado em produtividade para criadores de conteúdo.

## Rodando Localmente

**Pré-requisitos:** Node.js

1. Instale as dependências:
   `npm install`
2. No ambiente de produção defina as seguintes chaves em um arquivo `.env.local` baseado no `.env.example`:
   - VITE_N8N_WEBHOOK_CORTES
   - VITE_N8N_WEBHOOK_STATUS
   - VITE_TELEGRAM_BOT_URL
   - VITE_TELEGRAM_CHANNEL_URL
3. Rode a aplicação de forma local:
   `npm run dev`

## Deploy

Este projeto é configurado nativamente com Vite e as variáveis de ambiente devem ser expostas na Vercel antes do build.
