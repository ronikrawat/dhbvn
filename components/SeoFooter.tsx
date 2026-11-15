import Link from 'next/link';
import { DISTRICTS } from '@/lib/district';
import { routeForDistrictId } from '@/lib/district-slug';
import { Phone, ExternalLink, HelpCircle, MapPin, Zap } from 'lucide-react';

interface SeoFooterProps {
  currentDistrictName?: string;
}

export function SeoFooter({ currentDistrictName }: SeoFooterProps) {
  const faqs = [
    {
      question: 'How often is the DHBVN power cut status updated?',
      answer:
        'The tracker queries the official DHBVN operational outage feed every 5 minutes in real time. It displays active feeder outages, start times, reasons, and expected restoration windows.',
    },
    {
      question: 'How do I find out when electricity will be restored in my area?',
      answer:
        'Select your district from the dropdown or navigation, and use the search bar to enter your colony, sector, or substation feeder name. The expected restoration time is shown alongside each active outage.',
    },
    {
      question: 'What is the DHBVN toll-free electricity complaint number?',
      answer:
        'You can register an electricity complaint with DHBVN by calling their 24x7 toll-free helpline at 1912 or 1800-180-4334. You can also send an SMS or register via the official DHBVN portal.',
    },
    {
      question: 'What is the difference between scheduled maintenance and breakdown?',
      answer:
        'Scheduled outages are planned shutdowns announced in advance for tree trimming, transformer upgrades, or grid maintenance. Unscheduled breakdowns occur due to unexpected cable faults, tripping, weather damage, or equipment failure.',
    },
    {
      question: 'Which districts in Haryana are covered by DHBVN?',
      answer:
        'DHBVN (Dakshin Haryana Bijli Vitran Nigam) manages electricity distribution across southern and western Haryana districts, including Faridabad, Gurugram, Hisar, Rohtak, Bhiwani, Sirsa, Jind, Fatehabad, Rewari, Palwal, Nuh, and Charkhi Dadri.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="mt-16 pt-10 border-t border-neutral-800 text-neutral-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Helpline & Emergency Support ── */}
      <div className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-5 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-md bg-primary-500/10 text-primary-400 shrink-0 mt-0.5">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">
                DHBVN Electricity Helpline &amp; Complaints
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                For emergency power breakdown or billing grievances, contact official DHBVN support.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:1912"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-primary-500/20 hover:bg-primary-500/30 text-primary-300 border border-primary-500/40 text-xs font-semibold font-mono transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              Toll-Free: 1912
            </a>
            <a
              href="https://dhbvn.org.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition-colors"
            >
              DHBVN Portal
              <ExternalLink className="w-3 h-3 text-neutral-400" />
            </a>
          </div>
        </div>
      </div>

      {/* ── District Directory (Internal Link Graph for Crawlers) ── */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-4 h-4 text-primary-400" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
            Haryana District Power Outage Trackers
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {DISTRICTS.map((d) => {
            const route = routeForDistrictId(d.id);
            const isCurrent = currentDistrictName === d.name;
            return (
              <Link
                key={d.id}
                href={route}
                className={`px-3 py-2 rounded-md border text-xs transition-colors flex items-center justify-between ${
                  isCurrent
                    ? 'border-primary-500/60 bg-primary-500/10 text-primary-300 font-medium'
                    : 'border-neutral-800/80 bg-neutral-900/40 text-neutral-400 hover:text-foreground hover:border-neutral-700'
                }`}
              >
                <span>{d.name}</span>
                <Zap className="w-3 h-3 opacity-40" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Frequently Asked Questions (FAQ) ── */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-4 h-4 text-primary-400" />
          <h2 className="text-base font-semibold text-foreground">
            Frequently Asked Questions — DHBVN Power Cuts
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-lg border border-neutral-800/80 bg-neutral-900/30 p-4"
            >
              <h3 className="text-sm font-semibold text-foreground mb-2">
                {faq.question}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
