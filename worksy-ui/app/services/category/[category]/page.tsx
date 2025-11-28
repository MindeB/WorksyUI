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
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex text-sm text-zinc-600 dark:text-zinc-400">
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-50">
              {t.service.breadcrumbs.home}
            </Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-zinc-900 dark:hover:text-zinc-50">
              {t.service.breadcrumbs.services}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-900 dark:text-zinc-50">{title}</span>
          </nav>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            {title}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Raskite geriausius {title.toLowerCase()} specialistus savo poreikiams
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categoryServices.map((service) => {
            const translatedCategory = t.serviceCategories[service.id as keyof typeof t.serviceCategories];
            const serviceName = translatedCategory?.name || service.name;
            return (
              <Link
                key={service.id}
                href={`/providers?service=${service.id}`}
                className="group flex flex-col items-center p-6 bg-white dark:bg-zinc-900 rounded-xl hover:bg-blue-50 dark:hover:bg-zinc-800 hover:shadow-lg transition-all duration-300 border border-zinc-200 dark:border-zinc-800"
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-50 text-center mb-1">
                  {serviceName}
                </h3>
                <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 text-center">
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
