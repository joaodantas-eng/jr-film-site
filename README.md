# JR Film — Site Institucional

Site institucional (V1) da oficina mecânica JR Film, construído com arquitetura
preparada para crescer: agendamento online, área do cliente, painel administrativo,
CRM e blog — sem exigir reescrita dos componentes visuais existentes.

## Stack

Next.js 15 (App Router) · React · TypeScript · Tailwind CSS · Framer Motion · Lucide React

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Onde editar conteúdo

Todo o conteúdo editorial está centralizado em `src/data/`:

| Arquivo | O que controla |
|---|---|
| `data/site.ts` | Nome, slogan, descrição institucional |
| `data/services.ts` | Cards de serviços |
| `data/testimonials.ts` | Depoimentos |
| `data/gallery.ts` | Itens da galeria (troque `src` pelas fotos reais em `public/images/gallery`) |
| `data/contact.ts` | Telefone, WhatsApp, endereço, horário, mapa |
| `data/stats.ts` | Números da seção de estatísticas |
| `data/navigation.ts` | Itens do menu |
| `data/social.ts` | Redes sociais |

Não é necessário mexer em nenhum componente para alterar esses dados.

## Imagens

Adicione as fotos reais em `public/images/gallery/` com os mesmos nomes de arquivo
já referenciados em `data/gallery.ts` (ou atualize os caminhos). Até lá, a galeria
exibe placeholders neutros no lugar das fotos.

## Como o projeto vai crescer

- **Agendamento / Área do cliente / Login:** novos route groups em `src/app/(auth)` e
  `src/app/(cliente)`, reaproveitando os componentes de `components/ui`.
- **Painel administrativo:** `src/app/(admin)/dashboard`, isolado por route group.
- **Dados dinâmicos:** cada arquivo de `src/data/` tem um par equivalente pensado para
  `src/services/` — quando o backend existir, a seção passa a chamar `services/` em vez
  de importar o array estático, sem alterar nenhum componente visual.
