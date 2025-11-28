import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryGroups } from "../../../data/categories";
import { getServerTranslations } from "../../../lib/i18n/server-translations";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const validCategories = ['home', 'exterior', 'garden', 'design', 'events', 'other'] as const;
type CategoryType = typeof validCategories[number];

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const { t } = await getServerTranslations();

  if (!validCategories.includes(category as CategoryType)) {
    notFound();
  }

  const categoryType = category as CategoryType;
  const categoryServices = categoryGroups[categoryType];
  const title = t.serviceGroups[categoryType];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center text-sm text-zinc-600 dark:text-zinc-400 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 w-fit bg-zinc-50 dark:bg-zinc-900">
            <Link href="/" className="hover:text-accent transition-colors">
              {t.service.breadcrumbs.home}
            </Link>
            <svg className="w-4 h-4 mx-2 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/services" className="hover:text-accent transition-colors">
              {t.service.breadcrumbs.services}
            </Link>
            <svg className="w-4 h-4 mx-2 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-zinc-900 dark:text-white font-medium">{title}</span>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-zinc-900 dark:text-white mb-3">
            {title}
          </h1>
          <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Raskite geriausius {title.toLowerCase()} specialistus savo poreikiams
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryServices.map((service, idx) => {
            const translatedCategory = t.serviceCategories[service.id as keyof typeof t.serviceCategories];
            const serviceName = translatedCategory?.name || service.name;
            return (
              <Link
                key={service.id}
                href={`/providers?service=${service.id}`}
                className="group flex flex-col items-center text-center p-8 bg-zinc-50 dark:bg-zinc-900 rounded-2xl hover:bg-accent/5 dark:hover:bg-accent/10 hover:shadow-lg transition-all duration-300 border border-zinc-200 dark:border-zinc-800 hover:border-accent cursor-pointer"
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2 group-hover:text-accent transition-colors">
                  {serviceName}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                  {translatedCategory?.description || service.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Generate static params for all service categories
export async function generateStaticParams() {
  return validCategories.map((category) => ({
    category: category,
  }));
}
