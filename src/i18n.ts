import { getRequestConfig } from 'next-intl/server';

const locales = ['pt', 'en', 'es', 'zh', 'ar'];

export default getRequestConfig(async ({ locale }) => {
    let validLocale = locale as string;

    // O NOSSO ESCUDO: Em vez de dar 404, força o Português se algo falhar
    if (!validLocale || !locales.includes(validLocale)) {
        validLocale = 'pt';
    }

    return {
        locale: validLocale,
        messages: (await import(`../messages/${validLocale}.json`)).default
    };
});