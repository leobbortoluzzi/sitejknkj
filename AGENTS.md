# AGENTS.md - Landing Page Estética Avançada (Astro + Cloudflare)

Este arquivo é o guia de regras obrigatório para qualquer agente de código de inteligência artificial ou desenvolvedor trabalhando neste projeto.
Leia este documento completamente antes de modificar qualquer arquivo.

## O que é este projeto

A Landing Page Estética Avançada é uma **Landing Page com Painel Admin** construída em **Astro**, focada em máxima performance e baixa latência. Ele roda 100% dentro de um Cloudflare Worker via adaptador SSR.

Toda a lógica da interface, autenticação (JWT com expiração) e painel admin residem no diretório `src/` e são processados pelo Astro.

## Stack Tecnológica Obrigatória
- **Framework:** Astro 6+.
- **Ambiente:** Cloudflare Workers (SSR).
- **Estilização:** Tailwind CSS (Compilado em build-time, com cores dinâmicas via variáveis CSS).
- **Cache/Sessões:** Cloudflare KV para Settings e Logs.

## Build e Ferramental

```bash
npm install            # Instala dependências
npm run dev            # Inicia o servidor de desenvolvimento (Astro + Wrangler proxy)
npm run build          # Gera o build SSR para Cloudflare em dist/_worker.js
```

## Variáveis de Ambiente Obrigatórias

O projeto utiliza o binding do Cloudflare KV e uma `secret` para segurança.

| Variável | Descrição |
|---|---|
| `kv` | Binding do Cloudflare KV Namespace obrigatório para armazenar as Settings e Logs do site. |
| `secret` | Chave HMAC JWT que assina a sessão do administrador. |

## Regras Estritas para o Agente de IA

1. **Dependências:** Siga o ecossistema Astro. Use o Cloudflare KV para persistência de dados.
2. **Estilização:** Não use o script do Tailwind via CDN no cliente. Use a integração nativa (`@astrojs/tailwind`).
3. **Padrão de Build:** Sempre rode `npm run build` para validar a compatibilidade com o runtime do Cloudflare antes de finalizar alterações importantes.
4. **Segurança:** Garanta que todos os tokens JWT possuam expiração (`exp`) validada no middleware.
5. **D1 (Opcional):** Se o banco de dados D1 estiver configurado (`db`), ele pode ser usado para leads, mas a configuração principal do site deve permanecer no KV.