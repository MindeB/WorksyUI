"use client";

import { useTranslation } from "../lib/i18n/LanguageContext";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLocale('en')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          locale === 'en'
            ? 'bg-blue-600 text-white'
            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLocale('lt')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          locale === 'lt'
            ? 'bg-blue-600 text-white'
            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
        }`}
      >
        LT
      </button>
    </div>
  );
}
