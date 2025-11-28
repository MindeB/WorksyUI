"use client";

import { useState, useMemo, useRef, useEffect, Suspense } from "react";
import { useTranslation } from "../lib/i18n/LanguageContext";
import { useSearchParams } from "next/navigation";
import ProviderCard from "../components/ProviderCard";
import ChipDropdownFilters from "../components/ChipDropdownFilters";
import { categories } from "../data/categories";

const classes = {
  page: "min-h-screen bg-white dark:bg-zinc-950",
  content: "pt-6 pb-12",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  header: "mb-8 flex items-center justify-between opacity-0 animate-on-scroll",
  titleSection: "flex-1",
  title: "text-3xl font-semibold text-zinc-900 dark:text-white mb-2",
  subtitle: "text-sm text-zinc-600 dark:text-zinc-400",
  resultCount: "text-sm font-medium text-zinc-700 dark:text-zinc-300 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900",
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  providerCard: "opacity-0 animate-on-scroll",
  noResults: "text-center py-20 opacity-0 animate-on-scroll",
  noResultsIcon: "text-6xl mb-4 opacity-20",
  noResultsText: "text-2xl font-semibold text-zinc-900 dark:text-white mb-2",
  noResultsSubtext: "text-sm text-zinc-600 dark:text-zinc-400 mb-8",
  noResultsButton: "px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-lg font-medium text-sm transition-colors duration-200",
};

// Service ID to English name mapping
const SERVICE_ID_TO_ENGLISH: Record<string, string> = {
  'appliance-repair': 'Appliance Repair',
  'carpet-cleaning': 'Carpet Cleaning',
  'contractors': 'Contractors',
  'drywall': 'Drywall',
  'electrical': 'Electrical',
  'flooring': 'Flooring',
  'hvac': 'HVAC',
  'house-cleaning': 'House Cleaning',
  'interior-painting': 'Interior Painting',
  'plumbing': 'Plumbing',
  'remodeling': 'Remodeling',
  'concrete-repair': 'Concrete Repair',
  'doors': 'Doors',
  'driveways': 'Driveways',
  'exterior-painting': 'Exterior Painting',
  'garage-doors': 'Garage Doors',
  'gutter-cleaning': 'Gutter Cleaning',
  'gutter-repair': 'Gutter Repair',
  'home-builders': 'Home Builders',
  'masonry': 'Masonry',
  'roofing': 'Roofing',
  'siding': 'Siding',
  'windows': 'Windows',
  'decks': 'Decks',
  'fencing': 'Fencing',
  'land-surveying': 'Land Surveying',
  'landscaping': 'Landscaping',
  'lawn-yard-work': 'Lawn & Yard Work',
  'leaf-removal': 'Leaf Removal',
  'patios': 'Patios',
  'pool-installation': 'Pool Installation',
  'sprinkler-systems': 'Sprinkler Systems',
  'sunrooms': 'Sunrooms',
  'tree-service': 'Tree Service',
  'basement-waterproofing': 'Basement Waterproofing',
  'handymen': 'Handymen',
  'junk-hauling': 'Junk Hauling',
  'locksmiths': 'Locksmiths',
  'moving-companies': 'Moving Companies',
  'pest-control': 'Pest Control',
  'pressure-washing': 'Pressure Washing',
  'septic-tanks': 'Septic Tanks',
};

