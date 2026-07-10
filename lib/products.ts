export type ProductCategory = 'Laptops' | 'Accessories' | 'Displays' | 'Audio' | 'Gaming' | 'Storage';

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  stock: number;
  rating: number;
  image: string;
  featured: boolean;
  description: string;
  specs: string[];
};

export const products: Product[] = [
  {
    id: 'prod-1',
    slug: 'macbook-air-m4',
    name: 'MacBook Air M4',
    brand: 'Apple',
    category: 'Laptops',
    price: 1199,
    stock: 14,
    rating: 4.9,
    image:
      'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_151086780?x=3240&y=3240&format=webp&quality=60&sp=yes&strip=yes&trim=yes&ex=3240&ey=3240&align=center&resizesource&unsharp=0.5x0.5',
    featured: true,
    description: 'A silent, lightweight laptop for students, creators, and business users who need all-day battery life.',
    specs: ['Apple M4 chip', '13.6-inch Liquid Retina display', '16GB unified memory', '512GB SSD'],
  },
  {
    id: 'prod-2',
    slug: 'asus-rog-strix-g16',
    name: 'ASUS ROG Strix G16',
    brand: 'ASUS',
    category: 'Gaming',
    price: 1799,
    stock: 7,
    rating: 4.8,
    image:
      'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_172742869?x=697&y=523&format=webp&quality=60&sp=yes&strip=yes&trim=yes&ex=697&ey=523&align=center&resizesource&unsharp=0.5x0.5',
    featured: true,
    description: 'High-refresh gaming laptop tuned for esports, streaming, and demanding creative software.',
    specs: ['Intel Core Ultra 9', 'NVIDIA RTX 4070', '16-inch 240Hz display', 'RGB keyboard'],
  },
  {
    id: 'prod-3',
    slug: 'dell-xps-13',
    name: 'Dell XPS 13',
    brand: 'Dell',
    category: 'Laptops',
    price: 1099,
    stock: 11,
    rating: 4.7,
    image:
      'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_175880172?x=697&y=523&format=webp&quality=60&sp=yes&strip=yes&trim=yes&ex=697&ey=523&align=center&resizesource&unsharp=0.5x0.5',
    featured: false,
    description: 'Premium ultrabook with a compact build, sharp display, and reliable performance for daily work.',
    specs: ['13.4-inch InfinityEdge display', 'Intel Core Ultra 7', '1.19kg chassis', 'Wi-Fi 7'],
  },
  {
    id: 'prod-4',
    slug: 'logitech-g-pro-x-keyboard',
    name: 'Logitech G Pro X Keyboard',
    brand: 'Logitech',
    category: 'Accessories',
    price: 149,
    stock: 26,
    rating: 4.6,
    image:
      'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_138299844?x=697&y=523&format=webp&quality=60&sp=yes&strip=yes&trim=yes&ex=697&ey=523&align=center&resizesource&unsharp=0.5x0.5',
    featured: false,
    description: 'Tournament-ready mechanical keyboard with hot-swappable switches and compact TKL layout.',
    specs: ['GX mechanical switches', 'Tenkeyless design', 'LIGHTSYNC RGB', 'Detachable cable'],
  },
  {
    id: 'prod-5',
    slug: 'logitech-mx-master-3s',
    name: 'Logitech MX Master 3S',
    brand: 'Logitech',
    category: 'Accessories',
    price: 99,
    stock: 33,
    rating: 4.9,
    image:
      'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_164205872?x=697&y=523&format=webp&quality=60&sp=yes&strip=yes&trim=yes&ex=697&ey=523&align=center&resizesource&unsharp=0.5x0.5',
    featured: true,
    description: 'Quiet, ergonomic productivity mouse with precise tracking and multi-device workflow controls.',
    specs: ['8K DPI sensor', 'MagSpeed wheel', 'USB-C charging', 'Multi-device pairing'],
  },
  {
    id: 'prod-6',
    slug: 'razer-deathadder-v3',
    name: 'Razer DeathAdder V3',
    brand: 'Razer',
    category: 'Gaming',
    price: 69,
    stock: 41,
    rating: 4.5,
    image: 'https://circuitzone.com/wp-content/uploads/2025/11/Razer-DeathAdder-V3-2.png',
    featured: false,
    description: 'Lightweight gaming mouse built around a classic ergonomic shape for fast competitive aim.',
    specs: ['Focus Pro sensor', '59g lightweight body', '8000Hz polling support', 'Optical switches'],
  },
  {
    id: 'prod-7',
    slug: 'samsung-odyssey-g5',
    name: 'Samsung Odyssey G5',
    brand: 'Samsung',
    category: 'Displays',
    price: 329,
    stock: 18,
    rating: 4.6,
    image:
      'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_136420559?x=697&y=523&format=webp&quality=60&sp=yes&strip=yes&trim=yes&ex=697&ey=523&align=center&resizesource&unsharp=0.5x0.5',
    featured: false,
    description: 'Curved gaming monitor with smooth motion and immersive contrast for PC and console setups.',
    specs: ['27-inch QHD panel', '165Hz refresh rate', '1ms response', '1000R curve'],
  },
  {
    id: 'prod-8',
    slug: 'sony-wh-1000xm6',
    name: 'Sony WH-1000XM6',
    brand: 'Sony',
    category: 'Audio',
    price: 399,
    stock: 12,
    rating: 4.8,
    image:
      'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_154654210?x=697&y=523&format=webp&quality=60&sp=yes&strip=yes&trim=yes&ex=697&ey=523&align=center&resizesource&unsharp=0.5x0.5',
    featured: true,
    description: 'Flagship wireless headphones with adaptive noise cancellation and rich travel-ready sound.',
    specs: ['Adaptive ANC', '30-hour battery', 'Multipoint Bluetooth', 'Hi-Res audio support'],
  },
  {
    id: 'prod-9',
    slug: 'samsung-990-pro-ssd',
    name: 'Samsung 990 Pro SSD',
    brand: 'Samsung',
    category: 'Storage',
    price: 159,
    stock: 38,
    rating: 4.9,
    image: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_154428079?x=697&y=523&format=webp&quality=60&sp=yes&strip=yes&trim=yes&ex=697&ey=523&align=center&resizesource&unsharp=0.5x0.5',
    featured: false,
    description: 'Fast NVMe storage upgrade for gaming PCs, laptops, and creator workstations.',
    specs: ['PCIe 4.0 NVMe', 'Up to 7450 MB/s read', '2TB capacity option', 'Thermal control'],
  },
  {
    id: 'prod-10',
    slug: 'playstation-5',
    name: 'PlayStation 5',
    brand: 'Sony',
    category: 'Gaming',
    price: 499,
    stock: 9,
    rating: 4.9,
    image:
      'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_161329302?x=697&y=523&format=webp&quality=60&sp=yes&strip=yes&trim=yes&ex=697&ey=523&align=center&resizesource&unsharp=0.5x0.5',
    featured: true,
    description: 'Next-generation console with fast loading, DualSense feedback, and a large game library.',
    specs: ['825GB SSD', '4K gaming', 'DualSense controller', 'Ray tracing support'],
  },
];

export const categories = Array.from(new Set(products.map((product) => product.category)));

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
