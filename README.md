# JR Film — Site Institucional

Site da oficina mecânica JR Film (Nova Serrana/MG), com Central de Diagnóstico
(assistente automotivo com Google Gemini).

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Framer Motion · Lucide React

## Como rodar

```bash
npm install
cp .env.example .env.local   # preencha o que for usar
npm run dev
```

Acesse `http://localhost:3000`. Verificações antes de publicar:

```bash
npx tsc --noEmit && npm run lint && npm run build
```

## Variáveis de ambiente

Todas estão documentadas em [`.env.example`](.env.example). Resumo:

| Variável | Onde | Para quê |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | público | Domínio oficial (canonical, sitemap, robots, Open Graph) |
| `GEMINI_API_KEY` | **só servidor** | Chave do Gemini. Nunca use prefixo `NEXT_PUBLIC_` |
| `GEMINI_MODEL`, `GEMINI_MAX_OUTPUT_TOKENS`, `GEMINI_TIMEOUT_MS` | servidor | Modelo, teto de tokens de resposta e tempo limite |
| `ASSISTANT_ENABLED`, `ASSISTANT_IMAGES_ENABLED` | servidor | Interruptores de emergência do assistente e do envio de fotos |
| `ASSISTANT_LIMIT_*`, `ASSISTANT_GLOBAL_LIMIT_PER_DAY`, `ASSISTANT_MAX_CONCURRENT` | servidor | Limites de uso |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | servidor | Rate limit compartilhado entre instâncias (**obrigatório em produção**) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | público / servidor | CAPTCHA do assistente (Cloudflare Turnstile) |
| `GOOGLE_PLACES_API_KEY` | servidor | Avaliações reais do Google |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | público | Google Analytics 4 (só carrega após consentimento) |

Na Vercel, qualquer alteração de variável só vale após um novo deploy.

## Assistente (Gemini): proteções e operação

A chave só é lida no servidor (`src/services/ai/`, com `import "server-only"`).
A rota `POST /api/assistant` aplica, nesta ordem:

1. Interruptor `ASSISTANT_ENABLED` (responde 503 quando desligado).
2. Bloqueio de chamadas de outros sites (cabeçalhos `Origin`/`Sec-Fetch-Site`).
3. Limite de tamanho do corpo e de tipo de conteúdo.
4. Rate limit por visitante (hash do IP: minuto/hora/dia) e teto global diário,
   contados no Upstash Redis. Em produção, sem Upstash, o assistente fica
   indisponível (não há contagem só em memória).
5. Uma requisição por vez por visitante e teto de chamadas simultâneas.
6. CAPTCHA (Cloudflare Turnstile): a primeira mensagem exige um token válido;
   depois, um cookie assinado de 30 minutos dispensa nova verificação.
7. Validação de mensagem (500 caracteres), histórico (10 mensagens, 1 foto) e
   imagem (assinatura real do arquivo, até 3 MB; o navegador reduz a foto antes).
8. Chamada ao Gemini sem novas tentativas automáticas, com tempo limite e teto de tokens.

Erros chegam ao visitante só como código + mensagem amigável. Em produção, se o
Gemini falhar, o assistente responde com a base local (sem custo) e o erro fica no
log da Vercel; em desenvolvimento, o erro aparece no terminal e no console.

**Limitações conhecidas:** limite por IP pode afetar quem divide a mesma rede e
não impede quem troca de IP — por isso existe o teto global diário. Nenhuma
dessas medidas substitui um limite de gastos no Google Cloud.

**Desligar em caso de abuso:** defina `ASSISTANT_ENABLED=false` (ou
`ASSISTANT_IMAGES_ENABLED=false`) na Vercel e faça redeploy. Para efeito imediato,
revogue/restrinja a chave no Google AI Studio.

## Onde editar conteúdo

Todo o conteúdo comercial está centralizado em `src/data/`:

| Arquivo | O que controla |
|---|---|
| `data/site.ts` | Nome, slogan, descrição, URL, logo e cores da marca |
| `data/contact.ts` | Telefone, WhatsApp, endereço, horários, mapa, ID da ficha no Google |
| `data/services.ts` | Serviços (cada um gera uma página em `/servicos/<slug>`) |
| `data/promotions.ts` | Promoções (`/promocoes`) |
| `data/highlights.ts` | Diferenciais, garantias e "como funciona" da Home |
| `data/faq.ts` | Perguntas frequentes da Home |
| `data/testimonials.ts` | Avaliações usadas quando a API do Google não está ativa |
| `data/cases.ts` | Trabalhos realizados (a seção só aparece quando houver itens) |
| `data/gallery.ts` | Fotos da galeria e textos alternativos |
| `data/navigation.ts`, `data/social.ts` | Menu e redes sociais |

Para criar uma versão para outra oficina, os arquivos acima, as cores em
`tailwind.config.ts`, as logos em `public/logos/` e o `.env` são o ponto de partida.

## Imagens

Fotos em `public/images/gallery/`. O mural da galeria usa as miniaturas de
`public/images/gallery/thumbs/` (480 px). Ao adicionar uma foto, gere a miniatura:

```bash
sips -s format jpeg -s formatOptions 72 --resampleWidth 480 public/images/gallery/NOVA.jpg --out public/images/gallery/thumbs/NOVA.jpg
```

A imagem de compartilhamento (`/og-image.png`, 1200 × 630) é gerada no build a
partir da logo oficial (`src/app/og-image.png/route.tsx`).
