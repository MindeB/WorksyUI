"use client";

import { useTranslation } from "../lib/i18n/LanguageContext";

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
    <section className="py-16 md:py-24 bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            {t.howItWorks.title}
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {t.howItWorks.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="flex flex-col items-center text-center">
                {/* Icon Circle */}
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-4xl mb-4 shadow-lg">
                  {step.icon}
                </div>

                {/* Step Number */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {step.number}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                  {step.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {step.description}
                </p>
              </div>

              {/* Arrow connector (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-4 text-blue-600 text-3xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
