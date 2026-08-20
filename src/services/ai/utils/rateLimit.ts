// Limite simples por IP, em memória do processo — suficiente para conter
// abuso/bots sem precisar de Redis. Reseta a cada cold start da função
// serverless; não é um limite perfeito em escala, mas evita picos de custo.
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 15;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(key, timestamps);
  return timestamps.length > MAX_REQUESTS;
}
