"use client";

import { useTranslation } from "../lib/i18n/LanguageContext";

const classes = {
  container: "flex items-center gap-2",
  buttonBase: "px-3 py-1 rounded-md text-sm font-medium transition-colors",
  buttonActive: "bg-blue-600 text-white",
  buttonInactive: "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50",
};

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();

  return (
    <div className={classes.container}>
      <button
        onClick={() => setLocale("en")}
        className={`${classes.buttonBase} ${locale === "en" ? classes.buttonActive : classes.buttonInactive}`}
      >
        EN
      </button>
      <button
        onClick={() => setLocale("lt")}
        className={`${classes.buttonBase} ${locale === "lt" ? classes.buttonActive : classes.buttonInactive}`}
      >
        LT
      </button>
    </div>
  );
}
