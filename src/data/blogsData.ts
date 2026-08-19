import { BlogPost } from '../types';
import { BLOGS_PART_1 } from './blogsPart1';
import { BLOGS_PART_2 } from './blogsPart2';
import { BLOGS_PART_3 } from './blogsPart3';
import { BLOGS_PART_4 } from './blogsPart4';

export const ALL_BLOG_POSTS: BlogPost[] = [
  ...BLOGS_PART_1,
  ...BLOGS_PART_2,
  ...BLOGS_PART_3,
  ...BLOGS_PART_4,
];

export const BLOG_CATEGORIES = [
  { id: 'all', name: 'All Articles' },
  { id: 'Merchant Accounts', name: 'Merchant & Payment Gateways' },
  { id: 'PVA & Email', name: 'PVA & Email Deliverability' },
  { id: 'Google Reviews', name: 'Google Maps & Local Guide Reviews' },
  { id: 'Trustpilot & Reputation', name: 'Trustpilot & Brand Reputation' },
  { id: 'Virtual Phone Lines', name: 'Virtual Phone Lines & 2FA' },
  { id: 'Developer & Web3', name: 'Developer & Web3 Growth' },
  { id: 'E-Commerce Growth', name: 'E-Commerce Security & Scaling' },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return ALL_BLOG_POSTS.find(post => post.slug === slug);
}

export function getRelatedBlogPosts(currentSlug: string, category?: string, limit: number = 3): BlogPost[] {
  return ALL_BLOG_POSTS
    .filter(post => post.slug !== currentSlug && (!category || post.category === category))
    .slice(0, limit);
}

export function getFeaturedBlogPost(): BlogPost {
  return ALL_BLOG_POSTS[0]; // First high-converting post
}
