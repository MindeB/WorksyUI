"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "../lib/i18n/LanguageContext";

const classes = {
  userSection: "py-20 md:py-28 bg-white dark:bg-zinc-950",
  specialistSection: "py-20 md:py-28 bg-zinc-50 dark:bg-zinc-900",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  userCard: "bg-accent rounded-2xl p-10 md:p-14 text-white shadow-lg opacity-0 animate-on-scroll",
  specialistCard: "bg-emerald-600 rounded-2xl p-10 md:p-14 text-white shadow-lg opacity-0 animate-on-scroll",
  grid: "grid grid-cols-1 md:grid-cols-2 gap-12 items-center",
  title: "text-3xl md:text-4xl font-semibold mb-4",
  userSubtitle: "text-lg text-white/90 mb-8",
  specialistSubtitle: "text-lg text-white/90 mb-8",
  featureList: "space-y-3 mb-8",
  featureItem: "flex items-center text-base",
  checkmark: "mr-3 text-xl",
  userButton: "inline-block bg-white text-accent px-8 py-4 rounded-lg font-medium hover:bg-zinc-50 transition-colors shadow-md",
  specialistButton: "inline-block bg-white text-emerald-600 px-8 py-4 rounded-lg font-medium hover:bg-zinc-50 transition-colors shadow-md",
  iconWrapper: "hidden md:flex justify-center",
  icon: "text-9xl opacity-80",
};

export default function CTASections() {
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
