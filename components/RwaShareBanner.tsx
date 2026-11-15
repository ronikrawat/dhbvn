'use client';

import React, { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';

const STORAGE_KEY = 'rwa_share_prompt_last_seen';
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

const RWA_MESSAGES = [
  '📢 Keep your society in the loop! Share live power cut updates with your RWA WhatsApp group.',
  '💡 Power out in your area? Share this live tracker in your society WhatsApp group so neighbors know expected restoration time.',
  '🤝 Help your neighbors stay informed — share live DHBVN outage status in your RWA or locality WhatsApp group.',
  '⚡ Know when electricity will be restored. Share live feeder status in your colony or RWA WhatsApp group.',
  '🏘️ Got an RWA or society WhatsApp group? Share live DHBVN power cut & restoration times with your neighbors.',
];

export function RwaShareBanner(): React.ReactElement | null {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      const lastSeenStr = localStorage.getItem(STORAGE_KEY);
      const now = Date.now();

      if (lastSeenStr) {
        const lastSeen = parseInt(lastSeenStr, 10);
        if (!isNaN(lastSeen) && now - lastSeen < ONE_WEEK_MS) {
          // Shown less than a week ago
          return;
        }
      }

      // Pick a random message
      const randomMsg = RWA_MESSAGES[Math.floor(Math.random() * RWA_MESSAGES.length)];
      setMessage(randomMsg);

      // Delay display slightly so it doesn't jar user during initial page load
      const timer = setTimeout(() => {
        setVisible(true);
        // Mark as seen for this week
        localStorage.setItem(STORAGE_KEY, String(now));
      }, 2500);

      return () => clearTimeout(timer);
    } catch {
      // localStorage disabled or not accessible
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // ignore
    }
  };

  const handleShare = () => {
    const url = typeof window !== 'undefined' ? window.location.href : 'https://powercutstatus.in/';
    const shareText = `Check live DHBVN power cut and expected restoration times in our area here: ${url}`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');
    handleDismiss();
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Share with your RWA WhatsApp group"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="relative rounded-lg border border-neutral-700/80 bg-[#161412]/95 backdrop-blur-md p-4 shadow-2xl text-foreground">
        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          aria-label="Close message"
          className="absolute top-2.5 right-2.5 p-1 rounded-sm text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3 pr-6">
          <div className="mt-0.5 p-2 rounded-full bg-emerald-500/15 text-emerald-400 shrink-0">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              RWA & Society Groups
            </p>
            <p className="text-sm text-neutral-200 leading-snug">
              {message}
            </p>

            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#25D366] hover:bg-[#20ba59] text-black font-semibold text-xs transition-colors shadow-sm cursor-pointer"
              >
                {/* WhatsApp icon */}
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.886-9.885 9.886m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
                </svg>
                Share on WhatsApp
              </button>

              <button
                onClick={handleDismiss}
                className="text-xs text-neutral-400 hover:text-neutral-200 px-2 py-1.5 transition-colors"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
