// Renderiza dados estruturados (JSON-LD). O "<" é escapado para que nenhum
// texto dentro dos dados consiga fechar a tag <script> antes da hora.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
