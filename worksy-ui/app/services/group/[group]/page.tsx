import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "../../../data/categories";
import { getServerTranslations } from "../../../lib/i18n/server-translations";

interface ServiceGroupPageProps {
  params: Promise<{
    group: string;
  }>;
}

const groupInfo: Record<string, { key: 'interior' | 'exterior' | 'lawnGarden' | 'additional'; start: number; end: number }> = {
  interior: {
    key: 'interior',
    start: 0,
    end: 11,
  },
  exterior: {
    key: 'exterior',
    start: 11,
    end: 23,
  },
  "lawn-garden": {
    key: 'lawnGarden',
    start: 23,
    end: 34,
  },
  additional: {
    key: 'additional',
    start: 34,
    end: categories.length,
  },
};

export default async function ServiceGroupPage({ params }: ServiceGroupPageProps) {
  const { group } = await params;
  const { t } = await getServerTranslations();
  const groupData = groupInfo[group];

  if (!groupData) {
    notFound();
  }

  const title = t.serviceGroups[groupData.key];
  const description = t.serviceGroup.descriptions[groupData.key];
  const groupCategories = categories.slice(groupData.start, groupData.end);

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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            {title}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {groupCategories.map((category) => (
            <Link
              key={category.id}
              href={`/services/${category.id}`}
              className="group flex flex-col items-center p-6 bg-white dark:bg-zinc-900 rounded-xl hover:bg-blue-50 dark:hover:bg-zinc-800 hover:shadow-lg transition-all duration-300 border border-zinc-200 dark:border-zinc-800"
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              <h3 className="text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-50 text-center mb-1">
                {category.name}
              </h3>
              <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 text-center">
                {category.description}
              </p>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">{t.serviceGroup.cantFind}</h2>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
            {t.serviceGroup.cantFindDescription}
          </p>
          <Link
            href="/services"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            {t.categories.viewAll}
          </Link>
        </div>
      </div>
    </div>
  );
}

// Generate static params for all service groups
export async function generateStaticParams() {
  return [
    { group: "interior" },
    { group: "exterior" },
    { group: "lawn-garden" },
    { group: "additional" },
  ];
}
