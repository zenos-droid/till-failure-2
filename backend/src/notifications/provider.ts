export interface WhatsAppProvider {
  sendTemplate(input: { to: string; templateKey: string; payload: Record<string, unknown> }): Promise<{ providerMessageId?: string }>;
}

export class DisabledWhatsAppProvider implements WhatsAppProvider {
  async sendTemplate() {
    return {};
  }
}

export const createWhatsAppProvider = () => new DisabledWhatsAppProvider();
