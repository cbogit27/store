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
      <header className="relative flex flex-col min-h-[1100px] lg:min-h-[800px] h-[80vh] sm:h-[60vh] w-full items-end justify-center overflow-hidden bg-gray-950 p-8">
        <ProductVideo 
        src={item.videoUrl} // or item.videoUrl depending on your loop
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />

        {/* Overlaid Context Breadcrumb & Content Info */}
        <div className="relative z-10 flex flex-col items-start justify-start mb-2 text-start max-w-4xl px-12">
          <nav className="mb-4 flex flex-wrap items-center justify-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-gray-200">
            <Link href="/products" className="transition hover:underline">Catalog</Link>
            <span>/</span>
            <Link href={`/products/${category.slug}`} className="transition hover:underline">{category.name}</Link>
          </nav>
          <h1 className="text-lg font-black leading-tight sm:text-xl lg:text-2xl">
            {item.name}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-200 sm:text-base lg:text-md">
            {item.description}
          </p>
        
            
        </div>
        <div className='relative z-10'>
                <ProductPurchasePanel product={item} />
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
