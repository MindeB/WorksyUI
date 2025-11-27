"use client";

import { useTranslation } from "../lib/i18n/LanguageContext";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-zinc-600 dark:text-zinc-400">
            {t.footer.message}
          </p>
        </div>
      </div>
    </footer>
  );
}
