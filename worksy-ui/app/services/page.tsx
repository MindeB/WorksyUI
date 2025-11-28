import Link from "next/link";
import { categories } from "../data/categories";
import { getServerTranslations } from "../lib/i18n/server-translations";

export default async function ServicesPage() {
  const { t } = await getServerTranslations();

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

        {/* Interior Services */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
            {t.serviceGroups.interior}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.slice(0, 11).map((category) => {
              const translatedCategory = t.serviceCategories[category.id as keyof typeof t.serviceCategories];
              return (
                <Link
                  key={category.id}
                  href={`/services/${category.id}`}
                  className="group flex flex-col items-center p-6 bg-white dark:bg-zinc-900 rounded-xl hover:bg-blue-50 dark:hover:bg-zinc-800 hover:shadow-lg transition-all duration-300 border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-50 text-center mb-1">
                    {translatedCategory?.name || category.name}
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 text-center">
                    {translatedCategory?.description || category.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Exterior Services */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
            {t.serviceGroups.exterior}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.slice(11, 23).map((category) => {
              const translatedCategory = t.serviceCategories[category.id as keyof typeof t.serviceCategories];
              return (
                <Link
                  key={category.id}
                  href={`/services/${category.id}`}
                  className="group flex flex-col items-center p-6 bg-white dark:bg-zinc-900 rounded-xl hover:bg-blue-50 dark:hover:bg-zinc-800 hover:shadow-lg transition-all duration-300 border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-50 text-center mb-1">
                    {translatedCategory?.name || category.name}
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 text-center">
                    {translatedCategory?.description || category.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Lawn & Garden Services */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
            {t.serviceGroups.lawnGarden}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.slice(23, 34).map((category) => {
              const translatedCategory = t.serviceCategories[category.id as keyof typeof t.serviceCategories];
              return (
                <Link
                  key={category.id}
                  href={`/services/${category.id}`}
                  className="group flex flex-col items-center p-6 bg-white dark:bg-zinc-900 rounded-xl hover:bg-blue-50 dark:hover:bg-zinc-800 hover:shadow-lg transition-all duration-300 border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-50 text-center mb-1">
                    {translatedCategory?.name || category.name}
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 text-center">
                    {translatedCategory?.description || category.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Additional Services */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
            {t.serviceGroups.additional}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.slice(34).map((category) => {
              const translatedCategory = t.serviceCategories[category.id as keyof typeof t.serviceCategories];
              return (
                <Link
                  key={category.id}
                  href={`/services/${category.id}`}
                  className="group flex flex-col items-center p-6 bg-white dark:bg-zinc-900 rounded-xl hover:bg-blue-50 dark:hover:bg-zinc-800 hover:shadow-lg transition-all duration-300 border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-50 text-center mb-1">
                    {translatedCategory?.name || category.name}
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 text-center">
                    {translatedCategory?.description || category.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
