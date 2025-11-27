"use client";

import Link from "next/link";
import { featuredCategories } from "../data/categories";
import { useTranslation } from "../lib/i18n/LanguageContext";

const classes = {
  section: "py-16 md:py-24 bg-white dark:bg-black",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  header: "text-center mb-12",
  title: "text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4",
  subtitle: "text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto",
  grid: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6",
  categoryCard: "group flex flex-col items-center p-6 bg-zinc-50 dark:bg-zinc-900 rounded-xl hover:bg-blue-50 dark:hover:bg-zinc-800 hover:shadow-lg transition-all duration-300 border border-zinc-200 dark:border-zinc-800",
  icon: "text-5xl mb-3 group-hover:scale-110 transition-transform duration-300",
  categoryName: "text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-50 text-center mb-1",
  categoryDescription: "text-xs md:text-sm text-zinc-600 dark:text-zinc-400 text-center",
  ctaWrapper: "text-center mt-10",
  ctaButton: "inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors",
};

export default function CategoriesSection() {
  const { t } = useTranslation();

  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <div className={classes.header}>
          <h2 className={classes.title}>{t.categories.title}</h2>
          <p className={classes.subtitle}>{t.categories.subtitle}</p>
        </div>

        <div className={classes.grid}>
          {featuredCategories.map((category) => (
            <Link key={category.id} href={`/services/${category.id}`} className={classes.categoryCard}>
              <div className={classes.icon}>{category.icon}</div>
              <h3 className={classes.categoryName}>{category.name}</h3>
              <p className={classes.categoryDescription}>{category.description}</p>
            </Link>
          ))}
        </div>

        <div className={classes.ctaWrapper}>
          <Link href="/services" className={classes.ctaButton}>
            {t.categories.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
