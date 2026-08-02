// Converte um File para base64 (sem o prefixo "data:mime;base64,"), usado
// para guardar a imagem no histórico local da conversa e renderizar a
// pré-visualização no chat. O envio da imagem atual para a API usa o File
// bruto via multipart/form-data — esta função só serve o lado "memória da
// conversa", não a transmissão.
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1] ?? "");
    };
    reader.onerror = () => reject(reader.error ?? new Error("Falha ao ler o arquivo."));
    reader.readAsDataURL(file);
  });
}
