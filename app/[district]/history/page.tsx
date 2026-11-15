import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import {
  districtFromSlug,
  FARIDABAD_ID,
  NON_FARIDABAD_SLUGS,
  slugFor,
} from '@/lib/district-slug';
import HistoryTable from '@/components/HistoryTable';
import { SITE_URL } from '@/lib/dhbvn-config';

export const dynamicParams = false;

interface RouteParams {
  params: Promise<{ district: string }>;
}

export function generateStaticParams() {
  return [...NON_FARIDABAD_SLUGS, 'faridabad'].map((district) => ({ district }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { district: slug } = await params;
  const district = districtFromSlug(slug);
  if (!district || district.id === FARIDABAD_ID) return {};
  const canonical = `${SITE_URL}/${slugFor(district.name)}/history`;
  const title = `${district.name} Outage History — DHBVN Power Cuts`;
  const description = `Historical power outage records for ${district.name} district — affected feeders, reasons, and restoration times collected from DHBVN.`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: `Historical power outage records for ${district.name}, Haryana.`,
    },
  };
}

export default async function HistoryRoute({ params }: RouteParams) {
  const { district: slug } = await params;
  const district = districtFromSlug(slug);

  if (!district) notFound();
  if (district.id === FARIDABAD_ID) redirect('/history');

  return <HistoryTable districtId={district.id} districtName={district.name} />;
}
