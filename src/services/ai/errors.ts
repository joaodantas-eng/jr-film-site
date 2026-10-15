export class AssistantTimeoutError extends Error {
  constructor() {
    super("O provedor de IA não respondeu dentro do tempo limite.");
    this.name = "AssistantTimeoutError";
  }
}
