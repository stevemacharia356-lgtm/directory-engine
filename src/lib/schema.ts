import type { DirectoryData, Listing } from './firestore';
import { getDirectoryConfig } from './registry';

export function generateLocalBusinessSchema(listing: Listing, directory: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: listing.name,
    description: listing.summary,
    image: listing.thumbnail,
    priceRange: `KSh ${listing.priceNumeric}`,
    telephone: listing.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: directory.split('-').slice(1).join(' '),
      addressCountry: 'KE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: listing.coordinates.lat,
      longitude: listing.coordinates.lng
    }
  };
}

export function generateHotelSchema(listing: Listing, directory: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: listing.name,
    description: listing.summary,
    image: listing.thumbnail,
    priceRange: `KSh ${listing.priceNumeric}`,
    telephone: listing.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: directory.split('-').slice(1).join(' '),
      addressCountry: 'KE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: listing.coordinates.lat,
      longitude: listing.coordinates.lng
    }
  };
}

export function generateApartmentSchema(listing: Listing, directory: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ApartmentComplex',
    name: listing.name,
    description: listing.summary,
    image: listing.thumbnail,
    telephone: listing.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: directory.split('-').slice(1).join(' '),
      addressCountry: 'KE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: listing.coordinates.lat,
      longitude: listing.coordinates.lng
    }
  };
}

export function generateSchoolSchema(listing: Listing, directory: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: listing.name,
    description: listing.summary,
    image: listing.thumbnail,
    telephone: listing.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: directory.split('-').slice(1).join(' '),
      addressCountry: 'KE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: listing.coordinates.lat,
      longitude: listing.coordinates.lng
    }
  };
}

export function generateMedicalSchema(listing: Listing, directory: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: listing.name,
    description: listing.summary,
    image: listing.thumbnail,
    telephone: listing.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: directory.split('-').slice(1).join(' '),
      addressCountry: 'KE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: listing.coordinates.lat,
      longitude: listing.coordinates.lng
    }
  };
}

export function generateArticleSchema(listing: Listing, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: listing.blog?.title || listing.name,
    description: listing.blog?.excerpt || listing.summary,
    image: listing.thumbnail,
    dateModified: listing.blog?.lastModified || listing.lastEditedAt,
    author: {
      '@type': 'Organization',
      name: 'Kenya Accommodation Directory'
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url }
  };
}

export function generateFAQPageSchema(globalFaqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: globalFaqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function generateItemListSchema(data: DirectoryData, baseUrl: string) {
  const config = getDirectoryConfig(data.directory);
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: data.listings.map((listing, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': config.schemaType,
        name: listing.name,
        url: `${baseUrl}#${listing.slug}`
      }
    }))
  };
}