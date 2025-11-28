import Link from "next/link";
import { categoryGroups } from "../data/categories";
import { getServerTranslations } from "../lib/i18n/server-translations";

export default async function ServicesPage() {
  const { t } = await getServerTranslations();

  const groups = [
    { key: 'home', title: t.serviceGroups.home, services: categoryGroups.home },
    { key: 'exterior', title: t.serviceGroups.exterior, services: categoryGroups.exterior },
    { key: 'garden', title: t.serviceGroups.garden, services: categoryGroups.garden },
    { key: 'design', title: t.serviceGroups.design, services: categoryGroups.design },
    { key: 'events', title: t.serviceGroups.events, services: categoryGroups.events },
    { key: 'other', title: t.serviceGroups.other, services: categoryGroups.other },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-zinc-900 dark:text-white mb-3">
            {t.nav.allServices}
          </h1>
          <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {t.categories.subtitle}
          </p>
        </div>

        {groups.map((group, idx) => (
          <div
            key={group.key}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
                {group.title}
              </h2>
              <Link
                href={`/services/category/${group.key}`}
                className="group flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-dark transition-colors"
              >
                View all
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.services.map((category) => {
                const translatedCategory = t.serviceCategories[category.id as keyof typeof t.serviceCategories];
                const serviceName = translatedCategory?.name || category.name;
                return (
                  <Link
                    key={category.id}
                    href={`/providers?service=${category.id}`}
                    className="group flex flex-col items-center text-center p-8 bg-zinc-50 dark:bg-zinc-900 rounded-2xl hover:bg-accent/5 dark:hover:bg-accent/10 hover:shadow-lg transition-all duration-300 border border-zinc-200 dark:border-zinc-800 hover:border-accent cursor-pointer"
                  >
                    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2 group-hover:text-accent transition-colors">
                      {serviceName}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                      {translatedCategory?.description || category.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
