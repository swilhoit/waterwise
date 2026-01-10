// Chat Content Catalog for Chatwoot Rich Messages
// Maps products, solutions, and articles to images and URLs for the chatbot

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://greywater-website.vercel.app';

// Use Shopify CDN for reliable product images
const SHOPIFY_CDN = 'https://cdn.shopify.com/s/files/1/0637/5561/6462/files';

export interface ProductCard {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  url: string;
  keywords: string[];
}

export interface SolutionCard {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
  keywords: string[];
}

export interface ArticleCard {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
  keywords: string[];
}

// Product catalog with images and links
export const products: ProductCard[] = [
  {
    id: 'gwdd-gravity',
    name: 'Aqua2use GWDD (Gravity)',
    description: 'Entry-level greywater system for single-story homes. No pump needed, 4-stage filtration.',
    price: '$625',
    image: `${SHOPIFY_CDN}/gwdd-gravity.jpg`,
    url: `${BASE_URL}/products/aqua2use`,
    keywords: ['gravity', 'basic', 'affordable', 'entry', 'no pump', 'single story', 'basement', '625', 'cheapest', 'budget']
  },
  {
    id: 'gwdd-pump',
    name: 'Aqua2use GWDD (Pump)',
    description: 'Greywater system with integrated pump for multi-story homes or uphill installations.',
    price: '$945',
    image: `${SHOPIFY_CDN}/gwdd-pump.jpg`,
    url: `${BASE_URL}/products/aqua2use`,
    keywords: ['with pump', 'uphill', 'multi-story', 'two story', '945', 'powered', 'pump model']
  },
  {
    id: 'pro',
    name: 'Aqua2use Pro',
    description: 'Premium high-capacity system for 3+ fixtures. Ideal for large families or commercial use.',
    price: '$2,695',
    image: `${SHOPIFY_CDN}/gwdd-ug.jpg`,
    url: `${BASE_URL}/products/aqua2use`,
    keywords: ['pro', 'premium', 'large', 'commercial', 'multiple fixtures', 'whole house', '2695', 'big family', 'high capacity']
  },
  {
    id: 'filters',
    name: 'Replacement Filters',
    description: '4-stage progressive filtration filters. Tool-free replacement, reusable up to 3 years.',
    price: 'From $249',
    image: `${SHOPIFY_CDN}/Aqua2use-GWDD-components.jpg`,
    url: `${BASE_URL}/products/replacement-filters`,
    keywords: ['filter', 'replacement filter', 'maintenance', 'parts', 'spare', 'new filter']
  },
  {
    id: 'pump-kit',
    name: 'Replacement Pump Kit',
    description: 'OEM replacement pump with electronic controller and dry run protection.',
    price: 'From $399',
    image: `${SHOPIFY_CDN}/Product-ug-gwdd-4inch.jpg`,
    url: `${BASE_URL}/products/replacement-pumps`,
    keywords: ['replacement pump', 'new pump', 'motor', 'not working', 'repair', 'broken pump']
  },
  {
    id: 'aqua2use-main',
    name: 'Aqua2use Greywater Systems',
    description: 'Complete greywater recycling systems starting at $599. Save up to 40,000 gallons/year.',
    price: 'From $599',
    image: `${SHOPIFY_CDN}/gwdd-gravity.jpg`,
    url: `${BASE_URL}/products/aqua2use`,
    keywords: ['aqua2use', 'greywater system', 'greywater', 'grey water', 'system', 'product', 'buy', 'price', 'cost', 'how much']
  }
];

// Solution pages with images
export const solutions: SolutionCard[] = [
  {
    id: 'homes',
    name: 'Greywater for Homes',
    description: 'Save up to 40,000 gallons annually with a home greywater system.',
    image: `${BASE_URL}/images/solutions/homes.jpg`,
    url: `${BASE_URL}/solutions/homes`,
    keywords: ['home', 'house', 'residential', 'family', 'single family', 'homeowner']
  },
  {
    id: 'tiny-homes',
    name: 'Tiny Home Solutions',
    description: 'Compact greywater solutions designed for tiny living and minimal footprints.',
    image: `${BASE_URL}/images/solutions/tiny-homes.jpg`,
    url: `${BASE_URL}/solutions/tiny-homes`,
    keywords: ['tiny home', 'tiny house', 'small home', 'compact', 'small space', 'adu']
  },
  {
    id: 'rvs',
    name: 'RV & Camper Systems',
    description: 'Mobile greywater solutions for RV owners and full-time travelers.',
    image: `${BASE_URL}/images/solutions/rvs.jpg`,
    url: `${BASE_URL}/solutions/rvs`,
    keywords: ['rv', 'camper', 'trailer', 'motorhome', 'van', 'mobile home', 'travel trailer']
  },
  {
    id: 'cabins',
    name: 'Cabin & Off-Grid',
    description: 'Water independence for remote cabins and off-grid properties.',
    image: `${BASE_URL}/images/solutions/cabins.jpg`,
    url: `${BASE_URL}/solutions/cabins`,
    keywords: ['cabin', 'off-grid', 'off grid', 'remote', 'mountain', 'vacation home', 'well water']
  },
  {
    id: 'commercial',
    name: 'Commercial Systems',
    description: 'High-capacity greywater solutions for businesses and commercial buildings.',
    image: `${BASE_URL}/images/solutions/commercial.jpg`,
    url: `${BASE_URL}/solutions/commercial`,
    keywords: ['commercial', 'business', 'building', 'office', 'restaurant', 'hotel', 'gym']
  }
];

