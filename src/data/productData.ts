// src/data/productsData.ts

export type SubProduct = {
  slug: string;
  name: string;
  videoUrl: string;
  description: string;
  price: string;
  features: string[];
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  items: SubProduct[];
};

export const productCategories: Category[] = [
  {
    slug: 'chair',
    name: 'Chairs',
    description: 'Ergonomic seating arrangements built for pure stability and physical longevity.',
    items: [
      {
        slug: 'ergonomic-office',
        name: 'ErgoPro Task Chair',
        videoUrl: '/vids/ecomm.mp4',
        description: 'Advanced lumbar support with highly adjustable synchronized tilt controls.',
        price: '₦120,000',
        features: ['3D Adjustable Armrests', 'Breathable Mesh Back', 'Aluminum Base']
      },
      {
        slug: 'gaming-apex',
        name: 'Apex Neon Gaming Throne',
        videoUrl: '/vids/ecomm.mp4',
        description: 'Full-recline high density molded memory foam matrix optimized for long sessions.',
        price: '₦145,000',
        features: ['180° Recline System', 'RGB Edge Lighting', '4D Arm Support']
      }
    ]
  },
  {
    slug: 'table',
    name: 'Tables',
    description: 'Precision engineered modern desks engineered to transform workspace output.',
    items: [
      {
        slug: 'motorized-standing',
        name: 'OmniDesk Dual Motor',
        videoUrl: '/vids/ecomm.mp4',
        description: 'Programmable electronic height intervals backed by automatic anti-collision sensors.',
        price: '₦210,000',
        features: ['Dual Motor System', '4 Height Presets', 'Cable Management Tray']
      },
      {
        slug: 'solid-oak-board',
        name: 'Heritage Executive Table',
        videoUrl: '/vids/ecomm.mp4',
        description: 'Premium sustainably sourced solid wood engineering built to make statements.',
        price: '₦350,000',
        features: ['Solid European Oak', 'Integrated Power Grommets', 'Hand-Oiled Finish']
      }
    ]
  }
];
