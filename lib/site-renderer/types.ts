import type React from 'react';

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

export type IconAlignment = 'left' | 'center' | 'right';

export type IconShadow = 'none' | 'soft' | 'medium' | 'strong';

export interface IconBlockProps {
  iconName: string;
  iconSize: number;
  color: ColorValue;
  alignment: IconAlignment;
  background: ColorValue;
  border: BorderValue;
  borderRadius: number;
  shadow: IconShadow;
  margin: SpacingValue;
  padding: SpacingValue;
  width: string;
  height: string;
  visibleOn: VisibilityConfig;
  innerRef?: React.Ref<HTMLDivElement>;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  id?: string;
  className?: string;
}

export type SpacerOrientation = 'vertical' | 'horizontal';

export interface SpacerBlockProps {
  size: number;
  orientation: SpacerOrientation;
  showGuide: boolean;
  margin: SpacingValue;
  width: string;
  height: string;
  visibleOn: VisibilityConfig;
  innerRef?: React.Ref<HTMLDivElement>;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  id?: string;
  className?: string;
}

export type DividerAlignment = 'left' | 'center' | 'right';

export interface DividerBlockProps {
  thickness: number;
  lineStyle: BorderStyleOption;
  color: ColorValue;
  width: string;
  height: string;
  orientation: 'horizontal' | 'vertical';
  alignment: DividerAlignment;
  margin: SpacingValue;
  visibleOn: VisibilityConfig;
  innerRef?: React.Ref<HTMLDivElement>;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  id?: string;
  className?: string;
}

export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeVariant = 'solid' | 'outline' | 'soft';

export interface BadgeBlockProps {
  text: string;
  variant: BadgeVariant;
  textSize: number;
  fontFamily: string;
  fontWeight: TextWeightOption;
  letterSpacing: number;
  textTransform?: TextTransformOption;
  background: ColorValue;
  textColor: ColorValue;
  borderRadius: number;
  padding?: SpacingValue;
  margin: SpacingValue;
  width: string;
  height: string;
  visibleOn: VisibilityConfig;
  innerRef?: React.Ref<HTMLDivElement>;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  id?: string;
  className?: string;
}

export type VideoShadow = 'none' | 'soft';
export type TextWeightOption = 'regular' | 'medium' | 'semibold' | 'bold';
export type TextAlignOption = 'left' | 'center' | 'right' | 'justify';
export type TextTransformOption = 'none' | 'uppercase' | 'lowercase' | 'capitalize';

export interface VideoBlockProps {
  url: string;
  title: string;
  poster?: string;
  width: string;
  height: string;
  playerHeight: string;
  playerAspectRatio: string;
  borderRadius: number;
  autoPlay: boolean;
  controls: boolean;
  loop: boolean;
  muted: boolean;
  showPlayIndicator: boolean;
  shadow: VideoShadow;
  background: ColorValue;
  tracking?: import('@/lib/tracking/types').TrackingConfig;
  innerRef?: React.Ref<HTMLDivElement>;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  onPlay?: () => void;
  onEnded?: () => void;
  margin: SpacingValue;
  padding: SpacingValue;
  border: BorderValue;
  visibleOn: VisibilityConfig;
  id?: string;
  className?: string;
  disablePlayerInteractions?: boolean;
}

export type ListMarkerType = 'bullet' | 'number' | 'icon' | 'check';

export type ListShadow = 'none' | 'soft' | 'medium';

export type ListItem = {
  id: string;
  text: string;
};

export interface ListBlockProps {
  items: ListItem[];
  markerType: ListMarkerType;
  markerIcon: string;
  markerColor: ColorValue;
  textColor: ColorValue;
  textSize: number;
  fontFamily: string;
  fontWeight: TextWeightOption;
  lineHeight: number;
  letterSpacing: number;
  textAlign: TextAlignOption;
  textTransform?: TextTransformOption;
  itemSpacing: number;
  padding: SpacingValue;
  margin: SpacingValue;
  background: ColorValue;
  border: BorderValue;
  borderRadius: number;
  shadow: ListShadow;
  width: string;
  height: string;
  visibleOn: VisibilityConfig;
  innerRef?: React.Ref<HTMLDivElement>;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  id?: string;
  className?: string;
}

export interface TextBlockProps {
  text: string;
  variant: 'body' | 'lead' | 'caption';
  align: 'left' | 'center' | 'right' | 'justify';
  color: ColorValue;
  fontFamily: string;
  fontWeight: TextWeightOption;
  textSize: number;
  lineHeight: number;
  letterSpacing: number;
  textTransform?: TextTransformOption;
  maxWidth: string;
  padding: SpacingValue;
  margin: SpacingValue;
  background: ColorValue;
  border: BorderValue;
  borderRadius: number;
  shadow: 'none' | 'soft';
  width: string;
  height: string;
  visibleOn: VisibilityConfig;
  innerRef?: React.Ref<HTMLDivElement>;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  renderContent?: (text: string) => React.ReactNode;
  id?: string;
  className?: string;
}

