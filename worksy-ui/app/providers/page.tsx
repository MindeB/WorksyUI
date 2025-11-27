"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "../lib/i18n/LanguageContext";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ProviderCard from "../components/ProviderCard";

const classes = {
  page: "min-h-screen bg-zinc-50 dark:bg-black",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
  header: "mb-8",
  title: "text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-6",
  filterSection: "mb-8",
  filterLabel: "text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3 block",
  filterContainer: "flex flex-wrap gap-2",
  filterButton: "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
  filterButtonActive: "bg-blue-600 text-white",
  filterButtonInactive: "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800",
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12",
  noResults: "text-center py-16",
  noResultsText: "text-xl text-zinc-600 dark:text-zinc-400 mb-4",
  noResultsIcon: "text-6xl mb-4",
};

export default function ProvidersPage() {
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const providers = t.providers.items;

  // Extract all unique services
  const allServices = useMemo(() => {
    const servicesSet = new Set<string>();
    providers.forEach((provider) => {
      provider.services.forEach((service) => servicesSet.add(service));
    });
    return Array.from(servicesSet).sort();
  }, [providers]);

  // Filter providers based on selected service
  const filteredProviders = useMemo(() => {
    if (selectedFilter === "all") {
      return providers;
    }
    return providers.filter((provider) =>
      provider.services.includes(selectedFilter)
    );
  }, [providers, selectedFilter]);

  return (
    <>
      <Navigation />
      <main className={classes.page}>
        <div className={classes.container}>
          {/* Header */}
          <div className={classes.header}>
            <h1 className={classes.title}>{t.providers.title}</h1>
          </div>

          {/* Filter Section */}
          <div className={classes.filterSection}>
            <label className={classes.filterLabel}>
              {t.providers.filterLabel}
            </label>
            <div className={classes.filterContainer}>
              {/* All Services Button */}
              <button
                onClick={() => setSelectedFilter("all")}
                className={`${classes.filterButton} ${
                  selectedFilter === "all"
                    ? classes.filterButtonActive
                    : classes.filterButtonInactive
                }`}
              >
                {t.providers.allServices}
              </button>

              {/* Individual Service Filters */}
              {allServices.map((service) => (
                <button
                  key={service}
                  onClick={() => setSelectedFilter(service)}
                  className={`${classes.filterButton} ${
                    selectedFilter === service
                      ? classes.filterButtonActive
                      : classes.filterButtonInactive
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Providers Grid */}
          {filteredProviders.length > 0 ? (
            <div className={classes.grid}>
              {filteredProviders.map((provider) => (
                <ProviderCard
                  key={provider.id}
                  companyName={provider.companyName}
                  services={provider.services}
                  rating={provider.rating}
                  reviewCount={provider.reviewCount}
                  location={provider.location}
                  logo={provider.logo}
                  photos={provider.photos}
                />
              ))}
            </div>
          ) : (
            <div className={classes.noResults}>
              <div className={classes.noResultsIcon}>🔍</div>
              <p className={classes.noResultsText}>{t.providers.noResults}</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
