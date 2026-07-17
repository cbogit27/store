"use client"

import Link from 'next/link';
import { productCategories } from '@/data/productData';
import ProductVideo from '@/components/ProductVideo';

export default function ProductsSummaryPage() {
  // Compute totals for stats summary block
  const totalCategories = productCategories.length;
  const totalProducts = productCategories.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <main className="w-full min-h-screen py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Header & Stats Summary */}
        <header className="border-b border-gray-200/20 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-4xl tracking-tight">Product Ecosystem</h1>
            <p className="mt-2 text-base">Discover premium workspaces and professional engineering.</p>
          </div>
          <div className="flex gap-4 px-6 py-3 rounded-xl border border-gray-200/20 shadow-sm text-sm">
            <div><span className="font-bold">{totalCategories}</span> Categories</div>
            <div className="text-gray-300">|</div>
            <div><span className="font-bold">{totalProducts}</span> Total Models</div>
          </div>
        </header>

        {/* Categories Overview Blocks Loop */}
        <div className="mt-12 space-y-16">
          {productCategories.map((category) => (
            <section key={category.slug} className="p-6 md:p-8 rounded-2xl border border-gray-100/20 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-gray-100/10 pb-4 mb-6">
                <div>
                  <h2 className="text-2xl font-normal">{category.name} Collection</h2>
                  <p className="text-sm mt-1">{category.description}</p>
                </div>
                <Link 
                  href={`/products/${category.slug}`} 
                  className="mt-2 sm:mt-0 text-sm font-semibold hover:text-blue-700 flex items-center gap-1 group"
                >
                  View All {category.name} <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Link>
              </div>

              {/* Quick Nested Items Preview Matrix */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {category.items.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/products/${category.slug}/${item.slug}`}
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-50/20 hover:border-blue-100/50 hover:bg-gray-500/30 transition-all group"
                  >
                    <div className="h-16 w-16 bg-gray-900 rounded-lg overflow-hidden flex-shrink-0 relative">
                      <ProductVideo 
                      src={item.videoUrl}
                      className="w-full h-48 object-cover rounded-lg"/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-normal text-gray-300 truncate group-hover:text-white transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{item.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-sm 0">{item.price}</span>
                      <span className="block text-[10px] text-blue-500 font-medium mt-0.5 group-hover:underline">Explore</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

      </div>
    </main>
  );
}
