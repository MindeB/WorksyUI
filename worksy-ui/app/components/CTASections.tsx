"use client";

import Link from "next/link";
import { useTranslation } from "../lib/i18n/LanguageContext";

const classes = {
  userSection: "py-16 md:py-20 bg-white dark:bg-black",
  specialistSection: "py-16 md:py-20 bg-zinc-50 dark:bg-zinc-900",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  userCard: "bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white shadow-xl",
  specialistCard: "bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-8 md:p-12 text-white shadow-xl",
  grid: "grid grid-cols-1 md:grid-cols-2 gap-8 items-center",
  title: "text-3xl md:text-4xl font-bold mb-4",
  userSubtitle: "text-lg text-blue-100 mb-6",
  specialistSubtitle: "text-lg text-emerald-100 mb-6",
  featureList: "space-y-2 mb-6",
  featureItem: "flex items-center",
  checkmark: "mr-2",
  userButton: "inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors",
  specialistButton: "inline-block bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors",
  iconWrapper: "hidden md:flex justify-center",
  icon: "text-8xl",
};

export default function CTASections() {
  const { t } = useTranslation();

  return (
    <>
      {/* For Users */}
      <section className={classes.userSection}>
        <div className={classes.container}>
          <div className={classes.userCard}>
            <div className={classes.grid}>
              <div>
                <h2 className={classes.title}>{t.cta.user.title}</h2>
                <p className={classes.userSubtitle}>{t.cta.user.subtitle}</p>
                <ul className={classes.featureList}>
                  <li className={classes.featureItem}>
                    <span className={classes.checkmark}>✓</span> {t.cta.user.features.browse}
                  </li>
                  <li className={classes.featureItem}>
                    <span className={classes.checkmark}>✓</span> {t.cta.user.features.reviews}
                  </li>
                  <li className={classes.featureItem}>
                    <span className={classes.checkmark}>✓</span> {t.cta.user.features.payment}
                  </li>
                </ul>
                <Link href="/signup" className={classes.userButton}>
                  {t.cta.user.button}
                </Link>
              </div>
              <div className={classes.iconWrapper}>
                <div className={classes.icon}>🏠</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Specialists */}
      <section className={classes.specialistSection}>
        <div className={classes.container}>
          <div className={classes.specialistCard}>
            <div className={classes.grid}>
              <div className={classes.iconWrapper}>
                <div className={classes.icon}>🛠️</div>
              </div>
              <div>
                <h2 className={classes.title}>{t.cta.specialist.title}</h2>
                <p className={classes.specialistSubtitle}>{t.cta.specialist.subtitle}</p>
                <ul className={classes.featureList}>
                  <li className={classes.featureItem}>
                    <span className={classes.checkmark}>✓</span> {t.cta.specialist.features.customers}
                  </li>
                  <li className={classes.featureItem}>
                    <span className={classes.checkmark}>✓</span> {t.cta.specialist.features.calendar}
                  </li>
                  <li className={classes.featureItem}>
                    <span className={classes.checkmark}>✓</span> {t.cta.specialist.features.reputation}
                  </li>
                </ul>
                <Link href="/specialist/signup" className={classes.specialistButton}>
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
