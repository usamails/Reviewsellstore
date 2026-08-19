import React, { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  robots?: string;
  ogType?: string;
  ogImage?: string;
  schemaJson?: Record<string, any> | Record<string, any>[];
  breadcrumbs?: { name: string; item: string }[];
}

const SITE_URL = 'https://reviewsellstore.com';
const DEFAULT_IMAGE = 'https://reviewsellstore.com/apple-touch-icon.png';

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords = 'buy verified paypal account, buy google reviews, buy trustpilot reviews, buy gmail accounts, google voice numbers',
  canonical,
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  schemaJson,
  breadcrumbs
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // Helper to update or create meta tag by name or property
    const updateMeta = (selector: string, content: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          const name = selector.match(/name=["']([^"']+)["']/)?.[1];
          if (name) element.setAttribute('name', name);
        } else if (selector.startsWith('meta[property=')) {
          const property = selector.match(/property=["']([^"']+)["']/)?.[1];
          if (property) element.setAttribute('property', property);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to update or create link tag
    const updateLink = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Meta Description, Keywords & Robots
    updateMeta('meta[name="description"]', description);
    updateMeta('meta[name="keywords"]', keywords);
    updateMeta('meta[name="robots"]', robots);

    // 3. Normalized Canonical URL
    let formattedCanonical = SITE_URL;
    if (canonical) {
      if (canonical.startsWith('http')) {
        formattedCanonical = canonical;
      } else {
        const cleanPath = canonical.startsWith('/') ? canonical : `/${canonical}`;
        formattedCanonical = cleanPath === '/' ? SITE_URL : `${SITE_URL}${cleanPath}`;
      }
    } else if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      formattedCanonical = pathname === '/' ? SITE_URL : `${SITE_URL}${pathname}`;
    }
    // Remove trailing slash if present (except root)
    if (formattedCanonical.length > SITE_URL.length && formattedCanonical.endsWith('/')) {
      formattedCanonical = formattedCanonical.slice(0, -1);
    }
    updateLink('canonical', formattedCanonical);

    // 4. OpenGraph Meta Tags
    updateMeta('meta[property="og:title"]', title);
    updateMeta('meta[property="og:description"]', description);
    updateMeta('meta[property="og:url"]', formattedCanonical);
    updateMeta('meta[property="og:type"]', ogType);
    updateMeta('meta[property="og:site_name"]', 'ReviewSellStore');
    updateMeta('meta[property="og:image"]', ogImage);

    // 5. Twitter Meta Tags
    updateMeta('meta[name="twitter:card"]', 'summary_large_image');
    updateMeta('meta[name="twitter:title"]', title);
    updateMeta('meta[name="twitter:description"]', description);
    updateMeta('meta[name="twitter:image"]', ogImage);

    // 6. JSON-LD Schema
    let schemaElement = document.getElementById('dynamic-seo-schema') as HTMLScriptElement;
    if (!schemaElement) {
      schemaElement = document.createElement('script');
      schemaElement.id = 'dynamic-seo-schema';
      schemaElement.type = 'application/ld+json';
      document.head.appendChild(schemaElement);
    }

    if (schemaJson) {
      schemaElement.textContent = JSON.stringify(schemaJson, null, 2);
    } else {
      // Default Organization + WebSite + Breadcrumbs Schema
      const schemaGraph: any[] = [
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'ReviewSellStore',
          url: SITE_URL,
          logo: `${SITE_URL}/apple-touch-icon.png`,
          image: `${SITE_URL}/apple-touch-icon.png`,
          description: 'Premier Digital Services Marketplace for Verified PayPal, Google Reviews, Trustpilot Reviews, Gmail, Google Voice & Aged GitHub accounts.',
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            availableLanguage: ['English'],
            url: `${SITE_URL}/contact`,
            telephone: '+1-307-393-9979'
          }
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: 'ReviewSellStore',
          description: 'Buy Verified Digital Services & Reputation Solutions with Instant Crypto Checkout.',
          publisher: { '@id': `${SITE_URL}/#organization` },
          potentialAction: {
            '@type': 'SearchAction',
            target: `${SITE_URL}/services?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
          }
        }
      ];

      if (breadcrumbs && breadcrumbs.length > 0) {
        schemaGraph.push({
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((b, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: b.name,
            item: b.item.startsWith('http') ? b.item : `${SITE_URL}${b.item}`
          }))
        });
      }

      schemaElement.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': schemaGraph
      }, null, 2);
    }
  }, [title, description, keywords, canonical, robots, ogType, ogImage, schemaJson, breadcrumbs]);

  return null;
};
