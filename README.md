# Landing Page Estética (Astro + Cloudflare)

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/leobbortoluzzi/lp-estetica-astro)

A **Landing Page Estética Auto-Hospedada (SaaS)** é uma landing page premium projetada para profissionais da estética, com foco em altíssima velocidade (Astro) e custo zero de infraestrutura (Cloudflare Pages/Workers).

Sem servidor externo, sem banco de dados complexo obrigatório, sem mensalidade de plataforma. O cliente paga uma vez e o site é dele para sempre.

## Por que essa arquitetura?
Diferente da maioria das landing pages do mercado (construídas em cima de construtores pesados como Elementor ou frameworks SPA):
- **Zero JS no Cliente** — Executa incrivelmente rápido e tem pontuação máxima no Google PageSpeed (SEO impecável).
- **Grátis até 100 mil acessos por dia** — Hospedado no plano gratuito da Cloudflare.
- **Painel de Controle Embutido** — O cliente possui um painel próprio (`/admin`) gerado dinamicamente no servidor, não precisando tocar em nenhuma linha de código.

## Arquitetura & Como Funciona
Totalmente reescrita em [Astro](https://astro.build/), a aplicação entrega a Landing Page como HTML estático (SSR otimizado) e usa o Cloudflare Workers por baixo dos panos para processar as rotas de API e a autenticação do painel administrativo.
Todas as configurações, logs de acesso e conteúdos da página são salvos diretamente no **Cloudflare KV**, garantindo velocidade de borda (Edge) sem depender de banco de dados SQL (como o antigo D1).

## Painel de Administração (`/admin`)
O projeto vem com um dashboard administrativo "White-label":
- **Dashboard de Analytics:** Estatísticas e dados ricos sobre visitantes (Geolocalização de cidade/país, Dispositivo Mobile/Desktop e Provedor de Internet).
- **Conteúdo LP:** Edição total da Landing Page (Textos, Links, Horários, Redes Sociais, Mapas).
- **Cards Dinâmicos:** Adicione e remova livremente caixas de "Nossos Serviços", "Resultados Antes e Depois" e "FAQ/Dúvidas".
- Segurança implementada via Cookie + JWT de sessão.

## Requisitos de Instalação e Ambiente (Para Clientes)

O projeto suporta o Cloudflare Pages. Ao clicar no botão **Deploy to Cloudflare** acima, a Cloudflare fará uma cópia deste código para o seu GitHub e começará a publicar o site.

Após clicar no botão e o deploy terminar, o site ainda **não vai funcionar 100% até você configurar o Banco de Dados (KV)**. Siga o passo a passo:

### Passo 1: Criar o Banco de Dados (KV)
1. No painel inicial da Cloudflare, vá no menu lateral esquerdo em **Storage & Databases** -> **KV**.
2. Clique no botão azul **Create a namespace**.
3. Dê um nome para o seu banco (exemplo: `meu_site_kv`) e clique em **Add**.
4. Volte para a tela anterior e anote/copie o **ID** desse namespace que você acabou de criar.

### Passo 2: Conectar o Banco de Dados ao Site
1. No painel da Cloudflare, vá em **Workers & Pages**.
2. Clique no projeto que acabou de ser criado (o seu site).
3. Vá na aba **Settings** -> **Bindings**.
4. Na seção "KV Namespace Bindings", clique em **Add binding**.
5. No campo *Variable name*, escreva **exatamente assim**: `kv`
6. No campo *KV namespace*, selecione o banco de dados que você criou no Passo 1.
7. Salve e faça um novo "Deploy" (clicando em "Create deployment" na aba Deployments) para as configurações entrarem em vigor.

### Passo 3: Segurança (Criar uma Senha)
Para garantir que ninguém acesse seu painel além de você:
1. Dentro de **Settings** do seu projeto, vá em **Environment Variables**.
2. Adicione uma variável chamada: `secret`
3. No valor, cole uma string/senha complexa e aleatória (ex: `minha-senha-secreta-!@#123`).

Pronto! Seu site e seu painel `/admin` estão funcionando!

### Build Local para Desenvolvedores
Se quiser rodar o ambiente na sua máquina para testar código:

```bash
npm install            # Instala as dependências
npm run dev            # Inicia o servidor local de desenvolvimento
npm run build          # Compila o projeto em Astro para produção
```
