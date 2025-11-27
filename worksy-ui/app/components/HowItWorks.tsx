"use client";

import { useTranslation } from "../lib/i18n/LanguageContext";

const classes = {
  section: "py-16 md:py-24 bg-zinc-50 dark:bg-zinc-900",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  header: "text-center mb-12",
  title: "text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4",
  subtitle: "text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto",
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
  stepWrapper: "relative",
  stepContent: "flex flex-col items-center text-center",
  iconCircle: "w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-4xl mb-4 shadow-lg",
  stepNumber: "absolute top-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm",
  stepTitle: "text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2",
  stepDescription: "text-zinc-600 dark:text-zinc-400",
  arrow: "hidden lg:block absolute top-10 -right-4 text-blue-600 text-3xl",
};

export default function HowItWorks() {
  const { t } = useTranslation();

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
