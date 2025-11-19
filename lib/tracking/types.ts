export interface TrackingEventOption {
  value: string;
  label: string;
}

export interface TrackingEventDetails {
  name: string;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  params?: Record<string, unknown>;
}

export interface TrackingPlatforms {
  googleAnalytics?: boolean;
  facebookPixel?: boolean;
  googleAds?: boolean;
}

export interface TrackingConfig {
  enabled: boolean;
  customId?: string;
  customClass?: string;
  event: TrackingEventDetails;
  platforms: TrackingPlatforms;
}

export const DEFAULT_TRACKING_CONFIG: TrackingConfig = {
  enabled: false,
  customId: '',
  customClass: '',
  event: {
    name: '',
    category: '',
    action: '',
    label: '',
    value: undefined,
    params: {},
  },
  platforms: {
    googleAnalytics: true,
    facebookPixel: false,
    googleAds: false,
  },
};
