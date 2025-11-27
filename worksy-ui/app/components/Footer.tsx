"use client";

import { useTranslation } from "../lib/i18n/LanguageContext";

const classes = {
  footer: "w-full bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
  content: "text-center",
  text: "text-zinc-600 dark:text-zinc-400",
};

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.content}>
          <p className={classes.text}>{t.footer.message}</p>
        </div>
      </div>
    </footer>
  );
}
