'use client'

export function StructuredData() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'RKS, Advocate - LawUp™',
    description: 'Premier law firm providing expert legal services in Civil, Criminal, Corporate, Banking, GST, NCLT, Cyber Law, Real Estate, and more.',
    url: 'https://www.rks.ad',
    telephone: '+91-XXXXXXXXXX',
    email: 'iam@rks.ad',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'P. No- 43, 1st Floor, Shiv Kunj, opp. Bagdi Hospital, Joshi Marg Kalwar',
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      postalCode: '302012',
      addressCountry: 'IN',
    },
    foundingDate: '2018',
    areaServed: {
      '@type': 'Place',
      name: 'Jaipur, Rajasthan, India',
    },
    priceRange: '$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '250',
    },
    sameAs: [
      'https://linkedin.com/company/lawupin',
      'https://lawup.in',
    ],
    knowsAbout: [
      'Civil Law',
      'Criminal Law',
      'Corporate Law',
      'Banking and Finance Law',
      'GST Law',
      'NCLT',
      'Cyber Law',
      'Labour Law',
      'Real Estate Law',
      'RERA',
      'Consumer Rights',
      'Family Law',
      'Intellectual Property Law',
    ],
    member: {
      '@type': 'Organization',
      name: 'Bar Council of India',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}
