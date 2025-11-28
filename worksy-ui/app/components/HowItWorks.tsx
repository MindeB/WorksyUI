"use client";

import { useEffect } from "react";
import { useTranslation } from "../lib/i18n/LanguageContext";

const classes = {
  section: "py-20 md:py-28 bg-zinc-50 dark:bg-zinc-900",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  header: "text-center mb-16 opacity-0 animate-on-scroll",
  title: "text-4xl md:text-5xl font-semibold text-zinc-900 dark:text-white mb-4",
  subtitle: "text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto",
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
  stepWrapper: "relative opacity-0 animate-on-scroll",
  stepContent: "flex flex-col items-center text-center",
  iconCircle: "w-24 h-24 bg-accent rounded-full flex items-center justify-center text-5xl mb-4 shadow-md",
  stepNumber: "absolute top-0 right-0 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-semibold text-base",
  stepTitle: "text-xl font-semibold text-zinc-900 dark:text-white mb-3",
  stepDescription: "text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed",
  arrow: "hidden lg:block absolute top-12 -right-4 text-accent text-3xl",
};

export default function HowItWorks() {
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

  const steps = [
    {
      number: "1",
      title: t.howItWorks.steps.search.title,
      description: t.howItWorks.steps.search.description,
      icon: "🔍",
    },
    {
      number: "2",
      title: t.howItWorks.steps.compare.title,
      description: t.howItWorks.steps.compare.description,
      icon: "👥",
    },
    {
      number: "3",
      title: t.howItWorks.steps.contact.title,
      description: t.howItWorks.steps.contact.description,
      icon: "📅",
    },
    {
      number: "4",
      title: t.howItWorks.steps.done.title,
      description: t.howItWorks.steps.done.description,
      icon: "✅",
    },
  ];

  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <div className={classes.header}>
          <h2 className={classes.title}>{t.howItWorks.title}</h2>
          <p className={classes.subtitle}>{t.howItWorks.subtitle}</p>
        </div>

        <div className={classes.grid}>
          {steps.map((step, index) => (
            <div key={step.number} className={classes.stepWrapper}>
              <div className={classes.stepContent}>
                <div className={classes.iconCircle}>{step.icon}</div>
                <div className={classes.stepNumber}>{step.number}</div>
                <h3 className={classes.stepTitle}>{step.title}</h3>
                <p className={classes.stepDescription}>{step.description}</p>
              </div>

              {index < steps.length - 1 && <div className={classes.arrow}>→</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
