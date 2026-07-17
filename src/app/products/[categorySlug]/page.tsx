// src/app/products/[categorySlug]/page.tsx

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { productCategories } from '@/data/productData';
import ProductFilter from "@/components/ProductFilter";
import ProductVideo from '@/components/ProductVideo';

interface CategoryProps {
  params: Promise<{ categorySlug: string }>;
}

export async function generateStaticParams() {
  return productCategories.map((c) => ({ categorySlug: c.slug }));
}

export default async function CategoryLanderPage({ params }: CategoryProps) {
  const { categorySlug } = await params;
  const category = productCategories.find((c) => c.slug === categorySlug);

  if (!category) notFound();

  return (
    <main className="w-full min-h-screen pt-24 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Trail */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
          <ol className="flex items-center space-x-2">
            <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
            <span>/</span>
            <li><Link href="/products" className="hover:text-blue-600 transition-colors">Products</Link></li>
            <span>/</span>
            <li aria-current="page" className="font-semibold text-gray-900">{category.name}</li>
          </ol>
        </nav>

        {/* Interface Header with Headless UI Accessible Menu Control */}
        <div className="mt-4 flex flex-col gap-4 border-b border-gray-200 pb-6 mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-gray-900">{category.name} Catalog</h1>
            <p className="mt-1 text-sm text-gray-600">Premium design standards tailored directly to your flow.</p>
          </div>

            {/* HEADLESS UI SORTING DISCLOSURE DROPDOWN */}
            <ProductFilter/>


        </div>

        {/* Dynamic Card Grid with Video Playback Triggers */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {category.items.map((item) => (
            <Link
              key={item.slug}
              href={`/products/${category.slug}/${item.slug}`}
              className="group relative flex flex-col rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-video w-full bg-gray-100 overflow-hidden relative">
                <ProductVideo 
                src={item.videoUrl} // or item.videoUrl depending on your loop
                className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md px-2.5 py-1 text-[11px] text-white font-medium rounded-md tracking-wide">
                  Hover to preview video
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{item.description}</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-5">
                  <span className="text-lg font-black text-gray-900">{item.price}</span>
                  <span className="text-xs font-semibold text-blue-600 group-hover:underline">View Specs &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
