
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { marked } from 'marked';

if (!getApps().length) {
  const serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 || '', 'base64').toString('utf-8')
  );
  initializeApp({
    credential: cert(serviceAccount)
  });
}

const db = getFirestore();

export interface Photo {
  src: string;
  alt: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Blog {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  bodyHtml?: string;
  lastModified: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface GuesthouseSpecific {
  rooms: number;
  checkIn: string;
  checkOut: string;
  amenities: string[];
}

export interface HotelSpecific {
  rooms: number;
  starRating: number;
  checkIn: string;
  checkOut: string;
  amenities: string[];
}

export interface ApartmentSpecific {
  apartmentType: string;
  monthlyRent: number;
  deposit: number;
  furnished: boolean;
  unitsAvailable: number;
  amenities: string[];
}

export interface SchoolSpecific {
  schoolType: string;
  curriculum: string;
  studentCount: number;
  feesPerTerm: number;
  boarding: boolean;
  daySchool: boolean;
  facilities: string[];
}

export interface HealthSpecific {
  facilityType: string;
  services: string[];
  doctorCount: number;
  visitingHours: string;
  emergency: boolean;
  insuranceAccepted: string;
}

export type NicheSpecific = 
  | GuesthouseSpecific 
  | HotelSpecific 
  | ApartmentSpecific 
  | SchoolSpecific 
  | HealthSpecific;

export interface Listing {
  id: string;
  name: string;
  slug: string;
  priceNumeric: number;
  summary: string;
  thumbnail: string;
  thumbnailAlt: string;
  thumbnailStatus: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappMessage: string;
  directions: string;
  coordinates: Coordinates;
  faqs: Faq[];
  blog: Blog;
  nicheSpecific: NicheSpecific;
  lastEditedAt: string;
}

export interface DirectoryData {
  directory: string;
  nicheSlug: string;
  nicheDisplay: string;
  location: string;
  locationDisplay: string;
  locationDescription: string;
  heroImage: string;
  heroImageAlt: string;
  heroImageStatus: string;
  status: string;
  categoryTag?: string;
  lastModified: string;
  lastEditedAt: string;
  listings: Listing[];
  globalFaqs: Faq[];
}

export interface BusinessData {
  name: string;
  tagline?: string;
  description: string;
  phone?: string;
  phoneDisplay?: string;
  whatsapp?: string;
  whatsappMessage?: string;
  services?: string[];
  directions?: string;
  coordinates?: Coordinates;
  heroImage?: string;
  heroImageAlt?: string;
  blog?: {
    title: string;
    body: string;
    bodyHtml?: string;
    lastModified: string;
  };
  status: string;
  lastEditedAt: string;
}

function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+\s*=\s*"[^"]*"/gi, '')
    .replace(/on\w+\s*=\s*'[^']*'/gi, '');
}

function validateListing(listing: any, directorySlug: string): Listing | null {
  try {
    if (!listing.id || !listing.name || !listing.slug || typeof listing.priceNumeric !== 'number') {
      console.warn(`Skipping malformed listing in ${directorySlug}: missing required fields`);
      return null;
    }
    return listing as Listing;
  } catch (error) {
    console.warn(`Skipping malformed listing in ${directorySlug}: ${error}`);
    return null;
  }
}

export async function getDirectoryData(directory: string): Promise<DirectoryData | null> {
  try {
    const doc = await db.collection('directories').doc(directory).get();
    if (!doc.exists) return null;
    
    const data = doc.data() as DirectoryData;
    
    if (data.status !== 'published') return null;
    
    if (!data.listings || !Array.isArray(data.listings)) {
      data.listings = [];
    }
    
    data.listings = data.listings
      .map(listing => validateListing(listing, directory))
      .filter((listing): listing is Listing => listing !== null);
    
    if (data.listings.length === 0) return null;
    
    for (const listing of data.listings) {
      if (listing.blog && listing.blog.body) {
        const rawHtml = marked.parse(listing.blog.body) as string;
        listing.blog.bodyHtml = sanitizeHtml(rawHtml);
      }
    }
    
    if (!data.globalFaqs || !Array.isArray(data.globalFaqs)) {
      data.globalFaqs = [];
    }
    
    return data;
  } catch (error) {
    console.error(`Failed to fetch directory ${directory}: ${error}`);
    return null;
  }
}

export async function getAllDirectorySlugs(): Promise<string[]> {
  try {
    const snapshot = await db.collection('directories')
      .where('status', '==', 'published')
      .select('directory')
      .get();
    
    return snapshot.docs.map(doc => doc.id);
  } catch (error) {
    console.error('Failed to fetch directory slugs:', error);
    return [];
  }
}

export function formatPrice(numeric: number, suffix: string): string {
  const formatted = numeric.toLocaleString('en-KE');
  if (!suffix) return `KSh ${formatted}`;
  return `KSh ${formatted}${suffix}`;
}

// Business page functions
export async function getAllBusinessSlugs(): Promise<string[]> {
  try {
    const snapshot = await db.collection('businesses')
      .where('status', '==', 'published')
      .select('name')
      .get();
    return snapshot.docs.map(doc => doc.id);
  } catch (error) {
    console.error('Failed to fetch business slugs:', error);
    return [];
  }
}

export async function getBusinessData(business: string): Promise<BusinessData | null> {
  try {
    const doc = await db.collection('businesses').doc(business).get();
    if (!doc.exists) return null;
    const data = doc.data() as BusinessData;
    if (data.status !== 'published') return null;
    
    if (data.blog?.body) {
      const rawHtml = marked.parse(data.blog.body) as string;
      data.blog.bodyHtml = sanitizeHtml(rawHtml);
    }
    
    return data;
  } catch (error) {
    console.error(`Failed to fetch business ${business}: ${error}`);
    return null;
  }
}