export interface HeadingBlockProps {
  text: string;
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  align: 'left' | 'center' | 'right';
  color: ColorValue;
  fontFamily: string;
  weight: TextWeightOption;
  fontSize: number;
  lineHeight?: number;
  letterSpacing: number;
  textTransform?: TextTransformOption;
  uppercase?: boolean;
  emphasis?: boolean;
  maxWidth: string;
  spacingBelow: number;
  seo?: HeadingSEOConfig;
  margin: SpacingValue;
  padding: SpacingValue;
  background: ColorValue;
  border: BorderValue;
  borderRadius: number;
  shadow: 'none' | 'soft' | 'medium';
  width: string;
  height: string;
  visibleOn: VisibilityConfig;
  innerRef?: React.Ref<HTMLDivElement>;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  id?: string;
  className?: string;
}

export interface ButtonBlockProps {
  label: string;
  href: string;
  openInNewTab: boolean;
  variant: 'solid' | 'outline' | 'ghost';
  textSize: number;
  fontFamily: string;
  fontWeight: TextWeightOption;
  letterSpacing: number;
  textTransform?: TextTransformOption;
  fullWidth: boolean;
  alignment: 'left' | 'center' | 'right';
  borderRadius: number;
  background: ColorValue;
  textColor: ColorValue;
  showIcon: boolean;
  iconName: string;
  border: BorderValue;
  shadow: 'none' | 'soft' | 'medium' | 'strong';
  tracking?: import('@/lib/tracking/types').TrackingConfig;
  innerRef?: React.Ref<HTMLDivElement>;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  margin: SpacingValue;
  padding: SpacingValue;
  width: string;
  height: string;
  visibleOn: VisibilityConfig;
  id?: string;
  className?: string;
}

export interface LinkBlockProps {
  label: string;
  href: string;
  openInNewTab: boolean;
  variant: 'accent' | 'muted' | 'primary';
  underline: 'always' | 'hover' | 'none';
  showIcon: boolean;
  textSize: number;
  fontFamily: string;
  fontWeight: TextWeightOption;
  letterSpacing: number;
  textTransform?: TextTransformOption;
  alignment: 'left' | 'center' | 'right';
  iconSize: number;
  tracking?: import('@/lib/tracking/types').TrackingConfig;
  seo?: LinkSEOConfig;
  innerRef?: React.Ref<HTMLDivElement>;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  margin: SpacingValue;
  padding: SpacingValue;
  background: ColorValue;
  border: BorderValue;
  borderRadius: number;
  shadow: 'none' | 'soft' | 'strong';
  width: string;
  height: string;
  visibleOn: VisibilityConfig;
  id?: string;
  className?: string;
}

export type GridItemAlignment = 'start' | 'center' | 'end' | 'stretch';

export interface GridBlockProps {
  columnsDesktop: number;
  columnsTablet: number;
  columnsMobile: number;
  gap: number;
  padding: SpacingValue;
  margin: SpacingValue;
  background: ColorValue;
  border: BorderValue;
  borderRadius: number;
  shadow: 'none' | 'soft' | 'medium';
  justifyItems: GridItemAlignment;
  alignItems: GridItemAlignment;
  width: string;
  height: string;
  visibleOn: VisibilityConfig;
  children?: React.ReactNode;
  innerRef?: React.Ref<HTMLDivElement>;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  showEmptyState?: boolean;
  id?: string;
  className?: string;
}

export type SectionWidthOption = 'narrow' | 'medium' | 'wide' | 'full';
export type SectionPaddingPreset = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';
export type SectionContentAlign = 'start' | 'center' | 'end';

export interface SectionBlockProps {
  contentWidth: SectionWidthOption;
  padding: SpacingValue;
  paddingPreset: SectionPaddingPreset;
  background: ColorValue;
  backgroundImage?: string;
  backgroundAlt?: string;
  overlayColor: ColorValue;
  overlayOpacity: number;
  alignContent: SectionContentAlign;
  margin: SpacingValue;
  border: BorderValue;
  borderRadius: number;
  shadow: 'none' | 'soft' | 'medium';
  width: string;
  height: string;
  visibleOn: VisibilityConfig;
  children?: React.ReactNode;
  innerRef?: React.Ref<HTMLDivElement>;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  showEmptyState?: boolean;
  id?: string;
  className?: string;
}