// Educational articles and pages
export const articles: ArticleCard[] = [
  {
    id: 'what-is-greywater',
    name: 'What is Greywater?',
    description: 'Learn the basics of greywater, sources, and how it differs from blackwater.',
    image: `${BASE_URL}/images/water-reuse.jpg`,
    url: `${BASE_URL}/what-is-greywater`,
    keywords: ['what is', 'definition', 'explain', 'greywater', 'grey water', 'basics', 'learn']
  },
  {
    id: 'how-it-works',
    name: 'How Greywater Systems Work',
    description: 'Understand the filtration process and how greywater gets from fixtures to your garden.',
    image: `${BASE_URL}/images/technical/gwdd-how-it-works.jpg`,
    url: `${BASE_URL}/how-it-works`,
    keywords: ['how', 'works', 'process', 'filtration', 'system', 'diagram']
  },
  {
    id: 'greywater-laws',
    name: 'Greywater Laws by State',
    description: 'Check regulations and permit requirements for greywater systems in your state.',
    image: `${BASE_URL}/images/architect.png`,
    url: `${BASE_URL}/greywater-laws`,
    keywords: ['law', 'legal', 'permit', 'regulation', 'code', 'state', 'allowed', 'rules']
  },
  {
    id: 'customer-stories',
    name: 'Customer Success Stories',
    description: 'Real stories from homeowners saving water with Aqua2use systems.',
    image: `${BASE_URL}/images/customer-stories/california-family.jpg`,
    url: `${BASE_URL}/customer-stories`,
    keywords: ['story', 'stories', 'review', 'testimonial', 'customer', 'experience', 'case study']
  },
  {
    id: 'blog',
    name: 'Greywater Education Blog',
    description: 'Tips, guides, and news about water conservation and greywater systems.',
    image: `${BASE_URL}/images/cabin-greywater.jpg`,
    url: `${BASE_URL}/blog`,
    keywords: ['blog', 'article', 'guide', 'tips', 'news', 'education', 'learn more']
  }
];

// Detect relevant content based on message keywords
export function detectRelevantContent(message: string): {
  products: ProductCard[];
  solutions: SolutionCard[];
  articles: ArticleCard[];
} {
  const messageLower = message.toLowerCase();

  const matchedProducts = products.filter(p =>
    p.keywords.some(k => messageLower.includes(k))
  );

  const matchedSolutions = solutions.filter(s =>
    s.keywords.some(k => messageLower.includes(k))
  );

  const matchedArticles = articles.filter(a =>
    a.keywords.some(k => messageLower.includes(k))
  );

  return {
    products: matchedProducts.slice(0, 2), // Limit to 2 products
    solutions: matchedSolutions.slice(0, 1), // Limit to 1 solution
    articles: matchedArticles.slice(0, 1) // Limit to 1 article
  };
}

// Get product recommendations based on context
export function getProductRecommendations(context: string): ProductCard[] {
  const contextLower = context.toLowerCase();

  // Price-sensitive queries
  if (contextLower.includes('cheap') || contextLower.includes('affordable') || contextLower.includes('budget')) {
    return [products.find(p => p.id === 'gwdd-gravity')!];
  }

  // Multi-story or uphill
  if (contextLower.includes('uphill') || contextLower.includes('two story') || contextLower.includes('multi-story')) {
    return [products.find(p => p.id === 'gwdd-pump')!];
  }

  // Large family or commercial
  if (contextLower.includes('large') || contextLower.includes('commercial') || contextLower.includes('multiple')) {
    return [products.find(p => p.id === 'pro')!];
  }

  // Maintenance queries
  if (contextLower.includes('filter') || contextLower.includes('maintenance') || contextLower.includes('replace')) {
    return [products.find(p => p.id === 'filters')!];
  }

  // Default: show gravity model as starter
  return [products.find(p => p.id === 'gwdd-gravity')!];
}

// Format content for Chatwoot cards message
export function formatAsCards(
  items: (ProductCard | SolutionCard | ArticleCard)[]
): Array<{
  title: string;
  description: string;
  media_url?: string;
  actions: Array<{ type: string; text: string; uri: string }>;
}> {
  return items.map(item => ({
    title: 'price' in item ? `${item.name} - ${(item as ProductCard).price}` : item.name,
    description: item.description,
    media_url: item.image,
    actions: [
      {
        type: 'link',
        text: 'price' in item ? 'View Product' : 'Learn More',
        uri: item.url
      }
    ]
  }));
}
