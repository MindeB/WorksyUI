"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "../lib/i18n/LanguageContext";

const classes = {
  hero: "relative bg-accent text-white overflow-hidden",
  backgroundIcons: "absolute inset-0 overflow-hidden pointer-events-none",
  icon: "absolute opacity-10 animate-float",
  content: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32",
  contentInner: "text-center max-w-4xl mx-auto",
  title: "text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-tight animate-in fade-in slide-in-from-bottom duration-700",
  subtitle: "text-xl md:text-2xl mb-10 text-white/90 animate-in fade-in slide-in-from-bottom duration-700 delay-100",
  searchForm: "max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-200",
  searchContainer: "flex flex-col sm:flex-row gap-3 bg-white rounded-xl p-2 shadow-xl",
  searchInput: "flex-grow px-5 py-4 text-zinc-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-dark",
  searchButton: "bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-4 rounded-lg font-medium transition-colors whitespace-nowrap",
  stats: "mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-300",
  statCard: "bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20",
  statNumber: "text-4xl font-semibold mb-1",
  statLabel: "text-white/80 text-sm",
  waveSeparator: "absolute bottom-0 left-0 right-0",
  waveSvg: "w-full h-12 md:h-16",
  wavePath: "fill-white dark:fill-zinc-950",
};

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { t } = useTranslation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/providers");
  };

  // Service icons for animated background
  const serviceIcons = [
    { icon: "🔧", size: "text-4xl", delay: 0, duration: 20 },
    { icon: "🏠", size: "text-5xl", delay: 2, duration: 25 },
    { icon: "🔨", size: "text-3xl", delay: 4, duration: 22 },
    { icon: "⚡", size: "text-4xl", delay: 1, duration: 24 },
    { icon: "🎨", size: "text-5xl", delay: 3, duration: 23 },
    { icon: "🚰", size: "text-4xl", delay: 5, duration: 26 },
    { icon: "🌳", size: "text-5xl", delay: 2, duration: 21 },
    { icon: "🪟", size: "text-3xl", delay: 4, duration: 25 },
    { icon: "🚪", size: "text-4xl", delay: 1, duration: 22 },
    { icon: "🏗️", size: "text-5xl", delay: 3, duration: 24 },
    { icon: "🧹", size: "text-3xl", delay: 5, duration: 23 },
    { icon: "❄️", size: "text-4xl", delay: 0, duration: 26 },
    { icon: "🌿", size: "text-4xl", delay: 2, duration: 21 },
    { icon: "🛠️", size: "text-3xl", delay: 4, duration: 25 },
    { icon: "💡", size: "text-4xl", delay: 1, duration: 22 },
  ];

  return (
    <section className={classes.hero}>
      {/* Animated Background Icons */}
      <div className={classes.backgroundIcons}>
        {serviceIcons.map((item, index) => (
          <div
            key={index}
            className={`${classes.icon} ${item.size}`}
            style={{
              left: `${(index * 7) % 100}%`,
              top: `${(index * 13) % 100}%`,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`,
            }}
          >
            {item.icon}
          </div>
        ))}
      </div>

      <div className={classes.content}>
        <div className={classes.contentInner}>
          <h1 className={classes.title}>{t.hero.title}</h1>
          <p className={classes.subtitle}>{t.hero.subtitle}</p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className={classes.searchForm}>
            <div className={classes.searchContainer}>
              <input
                type="text"
                placeholder={t.hero.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={classes.searchInput}
              />
              <button type="submit" className={classes.searchButton}>
                {t.hero.searchButton}
              </button>
            </div>
          </form>

          {/* Quick Stats */}
          <div className={classes.stats}>
            <div className={classes.statCard}>
              <div className={classes.statNumber}>1000+</div>
              <div className={classes.statLabel}>{t.hero.stats.specialists}</div>
            </div>
            <div className={classes.statCard}>
              <div className={classes.statNumber}>50+</div>
              <div className={classes.statLabel}>{t.hero.stats.categories}</div>
            </div>
            <div className={classes.statCard}>
              <div className={classes.statNumber}>98%</div>
              <div className={classes.statLabel}>{t.hero.stats.satisfaction}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Separator */}
      <div className={classes.waveSeparator}>
        <svg className={classes.waveSvg} viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className={classes.wavePath}
          />
        </svg>
      </div>
    </section>
  );
}