// Service ID to Lithuanian name mapping
const SERVICE_ID_TO_LITHUANIAN: Record<string, string> = {
  'appliance-repair': 'Buitinės technikos remontas',
  'carpet-cleaning': 'Kilimų valymas',
  'contractors': 'Rangovas',
  'drywall': 'Gipso kartono darbai',
  'electrical': 'Elektros darbai',
  'flooring': 'Grindų klojimas',
  'hvac': 'Vėdinimas',
  'house-cleaning': 'Namų valymas',
  'interior-painting': 'Vidaus dažymas',
  'plumbing': 'Santechnika',
  'remodeling': 'Pertvarkymas',
  'concrete-repair': 'Betono remontas',
  'doors': 'Durys',
  'driveways': 'Privažiavimai',
  'exterior-painting': 'Išorės dažymas',
  'garage-doors': 'Garažo vartai',
  'gutter-cleaning': 'Latakų valymas',
  'gutter-repair': 'Latakų remontas',
  'home-builders': 'Namų statytojai',
  'masonry': 'Mūro darbai',
  'roofing': 'Stogų darbai',
  'siding': 'Fasado apdaila',
  'windows': 'Langai',
  'decks': 'Terasas',
  'fencing': 'Tvoros',
  'land-surveying': 'Žemės matavimas',
  'landscaping': 'Apželdinimas',
  'lawn-yard-work': 'Vejos ir kiemo darbai',
  'leaf-removal': 'Lapų šalinimas',
  'patios': 'Kiemų įrengimas',
  'pool-installation': 'Baseinų montavimas',
  'sprinkler-systems': 'Laistymo sistemos',
  'sunrooms': 'Vasarinės veranda',
  'tree-service': 'Medžių priežiūra',
  'basement-waterproofing': 'Rūsio hidroizoliacija',
  'handymen': 'Meistrai',
  'junk-hauling': 'Šiukšlių išvežimas',
  'locksmiths': 'Spynos meistrai',
  'moving-companies': 'Kėlimosi paslaugos',
  'pest-control': 'Kenkėjų kontrolė',
  'pressure-washing': 'Slėginis plovimas',
  'septic-tanks': 'Septiniai',
};

