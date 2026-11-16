import type { Metadata } from 'next';
import DistrictPage from '@/components/DistrictPage';
import { SITE_URL } from '@/lib/dhbvn-config';
import { districtFromId, FARIDABAD_ID } from '@/lib/district-slug';

export const metadata: Metadata = {
  title: 'DHBVN Power Outage Tracker — Live Haryana Power Cut Status',
  description:
    'Track live DHBVN power outages across Haryana: real-time feeder status, affected areas, and restoration times in Faridabad, Gurugram, Hisar & all districts.',
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/`,
    title: 'DHBVN Power Outage Tracker — Live Haryana Power Cut Status',
    description:
      'Track live DHBVN power outages across Haryana: real-time feeder status, affected areas, and restoration times in Faridabad, Gurugram, Hisar & all districts.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DHBVN Power Outage Tracker — Live Haryana Power Cut Status',
    description: 'Real-time DHBVN power outage tracker for Haryana: live feeder status, affected areas, and restoration times.',
  },
};

export default function Home() {
  const district = districtFromId(FARIDABAD_ID)!;
  return <DistrictPage district={district} />;
}
