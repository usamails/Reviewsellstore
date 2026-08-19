export interface ProductVariant {
  id: string;
  name: string;
  quantity: number;
  price: number;
  unit?: string;
  isPopular?: boolean;
  savePercent?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  title: string;
  variant: string;
  price: number;
  unit: string;
  isPopular?: boolean;
  deliveryTime?: string;
  features?: string[];
  description?: string;
  longDescription?: string;
  seoTitle?: string;
  seoKeywords?: string[];
  useCases?: string[];
  variants?: ProductVariant[];
  faqs?: { question: string; answer: string }[];
  iconName?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
  popularItem?: string;
}

export interface CartItem {
  service: ServiceItem;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface CryptoAddress {
  id: string;
  name: string;
  symbol: string;
  network: string;
  address: string;
  badgeColor: string;
  isPopular?: boolean;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole?: string;
  publishedAt: string;
  date?: string;
  readTime: string;
  image: string;
  tags: string[];
  keywords?: string[];
  metaDescription?: string;
  relatedServiceSlug?: string;
  seoTitle?: string;
  seoKeywords?: string[];
}

