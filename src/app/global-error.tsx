"use client";

// Último recurso, quando até o layout raiz falha. Usa estilos inline porque o
// CSS do site pode não ter carregado.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, background: "#0A0A0A", color: "#F5F5F4", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, textAlign: "center" }}>
          <div>
            <h1 style={{ fontSize: 28 }}>Não foi possível carregar o site agora.</h1>
            <p style={{ color: "#BBB" }}>Tente novamente em instantes.</p>
            <button
              type="button"
              onClick={reset}
              style={{
                marginTop: 16,
                minHeight: 48,
                padding: "0 24px",
                borderRadius: 999,
                border: 0,
                background: "#DC2626",
                color: "#fff",
                fontSize: 16,
              }}
            >
              Tentar novamente
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
