# Modelo de Conteúdo - Landing Page Estética (SaaS)

Este documento define o schema JSON que representa a Landing Page. Estes dados serão processados via Cloudflare KV e injetados dinamicamente no front-end Vanilla pelo Worker.

## Seções Dinâmicas e Arquitetura

A estrutura da landing page é sequencial. As seções suportadas (nesta ordem visual) são:
1. **Header:** Logotipo na esquerda, e botões à direita.
2. **Hero:** O primeiro painel que retém a atenção do visitante.
3. **About (Sobre a Clínica/Especialista):** Foco em humanização e autoridade.
4. **Services (Procedimentos):** Grade de serviços usando Glassmorphism cards.
5. **BeforeAfter (Antes/Depois):** Cards ou sliders de fotos comprovando os resultados.
6. **Testimonials (Depoimentos):** Blocos de texto de prova social.
7. **FAQ (Perguntas Frequentes):** Acordeão para solucionar dúvidas (HTML Details/Summary).
8. **Contact (Contato & Rodapé):** Informações práticas, mapa e CTA final.

## Estrutura do JSON (Schema)

```json
{
  "settings": {
    "siteTitle": "Dra. Estética Avançada",
    "metaDescription": "Especialista em tratamentos faciais e corporais com resultados naturais.",
    "primaryColor": "#d4af37", 
    "secondaryColor": "#1a1a1a",
    "whatsappNumber": "5511999999999",
    "logoUrl": "https://placehold.co/400x120?text=Logo+Aqui"
  },
  "hero": {
    "headline": "Realce sua beleza natural com segurança e tecnologia",
    "subheadline": "Agende uma avaliação e descubra o protocolo ideal para o seu rosto.",
    "ctaText": "Agendar Minha Avaliação",
    "backgroundImageUrl": "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=2000"
  },
  "about": {
    "imageUrl": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800",
    "name": "Dra. Gabriela Albuquerque",
    "role": "Biomédica Esteta - CRBM 12345",
    "bio": "Sou especialista em harmonização facial com mais de 5.000 vidas transformadas. Minha filosofia é entregar resultados elegantes, respeitando a anatomia natural de cada paciente. Acredito que a estética deve devolver a sua melhor versão livre de exageros."
  },
  "services": [
    {
      "icon": "Sparkles", 
      "title": "Toxina Botulínica",
      "description": "Previne e suaviza linhas de expressão, trazendo um aspecto descansado ao rosto.",
      "imageUrl": "https://images.unsplash.com/photo-1570172619644-defc851173d1?auto=format&fit=crop&q=80&w=600"
    },
    {
      "icon": "Droplets",
      "title": "Preenchimento Labial",
      "description": "Devolve o volume e contorno dos lábios com hidratação profunda e ácido hialurônico.",
      "imageUrl": "https://images.unsplash.com/photo-1600180735773-631d8c1c5cd7?auto=format&fit=crop&q=80&w=600"
    },
    {
      "icon": "Activity",
      "title": "Bioestimuladores de Colágeno",
      "description": "Tratamento focado em combater a flacidez e melhorar a firmeza e qualidade da pele.",
      "imageUrl": "https://images.unsplash.com/photo-1512496015851-a1c8ca9fd1a5?auto=format&fit=crop&q=80&w=600"
    }
  ],
  "beforeAfter": [
    {
      "beforeUrl": "https://placehold.co/400x500?text=Antes",
      "afterUrl": "https://placehold.co/400x500?text=Depois",
      "label": "Toxina Botulínica"
    },
    {
      "beforeUrl": "https://placehold.co/400x500?text=Antes",
      "afterUrl": "https://placehold.co/400x500?text=Depois",
      "label": "Preenchimento Labial"
    }
  ],
  "testimonials": [
    {
      "name": "Amanda P.",
      "content": "A Dra. Gabriela me deixou muito segura desde a avaliação. O resultado do meu Botox ficou maravilhoso e super natural, exatamente como eu pedi!",
      "rating": 5
    },
    {
      "name": "Carolina M.",
      "content": "Sempre tive medo de preencher os lábios e ficar exagerado. A técnica dela é impecável. Estou apaixonada pelo resultado.",
      "rating": 5
    }
  ],
  "faq": [
    {
      "question": "O procedimento dói?",
      "answer": "Utilizamos anestésicos tópicos potentes e técnicas modernas para garantir o máximo de conforto. Na maioria das vezes, o procedimento é muito tolerável e considerado indolor por nossas pacientes."
    },
    {
      "question": "Quanto tempo dura o Botox?",
      "answer": "A durabilidade média é de 3 a 5 meses, podendo variar dependendo do metabolismo de cada paciente, da força muscular e da prática de atividades físicas."
    },
    {
      "question": "Tem tempo de recuperação?",
      "answer": "A maioria dos procedimentos são minimamente invasivos, permitindo que você retorne às suas atividades normais no mesmo dia. Orientamos apenas evitar exercícios intensos nas primeiras 24 horas."
    }
  ],
  "contact": {
    "address": "Av. Paulista, Sala 102 - Bela Vista, São Paulo - SP",
    "mapEmbedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1408821033527!2d-46.657062400000006!3d-23.5633918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000",
    "instagram": "https://instagram.com/suaclinica",
    "openingHours": "Seg a Sex: 09h às 19h | Sáb: 09h às 13h"
  }
}
```
