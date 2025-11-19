export type GradientStop = {
  color: string;
  position: number; // 0-100
};

export type GradientValue = {
  type: 'linear' | 'radial';
  angle: number;
  stops: GradientStop[];
};

export type ColorValue = string | GradientValue;

export type SpacingValue = number | [number, number, number, number];

export type VisibilityConfig = {
  desktop: boolean;
  tablet: boolean;
  mobile: boolean;
};

export type BorderStyleOption = 'none' | 'solid' | 'dashed' | 'dotted' | 'double';

export type BorderValue = {
  width: number;
  style: BorderStyleOption;
  color: string;
};

export type HeadingSEOConfig = {
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  text?: string;
};

export type ImageSEOConfig = {
  alt?: string;
  title?: string;
  caption?: string;
};

export type LinkSEOConfig = {
  href?: string;
  title?: string;
  rel?: 'nofollow' | 'noopener' | 'sponsored' | 'ugc' | '';
  openInNewTab?: boolean;
};

export type PageSEOConfig = {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  ogImage?: string;
  canonicalUrl?: string;
  robots: {
    index: boolean;
    follow: boolean;
  };
  language?: string;
};

export type SectionSEOConfig = {
  headingLevel?: 'h1' | 'h2' | 'h3';
  ariaLabel?: string;
  landmark?: 'main' | 'section' | 'article' | 'aside';
};

export type SEOSettingsContext = 'page' | 'section' | 'image' | 'link' | 'heading';

export type SEOConfig =
  | PageSEOConfig
  | SectionSEOConfig
  | ImageSEOConfig
  | LinkSEOConfig
  | HeadingSEOConfig;

export type SerializedNode = {
  type?: {
    resolvedName?: string;
  };
  displayName?: string;
  isCanvas?: boolean;
  hidden?: boolean;
  props?: Record<string, unknown>;
  custom?: Record<string, unknown>;
  nodes?: string[];
  linkedNodes?: Record<string, string>;
  parent?: string | null;
};

export type SerializedNodesMap = Record<string, SerializedNode>;
