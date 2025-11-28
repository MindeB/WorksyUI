"use client";

import { useEffect } from "react";
import Link from "next/link";
import { featuredCategories } from "../data/categories";
import { useTranslation } from "../lib/i18n/LanguageContext";

const classes = {
  section: "py-20 md:py-28 bg-white dark:bg-zinc-950",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  header: "text-center mb-16 opacity-0 animate-on-scroll",
  title: "text-4xl md:text-5xl font-semibold text-zinc-900 dark:text-white mb-4",
  subtitle: "text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto",
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8",
  categoryCard: "group flex flex-col items-center p-8 bg-zinc-50 dark:bg-zinc-900 rounded-2xl hover:bg-accent/5 dark:hover:bg-accent/10 hover:shadow-lg transition-all duration-300 border border-zinc-200 dark:border-zinc-800 hover:border-accent cursor-pointer opacity-0 animate-on-scroll",
  icon: "text-6xl mb-6 group-hover:scale-110 transition-transform duration-300",
  categoryName: "text-lg font-semibold text-zinc-900 dark:text-white text-center mb-2 group-hover:text-accent transition-colors",
  categoryDescription: "text-sm text-zinc-600 dark:text-zinc-400 text-center line-clamp-2",
  ctaWrapper: "text-center mt-12 opacity-0 animate-on-scroll",
  ctaButton: "inline-block bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg",
};

export default function CategoriesSection() {
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in', 'fade-in', 'slide-in-from-bottom', 'duration-700');
              (entry.target as HTMLElement).style.opacity = '1';
            }, index * 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <div className={classes.header}>
          <h2 className={classes.title}>{t.categories.title}</h2>
          <p className={classes.subtitle}>{t.categories.subtitle}</p>
        </div>

        <div className={classes.grid}>
          {featuredCategories.map((category) => {
            const translatedCategory = t.serviceCategories[category.id as keyof typeof t.serviceCategories];
            const serviceName = translatedCategory?.name || category.name;
            return (
              <Link
                key={category.id}
                href={`/providers?service=${category.id}`}
                className={classes.categoryCard}
              >
                <div className={classes.icon}>{category.icon}</div>
                <h3 className={classes.categoryName}>
                  {serviceName}
                </h3>
                <p className={classes.categoryDescription}>
                  {translatedCategory?.description || category.description}
                </p>
              </Link>
            );
          })}
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
