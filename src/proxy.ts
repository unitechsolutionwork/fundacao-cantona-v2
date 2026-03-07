import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['pt', 'en', 'es', 'zh', 'ar'],
  defaultLocale: 'pt'
});

export const config = {
  // Ignora ficheiros internos do Next.js e imagens
  matcher: ['/((?!api|_next|.*\\..*).*)']
};