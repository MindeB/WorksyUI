import { cookies } from 'next/headers';
import { translations, Locale } from './translations';

export async function getServerTranslations() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value as Locale) || 'en';

  return {
    locale,
    t: translations[locale],
  };
}
