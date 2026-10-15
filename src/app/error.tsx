"use client";

import { useEffect } from "react";
import Link from "next/link";
import { buildWhatsAppLink, defaultWhatsAppMessage } from "@/services/whatsapp";

// Erro inesperado ao renderizar uma página. O visitante vê só uma mensagem
// simples — nunca stack trace ou detalhes internos. O `digest` é um código
// opaco que permite localizar o erro nos logs da Vercel.
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") console.error(error);
  }, [error]);

  return (
    <main id="conteudo" className="flex min-h-[80svh] items-center justify-center px-4 py-24">
      <div className="max-w-lg text-center">
        <span className="eyebrow">Algo deu errado</span>
        <h1 className="type-display mt-4 text-display-lg text-foreground">Não foi possível carregar esta página.</h1>
        <p className="mt-4 text-foreground/75">Tente novamente em instantes. Se preferir, fale com a nossa equipe.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="min-h-[3.25rem] rounded-lg bg-accent px-7 font-semibold text-white hover:bg-accent-hover"
          >
            Tentar novamente
          </button>
          <Link
            href="/"
            className="inline-flex min-h-[3.25rem] items-center justify-center rounded-lg border border-foreground/25 px-7 font-medium text-foreground hover:bg-surface-elevated"
          >
            Ir para a página inicial
          </Link>
        </div>
        <a
          href={buildWhatsAppLink(defaultWhatsAppMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-sm text-foreground/80 underline underline-offset-4"
        >
          Falar com a JR Film no WhatsApp
        </a>
        {error.digest && <p className="mt-6 text-xs text-muted">Código do erro: {error.digest}</p>}
      </div>
    </main>
  );
}
