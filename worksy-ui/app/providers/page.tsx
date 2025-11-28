"use client";

import { useState, useMemo, useRef, useEffect, Suspense } from "react";
import { useTranslation } from "../lib/i18n/LanguageContext";
import { useSearchParams } from "next/navigation";
import ProviderCard from "../components/ProviderCard";
import ChipDropdownFilters from "../components/ChipDropdownFilters";
import { categories } from "../data/categories";

const classes = {
  page: "min-h-screen bg-zinc-50 dark:bg-black",
  content: "pt-8",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
  header: "mb-8",
  title: "text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-6",
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12",
  noResults: "text-center py-16",
  noResultsText: "text-xl text-zinc-600 dark:text-zinc-400 mb-4",
  noResultsIcon: "text-6xl mb-4",
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
  const [filterValues, setFilterValues] = useState<Record<string, string | string[]>>({});

  const providers = t.providers.items;

  // Initialize filters from URL params
  useEffect(() => {
    const serviceId = searchParams.get('service');
    const location = searchParams.get('location');
    const budget = searchParams.get('budget');
    const rating = searchParams.get('rating');

    const initialFilters: Record<string, string | string[]> = {};
    // Service can be multi-select, so wrap in array
    if (serviceId) {
      initialFilters['service-type'] = [serviceId];
    }
    if (location) initialFilters['location'] = location;
    if (budget) initialFilters['budget'] = budget;
    if (rating) initialFilters['rating'] = rating;

    setFilterValues(initialFilters);
  }, [searchParams]);

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

  const handleFilterChange = (newFilters: Record<string, string | string[]>) => {
    setFilterValues(newFilters);
  };

  return (
    <main className={classes.page}>
      <ChipDropdownFilters filters={filters} onFilterChange={handleFilterChange} initialValues={filterValues} />

      <div className={classes.content}>
        <div className={classes.container}>
          {/* Header */}
          <div className={classes.header}>
            <h1 className={classes.title}>{t.providers.title}</h1>
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
