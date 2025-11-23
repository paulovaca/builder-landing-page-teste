import React from 'react';

import type { MapBlockProps, MapTypeOption } from '@/lib/site-renderer/types';

import { borderValueToCss, colorValueToCss, spacingValueToCss } from './utils';
import styles from './map-block.module.css';

export type { MapBlockProps } from '@/lib/site-renderer/types';

const SHADOW_MAP: Record<MapBlockProps['shadow'], string> = {
  none: 'none',
  soft: 'var(--shadow-sm)',
  medium: 'var(--shadow-md)',
};

const MAP_TYPE_PARAM: Record<MapTypeOption, string> = {
  roadmap: '',
  satellite: 'k',
  hybrid: 'h',
};

const clampZoom = (value?: number) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 14;
  return Math.min(20, Math.max(1, Math.round(numeric)));
};

const buildMapUrl = (location?: string, mapType?: MapTypeOption, zoom?: number) => {
  const query = (location ?? '').trim();
  if (!query) return '';

  const url = new URL('https://www.google.com/maps');
  url.searchParams.set('q', query);
  url.searchParams.set('output', 'embed');
  url.searchParams.set('z', String(clampZoom(zoom)));
  url.searchParams.set('hl', 'pt-BR');

  const typeParam = MAP_TYPE_PARAM[mapType ?? 'roadmap'];
  if (typeParam) {
    url.searchParams.set('t', typeParam);
  }

  return url.toString();
};

export function MapBlock({
  location,
  mapType,
  zoom,
  showControls,
  disableInteractions = false,
  width,
  height,
  padding,
  margin,
  background,
  border,
  borderRadius,
  shadow,
  visibleOn,
  innerRef,
  wrapperProps,
  id,
  className,
}: MapBlockProps) {
  const resolvedHeight = height && height.trim().length > 0 ? height : '360px';
  const minHeight = resolvedHeight === 'auto' ? '280px' : resolvedHeight;
  const mapUrl = buildMapUrl(location, mapType, zoom);

  const {
    style: wrapperStyle,
    className: wrapperClassName,
    id: wrapperId,
    ...restWrapperProps
  } = wrapperProps ?? {};

  const containerStyle: React.CSSProperties = {
    width: width || '100%',
    height: resolvedHeight,
    minHeight,
    padding: spacingValueToCss(padding),
    margin: spacingValueToCss(margin),
    background: colorValueToCss(background),
    border: borderValueToCss(border),
    borderRadius,
    boxShadow: SHADOW_MAP[shadow],
    ...(wrapperStyle ?? {}),
  };

  const frameStyle: React.CSSProperties = {
    pointerEvents: disableInteractions || !showControls ? 'none' : 'auto',
    borderRadius,
  };

  const combinedClassName =
    [styles.container, wrapperClassName, className?.trim()].filter(Boolean).join(' ') || undefined;
  const sanitizedId = (id || wrapperId)?.trim() || undefined;
  const visibility = visibleOn ?? { desktop: true, tablet: true, mobile: true };

  return (
    <div
      ref={innerRef}
      className={combinedClassName}
      style={containerStyle}
      data-block-type="map"
      data-visible-desktop={visibility.desktop ? 'true' : 'false'}
      data-visible-tablet={visibility.tablet ? 'true' : 'false'}
      data-visible-mobile={visibility.mobile ? 'true' : 'false'}
      id={sanitizedId}
      {...restWrapperProps}
    >
      <div className={styles.frameWrapper}>
        {mapUrl ? (
          <>
            <iframe
              title={location || 'Mapa'}
              src={mapUrl}
              className={styles.mapFrame}
              style={frameStyle}
              loading="lazy"
              allowFullScreen
            />
            {!showControls ? (
              <div className={styles.controlsBadge} aria-hidden>
                Controles ocultos
              </div>
            ) : null}
          </>
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>Adicione um endereço ou coordenadas</p>
            <p className={styles.emptyHint}>
              Exemplo: “Avenida Paulista, São Paulo” ou “-23.5,-46.6”
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