function ProvidersPageContent() {
  const { t, locale } = useTranslation();
  const searchParams = useSearchParams();

  const providers = t.providers.items;

  // Derive initial filter values from URL params
  const initialFilterValues = useMemo(() => {
    const serviceId = searchParams.get('service');
    const location = searchParams.get('location');
    const budget = searchParams.get('budget');
    const rating = searchParams.get('rating');

    const filters: Record<string, string | string[]> = {};
    // Service can be multi-select, so wrap in array
    if (serviceId) {
      filters['service-type'] = [serviceId];
    }
    if (location) filters['location'] = location;
    if (budget) filters['budget'] = budget;
    if (rating) filters['rating'] = rating;

    return filters;
  }, [searchParams]);

  const [filterValues, setFilterValues] = useState<Record<string, string | string[]>>(initialFilterValues);

  // Update filter values when URL params change
  useEffect(() => {
    setFilterValues(initialFilterValues);
  }, [initialFilterValues]);

  // Show ALL services from categories with translated names
  const availableServiceOptions = useMemo(() => {
    // Map all categories to translated names for dropdown options
    const options: { label: string; value: string }[] = categories.map((category) => {
      const translatedCategory = t.serviceCategories[category.id as keyof typeof t.serviceCategories];
      return {
        label: translatedCategory?.name || category.name, // Display translated name
        value: category.id, // Use service ID as value
      };
    });

    return options.sort((a, b) => a.label.localeCompare(b.label));
  }, [t, locale]);

  // Extract all unique locations
  const allLocations = useMemo(() => {
    const locationsSet = new Set<string>();
    providers.forEach((provider) => {
      locationsSet.add(provider.location);
    });
    return Array.from(locationsSet).sort();
  }, [providers]);

  // Define filters for chip filter component with translated labels
  const filters = useMemo(() => [
    {
      label: locale === 'lt' ? "Paslaugos tipas" : "Service Type",
      value: "service-type",
      options: availableServiceOptions,
      multiSelect: true, // Allow multiple service selections
    },
    {
      label: locale === 'lt' ? "Vieta" : "Location",
      value: "location",
      options: allLocations.map(location => ({
        label: location,
        value: location,
      })),
    },
    {
      label: locale === 'lt' ? "Biudžetas" : "Budget",
      value: "budget",
      options: locale === 'lt' ? [
        { label: "€ - Ekonomiškas", value: "low" },
        { label: "€€ - Vidutinis", value: "medium" },
        { label: "€€€ - Aukštas", value: "high" },
        { label: "€€€€ - Premium", value: "premium" },
      ] : [
        { label: "€ - Budget", value: "low" },
        { label: "€€ - Medium", value: "medium" },
        { label: "€€€ - High", value: "high" },
        { label: "€€€€ - Premium", value: "premium" },
      ],
    },
    {
      label: locale === 'lt' ? "Įvertinimas" : "Rating",
      value: "rating",
      options: locale === 'lt' ? [
        { label: "5 žvaigždutės", value: "5" },
        { label: "4+ žvaigždutės", value: "4" },
        { label: "3+ žvaigždutės", value: "3" },
      ] : [
        { label: "5 stars", value: "5" },
        { label: "4+ stars", value: "4" },
        { label: "3+ stars", value: "3" },
      ],
    },
  ], [locale, availableServiceOptions, allLocations]);

  // Filter providers based on selected filters
  const filteredProviders = useMemo(() => {
    // Use appropriate service mapping based on locale
    const serviceMapping = locale === 'lt' ? SERVICE_ID_TO_LITHUANIAN : SERVICE_ID_TO_ENGLISH;

    return providers.filter((provider) => {
      // Filter by service (can be array for multi-select)
      const serviceFilter = filterValues['service-type'];
      if (serviceFilter) {
        const serviceIds = Array.isArray(serviceFilter) ? serviceFilter : [serviceFilter];
        // Check if provider has ANY of the selected services
        const hasMatchingService = serviceIds.some((serviceId) => {
          const serviceName = serviceMapping[serviceId];
          return serviceName && (provider.services as readonly string[]).includes(serviceName);
        });
        if (!hasMatchingService) {
          return false;
        }
      }

      // Filter by location
      const locationFilter = filterValues['location'] as string;
      if (locationFilter && provider.location !== locationFilter) {
        return false;
      }

      // Filter by rating
      const ratingFilter = filterValues['rating'] as string;
      if (ratingFilter) {
        const minRating = parseInt(ratingFilter);
        if (minRating === 5 && provider.rating !== 5) {
          return false;
        } else if (provider.rating < minRating) {
          return false;
        }
      }

      return true;
    });
  }, [providers, filterValues, locale]);

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in', 'fade-in', 'slide-in-from-bottom', 'duration-700');
              (entry.target as HTMLElement).style.opacity = '1';
            }, index * 50);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredProviders]);

  const handleFilterChange = (newFilters: Record<string, string | string[]>) => {
    setFilterValues(newFilters);
  };

  return (
    <main className={classes.page}>
      {/* Filters */}
      <ChipDropdownFilters filters={filters} onFilterChange={handleFilterChange} initialValues={filterValues} />

      {/* Content */}
      <div className={classes.content}>
        <div className={classes.container}>
          {/* Header with Results Count */}
          <div className={classes.header}>
            <div className={classes.titleSection}>
              <h2 className={classes.title}>
                {locale === 'lt' ? 'Visi specialistai' : 'All Providers'}
              </h2>
              <p className={classes.subtitle}>
                {locale === 'lt'
                  ? 'Surask tinkamą specialistą savo poreikiams'
                  : 'Find the right specialist for your needs'}
              </p>
            </div>
            {filteredProviders.length > 0 && (
              <div className={classes.resultCount}>
                {filteredProviders.length} {locale === 'lt' ? 'rezultatai' : 'results'}
              </div>
            )}
          </div>

          {/* Providers Grid */}
          {filteredProviders.length > 0 ? (
            <div className={classes.grid}>
              {filteredProviders.map((provider) => (
                <div key={provider.id} className={classes.providerCard}>
                  <ProviderCard
                    companyName={provider.companyName}
                    services={provider.services}
                    rating={provider.rating}
                    reviewCount={provider.reviewCount}
                    location={provider.location}
                    logo={provider.logo}
                    photos={provider.photos}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className={classes.noResults}>
              <div className={classes.noResultsIcon}>🔍</div>
              <p className={classes.noResultsText}>
                {locale === 'lt' ? 'Specialistų nerasta' : 'No providers found'}
              </p>
              <p className={classes.noResultsSubtext}>
                {locale === 'lt'
                  ? 'Pabandykite pakeisti filtrus arba ieškoti kitoje vietoje'
                  : 'Try adjusting your filters or searching in a different location'}
              </p>
              <button
                onClick={() => setFilterValues({})}
                className={classes.noResultsButton}
              >
                {locale === 'lt' ? 'Išvalyti filtrus' : 'Clear Filters'}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function ProvidersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-50 dark:bg-black" />}>
      <ProvidersPageContent />
    </Suspense>
  );
}
