"use client";

import Link from "next/link";
import { useTranslation } from "../lib/i18n/LanguageContext";

export default function CTASections() {
  const { t } = useTranslation();

  return (
    <>
      {/* For Users */}
      <section className="py-16 md:py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t.cta.user.title}
                </h2>
                <p className="text-lg text-blue-100 mb-6">
                  {t.cta.user.subtitle}
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> {t.cta.user.features.browse}
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> {t.cta.user.features.reviews}
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> {t.cta.user.features.payment}
                  </li>
                </ul>
                <Link
                  href="/signup"
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  {t.cta.user.button}
                </Link>
              </div>
              <div className="hidden md:flex justify-center">
                <div className="text-8xl">🏠</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Specialists */}
      <section className="py-16 md:py-20 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-8 md:p-12 text-white shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="hidden md:flex justify-center">
                <div className="text-8xl">🛠️</div>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t.cta.specialist.title}
                </h2>
                <p className="text-lg text-emerald-100 mb-6">
                  {t.cta.specialist.subtitle}
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> {t.cta.specialist.features.customers}
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> {t.cta.specialist.features.calendar}
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> {t.cta.specialist.features.reputation}
                  </li>
                </ul>
                <Link
                  href="/specialist/signup"
                  className="inline-block bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
                >
                  {t.cta.specialist.button}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
