"use client";

import { useState } from "react";
import { useTranslation } from "../lib/i18n/LanguageContext";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality with API
    console.log("Searching for:", searchQuery);
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
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
      {/* Animated Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {serviceIcons.map((item, index) => (
          <div
            key={index}
            className={`absolute ${item.size} opacity-10 animate-float`}
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {t.hero.title}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            {t.hero.subtitle}
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 bg-white rounded-lg p-2 shadow-2xl">
              <input
                type="text"
                placeholder={t.hero.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow px-4 py-3 text-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-semibold transition-colors whitespace-nowrap"
              >
                {t.hero.searchButton}
              </button>
            </div>
          </form>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-blue-100">{t.hero.stats.specialists}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-blue-100">{t.hero.stats.categories}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">98%</div>
              <div className="text-blue-100">{t.hero.stats.satisfaction}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-12 md:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-zinc-50 dark:fill-black"
          ></path>
        </svg>
      </div>
    </section>
  );
}
