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
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            {t.nav.allServices}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {t.categories.subtitle}
          </p>
        </div>

        {groups.map((group) => (
          <div key={group.key} className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {group.title}
              </h2>
              <Link
                href={`/services/category/${group.key}`}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {group.services.map((category) => {
                const translatedCategory = t.serviceCategories[category.id as keyof typeof t.serviceCategories];
                const serviceName = translatedCategory?.name || category.name;
                return (
                  <Link
                    key={category.id}
                    href={`/providers?service=${category.id}`}
                    className="group flex flex-col items-center p-6 bg-white dark:bg-zinc-900 rounded-xl hover:bg-blue-50 dark:hover:bg-zinc-800 hover:shadow-lg transition-all duration-300 border border-zinc-200 dark:border-zinc-800"
                  >
                    <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-50 text-center mb-1">
                      {serviceName}
                    </h3>
                    <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 text-center">
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
