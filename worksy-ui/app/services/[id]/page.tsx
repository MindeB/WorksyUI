import { notFound } from "next/navigation";
import { categories } from "../../data/categories";
import Link from "next/link";
import { getServerTranslations } from "../../lib/i18n/server-translations";

interface ServicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { id } = await params;
  const { t } = await getServerTranslations();
  const category = categories.find((cat) => cat.id === id);

  if (!category) {
    notFound();
  }

  const translatedCategory = t.serviceCategories[category.id as keyof typeof t.serviceCategories];
  const categoryName = translatedCategory?.name || category.name;
  const categoryDescription = translatedCategory?.description || category.description;

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
            <span className="text-zinc-900 dark:text-zinc-50">{categoryName}</span>
          </nav>
        </div>

        {/* Hero Section */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 md:p-12 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-8xl">{category.icon}</div>
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                {categoryName}
              </h1>
              <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-6">
                {categoryDescription}
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                {t.service.findSpecialists}
              </button>
            </div>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-blue-50 dark:bg-zinc-800 rounded-lg p-6 mb-8 border border-blue-200 dark:border-zinc-700">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            🚧 {t.service.comingSoon}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            {t.service.comingSoonDescription}
          </p>
          <ul className="mt-4 space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>✓ {t.service.features.browse}</li>
            <li>✓ {t.service.features.reviews}</li>
            <li>✓ {t.service.features.pricing}</li>
            <li>✓ {t.service.features.contact}</li>
            <li>✓ {t.service.features.book}</li>
          </ul>
        </div>

        {/* What to Expect Section */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 md:p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
            {t.service.whatToExpect.replace('{service}', categoryName)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="text-3xl">✓</div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                  {t.service.expectations.verified.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {t.service.expectations.verified.description}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">✓</div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                  {t.service.expectations.pricing.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {t.service.expectations.pricing.description}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">✓</div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                  {t.service.expectations.reviews.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {t.service.expectations.reviews.description}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">✓</div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                  {t.service.expectations.payments.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {t.service.expectations.payments.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Services */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
            {t.service.relatedServices}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories
              .filter((cat) => cat.id !== category.id)
              .slice(0, 4)
              .map((relatedCategory) => {
                const translatedRelated = t.serviceCategories[relatedCategory.id as keyof typeof t.serviceCategories];
                return (
                  <Link
                    key={relatedCategory.id}
                    href={`/services/${relatedCategory.id}`}
                    className="group flex flex-col items-center p-4 bg-white dark:bg-zinc-900 rounded-lg hover:bg-blue-50 dark:hover:bg-zinc-800 hover:shadow-lg transition-all duration-300 border border-zinc-200 dark:border-zinc-800"
                  >
                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {relatedCategory.icon}
                    </div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 text-center">
                      {translatedRelated?.name || relatedCategory.name}
                    </h3>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate static params for all categories (optional, for static generation)
export async function generateStaticParams() {
  return categories.map((category) => ({
    id: category.id,
  }));
}
