export interface DirectoryConfig {
  nicheSlug: string;
  nicheDisplay: string;
  schemaType: 'LocalBusiness' | 'ApartmentComplex' | 'Hotel' | 'EducationalOrganization' | 'MedicalOrganization';
  priceSuffix: string;
}

const directoryRules: Array<{ pattern: RegExp; config: DirectoryConfig }> = [
  {
    pattern: /^guesthouse-/,
    config: {
      nicheSlug: 'guesthouse',
      nicheDisplay: 'Guesthouses',
      schemaType: 'LocalBusiness',
      priceSuffix: '/night'
    }
  },
  {
    pattern: /^hotel-/,
    config: {
      nicheSlug: 'hotel',
      nicheDisplay: 'Hotels',
      schemaType: 'Hotel',
      priceSuffix: '/night'
    }
  },
  {
    pattern: /^apartment-/,
    config: {
      nicheSlug: 'apartment',
      nicheDisplay: 'Apartments',
      schemaType: 'ApartmentComplex',
      priceSuffix: '/month'
    }
  },
  {
    pattern: /^school-/,
    config: {
      nicheSlug: 'school',
      nicheDisplay: 'Schools',
      schemaType: 'EducationalOrganization',
      priceSuffix: '/term'
    }
  },
  {
    pattern: /^health-/,
    config: {
      nicheSlug: 'health',
      nicheDisplay: 'Health Facilities',
      schemaType: 'MedicalOrganization',
      priceSuffix: ''
    }
  },
  {
    pattern: /.*/,
    config: {
      nicheSlug: 'listing',
      nicheDisplay: 'Listings',
      schemaType: 'LocalBusiness',
      priceSuffix: ''
    }
  }
];

export function getDirectoryConfig(directory: string): DirectoryConfig {
  const rule = directoryRules.find(r => r.pattern.test(directory));
  return rule!.config;
}