'use client';

import { useCallback } from 'react';

import type { TrackingConfig, TrackingEventDetails } from './types';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export interface UseTrackingOptions {
  debug?: boolean;
}

const mergeEventDetails = (
  base: TrackingEventDetails,
  overrides?: Partial<TrackingEventDetails>,
): TrackingEventDetails => ({
  ...base,
  ...overrides,
  params: {
    ...(base.params ?? {}),
    ...(overrides?.params ?? {}),
  },
});

const buildPayload = (event: TrackingEventDetails) => ({
  event: event.name,
  event_category: event.category,
  event_action: event.action,
  event_label: event.label,
  value: event.value,
  ...event.params,
});

export const useTracking = ({
  debug = process.env.NODE_ENV !== 'production',
}: UseTrackingOptions = {}) => {
  const trackEvent = useCallback(
    (config?: TrackingConfig, overrides?: Partial<TrackingEventDetails>) => {
      if (!config?.enabled) {
        return;
      }

      const event = mergeEventDetails(config.event, overrides);
      if (!event.name) {
        return;
      }

      const hasWindow = typeof window !== 'undefined';
      const payload = buildPayload(event);

      if (hasWindow) {
        window.dataLayer = window.dataLayer ?? [];
        window.dataLayer.push(payload);

        if (config.platforms?.googleAnalytics && typeof window.gtag === 'function') {
          window.gtag('event', event.name, payload);
        }

        if (config.platforms?.facebookPixel && typeof window.fbq === 'function') {
          window.fbq('track', event.name, event.params ?? {});
        }

        if (config.platforms?.googleAds && typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', {
            send_to: 'AW-CONVERSION_ID',
            ...event.params,
          });
        }
      }

      if (debug) {
        console.info('[tracking]', event.name, payload);
      }
    },
    [debug],
  );

  return { trackEvent };
};
