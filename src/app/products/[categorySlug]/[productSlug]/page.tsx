// src/app/products/[categorySlug]/[productSlug]/page.tsx

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { productCategories } from '@/data/productData';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import ProductVideo from '@/components/ProductVideo';
import ProductPurchasePanel from '@/components/ProductPurchasePanel';

interface DeepProductProps {
  params: Promise<{ categorySlug: string; productSlug: string }>;
}

export async function generateStaticParams() {
  const paths: { categorySlug: string; productSlug: string }[] = [];
  productCategories.forEach((cat) => {
    cat.items.forEach((item) => {
      paths.push({ categorySlug: cat.slug, productSlug: item.slug });
    });
  });
  return paths;
}

export default async function ProductDetailPage({ params }: DeepProductProps) {
  const { categorySlug, productSlug } = await params;
  
  const category = productCategories.find((c) => c.slug === categorySlug);
  const item = category?.items.find((i) => i.slug === productSlug);

  if (!category || !item) return notFound();

  return (
    <main className="w-full min-h-screen">
      
      {/* High-Fidelity Continuous Playback Video Hero Background */}
      <header className="relative bg-gray-950 text-white">

  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

    {/* Breadcrumb */}

    <nav className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-gray-300">

      <Link href="/products">Catalog</Link>

      <span>/</span>

      <Link href={`/products/${category.slug}`}>
        {category.name}
      </Link>

    </nav>

    

    {/* Product Layout */}

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

      {/* LEFT */}

      <div>

        <ProductVideo
            src={item.videoUrl}
            autoPlay
            className="w-full aspect-square rounded-3xl object-cover"
        />

      </div>

      {/* RIGHT */}

      <div>

        <ProductPurchasePanel
          product={item}
        />

      </div>

    </div>

  </div>

</header>

      {/* Accessible Interactive Content Section Using Headless UI Tabs */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <TabGroup>
          <TabList className="flex gap-4 border-b border-gray-200 pb-px">
            <Tab className="rounded-t-lg px-4 py-2.5 text-sm font-semibold text-gray-600 outline-none data-[selected]:border-b-2 data-[selected]:border-blue-600 transition-all">
              Overview
            </Tab>
            <Tab className="rounded-t-lg px-4 py-2.5 text-sm font-semibold text-gray-600 outline-none data-[selected]:border-b-2 data-[selected]:border-blue-600 transition-all">
              Key Metrics
            </Tab>
          </TabList>
          
          <TabPanels className="mt-6 text-sm leading-relaxed">
            <TabPanel className="outline-none focus:ring-0">
              <h3 className="text-lg font-bold mb-2">Premium Construction Profile</h3>
              <p className="mb-4">Every variant belonging to the <strong className="capitalize">{category.slug}</strong> classification undergoes strict ergonomic review parameters before delivery protocols launch.</p>
              <div className="text-xl">{item.price}</div>
            </TabPanel>
            
            <TabPanel className="outline-none focus:ring-0">
              <h3 className="text-lg font-bold mb-3">Technical Specifications Matrix</h3>
              <ul className="space-y-2">
                {item.features.map((feat, index) => (
                  <li key={index} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-100">
                    <span className="text-blue-500 font-bold">✓</span> {feat}
                  </li>
                ))}
              </ul>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </section>

    </main>
  );
}
