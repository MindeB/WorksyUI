"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useTranslation } from "../lib/i18n/LanguageContext";
import ProviderCard from "../components/ProviderCard";

const classes = {
  page: "min-h-screen bg-zinc-50 dark:bg-black",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
  header: "mb-8",
  title: "text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-6",
  filterSection: "mb-8",
  filterLabel: "text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3 block",
  chipsContainer: "flex flex-wrap gap-3",
  chip: "relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all border",
  chipInactive: "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800",
  chipActive: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700",
  chipLabel: "flex items-center gap-1.5",
  chipClearButton: "ml-1 p-0.5 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors",
  chevron: "text-zinc-500 dark:text-zinc-400 transition-transform text-xs",
  chevronOpen: "transform rotate-180",
  dropdownMenu: "absolute z-20 mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl max-h-60 overflow-y-auto min-w-[200px]",
  dropdownItem: "px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer flex items-center gap-2 transition-colors",
  checkbox: "w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-500",
  dropdownItemText: "text-sm text-zinc-900 dark:text-zinc-50",
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12",
  noResults: "text-center py-16",
  noResultsText: "text-xl text-zinc-600 dark:text-zinc-400 mb-4",
  noResultsIcon: "text-6xl mb-4",
};

export default function ProvidersPage() {
  const { t } = useTranslation();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const servicesRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement>(null);
  const ratingsRef = useRef<HTMLDivElement>(null);

  const providers = t.providers.items;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(event.target as Node) &&
        locationsRef.current &&
        !locationsRef.current.contains(event.target as Node) &&
        ratingsRef.current &&
        !ratingsRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Extract all unique services
  const allServices = useMemo(() => {
    const servicesSet = new Set<string>();
    providers.forEach((provider) => {
      provider.services.forEach((service) => servicesSet.add(service));
    });
    return Array.from(servicesSet).sort();
  }, [providers]);

  // Extract all unique locations
  const allLocations = useMemo(() => {
    const locationsSet = new Set<string>();
    providers.forEach((provider) => {
      locationsSet.add(provider.location);
    });
    return Array.from(locationsSet).sort();
  }, [providers]);

  // Extract all unique rating ranges
  const ratingRanges = [
    { label: "5 stars", value: 5 },
    { label: "4+ stars", value: 4 },
    { label: "3+ stars", value: 3 },
  ];

  // Filter providers based on selected filters
  const filteredProviders = useMemo(() => {
    return providers.filter((provider) => {
      // Filter by services
      if (selectedServices.length > 0) {
        const hasService = provider.services.some((service) =>
          selectedServices.includes(service)
        );
        if (!hasService) return false;
      }

      // Filter by location
      if (selectedLocations.length > 0) {
        if (!selectedLocations.includes(provider.location)) return false;
      }

      // Filter by rating
      if (selectedRatings.length > 0) {
        const meetsRating = selectedRatings.some((minRating) => {
          if (minRating === 5) {
            return provider.rating === 5;
          }
          return provider.rating >= minRating;
        });
        if (!meetsRating) return false;
      }

      return true;
    });
  }, [providers, selectedServices, selectedLocations, selectedRatings]);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  const toggleRating = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const clearServices = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedServices([]);
    setOpenDropdown(null);
  };

  const clearLocations = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedLocations([]);
    setOpenDropdown(null);
  };

  const clearRatings = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedRatings([]);
    setOpenDropdown(null);
  };

  const getServicesLabel = () => {
    if (selectedServices.length === 0) return "Services";
    if (selectedServices.length === 1) return selectedServices[0];
    return `${selectedServices[0]} +${selectedServices.length - 1}`;
  };

  const getLocationsLabel = () => {
    if (selectedLocations.length === 0) return "Location";
    if (selectedLocations.length === 1) return selectedLocations[0];
    return `${selectedLocations[0]} +${selectedLocations.length - 1}`;
  };

  const getRatingsLabel = () => {
    if (selectedRatings.length === 0) return "Rating";
    const firstRating = ratingRanges.find((r) => r.value === selectedRatings[0]);
    if (selectedRatings.length === 1) return firstRating?.label || "Rating";
    return `${firstRating?.label} +${selectedRatings.length - 1}`;
  };

  return (
    <main className={classes.page}>
      <div className={classes.container}>
        {/* Header */}
        <div className={classes.header}>
          <h1 className={classes.title}>{t.providers.title}</h1>
        </div>

        {/* Filter Section */}
        <div className={classes.filterSection}>
          <label className={classes.filterLabel}>{t.providers.filterLabel}</label>

          <div className={classes.chipsContainer}>
            {/* Services Chip */}
            <div className="relative" ref={servicesRef}>
              <div
                onClick={() =>
                  setOpenDropdown(openDropdown === "services" ? null : "services")
                }
                className={`${classes.chip} ${
                  selectedServices.length > 0
                    ? classes.chipActive
                    : classes.chipInactive
                }`}
              >
                <span className={classes.chipLabel}>
                  {getServicesLabel()}
                  {selectedServices.length === 0 && (
                    <svg
                      className={`w-3 h-3 ${classes.chevron} ${
                        openDropdown === "services" ? classes.chevronOpen : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </span>
                {selectedServices.length > 0 && (
                  <button
                    onClick={clearServices}
                    className={classes.chipClearButton}
                    aria-label="Clear services filter"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
              {openDropdown === "services" && (
                <div className={classes.dropdownMenu}>
                  {allServices.map((service) => (
                    <div
                      key={service}
                      onClick={() => toggleService(service)}
                      className={classes.dropdownItem}
                    >
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service)}
                        onChange={() => {}}
                        className={classes.checkbox}
                      />
                      <span className={classes.dropdownItemText}>{service}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Location Chip */}
            <div className="relative" ref={locationsRef}>
              <div
                onClick={() =>
                  setOpenDropdown(openDropdown === "location" ? null : "location")
                }
                className={`${classes.chip} ${
                  selectedLocations.length > 0
                    ? classes.chipActive
                    : classes.chipInactive
                }`}
              >
                <span className={classes.chipLabel}>
                  {getLocationsLabel()}
                  {selectedLocations.length === 0 && (
                    <svg
                      className={`w-3 h-3 ${classes.chevron} ${
                        openDropdown === "location" ? classes.chevronOpen : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </span>
                {selectedLocations.length > 0 && (
                  <button
                    onClick={clearLocations}
                    className={classes.chipClearButton}
                    aria-label="Clear location filter"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
              {openDropdown === "location" && (
                <div className={classes.dropdownMenu}>
                  {allLocations.map((location) => (
                    <div
                      key={location}
                      onClick={() => toggleLocation(location)}
                      className={classes.dropdownItem}
                    >
                      <input
                        type="checkbox"
                        checked={selectedLocations.includes(location)}
                        onChange={() => {}}
                        className={classes.checkbox}
                      />
                      <span className={classes.dropdownItemText}>{location}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Rating Chip */}
            <div className="relative" ref={ratingsRef}>
              <div
                onClick={() =>
                  setOpenDropdown(openDropdown === "rating" ? null : "rating")
                }
                className={`${classes.chip} ${
                  selectedRatings.length > 0
                    ? classes.chipActive
                    : classes.chipInactive
                }`}
              >
                <span className={classes.chipLabel}>
                  {getRatingsLabel()}
                  {selectedRatings.length === 0 && (
                    <svg
                      className={`w-3 h-3 ${classes.chevron} ${
                        openDropdown === "rating" ? classes.chevronOpen : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </span>
                {selectedRatings.length > 0 && (
                  <button
                    onClick={clearRatings}
                    className={classes.chipClearButton}
                    aria-label="Clear rating filter"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
              {openDropdown === "rating" && (
                <div className={classes.dropdownMenu}>
                  {ratingRanges.map((range) => (
                    <div
                      key={range.value}
                      onClick={() => toggleRating(range.value)}
                      className={classes.dropdownItem}
                    >
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(range.value)}
                        onChange={() => {}}
                        className={classes.checkbox}
                      />
                      <span className={classes.dropdownItemText}>
                        {range.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
  );
}
