export class DisabledWhatsAppProvider {
    async sendTemplate() {
        return {};
    }
}
export const createWhatsAppProvider = () => new DisabledWhatsAppProvider();
