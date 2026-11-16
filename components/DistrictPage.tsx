import OutageDashboardLoader from '@/components/OutageDashboardLoader';
import { SITE_URL } from '@/lib/dhbvn-config';
import { District, FARIDABAD_ID, slugFor } from '@/lib/district-slug';

interface DistrictPageProps {
  district: District;
}

export default function DistrictPage({ district }: DistrictPageProps) {
  const isFaridabad = district.id === FARIDABAD_ID;
  const canonical = isFaridabad ? `${SITE_URL}/` : `${SITE_URL}/${slugFor(district.name)}`;

  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `${district.name} Power Outage Live Feed`,
    description: `Active feeder outages in ${district.name}, Haryana — affected areas, start times, and expected restoration. Sourced from DHBVN, refreshed every 5 minutes.`,
    keywords: `${district.name} power outage, ${district.name} electricity outage, power cut ${district.name}, DHBVN ${district.name}`,
    temporal: 'Real-time, updated every 5 minutes',
    spatialCoverage: `${district.name}, Haryana, India`,
    url: canonical,
    creator: {
      '@type': 'Organization',
      name: 'DHBVN Outage Tracker',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'DHBVN Outage Tracker',
      url: SITE_URL,
    },
    license: 'https://creativecommons.org/publicdomain/zero/1.0/',
    isAccessibleForFree: true,
    distribution: [
      {
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: `${SITE_URL}/api/dhbvn?district=${district.id}`,
      },
    ],
  };

  const breadcrumbItems = isFaridabad
    ? [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` }]
    : [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: district.name, item: canonical },
      ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How do I check live power cut status in ${district.name} today?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `You can check live power cuts, affected areas, and feeder restoration times in ${district.name} on this dashboard. Data updates directly from DHBVN operational logs every 5 minutes.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the DHBVN power cut complaint number for ${district.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `For ${district.name}, you can register an electricity complaint with DHBVN 24x7 toll-free at 1912 or 1800-180-4334, or send an SMS with your 10-digit account ID to 9212340005.`,
        },
      },
      {
        '@type': 'Question',
        name: `Why is the restoration time blank or not specified for my area in ${district.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `In DHBVN distribution, unscheduled tripping caused by cable faults, transformer breakdowns, or weather events requires physical line patrolling. Operators leave the estimated time blank until linemen locate and resolve the fault.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <OutageDashboardLoader initialDistrictId={String(district.id)} />
    </>
  );
}
